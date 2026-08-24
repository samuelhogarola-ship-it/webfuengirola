import Link from 'next/link'

import { AdminShell } from '@/components/layout/app-shell'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getAdminClientsPageData, getProjectSubscriptionsData } from '@/lib/data/admin'
import { getLocale } from '@/lib/locale'

export const dynamic = 'force-dynamic'

const PROJECT = 'vivir-fuengirola'

export default async function Page() {
  const identity = await requireAdmin()
  const locale = await getLocale()
  const [clientsData, subscriptionsData] = await Promise.all([
    getAdminClientsPageData('', undefined, '', PROJECT),
    getProjectSubscriptionsData(PROJECT),
  ])
  const activeClients = clientsData.clients.filter((client) => client.status === 'active').length

  return (
    <AdminShell
      title="Vivir en Fuengirola"
      description="Panel operativo de clientes, suscripciones y cobros"
      currentPath="/paneladmin/vivir-en-fuengirola"
      userEmail={identity.email}
      locale={locale}
    >
      <section className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="p-5">
          <p className="text-sm text-muted">Clientes activos</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{activeClients}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Altas pendientes</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{clientsData.pendingClients.length}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Suscripciones activas</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{subscriptionsData.stats.total}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-muted">Cobros pendientes</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-foreground">{subscriptionsData.stats.unpaid}</p>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Clientes', '/paneladmin/vivir-en-fuengirola/clientes', 'Altas, aprobacion, edicion y acceso al detalle de cada cliente.'],
          ['Suscripciones', '/paneladmin/vivir-en-fuengirola/suscripciones', 'Crear planes, editar renovaciones y controlar pagos recurrentes.'],
          ['Nuevo cliente', '/paneladmin/vivir-en-fuengirola/clientes?new=1', 'Alta manual desde el panel cuando el cliente no se registra solo.'],
        ].map(([title, href, description]) => (
          <Link key={href} href={href} className="block rounded-lg border border-line bg-card p-5 transition hover:border-brand">
            <p className="text-lg font-bold text-foreground">{title}</p>
            <p className="mt-2 text-sm text-muted">{description}</p>
          </Link>
        ))}
      </section>
    </AdminShell>
  )
}
