import test from "node:test";
import assert from "node:assert/strict";

import {
  getConfiguredReportSites,
  getPreviousMonthRange,
  processMonthlyStatReport,
} from "../src/lib/cron/monthly-stat-reports.mjs";
import * as monthlyReports from "../src/lib/cron/monthly-stat-reports.mjs";
import {
  createMonthlyStatReportRepository,
} from "../src/lib/data/monthly-stat-reports.mjs";

function createReportDatabase(initialRows = []) {
  const rows = new Map(initialRows.map((row) => [row.month_key, { ...row }]));
  const claims = new Map();

  return {
    rows,
    claims,
    async rpc(name, params) {
      const row = rows.get(params.p_month_key);
      if (!row) return { data: null, error: { message: "report missing" } };

      if (name === "claim_monthly_stat_report_delivery") {
        if (row.email_sent_at || claims.has(params.p_month_key)) return { data: false, error: null };
        claims.set(params.p_month_key, params.p_claim_token);
        return { data: true, error: null };
      }
      if (name === "complete_monthly_stat_report_delivery") {
        assert.equal(claims.get(params.p_month_key), params.p_claim_token);
        row.email_sent_at = params.p_sent_at;
        row.email_message_id = params.p_message_id;
        claims.delete(params.p_month_key);
        return { data: true, error: null };
      }
      if (name === "release_monthly_stat_report_delivery") {
        claims.delete(params.p_month_key);
        row.last_delivery_error = params.p_error;
        return { data: true, error: null };
      }
      return { data: null, error: { message: `unknown rpc ${name}` } };
    },
    from(table) {
      assert.equal(table, "monthly_stat_reports");
      return {
        upsert(record, options) {
          assert.deepEqual(options, { onConflict: "month_key" });
          rows.set(record.month_key, { ...rows.get(record.month_key), ...record });
          return {
            select() {
              return {
                async single() {
                  return { data: rows.get(record.month_key), error: null };
                },
              };
            },
          };
        },
        select() {
          return {
            async order(column, options) {
              assert.equal(column, "month_key");
              assert.deepEqual(options, { ascending: false });
              return {
                data: [...rows.values()].sort((a, b) => b.month_key.localeCompare(a.month_key)),
                error: null,
              };
            },
          };
        },
      };
    },
  };
}

test("previous month range uses full UTC calendar month", () => {
  const range = getPreviousMonthRange(new Date("2026-08-25T10:30:00.000Z"));

  assert.equal(range.monthKey, "2026-07");
  assert.equal(range.label, "julio 2026");
  assert.equal(range.startAt, Date.UTC(2026, 6, 1));
  assert.equal(range.endAt, Date.UTC(2026, 7, 1) - 1);
});

test("configured report sites keep missing website ids visible", () => {
  const sites = getConfiguredReportSites({
    STAT_REPORT_UMAMI_WEBSITE_ID_WEBFUENGIROLA: "wf-id",
    STAT_REPORT_UMAMI_WEBSITE_ID_SUPERENTRENADOR: "super-id",
  });

  assert.equal(sites.length, 8);
  assert.deepEqual(
    sites.map((site) => [site.key, site.websiteId ?? null]),
    [
      ["webfuengirola", "wf-id"],
      ["vivirenfuengirola", null],
      ["conocef", null],
      ["topfuengirola", null],
      ["samuelcoachdealeman", null],
      ["vikingfitness", null],
      ["personaltrainerfuengirola", null],
      ["gimnasionuevoestilo", null],
    ],
  );
});

test("monthly cron authorization accepts shared and dedicated secrets", () => {
  const input = { cronSecret: "vercel", monthlySecret: "external", headerSecret: null };

  assert.equal(monthlyReports.isAuthorizedMonthlyCronRequest({ ...input, authorization: "Bearer vercel" }), true);
  assert.equal(monthlyReports.isAuthorizedMonthlyCronRequest({ ...input, authorization: "Bearer external" }), true);
  assert.equal(monthlyReports.isAuthorizedMonthlyCronRequest({ ...input, authorization: "Bearer wrong" }), false);
});

