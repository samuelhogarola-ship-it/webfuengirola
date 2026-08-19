import Link from 'next/link'

import { ConnectionIssueCard } from '@/components/admin/connection-issue-card'
import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getAppsUsersOverview } from '@/lib/data/apps-users'
import { getLocale } from '@/lib/locale'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string; app?: string }> }) {
  const identity = await requireAdmin()
  const locale = await getLocale()
  const params = await searchParams
  const appFilter = params.app === 'vokabel-world' ? 'vokabel-world' : undefined
  let data: Awaited<ReturnType<typeof getAppsUsersOverview>> | null = null
  let error: string | null = null

  try {
    data = await getAppsUsersOverview(params.q ?? '', appFilter)
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'No se pudo conectar con Apps Users.'
  }

  return (
    <AdminShell
      title="Usuarios Vokabel"
      description="Usuarios, actividad y pertenencia por app educativa"
      currentPath="/paneladmin/vokabel-world/usuarios"
      userEmail={identity.email}
      locale={locale}
    >
      {error ? (
        <div className="mb-8">
          <ConnectionIssueCard
            message="Configura APPS_USERS_URL y APPS_USERS_SERVICE_KEY para cargar usuarios, membresias y actividad."
            detail={error}
          />
        </div>
      ) : null}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ['Usuarios', data?.stats.total ?? 0],
          ['Confirmados', data?.stats.confirmed ?? 0],
          ['Sin confirmar', data?.stats.unconfirmed ?? 0],
          ['Con actividad', data?.stats.active ?? 0],
          ['Vokabel-World', data?.stats.vokabel ?? 0],
        ].map(([label, value]) => (
          <Card key={String(label)} className="p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{value}</p>
          </Card>
        ))}
      </section>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <nav className="flex gap-2" aria-label="Filtro usuarios apps">
          <Link href="/paneladmin/vokabel-world/usuarios" className={`rounded-lg px-4 py-2 text-sm font-semibold ${appFilter ? 'bg-slate-100 text-slate-700' : 'bg-brand text-white'}`}>
            Todos
          </Link>
          <Link href="/paneladmin/vokabel-world/usuarios?app=vokabel-world" className={`rounded-lg px-4 py-2 text-sm font-semibold ${appFilter ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'}`}>
            Vokabel-World
          </Link>
        </nav>
        <form className="flex gap-2">
          {appFilter ? <input name="app" type="hidden" value={appFilter} /> : null}
          <input
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Buscar usuario o email"
            className="w-64 rounded-lg border border-line bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
          />
          <button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Buscar</button>
        </form>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Usuario</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Apps</th>
                <th className="px-6 py-4">Alta</th>
                <th className="px-6 py-4">Ultimo acceso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(data?.users ?? []).map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{user.name ?? 'Sin nombre'}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={user.email_confirmed_at ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
                      {user.email_confirmed_at ? 'Confirmado' : 'Sin confirmar'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.memberships.length > 0 ? user.memberships.map((membership) => (
                        <span key={`${user.id}-${membership.app}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          {membership.app} · {membership.role} · {membership.status}
                        </span>
                      )) : <span className="text-xs text-muted">Sin app asignada</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.created_at ? formatDate(user.created_at) : '-'}</td>
                  <td className="px-6 py-4 text-slate-500">{user.last_sign_in_at ? formatDate(user.last_sign_in_at) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {(data?.users ?? []).length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted">No hay usuarios para este filtro.</p>
          ) : null}
        </div>
      </Card>
    </AdminShell>
  )
}
