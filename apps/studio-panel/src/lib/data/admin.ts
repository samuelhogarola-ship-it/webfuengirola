import { cache } from 'react'

import { unwrapSupabaseResult } from '@/lib/integrations/supabase.mjs'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { normalizeSearch } from '@/lib/utils'

type SupabaseResult = { data: unknown; error: { message: string } | null }

async function checkedResult<T extends SupabaseResult>(query: PromiseLike<T>, context: string): Promise<T> {
  const result = await query
  unwrapSupabaseResult(result, context)
  return result
}

export const getAdminDashboardData = cache(async () => {
  const supabase = await createSupabaseServerClient()

  const [{ count: activeClients }, { data: summaries }, { count: activePacks }, { count: monthActivities }, { data: recentActivities }] =
    await Promise.all([
      checkedResult(supabase.from('clients').select('*', { count: 'exact', head: true }).eq('status', 'active'), 'Admin active clients'),
      checkedResult(supabase.from('client_summary').select('*'), 'Admin client summaries'),
      checkedResult(supabase.from('packs').select('*', { count: 'exact', head: true }).eq('status', 'active'), 'Admin active packs'),
      checkedResult(supabase
        .from('activities')
        .select('*', { count: 'exact', head: true })
        .gte('work_date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10)), 'Admin month activities'),
      checkedResult(supabase
        .from('activities')
        .select('id, title, minutes_used, work_date, client_id, clients(id, name), packs(name)')
        .order('work_date', { ascending: false })
        .limit(6), 'Admin recent activities'),
    ])

  const pendingMinutes =
    summaries?.reduce((sum, item) => {
      return sum + Number(item.remaining_minutes ?? 0)
    }, 0) ?? 0

  return {
    activeClients: activeClients ?? 0,
    pendingMinutes,
    activePacks: activePacks ?? 0,
    monthActivities: monthActivities ?? 0,
    recentActivities: recentActivities ?? [],
  }
})

export const getAdminClientsPageData = cache(async (search: string, editingId?: string, category?: string, project = 'wf-studio') => {
  const supabase = await createSupabaseServerClient()
  const query = normalizeSearch(search)

  const pendingQuery = supabase
    .from('clients')
    .select('id, name, email, created_at')
    .eq('status', 'pending')
    .eq('project', project)
    .order('created_at', { ascending: false })

  const [{ data: allClients }, { data: editingClient }, { data: summaries }, { data: pendingClients }, { data: packs }, { data: services }] = await Promise.all([
    checkedResult(supabase
      .from('clients')
      .select('id, name, company, email, phone, status, created_at, updated_at')
      .eq('project', project)
      .order('name'), 'Admin project clients'),
    editingId
      ? checkedResult(supabase.from('clients').select('id, name, company, email, phone, status').eq('id', editingId).eq('project', project).maybeSingle(), 'Admin editing client')
      : Promise.resolve({ data: null, error: null }),
    checkedResult(supabase.from('client_summary').select('*'), 'Admin client summaries'),
    checkedResult(pendingQuery, 'Admin pending clients'),
    checkedResult(supabase.from('packs').select('id, client_id, pack_type, status').eq('status', 'active'), 'Admin client packs'),
    checkedResult(supabase.from('services').select('id, client_id'), 'Admin client services'),
  ])

  const packsByClient = new Map<string, string[]>()
  for (const p of packs ?? []) {
    const list = packsByClient.get(p.client_id) ?? []
    list.push(p.pack_type)
    packsByClient.set(p.client_id, list)
  }
  const clientsWithServices = new Set((services ?? []).map((s) => s.client_id))

  let clients = (allClients ?? []).filter((c) => c.status !== 'pending')

  if (query) {
    const q = query.toLowerCase()
    clients = clients.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.company ?? '').toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    )
  }

  if (category === 'horas') {
    clients = clients.filter((c) => (packsByClient.get(c.id) ?? []).includes('hours'))
  } else if (category === 'cerrado') {
    clients = clients.filter((c) => (packsByClient.get(c.id) ?? []).some((t) => t !== 'hours'))
  } else if (category === 'servicios') {
    clients = clients.filter((c) => clientsWithServices.has(c.id))
  }

  return {
    clients,
    editingClient,
    summaries: summaries ?? [],
    pendingClients: pendingClients ?? [],
    packsByClient,
    clientsWithServices,
  }
})

