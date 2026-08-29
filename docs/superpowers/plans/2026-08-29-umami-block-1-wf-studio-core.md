# Umami Block 1: WF Studio Dual-Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify the reusable WF Studio server core that reads panel analytics from the personal and Agama Umami instances, and migrate the monthly report to that dual-source core.

**Architecture:** A pure ESM module owns the site registry, environment compatibility, Umami API calls, normalization, comparison ranges, and source isolation. A thin Next.js server module adds five-minute caching for later UI blocks. The existing monthly report imports this core and keeps its persistence and email behavior unchanged.

**Tech Stack:** Next.js 15, TypeScript, Node ESM, Node test runner, Umami REST API, existing Supabase report repository.

**Spec:** `docs/superpowers/specs/2026-08-29-umami-all-panels-design.md`

## Global Constraints

- `personal` uses `https://analytics.187.124.55.36.sslip.io`.
- `agama` uses `https://analytics.2.24.10.239.sslip.io` and is restricted to Agama/TodoPlástico.
- Umami credentials remain server-only; no password or token may use a `NEXT_PUBLIC_` variable.
- Default dashboard range is 30 days compared with the immediately preceding 30 days.
- Cache lifetime is exactly 300 seconds.
- Failure of one connection or site must not fail results from other sites.
- Existing `STAT_REPORT_UMAMI_*` production variables remain supported during migration.
- TodoPlástico's own analytics implementation is not modified in this block.
- Before each commit, run tests, lint, typecheck, build, `git diff --check`, and a secret scan.

## File Structure

- Create `apps/studio-panel/src/lib/analytics/umami-core.mjs`: pure registry, configuration, API client, range, normalization, source grouping, and aggregation.
- Create `apps/studio-panel/src/lib/analytics/umami-core-module.d.ts`: TypeScript declarations for the ESM core.
- Create `apps/studio-panel/src/lib/data/umami-dashboard.ts`: server-only cached facade for future panel components.
- Create `apps/studio-panel/tests/umami-core.test.mjs`: behavior tests for registry, source isolation, compatibility, range, API normalization, and partial failure.
- Modify `apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs`: consume and re-export shared analytics behavior while retaining report rendering/delivery.
- Modify `apps/studio-panel/src/lib/cron/monthly-stat-reports-module.d.ts`: align shared analytics types.
- Modify `apps/studio-panel/src/app/api/monthly-stat-reports/route.ts`: fetch all configured sites through the dual-source core.
- Modify `apps/studio-panel/tests/monthly-stat-reports.test.mjs`: expect the expanded registry and dual-source partial failures.
- Modify `apps/studio-panel/.env.example`: document new server variables and legacy compatibility.
- Modify `apps/studio-panel/README.md` and `apps/studio-panel/ADMIN_PANEL_OPERATIONS.md`: document the two-instance contract and deployment checks.

---

### Task 1: Site registry and environment contract

**Files:**
- Create: `apps/studio-panel/src/lib/analytics/umami-core.mjs`
- Create: `apps/studio-panel/src/lib/analytics/umami-core-module.d.ts`
- Create: `apps/studio-panel/tests/umami-core.test.mjs`

**Interfaces:**
- Produces: `getConfiguredUmamiSites(env): UmamiSite[]`
- Produces: `getUmamiConnections(env): Record<'personal' | 'agama', UmamiConnection>`
- Produces: `getPanelUmamiSites(panelKey, sites): UmamiSite[]`
- `UmamiSite`: `{ key, label, domain, source, panelKey, websiteId? }`
- `UmamiConnection`: `{ source, baseUrl?, username, password? }`

- [ ] **Step 1: Write failing registry tests**

