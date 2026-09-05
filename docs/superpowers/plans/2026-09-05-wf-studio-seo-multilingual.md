# WF-Studio Multilingual SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish an equally strong Spanish, English, German, and Finnish commercial site for WF-Studio, centered on Fuengirola and on sector-specific website offers with shared Lite, Express, and Professional tiers.

**Architecture:** A single ESM content catalog defines brand, locale routes, sector copy, tiers, prices, extras, and cross-language equivalents. A deterministic static-site generator renders commercial HTML from that catalog, while focused Node tests validate the data model and generated SEO contract without requiring a browser server.

**Tech Stack:** Node.js ESM, static HTML/CSS/JavaScript, Schema.org JSON-LD, Node's built-in test runner, existing Playwright smoke tests, nginx static hosting.

**Spec:** `docs/superpowers/specs/2026-09-05-wf-studio-seo-multilingue-design.md`

## Global Constraints

- Public brand: `WF-Studio · Web Fuengirola`; WF-Studio is primary and Web Fuengirola is the local SEO descriptor.
- Locales: `es`, `en`, `de`, and `fi`, with reciprocal hreflang and Spanish `x-default`.
- Shared tiers: Web Lite `200 € + IVA`, Web Express `350 € + IVA`, Web Profesional `600 € + IVA`.
- Sector pages vary their problems, benefits, examples, and use of each tier; tier prices do not vary by sector or locale.
- Fuengirola must appear naturally in local titles, headings, introductions, proof, FAQs, internal links, and schema; keyword stuffing is forbidden.
- Do not invent offices, reviews, clients, results, or physical addresses.
- Preserve the user's uncommitted `NEXT.me` change.
- Do not modify `apps/studio-panel`; WF-Panel belongs to the separate `wf-studio-panel` repository.

---

### Task 1: Commercial catalog and route contract

**Files:**
- Create: `data/commercial-pages-data.mjs`
- Create: `tests/commercial-pages.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: `brand`, `locales`, `tiers`, `extras`, `pageGroups`, `commercialRoutes`, and `getAlternateRoutes(groupKey)` exports.
- Consumes: no new project interfaces.

- [ ] **Step 1: Write the failing catalog test**

  Assert that all four locales exist, each page group has one route per locale, slugs are unique, reciprocal alternates are complete, and the tier tuples equal `Lite/200`, `Express/350`, and `Profesional/600`.

- [ ] **Step 2: Run the test and verify RED**

  Run: `node --test tests/commercial-pages.test.mjs`
  Expected: FAIL because `data/commercial-pages-data.mjs` does not exist.

- [ ] **Step 3: Implement the catalog**

  Define localized UI copy and these page groups: home, design web, local SEO, prices, audit, contact, clinics, physiotherapists, personal trainers, gyms, restaurants, local businesses, and multilingual websites. Every sector entry must include localized title, description, H1, introduction, three problems, three benefits, tier adaptations, three FAQs, and WhatsApp copy.

- [ ] **Step 4: Add a non-browser test command and verify GREEN**

  Add `test:unit: "node --test tests/*.test.mjs"` to `package.json` and run `npm run test:unit`.

### Task 2: Deterministic commercial-page renderer

**Files:**
- Create: `scripts/build-commercial-pages.mjs`
- Create: `tests/commercial-renderer.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: catalog exports from Task 1.
- Produces: `renderCommercialPage(page, locale)`, `renderHreflang(groupKey)`, `renderTierCards(page, locale)`, and generated `index.html` files.

- [ ] **Step 1: Write renderer contract tests**

  Assert generated markup contains localized `<html lang>`, canonical, all four reciprocal alternates, `x-default`, localized navigation, one H1, WF-Studio brand text, Fuengirola context, three exact tier prices, JSON-LD, case/service links, and tracked conversion attributes.

- [ ] **Step 2: Run tests and verify RED**

  Run: `node --test tests/commercial-renderer.test.mjs`
  Expected: FAIL because the renderer module does not exist.

