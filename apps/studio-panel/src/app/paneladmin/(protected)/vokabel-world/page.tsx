import Link from 'next/link'

import { ConnectionIssueCard } from '@/components/admin/connection-issue-card'
import { AdminShell } from '@/components/layout/app-shell'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getAppsUsersOverview } from '@/lib/data/apps-users'
import { getLocale } from '@/lib/locale'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const identity = await requireAdmin()
  const locale = await getLocale()
  let data: Awaited<ReturnType<typeof getAppsUsersOverview>> | null = null
  let error: string | null = null

  try {
    data = await getAppsUsersOverview('', 'vokabel-world')
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'No se pudo conectar con Apps Users.'
  }

  return (
    <AdminShell
      title="Vokabel-World"
      description="Panel de usuarios y estadisticas de apps educativas"
      currentPath="/paneladmin/vokabel-world"
      userEmail={identity.email}
      locale={locale}
    >
      {error ? (
        <div className="mb-8">
          <ConnectionIssueCard
            message="Configura APPS_USERS_URL y APPS_USERS_SERVICE_KEY para cargar usuarios y estadisticas de Vokabel."
            detail={error}
          />
        </div>
      ) : null}
      <section className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-muted">Usuarios Vokabel</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.stats.vokabel ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Confirmados</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.stats.confirmed ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Con actividad</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.stats.active ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Apps conectadas</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.stats.apps ?? 0}</p>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link href="/paneladmin/vokabel-world/usuarios" className="block rounded-lg border border-line bg-card p-5 transition hover:border-brand">
          <p className="text-lg font-bold text-foreground">Usuarios y estadisticas</p>
          <p className="mt-2 text-sm text-muted">Buscar alumnos, revisar confirmacion de email, ultimos accesos y pertenencia a apps.</p>
        </Link>
        <Link href="/paneladmin/samuel-coach/premium" className="block rounded-lg border border-line bg-card p-5 transition hover:border-brand">
          <p className="text-lg font-bold text-foreground">Codigos premium</p>
          <p className="mt-2 text-sm text-muted">Gestion compartida de premium para el ecosistema educativo.</p>
        </Link>
      </section>
    </AdminShell>
  )
}
