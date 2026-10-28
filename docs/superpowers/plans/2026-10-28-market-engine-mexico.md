# Market Engine and Mexico Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the reusable market, currency, navigation, contact, and SEO foundation and publish the first independent market site at `/mexico/` and `/mexico/en/`.

**Architecture:** Keep the existing static HTML and Node.js generator architecture. Add focused market configuration, pricing, exchange-rate snapshot, content, and rendering modules instead of expanding the Fuengirola-only commercial catalog; generated market pages will reuse the current CSS, analytics adapter, contact endpoint, and brand assets.

**Tech Stack:** Node.js 22, ECMAScript modules, static HTML/CSS/JavaScript, Node test runner, Playwright, existing Nginx container.

**Spec:** `docs/superpowers/specs/2026-10-28-wf-studio-mercados-internacionales-design.md`

## Global Constraints

- The root repository and `origin` remain the source of truth; do not modify `apps/studio-panel` or the separate `wf-studio-panel` repository.
- Preserve `/`, `/en/`, `/de/`, and `/fi/` as the Spain/Fuengirola market and preserve their current languages.
- Mexico routes are `/mexico/` (`es-MX`) and `/mexico/en/` (`en-MX`).
- The EUR package prices remain the single pricing source: Lite 200, Express 350, Professional 600.
- Every non-EUR exact price is `EUR base × current ECB rate × 1.05`.
- MXN display prices always round upward to the next 100 pesos.
- Do not claim a Mexico office, address, local staff, accreditation, or unverified European hosting.
- The public site remains static and gains no checkout; final invoicing/payment recalculation remains outside this repository.
- Do not add Chinese or Australia.
- Generated HTML is output, not an independently edited source of truth.

## Review Focus

- Missing, zero, negative, malformed, or stale exchange rates must never silently produce a price; Task 1 and Task 2 pin rejection and fallback behavior.
- Regional locales such as `es-MX` and `en-MX` must receive the correct base-language validation messages rather than silently falling back to the wrong language; Task 5 tests this.
- A failed ECB request or incomplete ECB response must not overwrite the last valid snapshot; Task 2 tests atomic preservation.
- Market and language switching must never send a Mexico visitor to an unrelated Fuengirola translation; Task 4 tests route targets and current-state labels.
- Markets configured for later phases must remain absent from public selectors until their pages are publication-ready; Task 1 and Task 4 test the `published` state.
- Contact and analytics metadata must preserve market, locale, currency, plan, sector, and source URL without requiring an unsupported backend schema; Task 5 tests the exact serialized metadata.

---

### Task 1: Market configuration and pricing domain

**Files:**

- Create: `data/markets-data.mjs`
- Create: `data/exchange-rates.json`
- Create: `lib/market-pricing.mjs`
- Create: `tests/market-config.test.mjs`
- Create: `tests/market-pricing.test.mjs`

**Interfaces:**

- Produces: `markets`, `marketOrder`, `getMarket(marketKey)`, `getPublishedMarkets()`, and `getMarketLocale(marketKey, localeCode)` from `data/markets-data.mjs`.
- Produces: `convertEurPrice({ eurAmount, rate, increment, markup }) -> { exact, display }` and `priceForMarket({ eurAmount, marketKey, snapshot }) -> { currency, rate, rateDate, exact, display }` from `lib/market-pricing.mjs`.
- Snapshot schema: `{ base: "EUR", date: "YYYY-MM-DD", rates: { USD: number, MXN: number, BRL: number } }`.
- Consumes later: Tasks 2–6 and the USA/Brasil plans import these exact exports.

- [ ] **Step 1: Write the failing market configuration tests**

Assert that `spain`, `mexico`, `usa`, and `brasil` exist in `marketOrder`; Spain and Mexico are `published: true` while USA and Brasil are `published: false`; Mexico has primary locale `es-MX`, routes `{"es-MX":"/mexico/","en-MX":"/mexico/en/"}`, currency `MXN`, and rounding increment `100`; every configured route is unique; `getPublishedMarkets()` returns only Spain and Mexico; unknown market and locale lookups throw descriptive errors.

