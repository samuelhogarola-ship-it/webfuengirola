declare module '@/lib/cron/pending-reminders.mjs' {
  type ReminderClient = { name: string | null; email: string | null }
  type ReminderDestination = { name: string | null; email: string }

  export type PendingReminderItem = {
    id: string
    title: string
    description: string | null
    requested_at: string
    reminder_interval_days: number | null
    next_reminder_at: string
    clients: ReminderClient | ReminderClient[] | null
  }

  export function isAuthorizedCronRequest(options: {
    configuredSecret?: string
    authorization?: string | null
    headerSecret?: string | null
  }): boolean

  export function processPendingReminders(options: {
    items: PendingReminderItem[]
    claimReminder: (
      itemId: string,
      update: { expectedNextReminderAt: string; claimedAt: string },
    ) => Promise<string>
    sendReminder: (context: { item: PendingReminderItem; client: ReminderDestination }) => Promise<void>
    persistReminder: (
      itemId: string,
      update: { lastReminderSentAt: string; nextReminderAt: string; claimToken: string },
    ) => Promise<void>
    releaseClaim: (itemId: string, update: { claimToken: string }) => Promise<void>
    now?: Date
  }): Promise<{
    processed: number
    sent: number
    skipped: number
    failed: Array<{ id: string; stage: 'claim' | 'send' | 'persist' | 'release'; message: string }>
  }>
}
