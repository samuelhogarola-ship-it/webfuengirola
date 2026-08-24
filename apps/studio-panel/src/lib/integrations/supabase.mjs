const DEFAULT_AUTH_PAGE_SIZE = 1000;
const MAX_AUTH_PAGES = 1000;
const ACTIVE_WINDOW_DAYS = 30;

function errorMessage(error) {
  if (error && typeof error.message === "string" && error.message.trim()) {
    return error.message.trim();
  }
  return "Unknown Supabase error";
}

export function unwrapSupabaseResult(result, context) {
  if (result?.error) {
    throw new Error(`${context}: ${errorMessage(result.error)}`);
  }
  return result?.data;
}

export async function loadIntegrationData(loader, fallbackMessage) {
  try {
    return { data: await loader(), error: null };
  } catch (cause) {
    return {
      data: null,
      error:
        cause instanceof Error && cause.message.trim()
          ? cause.message
          : fallbackMessage,
    };
  }
}

export function safePercentage(value, total) {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0)
    return 0;
  return Math.round((value / total) * 100);
}

export function getPaginationRange({ page, totalRows, pageSize }) {
  const safePageSize = Number.isFinite(pageSize)
    ? Math.max(1, Math.floor(pageSize))
    : 1;
  const safeTotalRows = Number.isFinite(totalRows) ? Math.max(0, totalRows) : 0;
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const lastPage = Math.max(1, Math.ceil(safeTotalRows / safePageSize));
  const resolvedPage = Math.min(safePage, lastPage);
  const from = (resolvedPage - 1) * safePageSize;
  return { page: resolvedPage, from, to: from + safePageSize - 1 };
}

const SAMUEL_COACH_APPS = new Set([
  "samuel_coach",
  "samuel-coach",
  "pruefungsvorbereitung",
  "prufungsvorbereitung",
]);

export function isSamuelCoachAlumno(alumno) {
  return (
    alumno.memberships.some((membership) =>
      SAMUEL_COACH_APPS.has(membership.app),
    ) ||
    Object.keys(alumno.appRoles).some((app) => SAMUEL_COACH_APPS.has(app)) ||
    alumno.premiumCodes.length > 0
  );
}

export async function listAllAuthUsers(listPage, options = {}) {
  const perPage = options.perPage ?? DEFAULT_AUTH_PAGE_SIZE;
  const context = options.context ?? "Auth users";
  const users = [];

  for (let page = 1; page <= MAX_AUTH_PAGES; page += 1) {
    const data = unwrapSupabaseResult(
      await listPage({ page, perPage }),
      context,
    );
    const pageUsers = Array.isArray(data?.users) ? data.users : [];
    users.push(...pageUsers);

    if (pageUsers.length < perPage) return users;
  }

  throw new Error(`${context}: pagination exceeded ${MAX_AUTH_PAGES} pages`);
}

function isRecentlyActive(lastSignInAt, now) {
  if (!lastSignInAt) return false;
  const timestamp = new Date(lastSignInAt).getTime();
  if (!Number.isFinite(timestamp)) return false;
  const cutoff =
    new Date(now).getTime() - ACTIVE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return timestamp >= cutoff;
}

export function buildAppsUsersOverview({
  authUsers,
  profiles,
  memberships,
  search = "",
  appKey,
  now = new Date().toISOString(),
}) {
  const normalized = search.trim().toLowerCase();
  const membershipsByUser = new Map();

  for (const membership of memberships) {
    const list = membershipsByUser.get(membership.user_id) ?? [];
    list.push({
      app: membership.app,
      role: membership.role,
      status: membership.status,
    });
    membershipsByUser.set(membership.user_id, list);
  }

  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
  const allUsers = authUsers.map((user) => {
    const profile = profileById.get(user.id);
    return {
      id: user.id,
      email: user.email ?? profile?.email ?? "",
      name: profile?.full_name ?? null,
      created_at: profile?.created_at ?? user.created_at ?? null,
      last_sign_in_at: user.last_sign_in_at ?? null,
      email_confirmed_at: user.email_confirmed_at ?? null,
      memberships: membershipsByUser.get(user.id) ?? [],
    };
  });

  const scopedUsers = appKey
    ? allUsers.filter((user) =>
        user.memberships.some((membership) => membership.app === appKey),
      )
    : allUsers;
  const users = scopedUsers.filter(
    (user) =>
      !normalized ||
      user.email.toLowerCase().includes(normalized) ||
      (user.name ?? "").toLowerCase().includes(normalized),
  );
  const scopedUserIds = new Set(scopedUsers.map((user) => user.id));

  return {
    users,
    stats: {
      total: scopedUsers.length,
      confirmed: scopedUsers.filter((user) => user.email_confirmed_at).length,
      unconfirmed: scopedUsers.filter((user) => !user.email_confirmed_at)
        .length,
      active: scopedUsers.filter((user) =>
        isRecentlyActive(user.last_sign_in_at, now),
      ).length,
      apps: new Set(
        memberships
          .filter((membership) => scopedUserIds.has(membership.user_id))
          .map((membership) => membership.app),
      ).size,
      vokabel: allUsers.filter((user) =>
        user.memberships.some(
          (membership) => membership.app === "vokabel-world",
        ),
      ).length,
    },
  };
}
