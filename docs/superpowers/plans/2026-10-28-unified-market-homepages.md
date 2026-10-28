# Unified WF-Studio Market Homepages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and publish nine structurally identical WF-Studio homepages for Spain, Mexico, USA, and Brasil using the current Spanish/Fuengirola homepage as the single visual model.

**Architecture:** Extract the authored Spanish homepage shell into one renderer driven by a market/locale content contract. Keep market pricing, SEO, navigation, contact, and analytics in shared modules; generated route files are outputs only.

**Tech Stack:** Node.js 22, ESM, static HTML/CSS/JavaScript, Node test runner, Playwright, existing Nginx container.

**Spec:** `docs/superpowers/specs/2026-10-28-unified-market-homepages-design.md`

## Global Constraints

- ES/Fuengirola is the single structural and visual reference.
- Publish together: Spain (`es`, `en`, `de`, `fi`), Mexico (`es-MX`, `en-MX`), USA (`en-US`, `es-US`), Brasil (`pt-BR`).
- Preserve EUR base prices and `EUR × ECB rate × 1.05` for MXN, USD, and BRL.
- Never claim local offices, addresses, teams, certifications, or results without evidence.
- Preserve all existing city URLs and do not modify `apps/studio-panel`.
- Every production change follows RED → GREEN and each task receives its own commit.

## Review Focus

- A market switch must preserve a compatible language and use the destination primary locale only when no compatible language exists; Task 1 tests the full matrix.
- All nine outputs must use the reference shell and must not emit `commercial-page--home`; Task 2 tests structural fingerprints.
- Regional copy must never leak Fuengirola, EUR, IVA/VAT, or a false local office into Mexico, USA, or Brasil; Task 3 tests forbidden terms and required market facts.
- SEO alternates must never cross market boundaries; Task 4 tests canonical/hreflang groups and sitemap membership.
- Mobile headers with two selectors must remain usable at 390 px and forms must preserve market metadata; Task 5 tests browser behavior.

---

### Task 1: Published-market registry and locale-preserving routes

**Files:**

- Modify: `data/markets-data.mjs`
- Modify: `scripts/site-navigation.mjs`
- Modify: `tests/market-config.test.mjs`
- Modify: `tests/market-navigation.test.mjs`

**Interfaces:**

- Produces: `getPublishedMarkets()` with all four markets.
- Produces: `resolveMarketRoute({ targetMarket, sourceLocale }) -> string`.
- `renderMarketSelector({ currentMarket, localeCode })` consumes the resolver.

- [ ] Write tests asserting all markets are published and the ES/EN/DE/FI/pt route matrix preserves compatible languages or falls back to the destination primary locale.
- [ ] Run `node --test tests/market-config.test.mjs tests/market-navigation.test.mjs`; expect failures on hidden markets and primary-locale-only links.
- [ ] Implement `resolveMarketRoute` and use it in the selector.
- [ ] Re-run the focused tests; expect PASS.
- [ ] Commit with `feat: publish locale-aware market navigation`.

### Task 2: One reference homepage shell for every locale

**Files:**

- Create: `data/home-pages-data.mjs`
- Create: `scripts/render-homepage.mjs`
- Modify: `templates/home-es.html`
- Modify: `scripts/build-commercial-pages.mjs`
- Modify: `tests/visual-restoration.test.mjs`
- Create: `tests/homepage-model.test.mjs`

**Interfaces:**

- Produces: `homepageRecords`, `getHomepageRecord(marketKey, localeCode)`, `renderHomepage(record, snapshot)`, and `generateHomepages(outputRoot, { snapshot })`.
- Content contract includes route, market, locale, currency, SEO, navigation labels, hero, service cards, proof/case copy, process, contact labels, and footer.

- [ ] Write tests asserting nine complete records and structural parity (`hero--cinematic`, shared section order, one H1, selectors, footer, transition/FAB hooks) with no `commercial-page--home` output.
- [ ] Run the focused tests; expect failure because the shared renderer/data do not exist.
- [ ] Tokenize the Spanish reference shell and implement the minimal renderer preserving its classes and visual assets.
- [ ] Move the Spanish reference copy into the record and add independent EN/DE/FI Spain records.
- [ ] Make the commercial build delegate all home routes to `generateHomepages` while leaving interior commercial pages unchanged.
- [ ] Re-run focused tests; expect PASS.
- [ ] Commit with `feat: unify WF-Studio language homepages`.

### Task 3: Market-specific homepage records and pricing

**Files:**

- Modify: `data/home-pages-data.mjs`
- Modify: `scripts/render-homepage.mjs`
- Modify: `data/market-pages-data.mjs`
- Modify: `tests/homepage-model.test.mjs`
- Modify: `tests/market-pages.test.mjs`

**Interfaces:**

- Consumes: `priceForMarket`, market registry, shared homepage shell.
- Produces the Mexico, USA, and Brasil records and local pricing/cards/forms.

- [ ] Write failing completeness, regional-copy, forbidden-claim, currency, rounding, and contact-attribute tests for `es-MX`, `en-MX`, `en-US`, `es-US`, and `pt-BR`.
- [ ] Run focused tests; expect failure on missing USA/Brasil records and reference-shell output.
- [ ] Add original regional copy and localized labels for all five records, reusing only verified portfolio facts and the approved pricing service.
- [ ] Render regional price and exchange-date information inside the reference service-card model.
- [ ] Re-run focused tests; expect PASS.
- [ ] Commit with `feat: add USA and Brasil market homepages`.

### Task 4: Build, SEO, sitemap, and container integration

**Files:**

- Modify: `scripts/build-market-pages.mjs`
- Modify: `scripts/build-sitemap.mjs`
- Modify: `package.json`
- Modify: `Dockerfile.web`
- Modify: `tests/sitemap-build.test.mjs`
- Modify: `tests/seo.spec.js`
- Generate: `index.html`, `en/index.html`, `de/index.html`, `fi/index.html`, `mexico/**`, `usa/**`, `brasil/**`, `sitemap.xml`

**Interfaces:**

- `build:all` generates all nine homepages before the sitemap.
- Container includes `/mexico`, `/usa`, and `/brasil`.

- [ ] Write failing tests for exact route set, canonical/hreflang isolation, sitemap entries, and Docker copies.
- [ ] Run focused integration tests; expect failure on missing USA/Brasil outputs.
- [ ] Consolidate market/home generation so each route is written once, then update build, sitemap, and container.
- [ ] Generate all outputs and rerun focused tests; expect PASS and deterministic second generation.
- [ ] Commit with `feat: integrate international market homepages`.

### Task 5: Browser verification and owner review gate

**Files:**

- Modify: `tests/markets.spec.js`
- Modify: `tests/navigation-projects.spec.js`
- Modify: `tests/smoke.spec.js`

**Interfaces:**

- Browser contract covers all nine home routes, both selectors, regional metadata, local prices/forms, and responsive layout.

- [ ] Write browser tests for all routes, selector navigation matrix, no page/console errors, reference-shell fingerprints, regional locale/currency, and no horizontal overflow at 390 and 1440 px.
- [ ] Run focused Playwright tests; expect failures before final integration corrections.
- [ ] Make only root-cause integration fixes and rerun focused browser tests; expect PASS.
- [ ] Run `npm run check`, `npm run test:unit`, `npm test`, focused Prettier on changed sources/tests, and `npm run lint`.
- [ ] Present ES/Fuengirola, Mexico, USA, and Brasil previews together for owner approval; do not deploy, push, merge, or index before approval.
- [ ] Commit with `feat: publish unified WF-Studio market sites` only after approval.