- [ ] **Step 2: Run the configuration tests and verify failure**

Run: `node --test tests/market-config.test.mjs`

Expected: FAIL because `data/markets-data.mjs` does not exist.

- [ ] **Step 3: Implement the market configuration module**

Add the exact four-market registry and lookup interfaces above. Spain records its existing routes and EUR currency, while USA and Brasil are configuration-only until their later plans provide pages.

- [ ] **Step 4: Run the configuration tests and verify success**

Run: `node --test tests/market-config.test.mjs`

Expected: PASS.

- [ ] **Step 5: Write the failing pricing tests**

Using fixture rates `USD=1.1150`, `MXN=20.7800`, and `BRL=5.9624`, assert:

- `200 EUR -> MXN exact 4363.8, display 4400`;
- `350 EUR -> MXN exact 7636.65, display 7700`;
- `600 EUR -> MXN exact 13091.4, display 13100`;
- the shared helper yields USD display `235/410/705` and BRL display `1260/2200/3760`;
- exact prices retain calculation precision while display prices use `Math.ceil(exact / increment) * increment`;
- `markup` defaults to `0.05`;
- non-finite, zero, or negative amount/rate/increment inputs throw;
- a snapshot missing the requested market currency throws rather than falling back to EUR.

- [ ] **Step 6: Run the pricing tests and verify failure**

Run: `node --test tests/market-pricing.test.mjs`

Expected: FAIL because the pricing module and snapshot do not exist.

- [ ] **Step 7: Implement pricing and seed the exchange-rate snapshot**

Implement only the two exported pricing functions. Seed `data/exchange-rates.json` with the latest verified ECB reference values available at implementation time and an explicit `date`; never fetch during module import or browser rendering.

- [ ] **Step 8: Run Task 1 tests**

Run: `node --test tests/market-config.test.mjs tests/market-pricing.test.mjs`

Expected: PASS.

- [ ] **Step 9: Commit Task 1**

```bash
git add data/markets-data.mjs data/exchange-rates.json lib/market-pricing.mjs tests/market-config.test.mjs tests/market-pricing.test.mjs
git commit -m "feat: add international market pricing model"
```

### Task 2: Reproducible ECB exchange-rate updater

**Files:**

- Create: `scripts/update-exchange-rates.mjs`
- Create: `tests/exchange-rates.test.mjs`
- Create: `tests/fixtures/ecb-eurofxref-daily.xml`
- Modify: `package.json:5-22`

**Interfaces:**

- Consumes: the snapshot schema from Task 1.
- Produces: `parseEcbRates(xmlText) -> { date, rates }`, `buildExchangeRateSnapshot(xmlText, requiredCurrencies) -> snapshot`, and `updateExchangeRates({ fetchImpl, outputFile }) -> snapshot`.
- Produces command: `npm run rates:update`.

- [ ] **Step 1: Add a minimal official-format ECB XML fixture and failing parser tests**

Assert the fixture yields its exact date and numeric USD/MXN/BRL values; malformed XML, absent date, non-numeric values, and any missing required currency throw descriptive errors.

- [ ] **Step 2: Run the parser tests and verify failure**

Run: `node --test tests/exchange-rates.test.mjs`

Expected: FAIL because the updater does not exist.

- [ ] **Step 3: Implement pure parsing and snapshot validation**

Parse the ECB daily XML without adding a dependency. `buildExchangeRateSnapshot` must return only `{base,date,rates}` for the required currencies and reject incomplete data.

- [ ] **Step 4: Add failing update/preservation tests**

Using injected `fetchImpl` and a temporary output path, assert a successful response writes a formatted JSON snapshot; HTTP failure, parse failure, or missing currency leaves an existing valid file byte-for-byte unchanged; no test performs a real network request.

- [ ] **Step 5: Implement atomic update behavior**