- [ ] **Step 3: Implement reusable render functions**

  Build focused render helpers for head, header, language selector, breadcrumbs, hero, problems, benefits, tier comparison, extras, proof, FAQs, audit/contact form, related links, footer, JSON-LD, and scripts. Escape catalog strings before inserting them into HTML.

- [ ] **Step 4: Generate into a temporary directory and verify GREEN**

  Expose an output-root option so the test can generate into a temporary directory. Verify all expected routes and markup before enabling writes to the project root.

### Task 3: Publish core commercial parity

**Files:**
- Modify: `data/commercial-pages-data.mjs`
- Modify: `scripts/build-commercial-pages.mjs`
- Generate: `en/index.html`, `de/index.html`, `fi/index.html`
- Generate/modify: localized design-web, local-SEO, prices, audit, and contact routes declared by the catalog.
- Modify: `tests/commercial-renderer.test.mjs`

**Interfaces:**
- Consumes: renderer and catalog from Tasks 1-2.
- Produces: commercial entry pages in all four languages.

- [ ] **Step 1: Add failing route-parity assertions**

  Assert every core group renders four files, every language selector stays on the equivalent group, and every CTA resolves to the contact or audit page in the same language.

- [ ] **Step 2: Run tests and verify RED**

  Run: `node --test tests/commercial-renderer.test.mjs`
  Expected: FAIL listing missing core routes.

- [ ] **Step 3: Add localized core content and generation**

  Render complete home, design, local SEO, prices, audit, and contact pages. Use meaningful copy in each language rather than direct token substitution.

- [ ] **Step 4: Run generator and verify GREEN**

  Run: `npm run build:commercial && npm run test:unit`.

### Task 4: Publish sector-specialized parity

**Files:**
- Modify: `data/commercial-pages-data.mjs`
- Generate: sector landing directories for clinics, physiotherapists, personal trainers, gyms, restaurants, local businesses, and multilingual websites in all four locales.
- Modify: `tests/commercial-pages.test.mjs`
- Modify: `tests/commercial-renderer.test.mjs`

**Interfaces:**
- Consumes: catalog and renderer.
- Produces: 28 localized sector landings with a common tier model.

- [ ] **Step 1: Add failing sector-specificity tests**

  Assert each sector/locale has distinct H1, introduction, problem copy, benefits, FAQs, and tier adaptations; assert prices remain identical.

- [ ] **Step 2: Run tests and verify RED**

  Run: `npm run test:unit`
  Expected: FAIL for missing sector content or files.

- [ ] **Step 3: Complete localized sector content**

  Add sector-specific copy and link existing real cases only where relevant: Sport Massage and FisioApp for health, Personal Trainer and Gimnasio Nuevo Estilo for fitness. Restaurant and generic pages must use examples/demonstrations without inventing clients or measured outcomes.

- [ ] **Step 4: Generate and verify GREEN**

  Run: `npm run build:commercial && npm run test:unit`.

### Task 5: Audit form, localization, and analytics

**Files:**
- Modify: `contact-form.js`
- Create: `tests/contact-form-core.test.mjs`
- Modify: `data/commercial-pages-data.mjs`
- Modify: `scripts/build-commercial-pages.mjs`
- Generate: audit and contact pages in four locales.

**Interfaces:**
- Produces: locale-aware status messages and a contact payload that includes audit URL, sector, location, problem, consent, page URL, honeypot, and Turnstile token.
- Consumes: existing `https://admin.webfuengirola.com/api/contact/config` and `/api/contact` endpoints without changing their server contract.

- [ ] **Step 1: Extract and test form behavior first**

  Add tests for localized required-field errors, email validation, audit-message composition, consent requirement, honeypot success behavior, and event names `form_start`, `form_submit`, and `audit_request`.

- [ ] **Step 2: Verify RED**

  Run: `node --test tests/contact-form-core.test.mjs`
  Expected: FAIL because the locale-aware helpers do not exist.

