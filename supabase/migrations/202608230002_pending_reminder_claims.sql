alter table public.pending_items
add column if not exists reminder_claim_token uuid;

alter table public.pending_items
add column if not exists reminder_claimed_at timestamptz;

create index if not exists pending_reminder_claim_idx
on public.pending_items (reminder_claimed_at)
where status = 'pending' and reminder_claim_token is not null;
