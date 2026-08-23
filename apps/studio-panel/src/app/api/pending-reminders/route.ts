import { NextResponse } from 'next/server'

import { isAuthorizedCronRequest, processPendingReminders, type PendingReminderItem } from '@/lib/cron/pending-reminders.mjs'
import { sendPendingItemReminderEmail } from '@/lib/email'
import { getRequiredServerEnv } from '@/lib/env'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

function getCronSecret() {
  return process.env.PENDING_REMINDERS_CRON_SECRET || process.env.CRON_SECRET
}

async function runPendingReminders(request: Request) {
  const configuredSecret = getCronSecret()
  if (!configuredSecret) {
    return NextResponse.json({ error: 'cron_not_configured', message: 'Cron secret is required.' }, { status: 503 })
  }

  if (!isAuthorizedCronRequest({
    configuredSecret,
    authorization: request.headers.get('authorization'),
    headerSecret: request.headers.get('x-cron-secret'),
  })) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabaseAdminClient()
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  const staleClaimBefore = new Date(now.getTime() - 15 * 60 * 1000).toISOString()

  const { data: dueItems, error } = await supabase
    .from('pending_items')
    .select('id, client_id, title, description, requested_at, reminder_interval_days, next_reminder_at, clients(name, email)')
    .eq('status', 'pending')
    .not('reminder_interval_days', 'is', null)
    .not('next_reminder_at', 'is', null)
    .lte('next_reminder_at', today)
    .or(`reminder_claim_token.is.null,reminder_claimed_at.lt.${staleClaimBefore}`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const result = await processPendingReminders({
    items: (dueItems ?? []) as PendingReminderItem[],
    claimReminder: async (itemId, update) => {
      const claimToken = crypto.randomUUID()
      const { data, error: claimError } = await supabase
        .from('pending_items')
        .update({ reminder_claim_token: claimToken, reminder_claimed_at: update.claimedAt })
        .eq('id', itemId)
        .eq('status', 'pending')
        .eq('next_reminder_at', update.expectedNextReminderAt)
        .or(`reminder_claim_token.is.null,reminder_claimed_at.lt.${staleClaimBefore}`)
        .select('id')
        .maybeSingle()
      if (claimError || !data) throw claimError ?? new Error('Reminder was already claimed or closed.')
      return claimToken
    },
    sendReminder: async ({ item, client }) => {
      await sendPendingItemReminderEmail({
        clientEmail: client.email,
        clientName: client.name ?? 'cliente',
        title: item.title,
        description: item.description,
        requestedAt: item.requested_at,
        idempotencyKey: `wf-pending-${item.id}-${item.next_reminder_at}`,
      })
    },
    persistReminder: async (itemId, update) => {
      const { error: persistenceError } = await supabase
        .from('pending_items')
        .update({
          last_reminder_sent_at: update.lastReminderSentAt,
          next_reminder_at: update.nextReminderAt,
          reminder_claim_token: null,
          reminder_claimed_at: null,
        })
        .eq('id', itemId)
        .eq('status', 'pending')
        .eq('reminder_claim_token', update.claimToken)
        .select('id')
        .single()
      if (persistenceError) throw persistenceError
    },
    releaseClaim: async (itemId, update) => {
      const { error: releaseError } = await supabase
        .from('pending_items')
        .update({ reminder_claim_token: null, reminder_claimed_at: null })
        .eq('id', itemId)
        .eq('reminder_claim_token', update.claimToken)
        .select('id')
        .single()
      if (releaseError) throw releaseError
    },
  })

  return NextResponse.json({ ok: result.failed.length === 0, ...result, appUrl: getRequiredServerEnv('NEXT_PUBLIC_APP_URL') })
}

export async function GET(request: Request) {
  return runPendingReminders(request)
}

export async function POST(request: Request) {
  return runPendingReminders(request)
}