- [ ] **Step 3: Implement minimal locale-aware helpers and browser adapter**

  Keep the endpoint payload compatible by composing audit fields into `message`. Read messages from form data attributes, require consent on audit forms, and call `window.WFAnalytics.trackEvent` only when available.

- [ ] **Step 4: Verify GREEN**

  Run: `npm run test:unit`.

### Task 6: Brand migration and internal linking

**Files:**
- Modify: `index.html`
- Modify: `data/services-data.mjs`
- Modify: `scripts/build-services.mjs`
- Modify: `scripts/build-cases.mjs`
- Modify: `scripts/build-blog-campaign.mjs`
- Modify: `scripts/build-blog-i18n.mjs`
- Modify: `tests/seo.spec.js`

**Interfaces:**
- Consumes: commercial route catalog.
- Produces: consistent `WF-Studio · Web Fuengirola` presentation and links from home, services, cases, and blog into sector pages and same-language commercial routes.

- [ ] **Step 1: Add failing static SEO assertions**

  Check that the public home identifies WF-Studio and Web Fuengirola, Organization JSON-LD uses `name: WF-Studio` and `alternateName: Web Fuengirola`, blog CTAs no longer point at old product combinations, and localized blog navigation points to localized commercial pages.

- [ ] **Step 2: Verify RED**

  Run the static portion of the SEO test suite or a dedicated Node test and confirm the old brand/product links fail expectations.

- [ ] **Step 3: Update brand and link generators**

  Replace product-combination CTAs with appropriate sector, price, or design-web routes. Keep existing factual case names and results unchanged.

- [ ] **Step 4: Rebuild and verify GREEN**

  Run: `npm run build:all && npm run test:unit`.

### Task 7: Legacy product consolidation and deployment manifest

**Files:**
- Modify: `nginx/default.conf`
- Modify: `Dockerfile.web`
- Modify: `scripts/build-sitemap.mjs`
- Modify: `tests/seo.spec.js`

**Interfaces:**
- Produces: permanent redirects from obsolete product-combination routes, Docker inclusion for every new top-level route, and a sitemap containing all and only canonical indexable pages.

- [ ] **Step 1: Add failing redirect and deployment assertions**

  Assert each obsolete `/productos/` route maps to the closest commercial destination, every sitemap root is copied into the image, and each commercial page appears exactly once in the sitemap.

- [ ] **Step 2: Verify RED**

  Run the relevant static tests and confirm redirects/copy roots are missing.

- [ ] **Step 3: Add redirects and build integration**

  Add `build:commercial` before the sitemap build, add required Docker paths, and add explicit 301 redirects. Keep old source pages in Git until Search Console data can be reviewed, but exclude redirected pages from the generated public sitemap.

- [ ] **Step 4: Rebuild and verify GREEN**

  Run: `npm run build:all && npm run test:unit`.

### Task 8: Full verification and handoff

**Files:**
- Modify as required by failures: files already listed in Tasks 1-7.

**Interfaces:**
- Consumes: complete generated site.
- Produces: verification evidence and a reviewable branch diff.

- [ ] **Step 1: Run syntax, lint, unit, and build checks**

  Run: `npm run check`, `npm run lint`, `npm run test:unit`, and `npm run build:all`.

- [ ] **Step 2: Run browser tests**

  Run: `npx playwright test tests/seo.spec.js tests/blog.spec.js tests/smoke.spec.js`. If the managed sandbox rejects the local port, request the required execution permission and rerun rather than treating the sandbox failure as a product failure.

- [ ] **Step 3: Inspect generated pages**

  Check one core and two sector pages in each language at desktop and mobile widths. Verify selector equivalence, prices, CTA destinations, form labels, Fuengirola context, and absence of overflow.

- [ ] **Step 4: Review repository state**

  Run `git diff --check`, inspect `git diff --stat`, confirm `NEXT.me` remains an untouched user change, and report implementation files separately.

- [ ] **Step 5: Request authorization for commit, push, and Pull Request**

  The project requires a dedicated branch and Pull Request for substantial work, but repository rules require explicit authorization before committing or pushing user-visible changes.
