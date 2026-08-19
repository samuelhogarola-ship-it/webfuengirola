'use server'

import { revalidatePath } from 'next/cache'

import { requireAdmin } from '@/lib/auth'
import { createSuperEntrenadorAdminClient } from '@/lib/supabase/server'

function getTrainerId(input: FormData | string) {
  return typeof input === 'string' ? input : String(input.get('id') ?? '')
}

export async function approveTrainerAction(input: FormData | string) {
  await requireAdmin()
  const id = getTrainerId(input)
  if (!id) return
  const db = createSuperEntrenadorAdminClient()
  const { error } = await db
    .from('trainer_profiles')
    .update({ review_status: 'approved', is_published: true })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/paneladmin/superentrenador/pt')
}

export async function rejectTrainerAction(input: FormData | string) {
  await requireAdmin()
  const id = getTrainerId(input)
  if (!id) return
  const db = createSuperEntrenadorAdminClient()
  const { error } = await db
    .from('trainer_profiles')
    .update({ review_status: 'rejected', is_published: false })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/paneladmin/superentrenador/pt')
}

export const approveTrainer = approveTrainerAction
export const rejectTrainer = rejectTrainerAction
