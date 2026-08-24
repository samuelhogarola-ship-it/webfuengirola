'use server'

import { revalidatePath } from 'next/cache'

import { requireAdmin } from '@/lib/auth'
import { createImKontextAdminClient } from '@/lib/supabase/server'

export async function togglePublishAction(formData: FormData) {
  await requireAdmin()
  const textId = String(formData.get('textId') ?? '')
  const current = formData.get('current') === 'true'
  if (!textId) throw new Error('Falta el texto que se quiere publicar.')
  const db = createImKontextAdminClient()
  const { data, error } = await db.from('samuel_texts').update({ is_published: !current }).eq('id', textId).select('id').single()
  if (error || !data) throw new Error(`No se pudo cambiar la publicación: ${error?.message ?? 'texto no encontrado'}`)
  revalidatePath('/paneladmin/samuel-coach')
}
