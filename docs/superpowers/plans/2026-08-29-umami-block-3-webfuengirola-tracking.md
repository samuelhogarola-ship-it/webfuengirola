# Umami Block 3: Web Fuengirola Tracking Plan

**Goal:** Move Web Fuengirola from the Agama Umami instance to the personal instance and start anonymous cookieless tracking on the first visit, independently of the cookie banner.

**Architecture:** The static site fetches a same-origin runtime JSON configuration before initializing the shared Umami loader. The Docker entrypoint renders that JSON from environment variables, while the loader remains inert when the website ID is missing. Umami consent callbacks are removed because this installation is cookieless and anonymous.

**Spec:** `docs/superpowers/specs/2026-08-29-umami-all-panels-design.md`

## Constraints

- Default Umami origin: `https://analytics.187.124.55.36.sslip.io`.
- Never send Web Fuengirola traffic to `2.24.10.239`.
- `UMAMI_WEBSITE_ID` is public runtime configuration; API credentials remain absent from the web image.
- Missing or invalid runtime configuration must not break the site.
- Tracking starts on the first visit and does not change after accepting or rejecting the cookie banner.

## Task 1: First-visit and consent-independent tracking

- [x] Add a failing Playwright test that supplies runtime configuration and expects the personal Umami script before any banner action.
- [x] Extend the test to reject the banner and prove the tracker remains loaded.
- [x] Run the focused test and verify the expected RED failure.
- [x] Update `umami-analytics-core.js` and `script.js` with the smallest implementation that passes.
- [x] Run the focused test and verify GREEN.

## Task 2: Runtime environment configuration

- [x] Add a failing Node test that executes the config renderer with controlled environment values.
- [x] Verify RED because the renderer does not exist.
- [x] Add the JSON template and renderer, copy them in `Dockerfile.web`, and install the renderer in `/docker-entrypoint.d/`.
- [x] Add a safe local `umami-config.json` with no website ID.
- [x] Run the renderer test and verify GREEN.

## Task 3: Security policy and documentation

- [x] Replace executable and documented references to the Agama URL with the personal URL where the context is Web Fuengirola.
- [x] Update the Nginx CSP for the personal Umami origin.
- [x] Document `UMAMI_SCRIPT_URL`, `UMAMI_HOST_URL`, and `UMAMI_WEBSITE_ID` without secret values.

## Task 4: Verification and delivery

- [ ] Run focused Umami tests, the full Playwright suite, syntax checks, lint, formatting check, Docker build, `git diff --check`, and secret scanning.
- [ ] Review that no Web Fuengirola executable path references the Agama VPS.
- [ ] Commit, push, open a PR, wait for green checks, and merge through the approved PR workflow.
- [ ] Configure the production website ID in Coolify and verify a real production visit appears in the personal Umami instance.
