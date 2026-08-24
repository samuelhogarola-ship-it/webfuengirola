import { cache } from 'react'

import { createTodoPlasticoAdminClient } from '@/lib/supabase/server'
import { getPaginationRange, unwrapSupabaseResult } from '@/lib/integrations/supabase.mjs'

const PAGE_SIZE = 50

export type TodoPlasticoCompany = {
  id: string
  name: string
  slug: string
  location: string | null
  status: string
  plan: string
  is_verified: boolean
  created_at: string
}

export type TodoPlasticoListing = {
  id: number
  title: string
  category: string
  status: string
  location: string | null
  created_at: string
  company: { name: string; slug: string } | null
}

export async function getTodoPlasticoData({ q = '', view = 'empresas', status = 'all', page = 1 }: { q?: string; view?: string; status?: string; page?: number }) {
  const db = createTodoPlasticoAdminClient()
  const safePage = Math.max(1, page)

  const selectedCountQuery = view === 'empresas'
    ? (() => {
        let query = db.from('mkt_companies').select('id', { count: 'exact', head: true })
        if (q) query = query.or(`name.ilike.%${q}%,location.ilike.%${q}%`)
        if (status !== 'all') query = query.eq('status', status)
        return query
      })()
    : (() => {
        let query = db.from('mkt_listings').select('id', { count: 'exact', head: true })
        if (q) query = query.ilike('title', `%${q}%`)
        if (status !== 'all') query = query.eq('status', status)
        return query
      })()

  const [companyStats, listingStats, userStats, selectedCountResult] = await Promise.all([
    Promise.all([
      db.from('mkt_companies').select('id', { count: 'exact', head: true }),
      db.from('mkt_companies').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      db.from('mkt_companies').select('id', { count: 'exact', head: true }).eq('is_verified', true),
    ]),
    Promise.all([
      db.from('mkt_listings').select('id', { count: 'exact', head: true }),
      db.from('mkt_listings').select('id', { count: 'exact', head: true }).eq('status', 'pending_review'),
      db.from('mkt_listings').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    ]),
    db.auth.admin.listUsers({ page: 1, perPage: 1 }),
    selectedCountQuery,
  ])

  const [totalCompanies, activeCompanies, verifiedCompanies] = companyStats
  const [totalListings, pendingListings, publishedListings] = listingStats
  unwrapSupabaseResult(totalCompanies, 'TodoPlastico company count')
  unwrapSupabaseResult(activeCompanies, 'TodoPlastico active company count')
  unwrapSupabaseResult(verifiedCompanies, 'TodoPlastico verified company count')
  unwrapSupabaseResult(totalListings, 'TodoPlastico listing count')
  unwrapSupabaseResult(pendingListings, 'TodoPlastico pending listing count')
  unwrapSupabaseResult(publishedListings, 'TodoPlastico published listing count')
  const usersData = unwrapSupabaseResult<{ total?: number } | null>(
    userStats as unknown as {
      data: { total?: number } | null
      error: { message: string } | null
    },
    'TodoPlastico users',
  )
  unwrapSupabaseResult(selectedCountResult, 'TodoPlastico selected row count')
  const totalRows = selectedCountResult.count ?? 0
  const { page: resolvedPage, from, to } = getPaginationRange({ page: safePage, totalRows, pageSize: PAGE_SIZE })

  let companies: TodoPlasticoCompany[] = []
  let listings: TodoPlasticoListing[] = []
  if (view === 'empresas') {
    let query = db
      .from('mkt_companies')
      .select('id, name, slug, location, status, plan, is_verified, created_at')
      .order('created_at', { ascending: false })
      .range(from, to)
    if (q) query = query.or(`name.ilike.%${q}%,location.ilike.%${q}%`)
    if (status !== 'all') query = query.eq('status', status)
    companies = (unwrapSupabaseResult(await query, 'TodoPlastico companies') ?? []) as TodoPlasticoCompany[]
  } else {
    let query = db
      .from('mkt_listings')
      .select('id, title, category, status, location, created_at, company:mkt_companies(name, slug)')
      .order('created_at', { ascending: false })
      .range(from, to)
    if (q) query = query.ilike('title', `%${q}%`)
    if (status !== 'all') query = query.eq('status', status)
    const rows = unwrapSupabaseResult(await query, 'TodoPlastico listings') ?? []
    listings = rows.map((listing) => ({ ...listing, company: Array.isArray(listing.company) ? listing.company[0] : listing.company })) as TodoPlasticoListing[]
  }

  return {
    stats: {
      companies: totalCompanies.count ?? 0,
      activeCompanies: activeCompanies.count ?? 0,
      verifiedCompanies: verifiedCompanies.count ?? 0,
      listings: totalListings.count ?? 0,
      pendingListings: pendingListings.count ?? 0,
      publishedListings: publishedListings.count ?? 0,
      users: usersData?.total ?? 0,
    },
    companies,
    listings,
    totalRows,
    page: resolvedPage,
    pageSize: PAGE_SIZE,
  }
}

export const getCachedTodoPlasticoData = cache(getTodoPlasticoData)
