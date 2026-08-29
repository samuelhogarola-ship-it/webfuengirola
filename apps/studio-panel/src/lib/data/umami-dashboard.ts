import 'server-only'

import { unstable_cache } from 'next/cache'

import {
  fetchAllUmamiPanelData,
  getConfiguredUmamiSites,
  getPanelUmamiSites,
  getTrailingComparisonRange,
  getUmamiConnections,
  type UmamiPanelKey,
  type UmamiSiteReport,
} from '@/lib/analytics/umami-core.mjs'

const getCachedAnalytics = unstable_cache(
  async (): Promise<UmamiSiteReport[]> => {
    const sites = getConfiguredUmamiSites(process.env)

    return fetchAllUmamiPanelData({
      connections: getUmamiConnections(process.env),
      sites,
      range: getTrailingComparisonRange(new Date(), 30),
    })
  },
  ['umami-dashboard-v1'],
  { revalidate: 300 },
)

export async function getAllAnalytics(): Promise<UmamiSiteReport[]> {
  return getCachedAnalytics()
}

export async function getPanelAnalytics(
  panelKey: UmamiPanelKey,
): Promise<UmamiSiteReport[]> {
  const reports = await getCachedAnalytics()
  const panelSites = new Set(
    getPanelUmamiSites(panelKey, reports.map((report) => report.site)).map(
      (site) => site.key,
    ),
  )

  return reports.filter((report) => panelSites.has(report.site.key))
}
