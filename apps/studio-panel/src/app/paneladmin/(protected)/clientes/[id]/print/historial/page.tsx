import { notFound } from 'next/navigation'

import { requireAdmin } from '@/lib/auth'
import { getClientDetailPageData, getClientFullHistory } from '@/lib/data/admin'
import { PrintButton } from '@/components/ui/print-button'
import { formatDate, formatDuration } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function ClientHistorialReportPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const [data, activities] = await Promise.all([
    getClientDetailPageData(id),
    getClientFullHistory(id),
  ])

  if (!data.client) notFound()

  const { client, packs } = data
  const packMap = new Map(packs.map((p) => [p.id, p]))
  const today = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })

  // Group activities by pack
  const byPack = new Map<string, typeof activities>()
  const noPack: typeof activities = []
  for (const a of activities) {
    const packId = (a.packs as { id: string; name: string } | null)?.id
    if (!packId) { noPack.push(a); continue }
    if (!byPack.has(packId)) byPack.set(packId, [])
    byPack.get(packId)!.push(a)
  }

  const totalMinutes = activities.reduce((sum, a) => sum + (a.minutes_used ?? 0), 0)

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
            <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>Historial de actividades</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 4px' }}>{client.name}</p>
            <p style={{ fontSize: '14px', color: '#767676', margin: 0 }}>{today}</p>
          </div>
        </div>

        {/* Summary strip */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div style={{ flex: 1, background: '#f8f8f8', borderRadius: '12px', padding: '16px 20px' }}>
            <p style={{ fontSize: '12px', color: '#767676', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Total actividades</p>
            <p style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>{activities.length}</p>
          </div>
          <div style={{ flex: 1, background: '#f8f8f8', borderRadius: '12px', padding: '16px 20px' }}>
            <p style={{ fontSize: '12px', color: '#767676', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Tiempo total</p>
            <p style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>{formatDuration(totalMinutes)}</p>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(0,0,0,0.07)', marginBottom: '32px' }} />

        {activities.length === 0 && (
          <p style={{ fontSize: '14px', color: '#767676' }}>Sin actividades registradas.</p>
        )}

        {/* Activities by pack */}
        {Array.from(byPack.entries()).map(([packId, packActivities]) => {
          const pack = packMap.get(packId)
          const packMinutes = packActivities.reduce((sum, a) => sum + (a.minutes_used ?? 0), 0)
          return (
            <div key={packId} style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{pack?.name ?? 'Pack'}</p>
                {packMinutes > 0 && (
                  <p style={{ fontSize: '13px', color: '#767676', margin: 0 }}>{formatDuration(packMinutes)} consumidos</p>
                )}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    {['Título', 'Tipo', 'Tiempo', 'Fecha'].map((h) => (
                      <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {packActivities.map((a, i) => (
                    <>
                      <tr key={a.id} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '8px 10px', fontWeight: 600 }}>{a.title}</td>
                        <td style={{ padding: '8px 10px', color: '#767676' }}>{a.activity_type}</td>
                        <td style={{ padding: '8px 10px', color: '#767676' }}>{a.minutes_used > 0 ? formatDuration(a.minutes_used) : '—'}</td>
                        <td style={{ padding: '8px 10px', color: '#767676', whiteSpace: 'nowrap' }}>{formatDate(a.work_date)}</td>
                      </tr>
                      {a.description && (
                        <tr key={`${a.id}-desc`} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td colSpan={4} style={{ padding: '0 10px 10px 10px', color: '#767676', fontSize: '12px', fontStyle: 'italic', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                            {a.description}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: '40px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#767676', margin: 0 }}>WF-Studio · webfuengirola.com</p>
        </div>
      </div>
    </>
  )
}