Fetch the official ECB daily XML URL, validate the complete snapshot, write a sibling temporary file, then rename it over the destination only after validation succeeds.

- [ ] **Step 6: Add the package command and syntax check**

Add `"rates:update": "node scripts/update-exchange-rates.mjs"` and include the new script in `npm run check`.

- [ ] **Step 7: Run Task 2 tests**

Run: `node --test tests/exchange-rates.test.mjs && npm run check`

Expected: all tests and syntax checks PASS.

- [ ] **Step 8: Commit Task 2**

```bash
git add scripts/update-exchange-rates.mjs tests/exchange-rates.test.mjs tests/fixtures/ecb-eurofxref-daily.xml package.json
git commit -m "feat: add safe ECB rate updates"
```

### Task 3: Mexico content model and static page renderer

**Files:**

- Create: `data/market-pages-data.mjs`
- Create: `scripts/build-market-pages.mjs`
- Create: `tests/market-pages.test.mjs`
- Modify: `package.json:5-22`

**Interfaces:**

- Consumes: `markets`, `getMarket`, `priceForMarket`, the approved tier prices from `data/commercial-pages-data.mjs`, and `data/exchange-rates.json`.
- Produces: `marketPages`, `getMarketPage(marketKey, localeCode)`, `renderMarketHreflang(marketKey)`, `renderMarketTierCards(page, snapshot)`, `renderMarketPage(page, snapshot)`, and `generateMarketPages(outputRoot, { marketKeys, snapshot })`.
- Page content contract: `{ marketKey, localeCode, route, htmlLang, ogLocale, title, description, h1, intro, problems[3], benefits[3], tierUses[3], faqs[3], labels, whatsappText }`.

- [ ] **Step 1: Write failing content completeness tests**

Assert Mexico exposes exactly `es-MX` and `en-MX`; every content array has the required length; copy names México/Mexico and Europe appropriately; neither version claims a Mexico address, office, local team, accreditation, or guaranteed result; Spanish and English texts are materially localized rather than identical strings.

- [ ] **Step 2: Run the content tests and verify failure**

Run: `node --test tests/market-pages.test.mjs`

Expected: FAIL because market page data and renderer do not exist.

- [ ] **Step 3: Draft the Mexico content records**

Write original `es-MX` and `en-MX` copy covering the market proposition, remote European delivery, three packages, verifiable portfolio, process, FAQs, and contact. Mention European servers only if a repository/deployment fact verifies that claim; otherwise use the broader verified formulation “European studio and working standards”.

- [ ] **Step 4: Add failing renderer assertions**

For both Mexico pages, assert:

- correct `lang`, canonical, Open Graph locale, reciprocal `hreflang` (`es-MX`, `en-MX`) and Mexico-primary `x-default`;
- `data-market="mexico"`, regional locale, and `areaServed: "Mexico"`;
- MXN symbols and display values `4400/7700/13100` for the fixture snapshot;
- no `€`, `+ IVA`, `+ VAT`, Mexico street address, or “based in Mexico” wording;
- a visible exchange-rate date/note and neutral tax wording;
- contact form attributes carry market, locale, currency, and source route;
- language links remain inside `/mexico/`.

- [ ] **Step 5: Implement the market renderer and generator**

Use existing CSS class names and public assets, but render market-specific header text, sections, prices, JSON-LD, footer, contact form, canonical, and alternates from the new data contracts. Do not import Fuengirola copy from `makeContent`.

- [ ] **Step 6: Add the build command**

Add `"build:markets": "node scripts/build-market-pages.mjs"`; do not yet add it to `build:all` until Task 6 completes integration.

- [ ] **Step 7: Run Task 3 tests**

Run: `node --test tests/market-pages.test.mjs && npm run check`

Expected: PASS.

- [ ] **Step 8: Commit Task 3**

```bash
git add data/market-pages-data.mjs scripts/build-market-pages.mjs tests/market-pages.test.mjs package.json
git commit -m "feat: generate localized Mexico market pages"
```

