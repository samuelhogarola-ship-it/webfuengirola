import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..", "..");

async function readMigration(name) {
  return readFile(path.join(repoRoot, "supabase", "migrations", name), "utf8");
}

test("minutes compatibility migration exists before pack_type migration needs it", async () => {
  const compatSql = await readMigration(
    "202606220001_minutes_columns_compat.sql",
  );
  const packTypeSql = await readMigration(
    "202606230001_add_pack_type_to_packs.sql",
  );

  assert.match(compatSql, /add column if not exists minutes_total integer;/);
  assert.match(compatSql, /add column if not exists minutes_used integer;/);
  assert.match(packTypeSql, /p\.minutes_total/);
  assert.match(packTypeSql, /a\.minutes_used/);
});

test("client_summary aggregates packs and activities in separate subqueries", async () => {
  const hardeningSql = await readMigration(
    "202606300001_studio_panel_hardening.sql",
  );

  assert.match(
    hardeningSql,
    /left join \(\s*select\s+client_id,\s+coalesce\(sum\(case when status = 'active' then minutes_total else 0 end\), 0\) as total_minutes/s,
  );
  assert.match(
    hardeningSql,
    /left join \(\s*select\s+client_id,\s+coalesce\(sum\(minutes_used\), 0\) as used_minutes/s,
  );
  assert.doesNotMatch(
    hardeningSql,
    /left join public\.packs p on p\.client_id = c\.id\s+left join public\.activities a on a\.client_id = c\.id/s,
  );
});

test("latest migration scopes client email uniqueness by project", async () => {
  const scopedUniqueSql = await readMigration(
    "202607100001_clients_unique_per_project.sql",
  );

  assert.match(
    scopedUniqueSql,
    /drop index if exists public\.clients_email_lower_unique_idx;/,
  );
  assert.match(
    scopedUniqueSql,
    /create unique index if not exists clients_project_email_lower_unique_idx\s+on public\.clients \(project, lower\(email\)\);/s,
  );
});

test("client portal identity is bound to the auth user and wf-studio project", async () => {
  const authIdentitySql = await readMigration(
    "202608190001_client_auth_identity.sql",
  );

  assert.match(
    authIdentitySql,
    /add column if not exists auth_user_id uuid references auth\.users\(id\) on delete set null;/,
  );
  assert.match(
    authIdentitySql,
    /where c\.project = 'wf-studio'\s+and c\.auth_user_id = auth\.uid\(\)\s+and c\.status = 'active'/s,
  );
  assert.match(
    authIdentitySql,
    /create unique index if not exists clients_project_auth_user_unique_idx\s+on public\.clients \(project, auth_user_id\)\s+where auth_user_id is not null;/s,
  );
  assert.doesNotMatch(
    authIdentitySql,
    /lower\(c\.email\) = private\.current_client_email\(\)/,
  );
});

test("client summary subtracts only activity from active packs", async () => {
  const summarySql = await readMigration(
    "202608230001_client_summary_active_packs.sql",
  );

  assert.match(summarySql, /where p\.status = 'active'/);
  assert.match(
    summarySql,
    /left join public\.activities a on a\.pack_id = p\.id/,
  );
  assert.match(summarySql, /sum\(active_pack_totals\.used_minutes\)/);
});

test("pending reminder claims are recoverable after worker interruption", async () => {
  const claimSql = await readMigration(
    "202608230002_pending_reminder_claims.sql",
  );

  assert.match(claimSql, /reminder_claim_token uuid/);
  assert.match(claimSql, /reminder_claimed_at timestamptz/);
  assert.match(claimSql, /pending_reminder_claim_idx/);
});
