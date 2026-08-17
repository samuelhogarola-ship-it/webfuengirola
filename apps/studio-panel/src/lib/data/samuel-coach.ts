import { cache } from 'react'

import { createAppsUsersAdminClient, createImKontextAdminClient } from '@/lib/supabase/server'

export const getSamuelCoachData = cache(async () => {
  const db = createImKontextAdminClient()

  const [{ data: texts }, { data: exercises }, { data: questions }] = await Promise.all([
    db
      .from('samuel_texts')
      .select('id, slug, nivel, titulo, descripcion, is_published, content_lang')
      .eq('app_key', 'samuel_coach')
      .order('nivel')
      .order('titulo'),
    db
      .from('samuel_exercises')
      .select('id, text_id, exercise_type, gap_count'),
    db
      .from('samuel_questions')
      .select('text_id'),
  ])

  const exerciseMap = new Map<string, { exercise_type: string; gap_count: number }>()
  for (const ex of exercises ?? []) {
    exerciseMap.set(ex.text_id, { exercise_type: ex.exercise_type, gap_count: ex.gap_count ?? 0 })
  }

  const questionCountMap = new Map<string, number>()
  for (const q of questions ?? []) {
    questionCountMap.set(q.text_id, (questionCountMap.get(q.text_id) ?? 0) + 1)
  }

  const rows = (texts ?? []).map((t) => ({
    ...t,
    exercise: exerciseMap.get(t.id) ?? null,
    questionCount: questionCountMap.get(t.id) ?? 0,
  }))

  const published = rows.filter((r) => r.is_published)
  const byNivel: Record<string, number> = {}
  const byType: Record<string, number> = {}

  for (const r of published) {
    byNivel[r.nivel] = (byNivel[r.nivel] ?? 0) + 1
    const type = r.exercise?.exercise_type ?? 'unknown'
    byType[type] = (byType[type] ?? 0) + 1
  }

  return { rows, published: published.length, total: rows.length, byNivel, byType }
})

type Question = { id: string; enunciado: string; respuesta: boolean; explicacion: string | null; order_index: number }
type TextWithQuestions = { id: string; nivel: string; titulo: string; is_published: boolean; questions: Question[] }

export const getSamuelCoachEjerciciosData = cache(async () => {
  const db = createImKontextAdminClient()

  const [{ data: texts }, { data: questions }] = await Promise.all([
    db
      .from('samuel_texts')
      .select('id, nivel, titulo, is_published')
      .eq('app_key', 'samuel_coach')
      .order('nivel')
      .order('titulo'),
    db
      .from('samuel_questions')
      .select('id, text_id, enunciado, respuesta, explicacion, order_index')
      .order('order_index'),
  ])

  const questionsByText = new Map<string, Question[]>()
  for (const q of questions ?? []) {
    const list = questionsByText.get(q.text_id) ?? []
    list.push({ id: q.id, enunciado: q.enunciado, respuesta: q.respuesta, explicacion: q.explicacion, order_index: q.order_index })
    questionsByText.set(q.text_id, list)
  }

  const byNivel = new Map<string, TextWithQuestions[]>()
  for (const t of texts ?? []) {
    const list = byNivel.get(t.nivel) ?? []
    list.push({ id: t.id, nivel: t.nivel, titulo: t.titulo, is_published: t.is_published, questions: questionsByText.get(t.id) ?? [] })
    byNivel.set(t.nivel, list)
  }

  return { byNivel, total: texts?.length ?? 0, totalQuestions: questions?.length ?? 0 }
})

