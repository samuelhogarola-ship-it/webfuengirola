declare module '@/lib/integrations/supabase.mjs' {
  type SupabaseError = { message: string } | null

  export function unwrapSupabaseResult<T>(
    result: { data: T; error: SupabaseError },
    context: string,
  ): T

  export function listAllAuthUsers<T>(
    listPage: (options: { page: number; perPage: number }) => Promise<{
      data: { users: T[] } | null
      error: SupabaseError
    }>,
    options?: { perPage?: number; context?: string },
  ): Promise<T[]>

  type AuthUser = {
    id: string
    email?: string | null
    created_at?: string | null
    last_sign_in_at?: string | null
    email_confirmed_at?: string | null
  }

  type Profile = {
    id: string
    email?: string | null
    full_name?: string | null
    created_at?: string | null
  }

  type Membership = {
    user_id: string
    app: string
    role: string
    status: string
  }

  export function buildAppsUsersOverview(options: {
    authUsers: AuthUser[]
    profiles: Profile[]
    memberships: Membership[]
    search?: string
    appKey?: string
    now?: string
  }): {
    users: Array<{
      id: string
      email: string
      name: string | null
      created_at: string | null
      last_sign_in_at: string | null
      email_confirmed_at: string | null
      memberships: Array<{ app: string; role: string; status: string }>
    }>
    stats: {
      total: number
      confirmed: number
      unconfirmed: number
      active: number
      apps: number
      vokabel: number
    }
  }
}