export const getAdminPacksPageData = cache(async (editingId?: string, typeFilter?: string) => {
  const supabase = await createSupabaseServerClient()

  let packsQuery = supabase
    .from('packs')
    .select('id, name, pack_type, client_id, minutes_total, price, invoice_number, purchase_date, renewal_date, billing_cycle, paid, status, notes, clients(name)')
    .order('purchase_date', { ascending: false })

  const validTypes = ['hours', 'tasks', 'domain', 'hosting', 'service', 'subscription', 'membership']
  if (typeFilter && validTypes.includes(typeFilter)) {
    packsQuery = packsQuery.eq('pack_type', typeFilter)
  }

  const [{ data: clients }, { data: packs }, { data: packSummaries }, { data: editingPack }] = await Promise.all([
    checkedResult(supabase.from('clients').select('id, name, email, status').order('name'), 'Admin pack clients'),
    checkedResult(packsQuery, 'Admin packs'),
    checkedResult(supabase.from('pack_summary').select('*'), 'Admin pack summaries'),
    editingId
      ? checkedResult(supabase
          .from('packs')
          .select('id, client_id, name, pack_type, minutes_total, price, invoice_number, purchase_date, renewal_date, billing_cycle, paid, status, notes')
          .eq('id', editingId)
          .maybeSingle(), 'Admin editing pack')
      : Promise.resolve({ data: null, error: null }),
  ])

  return {
    clients: clients ?? [],
    packs: packs ?? [],
    packSummaries: packSummaries ?? [],
    editingPack,
  }
})

export const getClientDetailPageData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()

  const [{ data: client }, { data: packs }, { data: services }, { data: packSummaries }, { data: recentActivities }] = await Promise.all([
    checkedResult(supabase.from('clients').select('id, name, company, email, phone, status, created_at').eq('id', clientId).maybeSingle(), 'Admin client detail'),
    checkedResult(supabase
      .from('packs')
      .select('id, name, pack_type, minutes_total, price, purchase_date, renewal_date, status, notes, billing_cycle, paid')
      .eq('client_id', clientId)
      .order('purchase_date', { ascending: false }), 'Admin client detail packs'),
    checkedResult(supabase
      .from('services')
      .select('id, name, service_type, price, service_date, status, notes, pack_id')
      .eq('client_id', clientId)
      .order('service_date', { ascending: false }), 'Admin client detail services'),
    checkedResult(supabase.from('pack_summary').select('*').eq('client_id', clientId), 'Admin client detail summaries'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, activity_type, minutes_used, work_date, packs(name)')
      .eq('client_id', clientId)
      .order('work_date', { ascending: false })
      .limit(10), 'Admin client detail activities'),
  ])

  return {
    client,
    packs: packs ?? [],
    services: services ?? [],
    packSummaries: packSummaries ?? [],
    recentActivities: recentActivities ?? [],
  }
})

export async function getClientFullHistory(clientId: string) {
  const supabase = await createSupabaseServerClient()
  const { data } = await checkedResult(supabase
    .from('activities')
    .select('id, title, activity_type, minutes_used, work_date, description, packs(id, name)')
    .eq('client_id', clientId)
    .order('work_date', { ascending: false }), 'Admin client full history')
  return data ?? []
}

export const getAdminActivitiesPageData = cache(async () => {
  const supabase = await createSupabaseServerClient()

  const [{ data: clients }, { data: packs }, { data: activities }] = await Promise.all([
    checkedResult(supabase.from('clients').select('id, name, email, status').eq('status', 'active').order('name'), 'Admin activity clients'),
    checkedResult(supabase
      .from('packs')
      .select('id, client_id, name, pack_type, status')
      .eq('status', 'active')
      .in('pack_type', ['hours', 'tasks'])
      .order('purchase_date', { ascending: false }), 'Admin activity packs'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, activity_type, minutes_used, work_date, notify_client, clients(name), packs(name, pack_type)')
      .order('work_date', { ascending: false })
      .limit(12), 'Admin recent activity'),
  ])

  return {
    clients: clients ?? [],
    packs: packs ?? [],
    activities: activities ?? [],
  }
})

