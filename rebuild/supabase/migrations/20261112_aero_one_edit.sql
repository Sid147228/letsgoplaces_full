-- One AI edit per Aero Free trip, claimed atomically by the owner.
-- Pending edits count toward the lifetime free allowance even if the provider fails.
-- Recovery/refund for infrastructure failures must be added before public rollout.
create or replace function public.claim_free_edit(p_trip_id uuid)
returns public.trips language plpgsql security definer set search_path = '' as $$
declare result public.trips;
begin
  if auth.uid() is null then raise exception 'Authentication required' using errcode='28000'; end if;
  update public.trips
     set ai_edits_used=1, updated_at=now()
   where id=p_trip_id and user_id=auth.uid()
     and status='ready' and ai_edits_used=0
   returning * into result;
  if result.id is null then
    raise exception 'Free AI edit is unavailable or has already been used' using errcode='P0001';
  end if;
  return result;
end; $$;
revoke all on function public.claim_free_edit(uuid) from public,anon;
grant execute on function public.claim_free_edit(uuid) to authenticated;
