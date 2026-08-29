import Link from 'next/link'
import { Suspense } from 'react'

import { AnalyticsSkeleton } from '@/components/admin/analytics-skeleton'
import { PanelAnalyticsSection } from '@/components/admin/panel-analytics-section'
import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getAdminDashboardData } from '@/lib/data/admin'
import { getLocale } from '@/lib/locale'
import { t } from '@/lib/i18n'
import { formatDate, formatDuration } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const identity = await requireAdmin()
  const data = await getAdminDashboardData()
  const locale = await getLocale()

  return (
    <AdminShell
      title={t(locale, 'dashboard.title')}
      description={t(locale, 'dashboard.description')}
      currentPath="/paneladmin/dashboard"
      userEmail={identity.email}
      locale={locale}
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: t(locale, 'dashboard.stat.activeClients'), value: data.activeClients.toString(), href: '/paneladmin/clientes' },
          { label: t(locale, 'dashboard.stat.pendingTime'), value: formatDuration(data.pendingMinutes), href: '/paneladmin/bonos' },
          { label: t(locale, 'dashboard.stat.activePacks'), value: data.activePacks.toString(), href: '/paneladmin/bonos' },
          { label: t(locale, 'dashboard.stat.monthActivities'), value: data.monthActivities.toString(), href: '/paneladmin/actividades' },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <Card className="p-6 transition hover:shadow-md hover:border-brand/30 cursor-pointer">
              <p className="text-sm text-muted">{item.label}</p>
              <p className="mt-4 text-3xl font-black tracking-tight text-foreground">{item.value}</p>
            </Card>
          </Link>
        ))}
      </section>

      <Suspense fallback={<AnalyticsSkeleton />}>
        <PanelAnalyticsSection panelKey="wf-studio" />
      </Suspense>

      <section className="mt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">{t(locale, 'dashboard.panels.title')}</h2>
            <p className="text-sm text-muted">{t(locale, 'dashboard.panels.description')}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/paneladmin/todoplastico">
            <Card className="p-6 transition hover:shadow-md hover:border-brand/30 cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">{t(locale, 'dashboard.panels.marketplace')}</p>
                  <h3 className="mt-2 text-xl font-black tracking-tight text-foreground">TodoPlástico</h3>
                  <p className="mt-2 text-sm text-muted">{t(locale, 'dashboard.panels.todoPlastico.description')}</p>
                </div>
                <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">{t(locale, 'dashboard.panels.enter')}</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-foreground">{t(locale, 'dashboard.recent.title')}</h2>
              <p className="text-sm text-muted">{t(locale, 'dashboard.recent.description')}</p>
            </div>
            <Badge>{t(locale, 'dashboard.recent.badge')}</Badge>
          </div>
          <div className="divide-y divide-line">
            {data.recentActivities.map((activity) => (
              <div key={activity.id} className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <Link href={`/paneladmin/actividades?highlight=${activity.id}`} className="font-semibold text-foreground hover:text-brand hover:underline">
                    {activity.title}
                  </Link>
                  <p className="text-sm text-muted">
                    {activity.clients && !Array.isArray(activity.clients) && activity.clients.name ? (
                      <Link href={`/paneladmin/clientes/${(activity.clients as { id: string; name: string }).id}`} className="hover:text-foreground hover:underline transition-colors">
                        {(activity.clients as { id: string; name: string }).name}
                      </Link>
                    ) : (t(locale, 'dashboard.recent.client'))}
                    {' · '}
                    {activity.packs?.name ?? t(locale, 'dashboard.recent.pack')}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-semibold text-foreground">{formatDuration(activity.minutes_used)}</p>
                  <p className="text-sm text-muted">{formatDate(activity.work_date)}</p>
                </div>
              </div>
            ))}
            {data.recentActivities.length === 0 ? <p className="px-6 py-8 text-sm text-muted">{t(locale, 'dashboard.recent.empty')}</p> : null}
          </div>
        </Card>
      </section>
    </AdminShell>
  )
}
