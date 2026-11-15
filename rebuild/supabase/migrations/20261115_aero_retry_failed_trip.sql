-- Failed AI generations may be retried, but never consume a second free trip.
-- Apply after 20261114_aero_archive.sql. Preserve the original unique user_id index.
alter table public.trips
  add column if not exists generation_attempts integer not null default 1
  check (generation_attempts between 1 and 3);

-- Atomic INSERT...ON CONFLICT serializes concurrent claims. A failed, non-archived
-- trip can be retried at most twice more. Completed/archived trips are never reset.
create or replace function public.claim_free_trip(
  p_destination text, p_start_date date, p_end_date date,
  p_travelers integer, p_budget text, p_pace text, p_interests text
) returns public.trips language plpgsql security definer
set search_path = '' as $$
declare result public.trips;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode='28000';
  end if;
  if p_destination is null or char_length(btrim(p_destination)) not between 1 and 120
    or p_start_date is null or p_end_date is null
    or p_end_date < p_start_date or p_end_date > p_start_date + 2
    or p_travelers not between 1 and 12
    or p_budget not in ('budget','moderate','luxury')
    or p_pace not in ('relaxed','balanced','active')
    or char_length(coalesce(p_interests,'')) > 250
  then raise exception 'Invalid trip preferences' using errcode='22023'; end if;

  insert into public.trips(
    user_id,destination,start_date,end_date,travelers,budget,pace,interests,status,generation_attempts
  ) values(
    (select auth.uid()),btrim(p_destination),p_start_date,p_end_date,
    p_travelers,p_budget,p_pace,coalesce(p_interests,''),'pending',1
  )
  on conflict (user_id) do update
    set destination = excluded.destination,
        start_date = excluded.start_date,
        end_date = excluded.end_date,
        travelers = excluded.travelers,
        budget = excluded.budget,
        pace = excluded.pace,
        interests = excluded.interests,
        status = 'pending',
        itinerary = null,
        generation_attempts = public.trips.generation_attempts + 1,
        updated_at = now()
    where public.trips.status = 'failed'
      and public.trips.archived_at is null
      and public.trips.generation_attempts < 3
  returning * into result;

  if result.id is null then
    raise exception 'Lifetime free trip already claimed or retry limit reached'
      using errcode='23505';
  end if;
  return result;
end; $$;
revoke all on function public.claim_free_trip(text,date,date,integer,text,text,text)
  from public,anon;
grant execute on function public.claim_free_trip(text,date,date,integer,text,text,text)
  to authenticated;
