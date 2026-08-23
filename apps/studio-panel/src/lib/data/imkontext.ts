import { cache } from 'react'

import { createImKontextAdminClient } from '@/lib/supabase/server'
import { unwrapSupabaseResult } from '@/lib/integrations/supabase.mjs'

type DerDieDasLemma = {
  id: number
  german: string
  article: string
  plural: string | null
  is_active: boolean
}

type CatalogApp = {
  id: string
  name: string
  slug: string
  status: string
  visibility: string
  launch_url: string
}

type ImKontextApp = { key: string; name: string; is_active: boolean }

type ImKontextText = {
  id: number
  title: string
  topic: string
  access_status: string
  published_at: string | null
  categoria: string | null
}

export const getDerDieDasData = cache(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createImKontextAdminClient() as any

  const lemmas = unwrapSupabaseResult<DerDieDasLemma[] | null>(await db
    .from('vocabulary_lemmas')
    .select('id, german, article, plural, is_active')
    .eq('word_type', 'noun')
    .not('article', 'is', null)
    .in('article', ['der', 'die', 'das'])
    .eq('is_active', true)
    .order('german'), 'Der Die Das vocabulary')

  const byArticle: Record<string, number> = { der: 0, die: 0, das: 0 }
  for (const l of lemmas ?? []) {
    if (l.article in byArticle) byArticle[l.article]++
  }

  return {
    lemmas: lemmas ?? [],
    byArticle,
    total: (lemmas ?? []).length,
  }
})

export const getVokabelLabData = cache(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createImKontextAdminClient() as any

  const [catalogResult, lemmasResult, vocabResult] = await Promise.all([
    db.from('apps_catalog').select('id, name, slug, status, visibility, launch_url').order('sort_order'),
    db.from('vocabulary_lemmas').select('*', { count: 'exact', head: true }),
    db.from('vocabulario').select('*', { count: 'exact', head: true }),
  ])
  const catalog = unwrapSupabaseResult<CatalogApp[] | null>(catalogResult, 'Vokabel Lab catalog')
  unwrapSupabaseResult(lemmasResult, 'Vokabel Lab lemma count')
  unwrapSupabaseResult(vocabResult, 'Vokabel Lab vocabulary count')

  return {
    catalog: catalog ?? [],
    lemmasTotal: lemmasResult.count ?? 0,
    vocabTotal: vocabResult.count ?? 0,
  }
})

export const getImKontextData = cache(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = createImKontextAdminClient() as any

  const [appsResult, textsResult, vocabResult, lemmasResult, userAccessResult] = await Promise.all([
    db.from('apps').select('key, name, is_active').order('key'),
    db.from('texts').select('id, title, topic, access_status, published_at, categoria').order('title'),
    db.from('vocabulario').select('*', { count: 'exact', head: true }),
    db.from('vocabulary_lemmas').select('*', { count: 'exact', head: true }),
    db.from('user_app_access').select('*', { count: 'exact', head: true }),
  ])
  const apps = unwrapSupabaseResult<ImKontextApp[] | null>(appsResult, 'imKontext apps')
  const texts = unwrapSupabaseResult<ImKontextText[] | null>(textsResult, 'imKontext texts')
  unwrapSupabaseResult(vocabResult, 'imKontext vocabulary count')
  unwrapSupabaseResult(lemmasResult, 'imKontext lemma count')
  unwrapSupabaseResult(userAccessResult, 'imKontext user access count')

  const freeTexts = (texts ?? []).filter((t: { access_status: string }) => t.access_status === 'free').length
  const premiumTexts = (texts ?? []).filter((t: { access_status: string }) => t.access_status === 'premium').length

  return {
    apps: apps ?? [],
    texts: texts ?? [],
    stats: {
      totalTexts: texts?.length ?? 0,
      freeTexts,
      premiumTexts,
      totalVocab: vocabResult.count ?? 0,
      totalLemmas: lemmasResult.count ?? 0,
      totalUsers: userAccessResult.count ?? 0,
    },
  }
})
