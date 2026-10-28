# Brazil Market Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish `/brasil/` as a Brazilian Portuguese WF-Studio market site with BRL pricing derived from the approved EUR conversion rule.

**Architecture:** Extend the market engine completed for Mexico and USA with one `pt-BR` market record and one generated hub. Reuse shared pricing, selectors, form metadata, SEO, analytics, and build integration; add only the Brazilian copy and Portuguese UI vocabulary required by the new market.

**Tech Stack:** Existing static Node.js generators, HTML/CSS/JavaScript, Node test runner, Playwright, existing Nginx container.

**Spec:** `docs/superpowers/specs/2026-10-28-wf-studio-mercados-internacionales-design.md`

## Global Constraints

- Requires the approved market engine and Mexico plan interfaces; it may be executed after USA or directly after Mexico if priorities change.
- Brazil route is `/brasil/` with locale `pt-BR`; no second language is included initially.
- Every BRL price is `EUR base × current ECB BRL rate × 1.05`, rounded upward to the next 10 reais.
- Use Brazilian Portuguese, currency presentation `R$`, and Brazilian terminology—not European Portuguese.
- Do not claim a Brazil office, local staff, local company, accreditation, or unverified European hosting.
- Do not add telemarketing, local phone numbers, checkout, a Brazilian subsidiary, or Australia.

## Review Focus

- `pt-BR` form validation and UI messages must not fall back visibly to Spanish or English.
- BRL formatting must distinguish the currency symbol and Brazilian separators without changing the exact pricing calculation.
- A single-language market must emit canonical and `pt-BR`/`x-default` metadata without broken alternate links.
- Brazil must appear in the market selector from every generated market site while remaining the current item on `/brasil/`.
- Build, sitemap, and Docker output must include `/brasil/` without disturbing the Spain, Mexico, or USA routes.
- Brasil must not appear in public market selectors until `/brasil/` is generated and ready to publish.

---

### Task 1: Brazilian Portuguese content and UI support

**Files:**

- Modify: `data/market-pages-data.mjs`
- Modify: `data/markets-data.mjs`
- Modify: `contact-form-core.js`
- Modify: `tests/contact-form-core.test.mjs`
- Create: `tests/brazil-market.test.mjs`

**Interfaces:**

- Consumes: `getMarket`, `getMarketPage`, `priceForMarket`, regional contact locale handling, and the shared market page schema.
- Produces: a complete `brasil`/`pt-BR` page record and `pt` contact messages resolved by `baseLocale("pt-BR")`.

- [ ] **Step 1: Write failing Brazil configuration/content tests**

Assert `/brasil/`, `pt-BR`, currency `BRL`, increment `10`, `published: false`, one-locale market membership, and complete page content. Assert copy uses Brazilian forms such as “site”, “orçamento”, and “reais” where appropriate and avoids European Portuguese forms selected during editorial review.

- [ ] **Step 2: Write failing Portuguese contact tests**

Assert `baseLocale("pt-BR") === "pt"`; required-field, consent, sending, success, audit, error, and unavailable messages are Portuguese; unknown locales still fall back safely to Spanish.

- [ ] **Step 3: Run tests and verify failure**

Run: `node --test tests/brazil-market.test.mjs tests/contact-form-core.test.mjs`

Expected: FAIL because Brazil content and Portuguese messages are absent.

- [ ] **Step 4: Draft Brazilian Portuguese market copy**

Cover remote European delivery, package scope, portfolio, working process, FAQs, contact, and neutral tax language. Use only existing verifiable evidence and no physical-presence claim.

- [ ] **Step 5: Add Portuguese contact copy through regional locale resolution**

Extend the existing message table with `pt`, leaving the validation and endpoint contract unchanged.

- [ ] **Step 6: Run Task 1 tests**