export const getAlumnosData = cache(async (q = '') => {
  const db = createAppsUsersAdminClient()
  const normalizedQuery = q.trim().toLowerCase()

  const profilesQuery = db
    .from('profiles')
    .select('id, email, full_name, locale, created_at')
    .order('created_at', { ascending: false })

  if (normalizedQuery) profilesQuery.or(`email.ilike.%${normalizedQuery}%,full_name.ilike.%${normalizedQuery}%`)

  const [{ data: profiles }, { data: memberships }, authUsersResult, premiumCodesResult] = await Promise.all([
    profilesQuery,
    db.from('app_memberships').select('user_id, app_key, status, created_at'),
    db.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    db.rpc('list_premium_codes', { p_status: null }),
  ])

  const membershipsByUser = new Map<string, { app_key: string; status: string }[]>()
  for (const m of memberships ?? []) {
    const list = membershipsByUser.get(m.user_id) ?? []
    list.push({ app_key: m.app_key, status: m.status })
    membershipsByUser.set(m.user_id, list)
  }

  type PremiumCodeRow = {
    code: string
    customer_email: string | null
    duration_days: number
    status: string
    created_at: string
    redeemed_at: string | null
    redeemed_by: string | null
  }
  type AlumnoRow = {
    id: string
    email: string | null
    full_name: string | null
    locale: string | null
    created_at: string
    last_sign_in_at: string | null
    confirmed_at: string | null
    memberships: { app_key: string; status: string }[]
    premiumCodes: PremiumCodeRow[]
  }

  const alumnosById = new Map<string, AlumnoRow>()
  const alumnosByEmail = new Map<string, AlumnoRow>()
  const rememberAlumno = (alumno: AlumnoRow) => {
    alumnosById.set(alumno.id, alumno)
    if (alumno.email) alumnosByEmail.set(alumno.email.toLowerCase(), alumno)
  }

  for (const user of authUsersResult.data?.users ?? []) {
    const email = user.email ?? null
    const fullName = typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : typeof user.user_metadata?.name === 'string'
        ? user.user_metadata.name
        : null
    rememberAlumno({
      id: user.id,
      email,
      full_name: fullName,
      locale: typeof user.user_metadata?.locale === 'string' ? user.user_metadata.locale : null,
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at ?? null,
      confirmed_at: user.confirmed_at ?? null,
      memberships: membershipsByUser.get(user.id) ?? [],
      premiumCodes: [],
    })
  }

  for (const profile of profiles ?? []) {
    const existing = alumnosById.get(profile.id) ?? (profile.email ? alumnosByEmail.get(profile.email.toLowerCase()) : null)
    if (existing) {
      existing.full_name = profile.full_name ?? existing.full_name
      existing.locale = profile.locale ?? existing.locale
      existing.email = profile.email ?? existing.email
      existing.created_at = profile.created_at ?? existing.created_at
      existing.memberships = membershipsByUser.get(profile.id) ?? existing.memberships
      rememberAlumno(existing)
    } else {
      rememberAlumno({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        locale: profile.locale,
        created_at: profile.created_at,
        last_sign_in_at: null,
        confirmed_at: null,
        memberships: membershipsByUser.get(profile.id) ?? [],
        premiumCodes: [],
      })
    }
  }

  const premiumCodes = (premiumCodesResult.data ?? []) as PremiumCodeRow[]
  for (const code of premiumCodes) {
    const email = code.customer_email?.toLowerCase() ?? null
    const alumno = (code.redeemed_by ? alumnosById.get(code.redeemed_by) : null) ?? (email ? alumnosByEmail.get(email) : null)
    if (alumno) {
      alumno.premiumCodes.push(code)
    } else if (email) {
      rememberAlumno({
        id: `premium:${email}`,
        email: code.customer_email,
        full_name: null,
        locale: null,
        created_at: code.created_at,
        last_sign_in_at: null,
        confirmed_at: null,
        memberships: [],
        premiumCodes: [code],
      })
    }
  }

  const alumnos = Array.from(alumnosById.values())
    .filter((alumno) => {
      if (!normalizedQuery) return true
      return [alumno.email, alumno.full_name].some((value) => value?.toLowerCase().includes(normalizedQuery))
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return {
    alumnos,
    total: alumnos.length,
    active: alumnos.filter((a) => a.memberships.some((m) => m.status === 'active') || a.premiumCodes.some((code) => code.status === 'active' && !code.redeemed_at)).length,
    confirmed: alumnos.filter((a) => a.confirmed_at).length,
    premium: alumnos.filter((a) => a.premiumCodes.length > 0).length,
  }
})

export const getProgresoData = cache(async () => {
  const db = createAppsUsersAdminClient()

  const [{ data: progress }, { data: attempts }] = await Promise.all([
    db
      .from('samuel_user_progress')
      .select('nivel, exercise_type, completed_activities, average_score, user_id')
      .order('nivel')
      .order('exercise_type'),
    db
      .from('samuel_attempts')
      .select('user_id, score, max_score, completed_at, exercise_type')
      .order('completed_at', { ascending: false })
      .limit(30),
  ])

  // Aggregate progress by nivel+exercise_type
  type ProgressRow = { nivel: string; exercise_type: string; user_count: number; completed_activities: number; average_score: number | null }
  const grouped = new Map<string, ProgressRow>()
  for (const row of progress ?? []) {
    const key = `${row.nivel}:${row.exercise_type}`
    const existing = grouped.get(key)
    if (existing) {
      existing.user_count++
      existing.completed_activities += row.completed_activities ?? 0
      if (row.average_score !== null) {
        existing.average_score = existing.average_score !== null
          ? (existing.average_score + row.average_score) / 2
          : row.average_score
      }
    } else {
      grouped.set(key, {
        nivel: row.nivel,
        exercise_type: row.exercise_type,
        user_count: 1,
        completed_activities: row.completed_activities ?? 0,
        average_score: row.average_score ?? null,
      })
    }
  }

  const allAttempts = attempts ?? []
  const totalAttempts = allAttempts.length
  const activeUsers = new Set(allAttempts.map((a) => a.user_id)).size
  const scored = allAttempts.filter((a) => a.max_score > 0)
  const avgScore = scored.length > 0
    ? Math.round(scored.reduce((s, a) => s + (a.score / a.max_score) * 100, 0) / scored.length)
    : null

  return {
    progress: Array.from(grouped.values()),
    recentAttempts: allAttempts,
    stats: { totalAttempts, activeUsers, avgScore },
  }
})
