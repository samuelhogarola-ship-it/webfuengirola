import { AdminShell } from '@/components/layout/app-shell'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { requireAdmin } from '@/lib/auth'
import { getVokabelWorldData } from '@/lib/data/vokabel-world'
import { toggleVocabActiveAction } from '@/lib/actions/vokabel-world'
import { getLocale } from '@/lib/locale'

export const dynamic = 'force-dynamic'

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const TYPE_LABELS: Record<string, string> = {
  noun: 'Sustantivo',
  verb: 'Verbo',
  adjective: 'Adjetivo',
  adverb: 'Adverbio',
  preposition: 'Preposición',
  conjunction: 'Conjunción',
  phrase: 'Frase',
}

export default async function VokabelWorldAdminPage() {
  const identity = await requireAdmin()
  const locale = await getLocale()
  const data = await getVokabelWorldData()

  const levelEntries = LEVEL_ORDER.filter((l) => data.byLevel[l])
  const typeEntries = Object.entries(data.byType).sort((a, b) => b[1] - a[1]).slice(0, 6)
  const themasSorted = [...data.byThema].sort((a, b) => b.total - a.total)

  return (
    <AdminShell
      title="Vokabel-World — Vocabulario"
      description="Gestión del vocabulario alemán en imKontext"
      currentPath="/paneladmin/vokabel-world"
      userEmail={identity.email}
      locale={locale}
    >
      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-4 mb-8">
        {[
          { label: 'Palabras totales', value: data.total },
          { label: 'Palabras activas', value: data.active },
          { label: 'Inactivas', value: data.total - data.active },
          { label: 'Sin tema', value: data.noThema },
        ].map((s) => (
          <Card key={s.label} className="p-6">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-4 text-3xl font-black tracking-tight text-foreground">{s.value}</p>
          </Card>
        ))}
      </section>

      {/* By level */}
      {levelEntries.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-3">Por nivel</h2>
          <div className="flex gap-3 flex-wrap">
            {levelEntries.map((l) => (
              <div key={l} className="flex items-center gap-2 rounded-full bg-brand/10 px-4 py-2">
                <span className="font-black text-brand">{l}</span>
                <span className="text-sm text-muted">{data.byLevel[l]} palabras</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* By type */}
      {typeEntries.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-3">Por tipo</h2>
          <div className="flex gap-3 flex-wrap">
            {typeEntries.map(([type, count]) => (
              <div key={type} className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">
                <span className="font-semibold text-slate-700 text-sm">{TYPE_LABELS[type] ?? type}</span>
                <span className="text-sm text-muted">{count}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Thema breakdown */}
      <section className="mb-8">
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <h2 className="text-xl font-bold text-foreground">Por tema</h2>
            <p className="text-sm text-muted">{data.byThema.length} temas · palabras activas / total</p>
          </div>
          <div className="divide-y divide-line">
            {themasSorted.map((t) => {
              const pct = t.total > 0 ? Math.round((t.active / t.total) * 100) : 0
              return (
                <div key={t.id} className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                  <span className="font-medium text-foreground text-sm truncate">{t.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5">
                      <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted w-8 text-right">{pct}%</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">{t.active}</Badge>
                    <span className="text-xs text-muted">/ {t.total}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      {/* Word list — first 80 active */}
      <section>
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-5">
            <h2 className="text-xl font-bold text-foreground">Vocabulario (primeras 80 palabras)</h2>
            <p className="text-sm text-muted">Ordenado por alemán · toggle para activar/desactivar</p>
          </div>
          <div className="divide-y divide-line">
            {data.rows.slice(0, 80).map((row) => (
              <div key={row.id} className="flex items-center justify-between gap-4 px-6 py-3 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {row.article && (
                    <span className="text-xs font-bold w-7 text-center rounded bg-slate-100 py-1 text-slate-400 shrink-0">{row.article}</span>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">{row.german}</p>
                    <p className="text-xs text-muted truncate">{row.spanish}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {row.level && (
                    <span className="hidden sm:inline text-xs text-muted">{row.level}</span>
                  )}
                  <Badge className={row.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}>
                    {row.is_active ? 'Activa' : 'Inactiva'}
                  </Badge>
                  <form action={toggleVocabActiveAction}>
                    <input type="hidden" name="vocabId" value={row.id} />
                    <input type="hidden" name="current" value={String(row.is_active)} />
                    <button
                      type="submit"
                      className="rounded px-3 py-1.5 text-xs font-semibold border border-line text-slate-600 hover:bg-slate-100 transition"
                    >
                      {row.is_active ? 'Desactivar' : 'Activar'}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AdminShell>
  )
}