```js
test('every WF Studio panel maps to at least one Umami site', () => {
  const sites = getConfiguredUmamiSites({});
  for (const panel of ['wf-studio', 'vivir', 'conoce', 'samuel-coach', 'vokabel-world', 'superentrenador', 'todoplastico']) {
    assert.ok(getPanelUmamiSites(panel, sites).length > 0, panel);
  }
});

test('TodoPlastico is isolated on agama and personal sites never use agama', () => {
  const sites = getConfiguredUmamiSites({});
  assert.equal(sites.find((site) => site.key === 'todoplastico').source, 'agama');
  assert.equal(sites.filter((site) => site.source === 'agama').length, 1);
});

test('new variables override legacy monthly-report variables', () => {
  const connections = getUmamiConnections({
    UMAMI_PERSONAL_URL: 'https://new.example',
    UMAMI_PERSONAL_PASSWORD: 'new-secret',
    STAT_REPORT_UMAMI_URL: 'https://legacy.example',
    STAT_REPORT_UMAMI_PASSWORD: 'legacy-secret',
  });
  assert.equal(connections.personal.baseUrl, 'https://new.example');
  assert.equal(connections.personal.password, 'new-secret');
});
```

- [ ] **Step 2: Run tests and verify RED**

Run from `apps/studio-panel`:

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/umami-core.test.mjs
```

Expected: FAIL because `umami-core.mjs` and its exports do not exist.

- [ ] **Step 3: Implement the complete registry and compatibility rules**

Registry keys must be exactly:

```js
[
  ['webfuengirola', 'Web Fuengirola', 'webfuengirola.com', 'personal', 'wf-studio'],
  ['vivirenfuengirola', 'Vivir en Fuengirola', 'vivirenfuengirola.com', 'personal', 'vivir'],
  ['conocef', 'Conoce Fuengirola', 'conocefuengirola.com', 'personal', 'conoce'],
  ['topfuengirola', 'Top Fuengirola', 'topfuengirola.com', 'personal', 'reports-only'],
  ['samuelcoachdealeman', 'Samuel Coach de Alemán', 'samuelcoachdealeman.com', 'personal', 'samuel-coach'],
  ['vikingfitness', 'Viking Fitness', 'vikingfitness.es', 'personal', 'reports-only'],
  ['personaltrainerfuengirola', 'Personal Trainer Fuengirola', 'personaltrainerfuengirola.com', 'personal', 'reports-only'],
  ['gimnasionuevoestilo', 'Gimnasio Nuevo Estilo', 'gimnasionuevoestilo.com', 'personal', 'reports-only'],
  ['vokabellab', 'VokabelLab', 'vokabellab.com', 'personal', 'vokabel-world'],
  ['imkontext', 'imKontext', 'imkontext.vokabellab.com', 'personal', 'vokabel-world'],
  ['derdiedas', 'Der Die Das', 'derdiedas.vokabellab.com', 'personal', 'vokabel-world'],
  ['superentrenador', 'Superentrenador', 'superentrenador.com', 'personal', 'superentrenador'],
  ['coachstudio', 'Coach Studio', 'coach.superentrenador.com', 'personal', 'superentrenador'],
  ['todoplastico', 'TodoPlástico', 'todo-plastico.com', 'agama', 'todoplastico'],
]
```

Website IDs use `UMAMI_WEBSITE_ID_<UPPER_KEY>` first and `STAT_REPORT_UMAMI_WEBSITE_ID_<UPPER_KEY>` second. Personal connection values use new variables first and legacy `STAT_REPORT_UMAMI_*` second. Agama has no personal/legacy fallback.

- [ ] **Step 4: Run registry tests and verify GREEN**

Run the command from Step 2. Expected: PASS.

- [ ] **Step 5: Run the existing monthly report tests**

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/monthly-stat-reports.test.mjs
```

Expected: PASS because the existing cron has not yet been migrated.

### Task 2: Umami API client, range, normalization, and partial failure

**Files:**
- Modify: `apps/studio-panel/src/lib/analytics/umami-core.mjs`
- Modify: `apps/studio-panel/src/lib/analytics/umami-core-module.d.ts`
- Modify: `apps/studio-panel/tests/umami-core.test.mjs`

**Interfaces:**
- Consumes: `UmamiSite`, `UmamiConnection` from Task 1.
- Produces: `getTrailingComparisonRange(now, days): UmamiRange`
- Produces: `fetchUmamiPanelData({ connection, sites, range, fetchImpl }): Promise<UmamiSiteReport[]>`
- Produces: `fetchAllUmamiPanelData({ connections, sites, range, fetchImpl }): Promise<UmamiSiteReport[]>`
- `UmamiRange`: `{ startAt, endAt, previousStartAt, previousEndAt, days }`
- `UmamiSiteReport`: success `{ site, status:'ok', stats, previousStats, series, topPages, topReferrers }`; failure `{ site, status:'missing_connection'|'missing_website_id'|'error', message }`.

