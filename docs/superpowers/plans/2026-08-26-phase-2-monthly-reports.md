# Fase 2: Informes mensuales persistentes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Sustituir el almacenamiento efímero en disco por informes mensuales persistentes en Supabase y dejar cron, panel, pruebas y documentación listos para producción.

**Architecture:** Una tabla `monthly_stat_reports` conserva un registro por `month_key`. El cron usa el cliente administrativo para hacer `upsert`; el panel autenticado solo puede leer mediante RLS. El Markdown continúa adjunto al correo y se muestra desde la base de datos.

**Tech Stack:** Next.js 15, TypeScript, Supabase/Postgres, Node test runner, Resend.

**Spec:** `docs/superpowers/specs/2026-08-26-staged-project-resolution-design.md`

## Constraints

- VPS personal de informes: `https://analytics.187.124.55.36.sslip.io`.
- Ningún secreto en Git.
- Un informe por mes mediante clave primaria `month_key`.
- Escritura solo con service role; lectura solo para perfiles admin autenticados.
- Aplicar TDD antes de cambiar comportamiento.
- No hacer commit ni push sin autorización inmediata.

### Task 1: Persistencia probada

- [x] Añadir pruebas fallidas para guardar por `upsert`, devolver referencia estable, listar por mes descendente y propagar errores Supabase.
- [x] Ejecutar las pruebas y confirmar fallos por API inexistente.
- [x] Crear `src/lib/data/monthly-stat-reports.mjs` y su declaración TypeScript.
- [x] Ejecutar pruebas y confirmar verde.

### Task 2: Esquema y tipos

- [x] Crear migración `supabase/migrations/202608260001_monthly_stat_reports.sql`.
- [x] Definir tabla, validación de mes, RLS, política admin y grants.
- [x] Añadir `monthly_stat_reports` a `src/lib/supabase/types.ts`.
- [x] Ejecutar typecheck.

### Task 3: Integrar cron y panel

- [x] Cambiar el cron para persistir con `createSupabaseAdminClient`.
- [x] Cambiar Informes para leer Supabase y eliminar lectura del filesystem.
- [x] Eliminar `STAT_REPORT_STORAGE_DIR` y la exclusión del almacenamiento local.
- [x] Mantener adjunto Markdown e idempotencia mensual.
- [x] Ejecutar pruebas específicas.

### Task 4: Documentar y verificar

- [x] Actualizar README y operaciones con migración, variables y flujo persistente.
- [x] Corregir los comandos erróneos del plan/inventario de Fase 1.
- [x] Ejecutar test completo del panel, lint, typecheck y build.
- [x] Revisar diff, secretos y archivos generados.
- [ ] Presentar archivos exactos y pedir autorización antes del commit.
