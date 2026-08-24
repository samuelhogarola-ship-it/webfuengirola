import Link from 'next/link'

import { PackForm } from '@/components/admin/pack-form'
import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { togglePackPaidAction, togglePackStatusAction } from '@/lib/actions/admin'
import { requireAdmin } from '@/lib/auth'
import { getProjectSubscriptionsData } from '@/lib/data/admin'
import { getLocale } from '@/lib/locale'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const PROJECT = 'conoce-fuengirola'
const BASE_PATH = '/paneladmin/conoce-fuengirola/suscripciones'

const TYPE_LABELS: Record<string, string> = {
  subscription: 'Suscripcion',
  membership: 'Membresia',
  hosting: 'Hosting',
  domain: 'Dominio',
  service: 'Servicio',
}

const CYCLE_LABELS: Record<string, string> = {
  monthly: 'Mensual',
  one_time: 'Unico',
}

export default async function Page({ searchParams }: { searchParams: Promise<{ new?: string; edit?: string }> }) {
  const identity = await requireAdmin()
  const locale = await getLocale()
  const params = await searchParams
  const data = await getProjectSubscriptionsData(PROJECT)
  const editingPack = params.edit ? data.packs.find((pack) => pack.id === params.edit) ?? null : null
  const showForm = params.new === '1' || Boolean(editingPack)

  return (
    <AdminShell
      title="Suscripciones Conoce"
      description="Alta, renovacion, cobro y estado de suscripciones"
      currentPath={BASE_PATH}
      userEmail={identity.email}
      locale={locale}
    >
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Conoce Fuengirola</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">Gestion de suscripciones</h1>
        </div>
        <Link href={`${BASE_PATH}?new=1`} className="inline-flex min-h-11 items-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-blue-700">
          Nueva suscripcion
        </Link>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm text-muted">Suscripciones activas</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data.stats.total}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Pendientes de cobro</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{data.stats.unpaid}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Ingresos mensuales</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">
            {data.stats.monthlyRevenue > 0 ? `${data.stats.monthlyRevenue.toFixed(2)} EUR` : '-'}
          </p>
        </Card>
      </section>

      {showForm ? (
        <div className="mb-8">
          <PackForm clients={data.clients ?? []} editingPack={editingPack} locale={locale} defaultPackType="subscription" returnPath={BASE_PATH} />
        </div>
      ) : null}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Suscripcion</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Ciclo</th>
                <th className="px-6 py-4">Renovacion</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.packs.map((pack) => (
                <tr key={pack.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-foreground">{pack.name}</td>
                  <td className="px-6 py-4 text-slate-500">{(pack.clients as { name: string } | null)?.name ?? '-'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {TYPE_LABELS[pack.pack_type] ?? pack.pack_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground">{pack.price !== null ? `${pack.price} EUR` : '-'}</td>
                  <td className="px-6 py-4 text-slate-500">{CYCLE_LABELS[pack.billing_cycle] ?? pack.billing_cycle}</td>
                  <td className="px-6 py-4 text-slate-500">{pack.renewal_date ? formatDate(pack.renewal_date) : formatDate(pack.purchase_date)}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className={pack.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}>
                        {pack.status === 'active' ? 'Activa' : 'Cerrada'}
                      </Badge>
                      <Badge className={pack.paid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
                        {pack.paid ? 'Pagado' : 'Pendiente'}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-3">
                      <Link href={`${BASE_PATH}?edit=${pack.id}`} className="text-xs font-semibold text-brand">Editar</Link>
                      <form action={togglePackPaidAction}>
                        <input type="hidden" name="pack_id" value={pack.id} />
                        <input type="hidden" name="client_id" value={pack.client_id} />
                        <input type="hidden" name="paid" value={String(pack.paid)} />
                        <button className="text-xs font-semibold text-slate-700">{pack.paid ? 'Pendiente' : 'Pagado'}</button>
                      </form>
                      <form action={togglePackStatusAction}>
                        <input type="hidden" name="pack_id" value={pack.id} />
                        <input type="hidden" name="client_id" value={pack.client_id} />
                        <input type="hidden" name="status" value={pack.status} />
                        <button className="text-xs font-semibold text-slate-700">{pack.status === 'active' ? 'Cerrar' : 'Activar'}</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.packs.length === 0 ? (
            <p className="px-6 py-10 text-sm text-muted">No hay suscripciones todavia. Usa el boton de nueva suscripcion.</p>
          ) : null}
        </div>
      </Card>
    </AdminShell>
  )
}
