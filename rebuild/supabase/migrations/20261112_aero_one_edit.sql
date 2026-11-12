-- One successful AI edit per Aero Free trip, with at most three provider attempts.
-- This migration must be applied AFTER 20261111_aero_free.sql.
alter table public.trips
  add column if not exists edit_state text not null default 'available'
  check (edit_state in ('available','in_progress','failed','completed'));
alter table public.trips
  add column if not exists edit_attempts integer not null default 0
  check (edit_attempts between 0 and 3);

-- Atomic conditional UPDATE serializes concurrent claims. Failed attempts are retryable,
-- but a completed edit cannot be claimed again and attempts are capped.
create or replace function public.claim_free_edit(p_trip_id uuid)
returns public.trips language plpgsql security definer set search_path = '' as $$
declare result public.trips;
begin
  if auth.uid() is null then
    raise exception 'Authentication required' using errcode='28000';
  end if;
  update public.trips
     set ai_edits_used=1,
         edit_state='in_progress',
         edit_attempts=edit_attempts+1,
         updated_at=now()
   where id=p_trip_id and user_id=auth.uid()
     and status='ready' and edit_attempts < 3
     and (
       (edit_state='available' and ai_edits_used=0)
       or (edit_state='failed' and ai_edits_used=1)
     )
   returning * into result;
  if result.id is null then
    raise exception 'Free AI edit already completed, in progress, or retry limit reached'
      using errcode='P0001';
  end if;
  return result;
end; $$;
revoke all on function public.claim_free_edit(uuid) from public,anon;
grant execute on function public.claim_free_edit(uuid) to authenticated;
