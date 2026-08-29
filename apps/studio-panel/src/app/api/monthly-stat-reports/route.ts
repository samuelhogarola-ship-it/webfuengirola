import { randomUUID } from 'node:crypto'

import { NextResponse } from 'next/server'

import {
  fetchAllUmamiPanelData,
  getUmamiConnections,
} from '@/lib/analytics/umami-core.mjs'
import {
  deliverMonthlyStatReport,
  getConfiguredReportSites,
  getMonthlyStatReportConfig,
  isAuthorizedMonthlyCronRequest,
  processMonthlyStatReport,
} from '@/lib/cron/monthly-stat-reports.mjs'
import { createMonthlyStatReportRepository } from '@/lib/data/monthly-stat-reports.mjs'
import { sendMonthlyStatReportEmail } from '@/lib/email'
import { createSupabaseAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

function getRequiredConfig() {
  try {
    return { config: getMonthlyStatReportConfig(process.env) }
  } catch (error) {
    return {
      error: NextResponse.json({
        error: 'stat_report_not_configured',
        message: error instanceof Error ? error.message : 'Monthly report configuration is incomplete.',
      }, { status: 503 }),
    }
  }
}

async function runMonthlyStatReport(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  const monthlySecret = process.env.MONTHLY_STAT_REPORTS_CRON_SECRET
  if (!cronSecret && !monthlySecret) {
    return NextResponse.json({ error: 'cron_not_configured', message: 'Cron secret is required.' }, { status: 503 })
  }

  if (!isAuthorizedMonthlyCronRequest({
    cronSecret,
    monthlySecret,
    authorization: request.headers.get('authorization'),
    headerSecret: request.headers.get('x-cron-secret'),
  })) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const setup = getRequiredConfig()
  if ('error' in setup) return setup.error

  const { reportTo } = setup.config
  const reportRepository = createMonthlyStatReportRepository(createSupabaseAdminClient())
  const sites = getConfiguredReportSites()

  const result = await processMonthlyStatReport({
    sites,
    fetchSiteReports: ({ range }) => fetchAllUmamiPanelData({
      connections: getUmamiConnections(process.env),
      sites,
      range,
    }),
    saveReport: async ({ monthKey, label, markdown, siteReports, generatedAt }) => {
      const saved = await reportRepository.save({
        monthKey,
        label,
        markdown,
        siteReports,
        generatedAt,
      })
      return saved.storageRef
    },
    sendReport: async ({ to, subject, markdown, monthKey, idempotencyKey }) => {
      const claimToken = randomUUID()
      return deliverMonthlyStatReport({
        monthKey,
        emailTo: to,
        claimToken,
        claimDelivery: (input) => reportRepository.claimDelivery(input),
        send: () => sendMonthlyStatReportEmail({ to, subject, markdown, monthKey, idempotencyKey }),
        completeDelivery: (input) => reportRepository.completeDelivery(input),
        releaseDelivery: (input) => reportRepository.releaseDelivery(input),
      })
    },
    reportTo,
  })

  return NextResponse.json({ ok: true, ...result })
}

export async function GET(request: Request) {
  return runMonthlyStatReport(request)
}

export async function POST(request: Request) {
  return runMonthlyStatReport(request)
}