test("monthly report configuration requires an explicit recipient", () => {
  assert.throws(
    () => monthlyReports.getMonthlyStatReportConfig({
      STAT_REPORT_UMAMI_URL: "https://analytics.example.com",
      STAT_REPORT_UMAMI_PASSWORD: "secret",
    }),
    /STAT_REPORT_EMAIL_TO or RESEND_TO_EMAIL is required/,
  );
});

test("website resolution skips the listing request when every id is configured", async () => {
  const sites = [{ key: "wf", label: "WF", domain: "example.com", websiteId: "wf-id" }];

  const resolved = await monthlyReports.resolveReportSites({
    baseUrl: "https://analytics.example.com",
    token: "token",
    sites,
    fetchImpl: async () => {
      throw new Error("listing should not be requested");
    },
  });

  assert.deepEqual(resolved, sites);
});

test("website resolution preserves configured ids when the listing request fails", async () => {
  const sites = [
    { key: "wf", label: "WF", domain: "example.com", websiteId: "wf-id" },
    { key: "missing", label: "Missing", domain: "missing.example.com" },
  ];

  const resolved = await monthlyReports.resolveReportSites({
    baseUrl: "https://analytics.example.com",
    token: "token",
    sites,
    fetchImpl: async () => {
      throw new Error("Umami unavailable");
    },
  });

  assert.deepEqual(resolved, sites);
});

test("monthly report persists markdown and sends it with a monthly idempotency key", async () => {
  const saves = [];
  const sent = [];
  const fetched = [];

  const result = await processMonthlyStatReport({
    now: new Date("2026-08-25T10:30:00.000Z"),
    sites: [
      {
        key: "webfuengirola",
        label: "Web Fuengirola",
        domain: "webfuengirola.com",
        websiteId: "wf-id",
      },
      {
        key: "conocef",
        label: "Conoce Fuengirola",
        domain: "conocefuengirola.com",
      },
    ],
    fetchSiteSummary: async ({ site, range }) => {
      fetched.push([site.key, range.monthKey]);
      return {
        site,
        status: "ok",
        stats: {
          pageviews: 1200,
          visitors: 420,
          visits: 510,
          bounces: 180,
          totaltime: 3600,
        },
        topPages: [{ x: "/servicios", y: 80 }],
        topReferrers: [{ x: "google.com", y: 44 }],
        topCountries: [{ x: "ES", y: 300 }],
        devices: [{ x: "mobile", y: 260 }],
      };
    },
    saveReport: async (report) => {
      saves.push(report);
      return "supabase:monthly_stat_reports/2026-07";
    },
    sendReport: async (email) => {
      sent.push(email);
    },
    reportTo: "sam@example.com",
  });

  assert.deepEqual(fetched, [["webfuengirola", "2026-07"]]);
  assert.equal(saves.length, 1);
  assert.match(saves[0].markdown, /# Informe estadístico mensual - julio 2026/);
  assert.match(saves[0].markdown, /Web Fuengirola/);
  assert.match(saves[0].markdown, /Conoce Fuengirola/);
  assert.match(saves[0].markdown, /Sin websiteId configurado/);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].idempotencyKey, "monthly-stat-report-2026-07");
  assert.equal(sent[0].to, "sam@example.com");
  assert.equal(result.generated, true);
  assert.equal(result.sent, true);
  assert.equal(result.storageRef, "supabase:monthly_stat_reports/2026-07");
});

test("monthly report renders previous-period deltas from legacy Umami stats", async () => {
  const result = await processMonthlyStatReport({
    now: new Date("2026-08-25T10:30:00.000Z"),
    sites: [
      {
        key: "webfuengirola",
        label: "Web Fuengirola",
        domain: "webfuengirola.com",
        websiteId: "wf-id",
      },
    ],
    fetchSiteSummary: async ({ site }) => ({
      site,
      status: "ok",
      stats: {
        pageviews: { value: 20, prev: 12 },
        visitors: { value: 8, prev: 10 },
        visits: { value: 11, prev: 9 },
        bounces: { value: 3, prev: 4 },
        totaltime: { value: 120, prev: 90 },
      },
      topPages: [],
      topReferrers: [],
      topCountries: [],
      devices: [],
    }),
    saveReport: async (report) => report.markdown,
  });

  assert.match(result.storageRef, /Páginas vistas: 20 \(\+8 vs\. mes anterior\)/);
  assert.match(result.storageRef, /Visitantes: 8 \(-2 vs\. mes anterior\)/);
});

