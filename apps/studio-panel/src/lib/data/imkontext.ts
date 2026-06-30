import { cache } from 'react'

import { createImKontextAdminClient } from '@/lib/supabase/server'

export const getImKontextData = cache(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createImKontextAdminClient() as any

  const [
    { data: apps },
    { data: texts },
    { count: vocabTotal },
    { count: lemmasTotal },
    { count: userAccessTotal },
  ] = await Promise.all([
    db.from('apps').select('key, name, is_active').order('key'),
    db.from('texts').select('id, title, topic, access_status, published_at, categoria').order('title'),
    db.from('vocabulario').select('*', { count: 'exact', head: true }),
    db.from('vocabulary_lemmas').select('*', { count: 'exact', head: true }),
    db.from('user_app_access').select('*', { count: 'exact', head: true }),
  ])

  const freeTexts = (texts ?? []).filter((t: { access_status: string }) => t.access_status === 'free').length
  const premiumTexts = (texts ?? []).filter((t: { access_status: string }) => t.access_status === 'premium').length

  return {
    apps: (apps ?? []) as { key: string; name: string; is_active: boolean }[],
    texts: (texts ?? []) as { id: number; title: string; topic: string; access_status: string; published_at: string | null; categoria: string | null }[],
    stats: {
      totalTexts: texts?.length ?? 0,
      freeTexts,
      premiumTexts,
      totalVocab: vocabTotal ?? 0,
      totalLemmas: lemmasTotal ?? 0,
      totalUsers: userAccessTotal ?? 0,
    },
  }
})
