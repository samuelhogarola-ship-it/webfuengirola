declare module '@/lib/data/monthly-stat-reports.mjs' {
  export type MonthlyStatReportInput = {
    monthKey: string
    label: string
    markdown: string
    siteReports: import('@/lib/supabase/types').Json
    generatedAt: string
  }

  export type MonthlyStatReportRow = {
    month_key: string
    label: string
    markdown: string
    generated_at: string
  }

  export function createMonthlyStatReportRepository(database: unknown): {
    save(input: MonthlyStatReportInput): Promise<{ storageRef: string }>
    list(): Promise<MonthlyStatReportRow[]>
    claimDelivery(input: { monthKey: string; claimToken: string; emailTo: string }): Promise<boolean>
    completeDelivery(input: { monthKey: string; claimToken: string; sentAt: string; messageId: string | null }): Promise<void>
    releaseDelivery(input: { monthKey: string; claimToken: string; error: string }): Promise<void>
  }
}
