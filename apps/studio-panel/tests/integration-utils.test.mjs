import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAppsUsersOverview,
  listAllAuthUsers,
  unwrapSupabaseResult,
} from "../src/lib/integrations/supabase.mjs";
import * as integrationUtils from "../src/lib/integrations/supabase.mjs";

test("unwrapSupabaseResult returns successful data and throws contextual errors", () => {
  assert.deepEqual(
    unwrapSupabaseResult(
      { data: [{ id: 1 }], error: null },
      "TodoPlastico empresas",
    ),
    [{ id: 1 }],
  );

  assert.throws(
    () =>
      unwrapSupabaseResult(
        { data: null, error: { message: "permission denied" } },
        "TodoPlastico empresas",
      ),
    /TodoPlastico empresas: permission denied/,
  );
});

test("listAllAuthUsers reads every page and stops after an incomplete page", async () => {
  const requestedPages = [];
  const users = await listAllAuthUsers(
    async ({ page, perPage }) => {
      requestedPages.push([page, perPage]);
      return {
        data: {
          users: page === 1 ? [{ id: "u1" }, { id: "u2" }] : [{ id: "u3" }],
        },
        error: null,
      };
    },
    { perPage: 2, context: "Apps Users Auth" },
  );

  assert.deepEqual(
    users.map((user) => user.id),
    ["u1", "u2", "u3"],
  );
  assert.deepEqual(requestedPages, [
    [1, 2],
    [2, 2],
  ]);
});

test("listAllAuthUsers propagates an auth page error", async () => {
  await assert.rejects(
    listAllAuthUsers(
      async () => ({
        data: { users: [] },
        error: { message: "invalid service key" },
      }),
      { context: "Superentrenador Auth" },
    ),
    /Superentrenador Auth: invalid service key/,
  );
});

test("buildAppsUsersOverview scopes KPIs to the selected app but not the search", () => {
  const overview = buildAppsUsersOverview({
    authUsers: [
      {
        id: "u1",
        email: "one@example.com",
        created_at: "2026-01-01T00:00:00Z",
        last_sign_in_at: "2026-08-10T00:00:00Z",
        email_confirmed_at: "2026-01-01T00:00:00Z",
      },
      {
        id: "u2",
        email: "two@example.com",
        created_at: "2026-02-01T00:00:00Z",
        last_sign_in_at: "2026-06-01T00:00:00Z",
        email_confirmed_at: null,
      },
      {
        id: "u3",
        email: "other@example.com",
        created_at: "2026-03-01T00:00:00Z",
        last_sign_in_at: "2026-08-18T00:00:00Z",
        email_confirmed_at: "2026-03-01T00:00:00Z",
      },
    ],
    profiles: [
      {
        id: "u1",
        email: "one@example.com",
        full_name: "One",
        created_at: "2026-01-01T00:00:00Z",
      },
      {
        id: "u2",
        email: "two@example.com",
        full_name: "Two",
        created_at: "2026-02-01T00:00:00Z",
      },
      {
        id: "u3",
        email: "other@example.com",
        full_name: "Other",
        created_at: "2026-03-01T00:00:00Z",
      },
    ],
    memberships: [
      {
        user_id: "u1",
        app: "vokabel-world",
        role: "student",
        status: "active",
      },
      {
        user_id: "u2",
        app: "vokabel-world",
        role: "student",
        status: "inactive",
      },
      { user_id: "u3", app: "samuel-coach", role: "student", status: "active" },
    ],
    appKey: "vokabel-world",
    search: "two",
    now: "2026-08-19T00:00:00Z",
  });

  assert.deepEqual(
    overview.users.map((user) => user.id),
    ["u2"],
  );
  assert.deepEqual(overview.stats, {
    total: 2,
    confirmed: 1,
    unconfirmed: 1,
    active: 1,
    apps: 1,
    vokabel: 2,
  });
});

test("integration loader returns a renderable fallback after a rejected request", async () => {
  assert.equal(typeof integrationUtils.loadIntegrationData, "function");

  const result = await integrationUtils.loadIntegrationData(async () => {
    throw new Error("service unavailable");
  }, "No se pudo conectar.");

  assert.deepEqual(result, {
    data: null,
    error: "service unavailable",
  });
});

test("percentage helper stays finite for an empty vocabulary", () => {
  assert.equal(typeof integrationUtils.safePercentage, "function");
  assert.equal(integrationUtils.safePercentage(5, 0), 0);
  assert.equal(Number.isFinite(integrationUtils.safePercentage(5, 0)), true);
});

test("Samuel Coach keeps users linked only through premium codes", () => {
  assert.equal(typeof integrationUtils.isSamuelCoachAlumno, "function");
  assert.equal(
    integrationUtils.isSamuelCoachAlumno({
      memberships: [],
      appRoles: {},
      premiumCodes: [{ code: "PREMIUM" }],
    }),
    true,
  );
});

test("pagination range clamps a stale page before querying PostgREST", () => {
  assert.equal(typeof integrationUtils.getPaginationRange, "function");
  assert.deepEqual(
    integrationUtils.getPaginationRange({
      page: 99,
      totalRows: 51,
      pageSize: 50,
    }),
    { page: 2, from: 50, to: 99 },
  );
});

test("pagination range normalizes non-finite inputs", () => {
  const range = integrationUtils.getPaginationRange({
    page: Number.NaN,
    totalRows: Number.POSITIVE_INFINITY,
    pageSize: Number.NaN,
  });

  assert.deepEqual(range, { page: 1, from: 0, to: 0 });
  assert.equal(Object.values(range).every(Number.isFinite), true);
});