### Task 4: Market-aware navigation

**Files:**

- Modify: `scripts/site-navigation.mjs:11-164`
- Modify: `scripts/build-commercial-pages.mjs:53-90,572-678`
- Modify: `scripts/build-market-pages.mjs`
- Modify: `style.css`
- Create: `tests/market-navigation.test.mjs`
- Modify: `tests/public-navigation.test.mjs`

**Interfaces:**

- Consumes: `markets` and market route/label data from Task 1.
- Produces: `renderMarketSelector({ currentMarket, localeCode }) -> string`.
- Extends: `renderSiteHeader({ locale, pathname, languageMenu, marketMenu })` while preserving all existing callers.

- [ ] **Step 1: Write failing selector and backward-compatibility tests**

Assert Spain and Mexico selectors link only to `/` and `/mexico/` while USA and Brasil are unpublished; current market receives `aria-current`; Mexico language switching targets only `/mexico/` and `/mexico/en/`; current Spain headers still render unchanged when `marketMenu` is omitted; regional locale parsing does not break `normalizeSiteHeader`.

- [ ] **Step 2: Run the navigation tests and verify failure**

Run: `node --test tests/market-navigation.test.mjs tests/public-navigation.test.mjs`

Expected: FAIL on the missing selector interfaces.

- [ ] **Step 3: Implement the market selector and optional header slot**

Render an accessible `<details>` market selector next to the language selector. Keep locale and market labels separate, add `data-analytics-event="market_switch"`, `data-analytics-market`, and `data-analytics-target-market`, and preserve the current header when no market menu is supplied.

- [ ] **Step 4: Wire the selector into generated Spain and Mexico pages**

Spain commercial pages use `currentMarket="spain"`; Mexico pages use `currentMarket="mexico"`. Do not run a repository-wide rewrite over unrelated historical/manual pages.

- [ ] **Step 5: Add focused responsive styles**

Style the new selector by extending the existing language-menu patterns; verify the two controls fit the mobile header without reducing tap targets below the existing controls.

- [ ] **Step 6: Run Task 4 tests**

Run: `node --test tests/market-navigation.test.mjs tests/public-navigation.test.mjs tests/commercial-renderer.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit Task 4**

```bash
git add scripts/site-navigation.mjs scripts/build-commercial-pages.mjs scripts/build-market-pages.mjs style.css tests/market-navigation.test.mjs tests/public-navigation.test.mjs
git commit -m "feat: add market-aware site navigation"
```

### Task 5: Regional contact and analytics metadata

**Files:**

- Modify: `contact-form-core.js:8-151`
- Modify: `contact-form.js:68-201`
- Modify: `script.js:1836-1869`
- Modify: `tests/contact-form-core.test.mjs`
- Modify: `tests/commercial-analytics.test.mjs`
- Create: `tests/market-contact.test.mjs`

**Interfaces:**

- Produces: `baseLocale(locale) -> "es"|"en"|"de"|"fi"|"pt"` and regional-safe `localeMessages(locale)` from `contact-form-core.js`.
- Consumes form attributes: `data-form-market`, `data-form-locale`, and `data-form-currency`.
- Serializes message prefix: `[Market: mexico] [Locale: es-MX] [Currency: MXN] [Plan: ...] [Sector: ...]` before the user message.

- [ ] **Step 1: Write failing regional locale tests**

Assert `localeMessages("es-MX")` returns Spanish copy, `localeMessages("en-MX")` returns English copy, and unsupported locales use the documented Spanish fallback without throwing.

- [ ] **Step 2: Run the contact core tests and verify failure**

Run: `node --test tests/contact-form-core.test.mjs`

Expected: FAIL because regional locale normalization is missing.

- [ ] **Step 3: Implement `baseLocale` and regional message lookup**

Normalize BCP-47 tags by their first subtag while preserving existing `es`, `en`, `de`, and `fi` behavior.

- [ ] **Step 4: Write failing contact serialization and analytics tests**

Assert Mexico submissions retain the existing backend JSON keys only, prepend the exact structured market/locale/currency/plan/sector metadata to `message`, keep `pageUrl`, and emit `market` plus `currency` in form analytics. Assert click analytics emits current and target market for `market_switch` without removing locale/tier/sector fields.

- [ ] **Step 5: Implement market metadata without changing the backend contract**

Read market and currency from form/body data attributes, validate them against conservative token patterns, prepend metadata to `fullMessage`, and add fields only to analytics events—not the `/api/contact` JSON schema.

- [ ] **Step 6: Run Task 5 tests**

Run: `node --test tests/contact-form-core.test.mjs tests/commercial-analytics.test.mjs tests/market-contact.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit Task 5**

