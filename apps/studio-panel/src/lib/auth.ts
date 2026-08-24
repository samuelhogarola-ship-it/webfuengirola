import { redirect } from 'next/navigation'

import { getSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'

type AuthIdentity = {
  userId: string
  email: string
  role: string
}

const CLIENT_PROJECT = 'wf-studio'

async function getProfileIdentity() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError?.message.includes('Auth session missing')) return null
  if (userError) throw new Error(`No se pudo validar la sesión: ${userError.message}`)

  if (!user?.email) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError) throw new Error(`No se pudo consultar el perfil: ${profileError.message}`)

  if (!profile) {
    return {
      userId: user.id,
      email: user.email,
      role: 'client' as const,
    }
  }

  return {
    userId: profile.id,
    email: profile.email ?? user.email,
    role: profile.role,
  }
}

export async function requireAdmin() {
  const identity = await getProfileIdentity()

  if (!identity) {
    redirect('/paneladmin')
  }

  if (identity.role !== 'admin') {
    redirect('/paneladmin')
  }

  return identity
}

export async function requireClientAccess() {
  const identity = await getProfileIdentity()

  if (!identity) {
    console.warn('[auth/client] missing identity')
    redirect('/cliente')
  }

  if (identity.role !== 'client') {
    console.warn('[auth/client] non-client role blocked', {
      userId: identity.userId,
      role: identity.role,
    })
    redirect('/paneladmin/inicio')
  }

  const adminClient = getSupabaseAdminClient()
  const { data: client, error: clientError } = await adminClient
    .from('clients')
    .select('id, email, status, name')
    .eq('project', CLIENT_PROJECT)
    .eq('auth_user_id', identity.userId)
    .maybeSingle()

  if (clientError) throw new Error(`No se pudo comprobar el acceso del cliente: ${clientError.message}`)

  if (!client || client.status !== 'active') {
    console.warn('[auth/client] access denied', {
      project: CLIENT_PROJECT,
      foundClient: Boolean(client),
      status: client?.status ?? null,
    })
    redirect('/cliente?error=inactive')
  }

  return {
    ...identity,
    client,
  }
}

export async function getOptionalIdentity(): Promise<AuthIdentity | null> {
  return getProfileIdentity()
}
