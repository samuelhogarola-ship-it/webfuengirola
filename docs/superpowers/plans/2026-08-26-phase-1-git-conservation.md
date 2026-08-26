# Fase 1: Git y conservación del trabajo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auditar, separar, verificar y sincronizar de forma segura el trabajo Git actual sin perder cambios ni comenzar todavía las tareas de `NEXT.md` o `NEXT.me`.

**Architecture:** El repositorio raíz es la única fuente de verdad. El estado actual se divide en tres unidades: el commit local de estrategia de servicios, las reglas/documentación de colaboración y los informes mensuales. Toda acción que cambie historial o remoto requiere autorización inmediata del usuario.

**Tech Stack:** Git, zsh, Node.js, Playwright, ESLint, TypeScript y Next.js 15.

**Spec:** `docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md`

## Global Constraints

- No crear repositorios Git anidados.
- Preservar todos los cambios locales.
- No ejecutar `pull`, `commit`, `merge`, `rebase` ni `push` sin autorización inmediata.
- No editar `NEXT.md` ni `NEXT.me` durante esta fase.
- No versionar secretos, archivos `.env`, dependencias, cachés ni artefactos generados.
- `2.24.10.239` pertenece a Agama y Marketplace; `187.124.55.36` pertenece a la infraestructura personal y WF Studio.
- Si los informes requieren corregir código, registrar el fallo y trasladar la corrección a la Fase 2.

---

### Task 1: Capturar y clasificar el estado inicial

**Files:**
- Read: `.gitignore`
- Read: `AGENTS.md`
- Create: `docs/superpowers/reports/2026-08-26-phase-1-git-inventory.md`

**Interfaces:**
- Consumes: rama, upstream, índice y árbol de trabajo.
- Produces: inventario con las unidades `services_commit`, `collaboration_docs` y `monthly_reports`.

- [ ] **Step 1: Registrar el estado sin mutarlo**

Run:

```bash
git status --short --branch
git log --oneline --decorate origin/main..HEAD
git diff --name-status
git diff --cached --name-status
git ls-files --others --exclude-standard
git diff --check
```

Expected: `main` está un commit por delante, no hay staged y todos los cambios quedan enumerados.

- [ ] **Step 2: Confirmar que solo existe un repositorio**

Run:

```bash
find . -path './node_modules' -prune -o -path '*/node_modules' -prune -o -name .git -print
git ls-files --stage | awk '$1 ~ /^160000/ {print}'
```

Expected: solo `./.git` y ningún submódulo.

- [ ] **Step 3: Crear el inventario**

Create the report with:

```markdown
# Inventario Git — Fase 1

## Estado de sincronización
## Commit local pendiente: services_commit
## Reglas y documentación: collaboration_docs
## Informes mensuales: monthly_reports
## Archivos ignorados relevantes
## Riesgos o bloqueos
## Decisión de entrega por unidad
```

Expected: cada archivo modificado o nuevo pertenece exactamente a una unidad.

- [ ] **Step 4: Confirmar que el backlog no cambió**

Run:

```bash
git status --short -- NEXT.md NEXT.me
```

Expected: sin salida.

---

### Task 2: Comprobar secretos y artefactos

**Files:**
- Read: `.gitignore`
- Read: `apps/studio-panel/.env.example`
- Modify: `docs/superpowers/reports/2026-08-26-phase-1-git-inventory.md`

**Interfaces:**
- Consumes: archivos candidatos del inventario.
- Produces: control de seguridad redactado, sin copiar valores sensibles.

- [ ] **Step 1: Comprobar archivos locales sensibles**

Run:

```bash
git check-ignore -v .env apps/studio-panel/.env.local
git ls-files .env apps/studio-panel/.env.local
```

Expected: ambos están ignorados y ninguno está versionado.

- [ ] **Step 2: Buscar credenciales en los candidatos**

Run:

```bash
rg -n --hidden --glob '!node_modules/**' --glob '!.git/**' --glob '!apps/studio-panel/.next/**' '(BEGIN (RSA|OPENSSH|EC) PRIVATE KEY|sk_live_|sk_test_|SUPABASE_SERVICE_ROLE_KEY=.+|RESEND_API_KEY=.+|STAT_REPORT_UMAMI_PASSWORD=.+)' AGENTS.md docs apps/studio-panel/.env.example apps/studio-panel/src apps/studio-panel/tests
```

