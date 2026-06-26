import { notFound } from 'next/navigation'

import { requireAdmin } from '@/lib/auth'
import { getClientDetailPageData } from '@/lib/data/admin'
import { PrintButton } from '@/components/ui/print-button'
import { formatDate, formatDuration } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const PACK_TYPE_LABEL: Record<string, string> = {
  hours: 'Bonos de horas',
  tasks: 'Packs de tareas',
  domain: 'Dominios',
  hosting: 'Hosting',
  service: 'Servicios',
}

const PACK_TYPE_ORDER = ['hours', 'tasks', 'domain', 'hosting', 'service'] as const

export default async function ClientServiciosReportPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const data = await getClientDetailPageData(id)

  if (!data.client) notFound()

  const { client, packs, packSummaries } = data
  const summaryMap = new Map(packSummaries.map((s) => [s.pack_id, s]))
  const activePacks = packs.filter((p) => p.status === 'active')
  const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
        body { font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #f8f8f8; margin: 0; color: #0a0a0a; -webkit-font-smoothing: antialiased; }
        * { box-sizing: border-box; }
      `}</style>

      <div className="no-print" style={{ padding: '16px', textAlign: 'center', background: '#f8f8f8', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <PrintButton />
        <a href={`/paneladmin/clientes/${id}`} style={{ background: '#f3f3f3', color: '#0a0a0a', border: 'none', borderRadius: '999px', padding: '10px 24px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', display: 'inline-block' }}>
          ← Volver
        </a>
      </div>

      <div style={{ maxWidth: '720px', margin: '40px auto', background: '#fff', borderRadius: '16px', padding: '48px', boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', margin: '0 0 8px' }}>WF-Studio</p>
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Servicios contratados</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>{client.name}</p>
            <p style={{ fontSize: '14px', color: '#767676', margin: 0 }}>{today}</p>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', marginBottom: '32px' }} />

        {PACK_TYPE_ORDER.map((type) => {
          const items = activePacks.filter((p) => p.pack_type === type)
          if (items.length === 0) return null
          return (
            <div key={type} style={{ marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', margin: '0 0 12px' }}>
                {PACK_TYPE_LABEL[type]}
              </p>
              <div style={{ display: 'grid', gap: '10px' }}>
                {items.map((pack) => {
                  const summary = summaryMap.get(pack.id)
                  const isExpiring = pack.renewal_date && new Date(pack.renewal_date) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  return (
                    <div key={pack.id} style={{ background: '#f8f8f8', borderRadius: '12px', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: '15px', margin: '0 0 4px' }}>{pack.name}</p>
                          <p style={{ fontSize: '13px', color: '#767676', margin: 0 }}>
                            Contratado: {formatDate(pack.purchase_date)}
                          </p>
                          {pack.renewal_date && (
                            <p style={{ fontSize: '13px', margin: '2px 0 0', color: isExpiring ? '#b45309' : '#767676', fontWeight: isExpiring ? 700 : 400 }}>
                              {(type === 'domain' || type === 'hosting') ? 'Caduca' : 'Renueva'}: {formatDate(pack.renewal_date)}
                              {isExpiring ? ' ⚠ Próxima caducidad' : ''}
                            </p>
                          )}
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '16px' }}>
                          {type === 'hours' && summary && (
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#0f766e', margin: '0 0 2px' }}>
                              {formatDuration(summary.remaining_minutes ?? 0)} restantes
                            </p>
                          )}
                          {type === 'hours' && pack.minutes_total > 0 && (
                            <p style={{ fontSize: '12px', color: '#767676', margin: 0 }}>
                              Total: {formatDuration(pack.minutes_total)}
                            </p>
                          )}
                          {pack.price && (
                            <p style={{ fontSize: '13px', color: '#767676', margin: type === 'hours' ? '2px 0 0' : 0 }}>
                              {pack.price.toFixed(2)} €
                            </p>
                          )}
                        </div>
                      </div>
                      {pack.notes && (
                        <p style={{ fontSize: '13px', color: '#767676', marginTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px' }}>
                          {pack.notes}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {activePacks.length === 0 && (
          <p style={{ fontSize: '14px', color: '#767676' }}>Sin servicios activos.</p>
        )}

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#767676', margin: 0 }}>WF-Studio · webfuengirola.com</p>
        </div>
      </div>
    </>
  )
}