Run: `node --test tests/brazil-market.test.mjs tests/contact-form-core.test.mjs tests/market-config.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit Task 1**

```bash
git add data/market-pages-data.mjs data/markets-data.mjs contact-form-core.js tests/brazil-market.test.mjs tests/contact-form-core.test.mjs
git commit -m "feat: add Brazilian Portuguese market content"
```

### Task 2: Brazil rendering, pricing, and SEO

**Files:**

- Modify: `scripts/build-market-pages.mjs`
- Modify: `tests/market-pages.test.mjs`
- Modify: `tests/market-pricing.test.mjs`
- Modify: `tests/brazil-market.test.mjs`
- Create generated: `brasil/index.html`

**Interfaces:**

- Consumes: shared renderer and BRL snapshot rate.
- Produces: one complete `/brasil/` page with `pt-BR`, BRL prices, canonical, self alternate, `x-default`, and `areaServed: "Brazil"`.

- [ ] **Step 1: Add failing price/render assertions**

With fixture BRL rate `5.9624`, assert 200/350/600 EUR render as `R$ 1.260`, `R$ 2.200`, and `R$ 3.760`; exact values remain `1252.104`, `2191.182`, and `3756.312`; page output contains no euro package price, `+ IVA`, `+ VAT`, Brazilian office/address, or unsupported language alternate.

- [ ] **Step 2: Run renderer tests and verify failure**

Run: `node --test tests/brazil-market.test.mjs tests/market-pricing.test.mjs tests/market-pages.test.mjs`

Expected: FAIL because the renderer does not yet emit Brazil.

- [ ] **Step 3: Render Brazil through the generic market generator**

Avoid a Brazil-only template branch: locale formatting and copy come from market/page data, while section structure, pricing, form metadata, JSON-LD, analytics, and selectors use shared functions.

- [ ] **Step 4: Generate and inspect `/brasil/`**

Run: `npm run build:markets`

Expected: `brasil/index.html` exists with the approved canonical and no broken alternate.

- [ ] **Step 5: Run Task 2 tests**

Run: `node --test tests/brazil-market.test.mjs tests/market-pricing.test.mjs tests/market-pages.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit Task 2**

```bash
git add scripts/build-market-pages.mjs tests/market-pages.test.mjs tests/market-pricing.test.mjs tests/brazil-market.test.mjs brasil/index.html
git commit -m "feat: render WF-Studio Brazil market page"
```

### Task 3: Brazil build, navigation, and browser verification

**Files:**

- Modify: `scripts/site-navigation.mjs`
- Modify: `Dockerfile.web:8-60`
- Modify: `tests/markets.spec.js`
- Modify: `tests/seo.spec.js`
- Modify generated: `sitemap.xml`

**Interfaces:**

- Consumes: generated Brazil page and shared selector/build functions.
- Produces: deployable `/brasil` directory, cross-market navigation, and a canonical sitemap entry.

- [ ] **Step 1: Add failing Brazil integration assertions**

Assert setting Brasil to `published: true` adds `/brasil/` to all generated market selectors only after its page exists; Brazil is current on its page; its one-language control does not offer fake translations; Docker copies `/app/brasil`; sitemap contains exactly `https://webfuengirola.com/brasil/` for this market.

- [ ] **Step 2: Wire Brazil into shared navigation and container output**

Set Brasil to `published: true` in `data/markets-data.mjs` as part of this integration task, read labels/routes from the registry, and add `/app/brasil` to `Dockerfile.web`; do not add hardcoded Brazil logic to Spain pages.

- [ ] **Step 3: Generate the complete site and sitemap**

Run: `npm run build:commercial && npm run build:markets && npm run build:sitemap`

Expected: Spain, Mexico, USA, and Brazil pages generate; sitemap reports one new Brazil canonical without duplicates.

- [ ] **Step 4: Add Brazil browser coverage**

Assert `/brasil/` loads without console/page errors; Portuguese copy, BRL prices, rate note, canonical, JSON-LD, market selector, contact metadata, responsive navigation, and no horizontal overflow work at desktop and 390px widths.

- [ ] **Step 5: Run full Brazil verification**

Run: `npm run check && npm run test:unit && npx playwright test tests/markets.spec.js tests/seo.spec.js`

Expected: all commands PASS.

- [ ] **Step 6: Obtain owner copy approval before indexing**

Review Brazilian Portuguese wording, tax note, and all evidence/portfolio claims with the owner. Do not deploy/index before approval.

- [ ] **Step 7: Commit Task 3 after approval**

```bash
git add data/markets-data.mjs scripts/site-navigation.mjs Dockerfile.web brasil/index.html sitemap.xml tests/markets.spec.js tests/seo.spec.js
git commit -m "feat: publish WF-Studio Brazil market site"
```