Expected: ningún secreto real; nombres vacíos de variables son seguros.

- [ ] **Step 3: Ejecutar Gitleaks si está disponible**

Run:

```bash
test -x .tools/gitleaks/current/gitleaks && .tools/gitleaks/current/gitleaks git --redact --no-banner .
```

Expected: exit code 0. Si el enlace sigue roto, registrar la herramienta como no disponible sin descargar nada.

- [ ] **Step 4: Registrar el resultado**

Append:

```markdown
## Control de secretos

- Archivos sensibles ignorados:
- Credenciales reales detectadas:
- Gitleaks:
```

Expected: nunca copiar secretos ni contenido de `.env`.

---

### Task 3: Verificar el commit local de servicios

**Files:**
- Read: `index.html`
- Read: `prototipos-casos-diseno.html`
- Read: `servicios/index.html`
- Read: `style.css`
- Read: `tests/smoke.spec.js`
- Modify: inventory report

**Interfaces:**
- Consumes: commit `64ed343`.
- Produces: `ready_to_push` o `blocked`.

- [ ] **Step 1: Revisar alcance y whitespace**

Run:

```bash
git show --check --stat 64ed343
git show --name-status --format=fuller 64ed343
```

Expected: solo los cinco archivos previstos y sin errores de whitespace.

- [ ] **Step 2: Ejecutar comprobaciones sintácticas**

Run:

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --check script.js
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --check cookie-banner-core.js
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --check umami-analytics-core.js
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --check legal-page.js
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --check legal-core.js
```

Expected: todos terminan con exit code 0.

- [ ] **Step 3: Ejecutar smoke test**

Run:

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' node_modules/@playwright/test/cli.js test tests/smoke.spec.js
```

Expected: pruebas pasan. Una falta de navegador se registra como limitación del entorno, no como fallo funcional.

- [ ] **Step 4: Registrar decisión**

Record `ready_to_push` if all functional checks pass; otherwise record `blocked` with the failing command.

---

### Task 4: Verificar reglas y documentación

**Files:**
- Read: `AGENTS.md`
- Read: spec, plan and inventory report
- Modify: inventory report

**Interfaces:**
- Consumes: documentos de colaboración.
- Produces: `collaboration_docs: ready_to_commit` o `blocked`.

- [ ] **Step 1: Comprobar reglas y VPS**

Run:

```bash
rg -n 'source of truth|Before editing|Never discard|two computers|commit.*push|ignored files' AGENTS.md
rg -n '2\.24\.10\.239|187\.124\.55\.36|No se ejecutarán.*commit.*push|Fase 1' docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md
```

Expected: aparecen todas las reglas y ambas IP con su alcance correcto.

- [ ] **Step 2: Comprobar formato y marcadores**

Run:

```bash
rg -n '(TBD|TODO|FIXME|implement later|fill in details)' AGENTS.md docs/superpowers || true
git diff --check -- AGENTS.md docs/superpowers
```

Expected: sin marcadores ni errores de whitespace.

- [ ] **Step 3: Registrar propuesta**

Record:

```text
collaboration_docs: ready_to_commit
commit: docs: add staged project workflow
```

---

### Task 5: Clasificar los informes mensuales

**Files:**
- Read: los once archivos modificados o nuevos de `monthly_reports`
- Modify: inventory report

**Interfaces:**
- Consumes: implementación preexistente de informes.
- Produces: `ready_to_commit` o `deferred_to_phase_2`.

- [ ] **Step 1: Ejecutar pruebas específicas**

Run from `apps/studio-panel`:

```bash
'/Users/samuelgarcia/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node' --test tests/monthly-stat-reports.test.mjs
```

Expected: 4 pass, 0 fail.

- [ ] **Step 2: Ejecutar lint**

Run from `apps/studio-panel`:

```bash
../../node_modules/.bin/eslint src
```

Expected: exit code 0; registrar warnings sin corregirlos.

- [ ] **Step 3: Ejecutar typecheck**

Run:

```bash
../../node_modules/.bin/tsc --noEmit
```

Expected: exit code 0.

- [ ] **Step 4: Ejecutar build**

Run:

```bash
../../node_modules/.bin/next build
```