- [ ] **Step 1: Write failing API and isolation tests**

Tests must prove:

```js
test('30-day range ends now and compares the preceding 30 days', () => {
  const now = new Date('2026-08-29T12:00:00.000Z');
  const range = getTrailingComparisonRange(now, 30);
  assert.equal(range.endAt, now.getTime());
  assert.equal(range.startAt, now.getTime() - 30 * 86400000);
  assert.equal(range.previousEndAt, range.startAt - 1);
  assert.equal(range.previousStartAt, range.previousEndAt - 30 * 86400000);
});

test('failure of personal does not discard agama results', async () => {
  const reports = await fetchAllUmamiPanelData({ connections, sites, range, fetchImpl });
  assert.equal(reports.find((report) => report.site.source === 'personal').status, 'error');
  assert.equal(reports.find((report) => report.site.source === 'agama').status, 'ok');
});
```

The fake fetch must assert that personal and Agama logins use their own URL and credentials, and that no request crosses sources.

- [ ] **Step 2: Run tests and verify RED**

Run the focused test command from Task 1. Expected: FAIL because range and fetch functions are missing.

- [ ] **Step 3: Implement API calls**

For each configured site, request:

```text
POST /api/auth/login
GET /api/websites/{id}/stats?startAt=...&endAt=...
GET /api/websites/{id}/stats?startAt=<previousStartAt>&endAt=<previousEndAt>
GET /api/websites/{id}/pageviews?startAt=...&endAt=...&unit=day&timezone=Europe/Madrid
GET /api/websites/{id}/metrics?startAt=...&endAt=...&type=url&limit=8
GET /api/websites/{id}/metrics?startAt=...&endAt=...&type=referrer&limit=8
```

Authenticate once per source per load. If a connection is incomplete, return `missing_connection` for its sites without making a request. If an individual request fails, return `error` only for that site.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run the focused command from Task 1. Expected: PASS.

### Task 3: Five-minute cached server facade

**Files:**
- Create: `apps/studio-panel/src/lib/data/umami-dashboard.ts`
- Modify: `apps/studio-panel/src/lib/analytics/umami-core-module.d.ts`
- Modify: `apps/studio-panel/tests/umami-core.test.mjs`

**Interfaces:**
- Consumes: `getConfiguredUmamiSites`, `getUmamiConnections`, `getPanelUmamiSites`, `getTrailingComparisonRange`, `fetchAllUmamiPanelData`.
- Produces: `getPanelAnalytics(panelKey: PanelKey): Promise<UmamiSiteReport[]>`.
- Produces: `getAllAnalytics(): Promise<UmamiSiteReport[]>`.

- [ ] **Step 1: Add a failing source-contract test**

Read `src/lib/data/umami-dashboard.ts` and assert it contains `unstable_cache`, `revalidate: 300`, and calls the shared ESM core. The production change that makes this test pass is creating the server-only cached facade.

- [ ] **Step 2: Run the focused test and verify RED**

Expected: FAIL with `ENOENT` for `umami-dashboard.ts`.

- [ ] **Step 3: Implement the facade**

Use `unstable_cache` with a stable key prefix `umami-dashboard-v1` and `revalidate: 300`. `getPanelAnalytics` filters by `panelKey`; `getAllAnalytics` uses every configured site. Both construct all environment-dependent values only inside the cached server function.

