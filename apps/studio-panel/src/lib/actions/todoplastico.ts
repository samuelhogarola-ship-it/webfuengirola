'use server'

import { revalidatePath } from 'next/cache'

import { requireAdmin } from '@/lib/auth'
import { createTodoPlasticoAdminClient } from '@/lib/supabase/server'

export async function updateTodoPlasticoListingAction(formData: FormData) {
  await requireAdmin()
  const id = Number(formData.get('id'))
  const action = String(formData.get('action'))
  const status = action === 'approve' ? 'published' : action === 'reject' ? 'rejected' : null
  if (!Number.isInteger(id) || !status) throw new Error('Acción de anuncio no válida.')
  const db = createTodoPlasticoAdminClient()
  const { data, error } = await db.from('mkt_listings').update({ status, rejection_reason: status === 'rejected' ? 'Revisado desde WF Studio.' : null, updated_at: new Date().toISOString() }).eq('id', id).eq('status', 'pending_review').select('id').single()
  if (error || !data) throw new Error(`No se pudo actualizar el anuncio: ${error?.message ?? 'el anuncio ya no está pendiente'}`)
  revalidatePath('/paneladmin/todoplastico')
}

export async function updateTodoPlasticoCompanyAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id'))
  const action = String(formData.get('action'))
  if (!id || !['verify', 'block', 'activate'].includes(action)) throw new Error('Acción de empresa no válida.')
  const db = createTodoPlasticoAdminClient()
  const result = action === 'verify'
    ? await db.from('mkt_companies').update({ is_verified: true }).eq('id', id).select('id').single()
    : await db.from('mkt_companies').update({ status: action === 'block' ? 'blocked' : 'active' }).eq('id', id).select('id').single()
  if (result.error || !result.data) throw new Error(`No se pudo actualizar la empresa: ${result.error?.message ?? 'empresa no encontrada'}`)
  revalidatePath('/paneladmin/todoplastico')
}
