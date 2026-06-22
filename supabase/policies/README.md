# RLS del Studio Panel

Las políticas definitivas viven en la migración [`202606210001_studio_panel.sql`](/Users/sam/.codex/worktrees/8fb1/web%20fuengirola/supabase/migrations/202606210001_studio_panel.sql).

Resumen operativo:

- `admin`: acceso completo a `profiles`, `clients`, `packs`, `activities` y `notifications` mediante `private.is_admin()`.
- `client`: acceso `SELECT` solo a sus propios registros usando coincidencia entre `auth.email()` y `clients.email`.
- Las vistas `client_summary` y `pack_summary` se crean con `security_invoker = true` para respetar RLS sin duplicar lógica de permisos.