test("monthly report repository upserts one durable row per month", async () => {
  const database = createReportDatabase();
  const repository = createMonthlyStatReportRepository(database);

  const saved = await repository.save({
    monthKey: "2026-07",
    label: "julio 2026",
    markdown: "# Informe julio\n",
    siteReports: [{ site: { key: "webfuengirola" }, status: "ok" }],
    generatedAt: "2026-08-01T09:00:00.000Z",
  });

  assert.equal(saved.storageRef, "supabase:monthly_stat_reports/2026-07");
  assert.deepEqual(database.rows.get("2026-07"), {
    month_key: "2026-07",
    label: "julio 2026",
    markdown: "# Informe julio\n",
    site_reports: [{ site: { key: "webfuengirola" }, status: "ok" }],
    generated_at: "2026-08-01T09:00:00.000Z",
  });
});

test("monthly report repository lists newest month first", async () => {
  const database = createReportDatabase([
    { month_key: "2026-06", label: "junio 2026", markdown: "junio" },
    { month_key: "2026-08", label: "agosto 2026", markdown: "agosto" },
    { month_key: "2026-07", label: "julio 2026", markdown: "julio" },
  ]);
  const repository = createMonthlyStatReportRepository(database);

  const reports = await repository.list();

  assert.deepEqual(reports.map((report) => report.month_key), ["2026-08", "2026-07", "2026-06"]);
});

test("monthly report repository surfaces Supabase write failures", async () => {
  const database = {
    from() {
      return {
        upsert() {
          return {
            select() {
              return {
                async single() {
                  return { data: null, error: { message: "database unavailable" } };
                },
              };
            },
          };
        },
      };
    },
  };
  const repository = createMonthlyStatReportRepository(database);

  await assert.rejects(
    repository.save({
      monthKey: "2026-07",
      label: "julio 2026",
      markdown: "# Informe julio\n",
      siteReports: [],
      generatedAt: "2026-08-01T09:00:00.000Z",
    }),
    /Save monthly stat report: database unavailable/,
  );
});

test("monthly report repository claims delivery once and persists completion", async () => {
  const database = createReportDatabase();
  const repository = createMonthlyStatReportRepository(database);
  await repository.save({
    monthKey: "2026-07",
    label: "julio 2026",
    markdown: "# Informe julio\n",
    siteReports: [],
    generatedAt: "2026-08-01T09:00:00.000Z",
  });

  assert.equal(await repository.claimDelivery({ monthKey: "2026-07", claimToken: "claim-1", emailTo: "admin@example.com" }), true);
  assert.equal(await repository.claimDelivery({ monthKey: "2026-07", claimToken: "claim-2", emailTo: "admin@example.com" }), false);

  await repository.completeDelivery({
    monthKey: "2026-07",
    claimToken: "claim-1",
    sentAt: "2026-08-01T09:01:00.000Z",
    messageId: "email-1",
  });

  assert.equal(await repository.claimDelivery({ monthKey: "2026-07", claimToken: "claim-3", emailTo: "admin@example.com" }), false);
  assert.equal(database.rows.get("2026-07").email_message_id, "email-1");
});

test("accepted email with failed completion keeps its claim and is not released", async () => {
  let released = false;

  await assert.rejects(
    monthlyReports.deliverMonthlyStatReport({
      monthKey: "2026-07",
      emailTo: "admin@example.com",
      claimToken: "claim-1",
      claimDelivery: async () => true,
      send: async () => ({ id: "email-1" }),
      completeDelivery: async () => {
        throw new Error("database unavailable");
      },
      releaseDelivery: async () => {
        released = true;
      },
    }),
    /Email accepted but completion failed: database unavailable/,
  );

  assert.equal(released, false);
});
