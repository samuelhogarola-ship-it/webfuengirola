import Link from 'next/link'

import { ConnectionIssueCard } from '@/components/admin/connection-issue-card'
import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { approveTrainerAction, rejectTrainerAction } from '@/lib/actions/superentrenador'
import { getSuperEntrenadorPTData, getSuperEntrenadorUsuariosData } from '@/lib/data/superentrenador'
import { getLocale } from '@/lib/locale'

export const dynamic = 'force-dynamic'

const MARKETPLACE_URL = process.env.NEXT_PUBLIC_SUPERENTRENADOR_URL ?? 'https://superentrenador.com'
const COACH_STUDIO_URL = process.env.NEXT_PUBLIC_COACH_STUDIO_URL ?? 'https://coach.superentrenador.com'

const ACCESS_CARDS = [
  {
    eyebrow: 'ADMIN',
    title: 'Admin panel',
    text: 'Revisar entrenadores, aprobar perfiles y controlar el marketplace.',
    href: `${MARKETPLACE_URL}/admin/entrenadores`,
    cta: 'Abrir admin',
    className: 'bg-slate-950 text-white',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    eyebrow: 'ENTRENADOR',
    title: 'Panel entrenador',
    text: 'Entrar como profesional para gestionar clientes, rutinas y seguimiento.',
    href: `${COACH_STUDIO_URL}/app/pt`,
    cta: 'Abrir entrenador',
    className: 'bg-emerald-600 text-white',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
  {
    eyebrow: 'ALUMNO',
    title: 'Panel alumno',
    text: 'Ver la experiencia del cliente: entrenamientos, tareas y progreso.',
    href: `${COACH_STUDIO_URL}/app/client`,
    cta: 'Abrir alumno',
    className: 'bg-amber-500 text-slate-950',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
]

function statusLabel(status: string | null, isPublished: boolean) {
  if (status === 'approved' && isPublished) return 'Publicado'
  if (status === 'pending') return 'Pendiente'
  if (status === 'rejected') return 'Rechazado'
  return status ?? 'Sin revisar'
}

function statusClass(status: string | null, isPublished: boolean) {
  if (status === 'approved' && isPublished) return 'bg-emerald-50 text-emerald-700'
  if (status === 'pending') return 'bg-amber-50 text-amber-700'
  if (status === 'rejected') return 'bg-rose-50 text-rose-700'
  return 'bg-slate-100 text-slate-600'
}

export default async function Page() {
  const identity = await requireAdmin()
  const locale = await getLocale()
  let trainersData: Awaited<ReturnType<typeof getSuperEntrenadorPTData>> = { trainers: [], stats: { total: 0, pending: 0, published: 0, rejected: 0 } }
  let usersData: Awaited<ReturnType<typeof getSuperEntrenadorUsuariosData>> = { users: [], stats: { total: 0, confirmed: 0, unconfirmed: 0 } }
  let error: string | null = null

  try {
    const [trainers, users] = await Promise.all([
      getSuperEntrenadorPTData(''),
      getSuperEntrenadorUsuariosData(''),
    ])
    trainersData = trainers
    usersData = users
  } catch (cause) {
    error = cause instanceof Error ? cause.message : 'No se pudo conectar con Superentrenador.'
  }

  return (
    <AdminShell
      title="Superentrenador"
      description="Accesos rápidos a los paneles reales de la plataforma"
      currentPath="/paneladmin/superentrenador/pt"
      userEmail={identity.email}
      locale={locale}
    >
      {error ? (
        <div className="mb-8">
          <ConnectionIssueCard
            message="Configura SUPERENTRENADOR_URL y SUPERENTRENADOR_SERVICE_KEY para cargar entrenadores y usuarios."
            detail={error}
          />
        </div>
      ) : null}
      <section className="mb-8 overflow-hidden rounded-3xl border border-line bg-slate-950 px-6 py-8 text-white shadow-sm sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Superentrenador</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">
              Elige el panel que quieres abrir.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Acceso directo a la operación real de la plataforma: administración, entrenador y alumno.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div>
              <p className="text-2xl font-black">{trainersData.stats.total}</p>
              <p className="text-xs text-slate-400">entrenadores</p>
            </div>
            <div>
              <p className="text-2xl font-black">{trainersData.stats.pending}</p>
              <p className="text-xs text-slate-400">pendientes</p>
            </div>
            <div>
              <p className="text-2xl font-black">{usersData.stats.total}</p>
              <p className="text-xs text-slate-400">usuarios</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {ACCESS_CARDS.map((card) => (
          <a
            key={card.title}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex min-h-[300px] flex-col justify-between rounded-3xl p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl ${card.className}`}
          >
            <div>
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">
                  {card.eyebrow}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  {card.icon}
                </span>
              </div>
              <h2 className="text-3xl font-black tracking-tight">{card.title}</h2>
              <p className="mt-4 text-sm leading-6 opacity-80">{card.text}</p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-black">
              {card.cta}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </a>
        ))}
      </section>

      <Card className="mt-8 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Gestión interna</p>
            <p className="mt-1 text-sm text-muted">
              Si necesitas revisar usuarios registrados en Supabase, entra en el listado interno.
            </p>
          </div>
          <Link
            href="/paneladmin/superentrenador/usuarios"
            className="rounded-xl border border-line px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Ver usuarios internos
          </Link>
        </div>
      </Card>

      <section className="mt-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">Moderación de entrenadores</h2>
            <p className="text-sm text-muted">Perfiles leídos desde Superentrenador y aprobados desde WF Studio.</p>
          </div>
          <Link
            href="/paneladmin/superentrenador/pt"
            className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Actualizar
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Entrenador</th>
                  <th className="px-6 py-4">Ciudad</th>
                  <th className="px-6 py-4">Precio</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {trainersData.trainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{trainer.display_name}</p>
                      <p className="text-xs text-muted">{trainer.headline ?? trainer.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{trainer.city_slug ?? '-'}</td>
                    <td className="px-6 py-4 text-slate-600">{trainer.price_from ? `${trainer.price_from} EUR` : '-'}</td>
                    <td className="px-6 py-4">
                      <Badge className={statusClass(trainer.review_status, trainer.is_published)}>
                        {statusLabel(trainer.review_status, trainer.is_published)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {trainer.review_status !== 'approved' || !trainer.is_published ? (
                          <form action={approveTrainerAction}>
                            <input type="hidden" name="id" value={trainer.id} />
                            <button className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100">
                              Aprobar
                            </button>
                          </form>
                        ) : null}
                        {trainer.review_status !== 'rejected' ? (
                          <form action={rejectTrainerAction}>
                            <input type="hidden" name="id" value={trainer.id} />
                            <button className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100">
                              Rechazar
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {trainersData.trainers.length === 0 ? (
              <p className="px-6 py-10 text-sm text-muted">No hay entrenadores registrados o falta configurar la conexión.</p>
            ) : null}
          </div>
        </Card>
      </section>

      <Card className="mt-8 border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-950">Umami pendiente en el proyecto Superentrenador</p>
        <p className="mt-1 text-sm text-amber-900">
          Instrucción para el repo externo: añadir el script de Umami al layout público, marketplace, panel entrenador y panel alumno; configurar el website id de Superentrenador y verificar visitas por ruta. No se toca ese código desde WF.
        </p>
      </Card>
    </AdminShell>
  )
}
