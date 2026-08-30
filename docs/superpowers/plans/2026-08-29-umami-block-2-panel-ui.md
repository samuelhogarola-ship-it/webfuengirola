# Umami Block 2: Premium analytics UI in every WF Studio panel

**Goal:** Show real, resilient Umami analytics in the seven operational WF Studio panels using the dual-source core merged in PR #107.

**Architecture:** A server component streams cached panel analytics behind `Suspense`; a reusable client component owns site switching and presentation. A pure helper module normalizes Umami response shapes, aggregates multi-site totals, computes comparisons, and builds chart/list data. Each page places the block immediately after its operational KPIs.

**Design:** Editorial and minimal: warm white canvas, ink-black typography, restrained emerald accents, generous spacing, fine rules, one calm area chart, and compact ranked lists. Multi-site panels expose an accessible site selector and an aggregate “Todos” view.

## Task 1 — Pure analytics view model

- Add `src/lib/analytics/umami-view-model.mjs` and declarations.
- Normalize numeric and `{ value }` Umami metrics.
- Compute visitors, visits, pageviews, bounce rate, average duration, and previous-period deltas.
- Aggregate daily series, pages, and referrers across healthy sites.
- Preserve explicit unavailable-site states.
- Prove behavior with Node tests before implementation.

## Task 2 — Shared premium component

- Add `src/components/admin/umami-analytics-panel.tsx` as the interactive presentation component.
- Add `src/components/admin/panel-analytics-section.tsx` as the cached server boundary.
- Add `src/components/admin/analytics-skeleton.tsx` for streamed loading.
- Include semantic headings, accessible tabs, chart title/description, ranked lists, source status, 30-day comparison, and direct Umami link.
- Ensure credentials never enter component props or the browser bundle.

## Task 3 — Integrate all seven panels

Add the shared section after operational KPIs in:

1. WF Studio dashboard (`wf-studio`)
2. Vivir en Fuengirola (`vivir`)
3. Conoce Fuengirola (`conoce`)
4. Samuel Coach (`samuel-coach`)
5. Vokabel-World (`vokabel-world`)
6. Superentrenador (`superentrenador`)
7. TodoPlástico (`todoplastico`)

Remove the obsolete “Umami pendiente” notice from Superentrenador because the native shared panel replaces it.

## Task 4 — Reliability and verification

- Add a bounded timeout to every shared Umami request so a stalled VPS becomes a localized error.
- Test timeout cleanup and error isolation.
- Add source-contract tests covering all routes, `Suspense`, the shared component, and server-only URL handling.
- Run the full test suite, ESLint, TypeScript, production build, whitespace checks, and a secret scan.
- Review responsive markup at mobile and desktop widths.
- Commit, push, open a PR, wait for green checks, and merge only with user authorization.
