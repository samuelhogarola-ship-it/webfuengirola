# USA Market Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish WF-Studio USA in American English and Spanish with USD pricing, a New York/New Jersey commercial focus, and coherent treatment of the existing US city pages.

**Architecture:** Extend the market engine delivered by the Mexico plan with USA page records and an explicit USA city-page data source. Keep the indexed city URLs stable in this release, but regenerate their shared commercial elements as USA pages so currency, navigation, tax wording, analytics, and location claims no longer inherit the Fuengirola English market.

**Tech Stack:** Existing static Node.js generators, HTML/CSS/JavaScript, Node test runner, Playwright, existing Nginx container.

**Spec:** `docs/superpowers/specs/2026-10-28-wf-studio-mercados-internacionales-design.md`

## Global Constraints

- Requires the completed and approved `docs/superpowers/plans/2026-10-28-market-engine-mexico.md` interfaces.
- USA routes are `/usa/` (`en-US`) and `/usa/es/` (`es-US`).
- `/usa/` itself is the New York/New Jersey-focused hub; do not create a second competing hub.
- Keep existing city canonical URLs such as `/en/web-design-new-york/` stable in this phase.
- Every USD price is `EUR base × current ECB USD rate × 1.05`, rounded upward to the next 5 dollars.
- Do not use `+ VAT`, claim a USA office, or present the World Cup venue as a business location.
- The final was held in New York/New Jersey; use that fact only as contextual market copy reviewed by the owner.
- Keep the contracting business and contact ownership truthful and European.

## Review Focus

- Existing `/en/web-design-*` city pages must switch to USA market semantics without changing canonical URLs or becoming Fuengirola `hreflang` alternatives.
- City pages must not mix EUR, USD, `+ VAT`, or ambiguous tax language after regeneration.
- “New York/New Jersey” copy must describe a served market, not a physical WF-Studio address or local staff.
- English and Spanish USA pages must remain reciprocal equivalents with correct `en-US`/`es-US` alternates.
- A failed or stale exchange-rate snapshot must use the last validated rate and never silently show EUR as USD.
- USA must not appear in public market selectors until both hub pages are generated and ready to publish.

---

### Task 1: USA hub content and pricing

**Files:**

- Modify: `data/market-pages-data.mjs`
- Modify: `data/markets-data.mjs`
- Modify: `scripts/build-market-pages.mjs`
- Modify: `tests/market-pages.test.mjs`
- Create: `tests/usa-market.test.mjs`

**Interfaces:**

- Consumes: `getMarketPage`, `renderMarketPage`, and `priceForMarket` from the Mexico plan.
- Produces: USA page records for `en-US` and `es-US`; routes `/usa/` and `/usa/es/`.

- [ ] **Step 1: Write failing USA data and renderer tests**

Assert both locales exist while `markets.usa.published` remains `false`; canonical and reciprocal `hreflang` are exact; `en-US` is `x-default`; price displays are `$235/$410/$705` for the fixture rate; JSON-LD uses `areaServed` values `United States`, `New York`, and `New Jersey`; rendered text contains remote European delivery and contains no office/address/local-team claim, euro price, `+ VAT`, or guaranteed ranking/sales promise.

- [ ] **Step 2: Run USA tests and verify failure**

Run: `node --test tests/usa-market.test.mjs`

Expected: FAIL because USA records do not exist.

- [ ] **Step 3: Draft and integrate original USA copy**

Write separate American English and US Spanish records covering remote workflow, package scope, USD pricing, portfolio, FAQs, and the New York/New Jersey focus. Treat the World Cup final as factual context, not proof of presence.

- [ ] **Step 4: Render both USA hub pages**

Extend `generateMarketPages()` so the existing market interfaces produce `/usa/index.html` and `/usa/es/index.html` without special-case template duplication.

- [ ] **Step 5: Run Task 1 tests**

