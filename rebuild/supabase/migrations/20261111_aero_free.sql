-- Aero Free: one lifetime trip per account, at most three days, one AI edit.
-- Apply through the Supabase SQL editor or migration runner before enabling account-backed generation.
create extension if not exists pgcrypto;
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  destination text not null check (char_length(destination) between 1 and 120),
  start_date date not null,
  end_date date not null,
  travelers integer not null default 2 check (travelers between 1 and 12),
  budget text not null check (budget in ('budget','moderate','luxury')),
  pace text not null check (pace in ('relaxed','balanced','active')),
  interests text not null default '',
  itinerary jsonb,
  status text not null default 'pending' check (status in ('pending','ready','failed')),
  ai_edits_used integer not null default 0 check (ai_edits_used between 0 and 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint free_trip_length check (end_date >= start_date and end_date <= start_date + 2)
);
create unique index if not exists trips_one_free_trip_per_user on public.trips(user_id);
create index if not exists trips_user_created on public.trips(user_id,created_at desc);
alter table public.trips enable row level security;
revoke all on public.trips from anon, authenticated;
grant select on public.trips to authenticated;
create policy "Read own trips" on public.trips for select to authenticated using (user_id=auth.uid());

-- SECURITY DEFINER is deliberately limited to authenticated callers, checks auth.uid(),
-- and never accepts a user_id parameter. Unique index guarantees one trip under concurrency.
create or replace function public.claim_free_trip(
  p_destination text, p_start_date date, p_end_date date,
  p_travelers integer, p_budget text, p_pace text, p_interests text
) returns public.trips language plpgsql security definer set search_path = '' as $$
declare result public.trips;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode='28000'; end if;
  if p_destination is null or char_length(btrim(p_destination)) not between 1 and 120
    or p_start_date is null or p_end_date is null
    or p_end_date < p_start_date or p_end_date > p_start_date + 2
    or p_travelers not between 1 and 12
    or p_budget not in ('budget','moderate','luxury')
    or p_pace not in ('relaxed','balanced','active')
    or char_length(coalesce(p_interests,'')) > 250
  then raise exception 'Invalid trip preferences' using errcode='22023'; end if;
  insert into public.trips(user_id,destination,start_date,end_date,travelers,budget,pace,interests)
  values(auth.uid(),btrim(p_destination),p_start_date,p_end_date,p_travelers,p_budget,p_pace,coalesce(p_interests,''))
  on conflict (user_id) do nothing returning * into result;
  if result.id is null then raise exception 'Free trip already claimed' using errcode='23505'; end if;
  return result;
end; $$;
revoke all on function public.claim_free_trip(text,date,date,integer,text,text,text) from public,anon;
grant execute on function public.claim_free_trip(text,date,date,integer,text,text,text) to authenticated;

-- Only server-side service role can update generated itineraries.
-- This does not expose service-role credentials to browsers.
