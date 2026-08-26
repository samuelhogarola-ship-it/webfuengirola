# Inventario Git — Fase 1

## Estado de sincronización

- Rama: `main`.
- Upstream: `origin/main`.
- Divergencia inicial: un commit local por delante y ninguno detectado por detrás.
- Índice: sin archivos preparados.
- Whitespace inicial: `git diff --check` sin errores.
- Repositorios: solo `./.git`.
- Submódulos: ninguno.

## Commit local pendiente: services_commit

- Commit: `64ed343b12ebcd0363f82ef71524b83e90decd6f`.
- Mensaje: `feat: add services strategy content`.
- Archivos:
  - `index.html`
  - `prototipos-casos-diseno.html`
  - `servicios/index.html`
  - `style.css`
  - `tests/smoke.spec.js`
- Verificación: alcance correcto, sin errores de whitespace y cinco comprobaciones sintácticas superadas.
- Smoke test: 7 comprobaciones sin navegador pasaron; 16 pruebas de navegador no pudieron arrancar porque Chromium de Playwright no está instalado en este equipo. No se observó un fallo funcional de la web.
- Decisión: `ready_to_push_with_environment_limitation`.

## Reglas y documentación: collaboration_docs

- `AGENTS.md`
- `docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md`
- `docs/superpowers/plans/2026-08-26-phase-1-git-conservation.md`
- `docs/superpowers/reports/2026-08-26-phase-1-git-inventory.md`
- Verificación: reglas de conservación y sincronización presentes; mapa de ambos VPS correcto; sin errores de whitespace ni marcadores incompletos reales.
- Decisión: `ready_to_commit`.
- Commit propuesto: `docs: add staged project workflow`.

## Informes mensuales: monthly_reports

- `.gitignore`
- `apps/studio-panel/.env.example`
- `apps/studio-panel/ADMIN_PANEL_OPERATIONS.md`
- `apps/studio-panel/README.md`
- `apps/studio-panel/src/app/paneladmin/(protected)/informes/page.tsx`
- `apps/studio-panel/src/app/api/monthly-stat-reports/route.ts`
- `apps/studio-panel/src/lib/cron/monthly-stat-reports-module.d.ts`
- `apps/studio-panel/src/lib/cron/monthly-stat-reports.mjs`
- `apps/studio-panel/src/lib/email.ts`
- `apps/studio-panel/tests/monthly-stat-reports.test.mjs`
- `apps/studio-panel/vercel.json`
- Pruebas específicas: 4 superadas, 0 fallidas.
- VPS: `.env.example` apunta correctamente a `https://analytics.187.124.55.36.sslip.io`; no se detectó `2.24.10.239` en la configuración ejecutable revisada.
- Lint: bloqueado antes de analizar el código. `eslint@9.39.4` con `eslint-config-next@15.5.19` falla dentro de `@rushstack/eslint-patch` al no reconocer el módulo llamante bajo Node `24.19.0`.
- Typecheck: bloqueado por `TS2882` en el import lateral existente `@/app/globals.css`; el archivo CSS sí existe.
- Build: no ejecutado después de los bloqueos anteriores, conforme a la regla de detenerse ante una verificación fallida.
- Decisión: `deferred_to_phase_2` hasta resolver y repetir lint, typecheck y build.

## Archivos ignorados relevantes

- `.env` y `apps/studio-panel/.env.local`: configuración local sensible; deben seguir ignorados.
- `node_modules/` y `apps/studio-panel/node_modules/`: dependencias generadas.
- `apps/studio-panel/.next/`: build generado.
- `apps/studio-panel/storage/stat-reports/*.md`: informes generados localmente.

## Riesgos o bloqueos

- `.tools/gitleaks/current` es un enlace local roto; hay que comprobar si el escáner está disponible antes de depender de él.
- Los informes mensuales son trabajo funcional preexistente aún no confirmado y requieren lint, tipos y build antes de decidir su entrega.
- Las dependencias instaladas del panel no permiten completar lint/typecheck en el entorno actual; este diagnóstico debe resolverse en la Fase 2 antes de confirmar los informes.
- No se ejecutará ninguna operación Git mutante sin autorización inmediata del usuario.

## Control de secretos

- Archivos locales sensibles ignorados: sí; `.env` y `apps/studio-panel/.env.local` no están versionados.
- Patrones de credenciales reales detectados: ninguno. La única coincidencia fue el patrón de búsqueda escrito en el propio plan.
- Gitleaks: no disponible porque `.tools/gitleaks/current` apunta a una ruta inexistente de otro equipo (`/Users/sam/...`). No se descargó ni instaló ninguna herramienta.

## Decisión de entrega por unidad

- `services_commit`: `ready_to_push_with_environment_limitation`.
- `collaboration_docs`: `ready_to_commit`.
- `monthly_reports`: `deferred_to_phase_2`.
