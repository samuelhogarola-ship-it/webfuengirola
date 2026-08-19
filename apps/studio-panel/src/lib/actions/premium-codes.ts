'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { requireAdmin } from '@/lib/auth'
import { createAppsUsersAdminClient } from '@/lib/supabase/server'

const premiumCodeSchema = z.object({
  customer_email: z.string().email('Introduce un email válido.'),
  duration_days: z.coerce.number().int().positive('La duración debe ser positiva.'),
  created_by_type: z.string().min(2).default('studio-panel'),
})

export async function generatePremiumCodeAction(formData: FormData) {
  await requireAdmin()
  const parsed = premiumCodeSchema.safeParse({
    customer_email: formData.get('customer_email'),
    duration_days: formData.get('duration_days'),
    created_by_type: formData.get('created_by_type') || 'studio-panel',
  })

  if (!parsed.success) return

  const db = createAppsUsersAdminClient()
  await db.rpc('generate_premium_code', {
    p_duration_days: parsed.data.duration_days,
    p_customer_email: parsed.data.customer_email,
    p_created_by_type: parsed.data.created_by_type,
  })
  revalidatePath('/paneladmin/samuel-coach/premium')
}

export async function cancelPremiumCodeAction(formData: FormData) {
  await requireAdmin()
  const code = String(formData.get('code') ?? '')
  if (!code) return

  const db = createAppsUsersAdminClient()
  await db.rpc('cancel_premium_code', { p_code: code })
  revalidatePath('/paneladmin/samuel-coach/premium')
}