Expected: build correcto. Fallos funcionales pasan a la Fase 2.

- [ ] **Step 5: Confirmar el VPS**

Run:

```bash
rg -n '187\.124\.55\.36|2\.24\.10\.239' apps/studio-panel/.env.example apps/studio-panel/ADMIN_PANEL_OPERATIONS.md apps/studio-panel/README.md apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs apps/studio-panel/src/app/api/monthly-stat-reports/route.ts
```

Expected: la configuración ejecutable usa `187.124.55.36` y no usa `2.24.10.239`.

- [ ] **Step 6: Registrar decisión**

If all pass:

```text
monthly_reports: ready_to_commit
commit: feat: add monthly analytics reports
```

Otherwise:

```text
monthly_reports: deferred_to_phase_2
evidence: exact failing command and summary
```

No production code is corrected in this task.

---

### Task 6: Solicitar autorizaciones Git

**Files:**
- Read: inventory report

**Interfaces:**
- Consumes: decisiones de Tasks 3–5.
- Produces: autorización explícita por operación.

- [ ] **Step 1: Presentar resumen**

Report statuses for `64ed343`, `collaboration_docs`, `monthly_reports`, secret scan and exact proposed files.

- [ ] **Step 2: Pedir autorización para el commit documental**

Proposed files:

```text
AGENTS.md
docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md
docs/superpowers/plans/2026-08-26-phase-1-git-conservation.md
docs/superpowers/reports/2026-08-26-phase-1-git-inventory.md
```

Do not stage or commit before explicit approval.

- [ ] **Step 3: Pedir autorización separada para informes**

Only if `monthly_reports` is `ready_to_commit`. Proposed message: `feat: add monthly analytics reports`.

- [ ] **Step 4: Pedir autorización separada para push**

Proposed command: `git push origin main`. State exactly which commits it will send.

---

### Task 7: Ejecutar solo las operaciones autorizadas

**Files:**
- Stage only approved paths.

**Interfaces:**
- Consumes: explicit approvals.
- Produces: separated commits and optionally updated `origin/main`.

- [ ] **Step 1: Commit documental, si está autorizado**

Run:

```bash
git add AGENTS.md docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md docs/superpowers/plans/2026-08-26-phase-1-git-conservation.md docs/superpowers/reports/2026-08-26-phase-1-git-inventory.md
git diff --cached --stat
git diff --cached --check
git commit -m "docs: add staged project workflow"
```

Expected: solo los cuatro documentos aprobados.

- [ ] **Step 2: Commit de informes, si está autorizado**

Run:

```bash
git add .gitignore apps/studio-panel/.env.example apps/studio-panel/ADMIN_PANEL_OPERATIONS.md apps/studio-panel/README.md 'apps/studio-panel/src/app/paneladmin/(protected)/informes/page.tsx' apps/studio-panel/src/app/api/monthly-stat-reports/route.ts apps/studio-panel/src/lib/cron/monthly-stat-reports-module.d.ts apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs apps/studio-panel/src/lib/email.ts apps/studio-panel/tests/monthly-stat-reports.test.mjs apps/studio-panel/vercel.json
git diff --cached --stat
git diff --cached --check
git commit -m "feat: add monthly analytics reports"
```

Expected: solo los once archivos aprobados. Omit if deferred.

- [ ] **Step 3: Push, si está autorizado**

Run:

```bash
git push origin main
```

Expected: remote accepts all authorized commits.

- [ ] **Step 4: Verificar estado final**

Run:

```bash
git status --short --branch
git log --oneline --decorate -5
git log --oneline origin/main..HEAD
```

Expected: no unpushed commits. Worktree clean, or only documented deferred monthly-report files.

---

### Task 8: Cerrar la Fase 1

**Files:**
- Read: inventory report

**Interfaces:**
- Consumes: final local/remote state.
- Produces: closure report and Phase 2 recommendation.

- [ ] **Step 1: Check closure criteria**

Verify:

```text
no secrets staged
units separated
checks recorded
Git mutations pre-authorized
origin/main synchronized if push authorized
deferred changes explicitly documented
```

- [ ] **Step 2: Report outcome**

Report commits created/pushed, passed checks, remaining local changes, blockers, and recommendation. Do not start Phase 2 automatically.
