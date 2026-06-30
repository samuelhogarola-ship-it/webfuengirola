import { cache } from 'react'

import { createImKontextAdminClient } from '@/lib/supabase/server'

export const getVokabelWorldData = cache(async () => {
  const db = createImKontextAdminClient()

  const [{ data: vocab }, { data: themas }] = await Promise.all([
    db
      .from('vocabulario')
      .select('id, german, spanish, level, word_type, article, is_active, thema_id')
      .order('german'),
    db.from('themas').select('id, name').order('name'),
  ])

  const rows = vocab ?? []
  const themaList = themas ?? []

  const active = rows.filter((r) => r.is_active)
  const byLevel: Record<string, number> = {}
  const byType: Record<string, number> = {}

  for (const r of active) {
    const lvl = r.level || 'sin nivel'
    byLevel[lvl] = (byLevel[lvl] ?? 0) + 1
    const t = r.word_type || 'otro'
    byType[t] = (byType[t] ?? 0) + 1
  }

  const themaMap = new Map<number, string>()
  for (const t of themaList) themaMap.set(t.id, t.name)

  const byThema: { id: number; name: string; total: number; active: number }[] = themaList.map((t) => ({
    id: t.id,
    name: t.name,
    total: rows.filter((r) => r.thema_id === t.id).length,
    active: rows.filter((r) => r.thema_id === t.id && r.is_active).length,
  }))

  const noThema = rows.filter((r) => !r.thema_id)

  return {
    rows,
    total: rows.length,
    active: active.length,
    byLevel,
    byType,
    byThema,
    noThema: noThema.length,
  }
})