export const getAdminServicesPageData = cache(async () => {
  const supabase = await createSupabaseServerClient()

  const [{ data: clients }, { data: services }] = await Promise.all([
    checkedResult(supabase.from('clients').select('id, name, email, status').order('name'), 'Admin service clients'),
    checkedResult(supabase
      .from('services')
      .select('id, name, service_type, price, service_date, status, notes, client_id, pack_id')
      .order('service_date', { ascending: false }), 'Admin services'),
  ])

  const clientMap = new Map((clients ?? []).map((c) => [c.id, c.name]))

  return {
    clients: clients ?? [],
    services: (services ?? []).map((s) => ({ ...s, client_name: clientMap.get(s.client_id) ?? null })),
  }
})

export const getPackDetailData = cache(async (packId: string) => {
  const supabase = await createSupabaseServerClient()

  const [{ data: pack }, { data: activities }, { data: summary }] = await Promise.all([
    checkedResult(supabase
      .from('packs')
      .select('id, name, pack_type, client_id, minutes_total, price, purchase_date, renewal_date, status, notes, clients(id, name, email)')
      .eq('id', packId)
      .maybeSingle(), 'Admin pack detail'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, description, activity_type, minutes_used, work_date, notify_client')
      .eq('pack_id', packId)
      .order('work_date', { ascending: false }), 'Admin pack activities'),
    checkedResult(supabase.from('pack_summary').select('*').eq('pack_id', packId).maybeSingle(), 'Admin pack detail summary'),
  ])

  return { pack, activities: activities ?? [], summary }
})

export const getProjectSubscriptionsData = cache(async (project: string) => {
  const supabase = await createSupabaseServerClient()

  const { data: projectClients } = await checkedResult(supabase
    .from('clients')
    .select('id, name, email, status')
    .eq('project', project)
    .order('name'), 'Project subscription clients')

  const clientIds = (projectClients ?? []).map((c) => c.id)

  const [{ data: packs }, { data: allClients }] = await Promise.all([
    clientIds.length > 0
      ? checkedResult(supabase
          .from('packs')
          .select('id, name, pack_type, client_id, minutes_total, price, invoice_number, billing_cycle, purchase_date, renewal_date, status, paid, notes, clients(name)')
          .in('client_id', clientIds)
          .in('pack_type', ['subscription', 'membership', 'hosting', 'domain', 'service'])
          .order('purchase_date', { ascending: false }), 'Project subscriptions')
      : Promise.resolve({ data: [], error: null }),
    Promise.resolve({ data: projectClients ?? [], error: null }),
  ])

  const active = (packs ?? []).filter((p) => p.status === 'active')
  const unpaid = active.filter((p) => !p.paid)
  const monthlyRevenue = active
    .filter((p) => p.billing_cycle === 'monthly' && p.price)
    .reduce((sum, p) => sum + Number(p.price), 0)

  return {
    clients: allClients,
    packs: packs ?? [],
    stats: { total: active.length, unpaid: unpaid.length, monthlyRevenue },
  }
})

export const getAdminClientDetailPageData = cache(async (clientId: string) => {
  const supabase = await createSupabaseServerClient()

  const [{ data: client }, { data: packs }, { data: recentActivities }, { data: pendingItems }, { data: messages }] = await Promise.all([
    checkedResult(supabase.from('clients').select('id, name, company, email, phone, status, created_at').eq('id', clientId).maybeSingle(), 'Admin portal client detail'),
    checkedResult(supabase
      .from('packs')
      .select('id, name, pack_type, minutes_total, price, invoice_number, purchase_date, renewal_date, billing_cycle, paid, status, notes')
      .eq('client_id', clientId)
      .order('purchase_date', { ascending: false }), 'Admin portal client packs'),
    checkedResult(supabase
      .from('activities')
      .select('id, title, activity_type, minutes_used, work_date, packs(name, pack_type)')
      .eq('client_id', clientId)
      .order('work_date', { ascending: false })
      .limit(10), 'Admin portal client activity'),
    checkedResult(supabase
      .from('pending_items')
      .select('id, title, description, status, requested_at, received_at, reminder_interval_days, next_reminder_at, sort_order')
      .eq('client_id', clientId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true }), 'Admin portal pending items'),
    checkedResult(supabase
      .from('messages')
      .select('id, subject, body, direction, type, read_at, reply_to_id, created_at')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false })
      .limit(12), 'Admin portal messages'),
  ])

  return {
    client,
    packs: packs ?? [],
    activePacks: (packs ?? []).filter((pack) => pack.status === 'active'),
    recentActivities: recentActivities ?? [],
    pendingItems: pendingItems ?? [],
    messages: messages ?? [],
  }
})
