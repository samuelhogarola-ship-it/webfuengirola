import { ConnectionIssueCard } from '@/components/admin/connection-issue-card'
import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getAlumnosData } from '@/lib/data/samuel-coach'
import { getLocale } from '@/lib/locale'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const BASE = '/paneladmin/samuel-coach/alumnos'

const APP_LABELS: Record<string, string> = {
  samuel_coach: 'Samuel Coach',
  pruefungsvorbereitung: 'Prüfungsvorbereitung',
  prufungsvorbereitung: 'Prüfungsvorbereitung',
  vokabel_lab: 'Vokabel-Lab',
  vokabellab: 'VokabelLab',
  imkontext: 'imKontext',
  derdiedas: 'Der Die Das',
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const identity = await requireAdmin()
  const params = await searchParams
  const locale = await getLocale()
  let data: Awaited<ReturnType<typeof getAlumnosData>> | null = null
  let error: string | null = null

  try {
    data = await getAlumnosData(params.q ?? '')
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'No se pudo conectar con Apps Users.'
  }

  return (
    <AdminShell
      title="Alumnos"
      description="Usuarios registrados en Samuel Coach de Alemán"
      currentPath="/paneladmin/samuel-coach/alumnos"
      userEmail={identity.email}
      locale={locale}
    >
      {error ? (
        <div className="mb-8">
          <ConnectionIssueCard
            message="Configura APPS_USERS_URL y APPS_USERS_SERVICE_KEY para cargar alumnos, membresias y codigos premium."
            detail={error}
          />
        </div>
      ) : null}
      <section className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="p-5">
          <p className="text-sm text-muted">Total alumnos</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.total ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Activos / premium</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.active ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Email confirmado</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.confirmed ?? 0}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Con código premium</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data?.premium ?? 0}</p>
        </Card>
      </section>

      <div className="mb-6">
        <form action={BASE}>
          <input
            type="search"
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Buscar por nombre o email…"
            className="h-8 rounded-full border border-line bg-white px-3 text-xs text-foreground outline-none focus:border-brand"
          />
        </form>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Alumno</th>
                <th className="px-6 py-4">Idioma</th>
                <th className="px-6 py-4">Acceso</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Último acceso</th>
                <th className="px-6 py-4">Alta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(data?.alumnos ?? []).map((alumno) => {
                const activePremiumCodes = alumno.premiumCodes.filter((code) => code.status === 'active' && !code.redeemed_at)
                const usedPremiumCodes = alumno.premiumCodes.filter((code) => code.redeemed_at)
                const isConfirmed = !!alumno.confirmed_at
                const membershipApps = new Set(alumno.memberships.map((membership) => membership.app))
                const metadataRoles = Object.entries(alumno.appRoles).filter(([app]) => !membershipApps.has(app))

                return (
                  <tr key={alumno.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{alumno.full_name || '—'}</p>
                      <p className="text-xs text-slate-400">{alumno.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 uppercase text-xs">{alumno.locale || '—'}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {alumno.memberships.map((m, i) => (
                          <Badge
                            key={`${m.app}-${i}`}
                            className={m.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}
                          >
                            {APP_LABELS[m.app] ?? m.app}
                          </Badge>
                        ))}
                        {activePremiumCodes.length > 0 && (
                          <Badge className="bg-emerald-50 text-emerald-700">
                            Prüfung premium activo
                          </Badge>
                        )}
                        {usedPremiumCodes.length > 0 && activePremiumCodes.length === 0 && (
                          <Badge className="bg-slate-100 text-slate-600">
                            Prüfung premium usado
                          </Badge>
                        )}
                        {metadataRoles.map(([app, role]) => (
                          <Badge
                            key={`${app}-${role}`}
                            className={role === 'admin' ? 'bg-slate-900 text-white' : 'bg-blue-50 text-blue-700'}
                          >
                            {APP_LABELS[app] ?? app}: {role === 'admin' ? 'admin' : 'usuario'}
                          </Badge>
                        ))}
                        {alumno.memberships.length === 0 && alumno.premiumCodes.length === 0 && metadataRoles.length === 0 && (
                          <span className="text-xs text-muted">Sin membresía</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={isConfirmed ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
                        {isConfirmed ? 'Confirmado' : 'Pendiente'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {alumno.last_sign_in_at ? formatDate(alumno.last_sign_in_at) : '—'}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(alumno.created_at)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {(data?.alumnos ?? []).length === 0 && (
            <p className="px-6 py-10 text-sm text-muted">
              {params.q ? 'No hay resultados para esta búsqueda.' : 'Todavía no hay alumnos registrados.'}
            </p>
          )}
        </div>
      </Card>
    </AdminShell>
  )
}
