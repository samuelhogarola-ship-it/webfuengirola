create or replace view public.client_summary
with (security_invoker = true)
as
select
  c.id as client_id,
  c.name as client_name,
  c.email as client_email,
  coalesce(sum(active_pack_totals.minutes_total), 0)::integer as total_minutes,
  coalesce(sum(active_pack_totals.used_minutes), 0)::integer as used_minutes,
  (
    coalesce(sum(active_pack_totals.minutes_total), 0)
    - coalesce(sum(active_pack_totals.used_minutes), 0)
  )::integer as remaining_minutes
from public.clients c
left join (
  select
    p.id as pack_id,
    p.client_id,
    p.minutes_total,
    coalesce(sum(a.minutes_used), 0)::integer as used_minutes
  from public.packs p
  left join public.activities a on a.pack_id = p.id
  where p.status = 'active'
  group by p.id, p.client_id, p.minutes_total
) active_pack_totals on active_pack_totals.client_id = c.id
group by c.id, c.name, c.email;

grant select on public.client_summary to authenticated;
