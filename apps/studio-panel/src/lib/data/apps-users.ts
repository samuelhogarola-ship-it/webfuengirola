import { cache } from 'react'

import { createAppsUsersAdminClient } from '@/lib/supabase/server'
import { buildAppsUsersOverview, listAllAuthUsers, unwrapSupabaseResult } from '@/lib/integrations/supabase.mjs'

type AppsUserRecord = {
  id: string
  email: string
  name: string | null
  created_at: string | null
  last_sign_in_at: string | null
  email_confirmed_at: string | null
  memberships: Array<{
    app: string
    role: string
    status: string
  }>
}

export const getAppsUsersOverview = cache(async (search = '', appKey?: string) => {
  const db = createAppsUsersAdminClient()

  const [authUsers, profilesResult, membershipsResult] = await Promise.all([
    listAllAuthUsers(
      ({ page, perPage }) => db.auth.admin.listUsers({ page, perPage }),
      { context: 'Apps Users Auth' },
    ),
    db.from('profiles').select('id, email, full_name, created_at').order('created_at', { ascending: false }),
    db.from('app_memberships').select('user_id, app, role, status'),
  ])

  const profiles = unwrapSupabaseResult(profilesResult, 'Apps Users profiles') ?? []
  const memberships = unwrapSupabaseResult(membershipsResult, 'Apps Users memberships') ?? []

  return buildAppsUsersOverview({ authUsers, profiles, memberships, search, appKey }) as {
    users: AppsUserRecord[]
    stats: { total: number; confirmed: number; unconfirmed: number; active: number; apps: number; vokabel: number }
  }
})
