alter table public.clients
add column if not exists auth_user_id uuid references auth.users(id) on delete set null;

-- Registered portal clients historically used the Auth user id as client id.
update public.clients c
set auth_user_id = u.id
from auth.users u
where c.project = 'wf-studio'
  and c.auth_user_id is null
  and c.id = u.id;

-- Backfill legacy clients created before registration was tied to the client id.
update public.clients c
set auth_user_id = u.id
from auth.users u
where c.project = 'wf-studio'
  and c.auth_user_id is null
  and u.email is not null
  and lower(c.email) = lower(u.email)
  and not exists (
    select 1
    from public.clients linked
    where linked.project = c.project
      and linked.auth_user_id = u.id
  );

create unique index if not exists clients_project_auth_user_unique_idx
on public.clients (project, auth_user_id)
where auth_user_id is not null;

create or replace function private.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select c.id
  from public.clients c
  where c.project = 'wf-studio'
    and c.auth_user_id = auth.uid()
    and c.status = 'active';
$$;

drop policy if exists clients_client_select_own on public.clients;
create policy clients_client_select_own on public.clients
for select
using (
  project = 'wf-studio'
  and auth_user_id = auth.uid()
  and status = 'active'
);