```bash
git add contact-form-core.js contact-form.js script.js tests/contact-form-core.test.mjs tests/commercial-analytics.test.mjs tests/market-contact.test.mjs
git commit -m "feat: track market context in leads"
```

### Task 6: Build, container, sitemap, and browser verification for Mexico

**Files:**

- Modify: `package.json:5-22`
- Modify: `Dockerfile.web:8-60`
- Create (generated): `mexico/index.html`
- Create (generated): `mexico/en/index.html`
- Modify (generated): `index.html` and Spain commercial pages touched by the generator
- Modify (generated): `sitemap.xml`
- Create: `tests/markets.spec.js`
- Modify: `tests/seo.spec.js`

**Interfaces:**

- Consumes: all outputs from Tasks 1–5.
- Produces: `npm run build:markets` as part of `npm run build:all`; container output includes `/mexico`; canonical sitemap includes both Mexico routes.

- [ ] **Step 1: Write failing build/container integration tests**

Assert `build:all` runs `build:markets` before `build:sitemap`; `npm run check` includes the new market and rate scripts; Docker copies `/app/mexico`; the sitemap contains exactly the two canonical Mexico URLs after generation.

- [ ] **Step 2: Run the integration tests and verify failure**

Run: `node --test tests/market-pages.test.mjs tests/sitemap-build.test.mjs`

Expected: FAIL on missing build/container integration or generated pages.

- [ ] **Step 3: Wire the build and container**

Add `build:markets` before `build:sitemap` in `build:all`, extend `check`, and copy `/app/mexico` in `Dockerfile.web`.

- [ ] **Step 4: Generate Mexico pages and sitemap**

Run: `npm run build:commercial && npm run build:markets && npm run build:sitemap`

Expected: Mexico pages are written, Spain generated pages receive the market selector, and sitemap generation reports both new canonical routes.

- [ ] **Step 5: Write browser-level Mexico tests**

In `tests/markets.spec.js`, assert `/mexico/` and `/mexico/en/` load without console/page errors; canonical/hreflang are correct; language and market selectors navigate to the correct routes; MXN prices and date note are visible; the layout has no horizontal overflow at 390px and desktop widths; forms expose correct market/currency attributes.

- [ ] **Step 6: Run browser tests and make only integration fixes**

Run: `npx playwright test tests/markets.spec.js tests/seo.spec.js --project=chromium`

Expected: PASS.

- [ ] **Step 7: Run the complete verification suite**

Run: `npm run check && npm run test:unit && npm test && npm run format:check && npm run lint`

Expected: all commands PASS with no unexpected generated diff outside the files listed by this plan.

- [ ] **Step 8: Review the Mexico copy and evidence gate**

Present the rendered `es-MX` and `en-MX` pages for owner review. Do not index or deploy until the owner confirms the regional copy and every portfolio/infrastructure claim used.

- [ ] **Step 9: Commit Task 6 after copy approval**

```bash
git add package.json Dockerfile.web mexico index.html en de fi sitemap.xml tests/markets.spec.js tests/seo.spec.js
git commit -m "feat: publish WF-Studio Mexico market site"
```
