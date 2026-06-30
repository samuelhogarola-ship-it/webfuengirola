'use server'

import { revalidatePath } from 'next/cache'

import { requireAdmin } from '@/lib/auth'
import { createImKontextAdminClient } from '@/lib/supabase/server'

export async function toggleVocabActiveAction(formData: FormData) {
  await requireAdmin()
  const vocabId = Number(formData.get('vocabId'))
  const current = formData.get('current') === 'true'
  const db = createImKontextAdminClient()
  await db.from('vocabulario').update({ is_active: !current }).eq('id', vocabId)
  revalidatePath('/paneladmin/vokabel-world')
}