- [ ] **Step 4: Run focused tests and typecheck**

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/umami-core.test.mjs
./node_modules/.bin/tsc --noEmit
```

Expected: both PASS.

### Task 4: Migrate the monthly report to both sources

**Files:**
- Modify: `apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs`
- Modify: `apps/studio-panel/src/lib/cron/monthly-stat-reports-module.d.ts`
- Modify: `apps/studio-panel/src/app/api/monthly-stat-reports/route.ts`
- Modify: `apps/studio-panel/tests/monthly-stat-reports.test.mjs`

**Interfaces:**
- Consumes: shared site registry, connections, and fetch functions.
- Preserves: `processMonthlyStatReport`, durable Supabase upsert, delivery claims, Resend idempotency key, and route authorization.
- Produces: one monthly report containing results from both sources with per-site status.

- [ ] **Step 1: Change tests first**

Update the registry expectation from eight sites to fourteen and assert:

```js
assert.equal(sites.find((site) => site.key === 'todoplastico').source, 'agama');
assert.equal(sites.find((site) => site.key === 'webfuengirola').source, 'personal');
```

Add a route-level dependency test proving one missing source produces stored error rows while the configured source is still fetched and saved.

- [ ] **Step 2: Run monthly tests and verify RED**

Expected: FAIL because the cron still has its private eight-site registry and single connection.

- [ ] **Step 3: Replace private registry/API helpers with shared imports**

Keep compatibility re-exports for existing tests and callers. Change the route to obtain both connections and call the shared multi-source fetcher. Preserve the existing recipient requirement and the `monthly-stat-report-YYYY-MM` delivery key.

- [ ] **Step 4: Run monthly and core tests**

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/umami-core.test.mjs tests/monthly-stat-reports.test.mjs
```

Expected: PASS.

### Task 5: Environment contract, operations documentation, and block verification

**Files:**
- Modify: `apps/studio-panel/.env.example`
- Modify: `apps/studio-panel/README.md`
- Modify: `apps/studio-panel/ADMIN_PANEL_OPERATIONS.md`
- Modify: `docs/superpowers/plans/2026-08-29-umami-block-1-wf-studio-core.md`

**Interfaces:**
- Documents all environment names used by Tasks 1-4.
- Produces a deploy checklist for Coolify without containing secret values.

- [ ] **Step 1: Add documentation validation to the existing test**

Extend `tests/umami-core.test.mjs` to assert `.env.example` contains both connection prefixes, every `UMAMI_WEBSITE_ID_*` key, the two fixed VPS URLs, and no populated password.

- [ ] **Step 2: Run the focused test and verify RED**

Expected: FAIL because the new variables are not documented.

- [ ] **Step 3: Update environment and operations docs**

Document new variables, five-minute caching, source ownership, legacy fallbacks, and the rule that TodoPlástico remains on Agama. Do not include real passwords or tokens.

- [ ] **Step 4: Run the full verification gate**

From `apps/studio-panel`:

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/*.test.mjs
./node_modules/.bin/eslint src
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/next build
```

From repository root:

```bash
git diff --check
rg -n --hidden --glob '!node_modules/**' --glob '!.git/**' --glob '!apps/studio-panel/.next/**' '(UMAMI_(PERSONAL|AGAMA)_PASSWORD=.+|STAT_REPORT_UMAMI_PASSWORD=.+|Bearer [A-Za-z0-9_-]{20,})' apps/studio-panel docs
git status --short --branch
```

Expected: 0 test failures, lint/typecheck/build exit 0, no whitespace errors, no populated secrets, and only Block 1 files modified.

- [ ] **Step 5: Review the Block 1 diff**

Verify manually that TodoPlástico uses `agama`, every other registered site uses `personal`, credentials are server-only, and all monthly persistence/email logic remains present.

- [ ] **Step 6: Commit only after explicit user authorization**

```bash
git add apps/studio-panel/.env.example apps/studio-panel/README.md apps/studio-panel/ADMIN_PANEL_OPERATIONS.md apps/studio-panel/src/lib/analytics/umami-core.mjs apps/studio-panel/src/lib/analytics/umami-core-module.d.ts apps/studio-panel/src/lib/data/umami-dashboard.ts apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs apps/studio-panel/src/lib/cron/monthly-stat-reports-module.d.ts apps/studio-panel/src/app/api/monthly-stat-reports/route.ts apps/studio-panel/tests/umami-core.test.mjs apps/studio-panel/tests/monthly-stat-reports.test.mjs docs/superpowers/plans/2026-08-29-umami-block-1-wf-studio-core.md
git commit -m "feat: add dual-source Umami analytics core"
```

Do not push until separately authorized.
