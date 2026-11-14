-- Aero Free archive and durable lifetime entitlement.
-- Apply after 20261111_aero_free.sql and 20261112_aero_one_edit.sql.
-- "Remove from My Trips" removes itinerary contents while retaining the
-- minimal, unique trip claim row. This is not full account/data erasure.
alter table public.trips add column if not exists archived_at timestamptz;

create index if not exists trips_visible_by_owner
  on public.trips(user_id,created_at desc)
  where archived_at is null;

-- No additional client-side UPDATE or DELETE grants are given.
-- Only a row's owner can archive, using the authenticated JWT and auth.uid().
create or replace function public.archive_free_trip(p_trip_id uuid)
returns boolean language plpgsql security definer
set search_path = '' as $$
declare archived boolean := false;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode='28000';
  end if;

  update public.trips
    set itinerary = null,
        archived_at = now(),
        updated_at = now(),
        interests = '',
        destination = 'Archived trip'
  where id = p_trip_id
    and user_id = (select auth.uid())
    and archived_at is null
  returning true into archived;

  return coalesce(archived,false);
end; $$;
revoke all on function public.archive_free_trip(uuid) from public,anon;
grant execute on function public.archive_free_trip(uuid) to authenticated;

-- A trip that's been removed cannot subsequently receive a free AI edit.
create or replace function public.claim_free_edit(p_trip_id uuid)
returns public.trips language plpgsql security definer set search_path = '' as $$
declare result public.trips;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required' using errcode='28000';
  end if;

  update public.trips
     set ai_edits_used=1,
         edit_state='in_progress',
         edit_attempts=edit_attempts+1,
         updated_at=now()
   where id=p_trip_id and user_id=(select auth.uid())
     and archived_at is null
     and status='ready' and edit_attempts < 3
     and (
       (edit_state='available' and ai_edits_used=0)
       or (edit_state='failed' and ai_edits_used=1)
     )
   returning * into result;

  if result.id is null then
    raise exception 'Free AI edit already completed, in progress, archived or retry limit reached'
      using errcode='P0001';
  end if;
  return result;
end; $$;
revoke all on function public.claim_free_edit(uuid) from public,anon;
grant execute on function public.claim_free_edit(uuid) to authenticated;