Run: `node --test tests/market-config.test.mjs tests/market-pricing.test.mjs tests/market-pages.test.mjs tests/usa-market.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit Task 1**

```bash
git add data/market-pages-data.mjs data/markets-data.mjs scripts/build-market-pages.mjs tests/market-pages.test.mjs tests/usa-market.test.mjs
git commit -m "feat: add WF-Studio USA market hub"
```

### Task 2: Bring existing USA city pages into the market model

**Files:**

- Create: `data/usa-city-pages-data.mjs`
- Modify: `scripts/build-market-pages.mjs`
- Create: `tests/usa-city-pages.test.mjs`
- Modify generated pages: `en/web-design-{new-york,miami,los-angeles,san-francisco,chicago,houston,boston,washington-dc,atlanta,san-diego,denver}/index.html`

**Interfaces:**

- Produces: `usaCityPages`, `getUsaCityPage(slug)`, `renderUsaCityPage(cityPage, snapshot)`, and city output routes fixed to the existing canonicals.
- Consumes: USA market header, USD pricing, tax note, analytics, portfolio, and contact interfaces from Task 1 and the Mexico plan.

- [ ] **Step 1: Write failing city inventory tests**

Assert the source lists exactly the 11 existing city slugs and unique canonical routes; every city has display name, geographic `areaServed`, intro, problems, benefits, package uses, FAQs, and four related-city slugs that resolve.

- [ ] **Step 2: Run inventory tests and verify failure**

Run: `node --test tests/usa-city-pages.test.mjs`

Expected: FAIL because the city data module does not exist.

- [ ] **Step 3: Extract the existing authored city differences into structured data**

Preserve useful city-specific copy from the current HTML, remove generic Fuengirola navigation/price semantics, and do not manufacture local cases, offices, reviews, or statistics.

- [ ] **Step 4: Add failing city renderer tests**

For every city page, assert stable canonical URL; `lang="en-US"`; `data-market="usa"`; USD package displays; neutral tax note; `/usa/` hub link; market selector current state USA; local city `areaServed`; no euro symbol, `+ VAT`, Spain-local claim, or physical WF-Studio address; all related-city links resolve.

- [ ] **Step 5: Implement city rendering through the market generator**

Add city generation to `generateMarketPages()` while keeping routes unchanged. City pages are English-only in this phase and must not claim a Spanish alternate that does not exist.

- [ ] **Step 6: Generate and inspect the 11 pages**

Run: `npm run build:markets`

Expected: all 11 existing files are regenerated from data with unchanged canonicals and USD market semantics.

- [ ] **Step 7: Run Task 2 tests**

Run: `node --test tests/usa-city-pages.test.mjs tests/usa-market.test.mjs tests/commercial-integration.test.mjs`

Expected: PASS.

- [ ] **Step 8: Commit Task 2**

```bash
git add data/usa-city-pages-data.mjs scripts/build-market-pages.mjs tests/usa-city-pages.test.mjs en/web-design-*/index.html
git commit -m "feat: align USA city pages with the USA market"
```

### Task 3: USA navigation, sitemap, container, and browser verification

**Files:**

- Modify: `scripts/site-navigation.mjs`
- Modify: `Dockerfile.web:8-60`
- Modify: `tests/markets.spec.js`
- Modify: `tests/seo.spec.js`
- Modify generated: `usa/index.html`, `usa/es/index.html`, `sitemap.xml`

**Interfaces:**

- Consumes: USA hubs and city pages from Tasks 1–2.
- Produces: deployable `/usa` directory and sitemap entries for hubs plus stable city canonicals.

- [ ] **Step 1: Extend failing navigation/build tests for USA**

Assert enabling `markets.usa.published` adds USA to every generated market selector only after both hub files exist; USA selectors mark USA current; English/Spanish switch only between `/usa/` and `/usa/es/`; city pages return to `/usa/`; Docker copies `/app/usa`; sitemap contains both hubs and exactly one canonical per existing city.

- [ ] **Step 2: Wire USA into navigation and container output**

Set USA to `published: true` in `data/markets-data.mjs` as part of this integration task, use the market configuration rather than new hardcoded selectors, and add `/app/usa` to `Dockerfile.web`.

- [ ] **Step 3: Generate all affected pages and sitemap**

Run: `npm run build:commercial && npm run build:markets && npm run build:sitemap`

Expected: hubs and city pages exist; sitemap generation succeeds without duplicate canonicals.

- [ ] **Step 4: Add USA browser coverage**

Assert both hub languages and one representative city page load without console/page errors; USD prices, tax note, selectors, canonical, `hreflang`, contact metadata, responsive navigation, and no horizontal overflow work at desktop and 390px widths.

- [ ] **Step 5: Run full USA verification**

Run: `npm run check && npm run test:unit && npx playwright test tests/markets.spec.js tests/seo.spec.js`

Expected: all commands PASS.

- [ ] **Step 6: Obtain owner copy approval before indexing**

Review both hub languages and representative city copy with the owner, especially World Cup context and remote-location wording. Do not deploy/index before approval.

- [ ] **Step 7: Commit Task 3 after approval**

```bash
git add data/markets-data.mjs scripts/site-navigation.mjs Dockerfile.web usa en/web-design-*/index.html sitemap.xml tests/markets.spec.js tests/seo.spec.js
git commit -m "feat: publish WF-Studio USA market site"
```
