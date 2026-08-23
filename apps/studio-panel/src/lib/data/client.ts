import { cache } from 'react'

import { unwrapSupabaseResult } from '@/lib/integrations/supabase.mjs'
import { createSupabaseServerClient } from '@/lib/supabase/server'

type SupabaseResult = { data: unknown; error: { message: string } | null }

async function checkedResult<T extends SupabaseResult>(query: PromiseLike<T>, context: string): Promise<T> {
  const result = await query
  unwrapSupabaseResult(result, context)
  return result
}

export const getClientServicesData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()

  const [{ data: packs }, { data: activities }, { data: summaries }] = await Promise.all([
    checkedResult(supabase
      .from('packs')
      .select('id, name, pack_type, status, purchase_date, price, notes, minutes_total, renewal_date, paid, billing_cycle')
      .eq('client_id', clientId)
      .order('purchase_date', { ascending: false }), 'Client services packs'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, activity_type, minutes_used, work_date, pack_id')
      .eq('client_id', clientId)
      .order('work_date', { ascending: false }), 'Client services activities'),
    checkedResult(supabase
      .from('pack_summary')
      .select('pack_id, used_minutes, remaining_minutes, minutes_total'), 'Client services summaries'),
  ])

  const actsByPack = new Map<string, typeof activities>()
  for (const a of activities ?? []) {
    if (!actsByPack.has(a.pack_id)) actsByPack.set(a.pack_id, [])
    actsByPack.get(a.pack_id)!.push(a)
  }

  const summaryMap = new Map((summaries ?? []).map((s) => [s.pack_id, s]))

  return {
    packs: (packs ?? []).map((p) => ({
      ...p,
      recentActivities: (actsByPack.get(p.id) ?? []).slice(0, 4),
      summary: summaryMap.get(p.id) ?? null,
    })),
  }
})

export const getClientBonosData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()
  const [{ data: packs }, { data: summaries }] = await Promise.all([
    checkedResult(supabase
      .from('packs')
      .select('id, name, minutes_total, status, purchase_date, renewal_date')
      .eq('client_id', clientId)
      .eq('pack_type', 'hours')
      .order('purchase_date', { ascending: false }), 'Client hour packs'),
    checkedResult(supabase.from('pack_summary').select('pack_id, used_minutes, remaining_minutes'), 'Client hour summaries'),
  ])
  const summaryMap = new Map((summaries ?? []).map((s) => [s.pack_id, s]))
  return { packs: packs ?? [], summaryMap }
})

export const getClientDashboardData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()

  const [
    { data: hoursPacks },
    { data: closedPacks },
    { data: packSummaries },
    { data: activities },
    { data: notifications },
    { data: pendingItems },
  ] = await Promise.all([
    checkedResult(supabase
      .from('packs')
      .select('id, name, minutes_total, status')
      .eq('client_id', clientId)
      .eq('pack_type', 'hours')
      .eq('status', 'active')
      .order('purchase_date', { ascending: false }), 'Client dashboard hour packs'),
    checkedResult(supabase
      .from('packs')
      .select('id, name, pack_type, renewal_date, notes, status')
      .eq('client_id', clientId)
      .neq('pack_type', 'hours')
      .eq('status', 'active')
      .order('purchase_date', { ascending: false }), 'Client dashboard services'),
    checkedResult(supabase
      .from('pack_summary')
      .select('pack_id, minutes_total, used_minutes, remaining_minutes'), 'Client dashboard summaries'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, description, minutes_used, work_date, activity_type, packs(name)')
      .eq('client_id', clientId)
      .order('work_date', { ascending: false })
      .limit(20), 'Client dashboard activities'),
    checkedResult(supabase
      .from('notifications')
      .select('id, title, body, minutes_delta, remaining_minutes, created_at')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(8), 'Client dashboard notifications'),
    checkedResult(supabase
      .from('pending_items')
      .select('id, title, status')
      .eq('client_id', clientId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }), 'Client dashboard pending items'),
  ])

  const summaryMap = new Map((packSummaries ?? []).map((s) => [s.pack_id, s]))

  return {
    hoursPacks: hoursPacks ?? [],
    closedPacks: closedPacks ?? [],
    summaryMap,
    activities: activities ?? [],
    notifications: notifications ?? [],
    pendingItems: pendingItems ?? [],
  }
})

export const getClientPendingItems = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()
  const { data } = await checkedResult(supabase
    .from('pending_items')
    .select('id, title, description, status, requested_at, received_at, reminder_interval_days, next_reminder_at, sort_order')
    .eq('client_id', clientId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true }), 'Client pending items')

  return data ?? []
})

export const getClientFacturasData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()
  const { data } = await checkedResult(supabase
    .from('invoices')
    .select('id, number, concept, amount, payment_method, status, notes, issued_at, paid_at, created_at')
    .eq('client_id', clientId)
    .order('issued_at', { ascending: false }), 'Client invoices')
  return data ?? []
})

export const getClientHistorialData = cache(async (clientId: string, page = 0, pageSize = 30) => {
  const supabase = await createSupabaseServerClient()
  const from = page * pageSize
  const to = from + pageSize - 1

  const [{ data: activities, count }, { data: summaries }] = await Promise.all([
    checkedResult(supabase
      .from('activities')
      .select('id, title, description, minutes_used, work_date, activity_type, pack_id, packs(name)', { count: 'exact' })
      .eq('client_id', clientId)
      .order('work_date', { ascending: false })
      .range(from, to), 'Client activity history'),
    checkedResult(supabase
      .from('pack_summary')
      .select('pack_id, pack_name, remaining_minutes'), 'Client history summaries'),
  ])

  return {
    activities: activities ?? [],
    total: count ?? 0,
    page,
    pageSize,
    summaries: summaries ?? [],
  }
})

export const getClientMessages = async (clientId: string) => {
  const supabase = await createSupabaseServerClient()
  const { data } = await checkedResult(supabase
    .from('messages')
    .select('id, subject, body, direction, type, read_at, reply_to_id, created_at')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false }), 'Client messages')
  return data ?? []
}

export const markClientInboundMessagesRead = async (clientId: string, messageIds: string[]) => {
  if (messageIds.length === 0) return null

  const supabase = await createSupabaseServerClient()
  const readAt = new Date().toISOString()

  const { error } = await supabase
    .from('messages')
    .update({ read_at: readAt })
    .eq('client_id', clientId)
    .eq('direction', 'inbound')
    .in('id', messageIds)
    .is('read_at', null)
  if (error) throw new Error(`No se pudieron marcar los mensajes como leídos: ${error.message}`)

  return readAt
}
