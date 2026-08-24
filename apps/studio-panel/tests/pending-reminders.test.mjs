import test from "node:test";
import assert from "node:assert/strict";

import {
  isAuthorizedCronRequest,
  processPendingReminders,
} from "../src/lib/cron/pending-reminders.mjs";

test("cron authorization accepts only bearer or dedicated secret headers", () => {
  const configuredSecret = "correct-secret";

  assert.equal(isAuthorizedCronRequest({ configuredSecret }), false);
  assert.equal(
    isAuthorizedCronRequest({
      configuredSecret,
      authorization: "Bearer correct-secret",
    }),
    true,
  );
  assert.equal(
    isAuthorizedCronRequest({
      configuredSecret,
      headerSecret: "correct-secret",
    }),
    true,
  );
  assert.equal(
    isAuthorizedCronRequest({
      configuredSecret,
      authorization: "Bearer wrong-secret",
      headerSecret: "wrong-secret",
    }),
    false,
  );
});

test("reminder processing counts a reminder only after persistence succeeds", async () => {
  const persisted = [];
  const steps = [];
  const result = await processPendingReminders({
    items: [
      {
        id: "pending-1",
        title: "Logotipo",
        description: null,
        requested_at: "2026-08-01",
        reminder_interval_days: 7,
        clients: { name: "Cliente", email: "cliente@example.com" },
      },
    ],
    now: new Date("2026-08-23T10:00:00.000Z"),
    claimReminder: async () => {
      steps.push("claim");
      return "claim-1";
    },
    sendReminder: async () => steps.push("send"),
    persistReminder: async (itemId, update) => {
      steps.push("persist");
      persisted.push({ itemId, update });
    },
    releaseClaim: async () => {},
  });

  assert.equal(result.sent, 1);
  assert.equal(result.failed.length, 0);
  assert.equal(persisted[0].itemId, "pending-1");
  assert.equal(
    persisted[0].update.lastReminderSentAt,
    "2026-08-23T10:00:00.000Z",
  );
  assert.equal(persisted[0].update.claimToken, "claim-1");
  assert.equal(persisted[0].update.nextReminderAt, "2026-08-30");
  assert.deepEqual(steps, ["claim", "send", "persist"]);
});

test("persistence failures are observable and are not reported as sent", async () => {
  const released = [];
  const result = await processPendingReminders({
    items: [
      {
        id: "pending-2",
        title: "Accesos",
        description: "Enviar credenciales",
        requested_at: "2026-08-10",
        reminder_interval_days: 3,
        clients: [{ name: "Cliente", email: "cliente@example.com" }],
      },
    ],
    now: new Date("2026-08-23T10:00:00.000Z"),
    claimReminder: async () => "claim-2",
    sendReminder: async () => {},
    persistReminder: async () => {
      throw new Error("database unavailable");
    },
    releaseClaim: async (itemId, update) => released.push({ itemId, update }),
  });

  assert.equal(result.sent, 0);
  assert.deepEqual(result.failed, [
    { id: "pending-2", stage: "persist", message: "database unavailable" },
  ]);
  assert.deepEqual(released, [
    { itemId: "pending-2", update: { claimToken: "claim-2" } },
  ]);
});

test("items without a destination are skipped without attempting delivery", async () => {
  let deliveryAttempts = 0;
  const result = await processPendingReminders({
    items: [
      {
        id: "pending-3",
        title: "Contenido",
        requested_at: "2026-08-10",
        reminder_interval_days: 5,
        clients: { name: "Cliente", email: null },
      },
    ],
    claimReminder: async () => "claim-3",
    sendReminder: async () => {
      deliveryAttempts += 1;
    },
    persistReminder: async () => {},
    releaseClaim: async () => {},
  });

  assert.equal(deliveryAttempts, 0);
  assert.equal(result.skipped, 1);
  assert.equal(result.sent, 0);
});

test("a failed delivery releases its claim for a later retry", async () => {
  const released = [];
  const result = await processPendingReminders({
    items: [
      {
        id: "pending-4",
        title: "Fotos",
        requested_at: "2026-08-10",
        reminder_interval_days: 2,
        next_reminder_at: "2026-08-23",
        clients: { name: "Cliente", email: "cliente@example.com" },
      },
    ],
    now: new Date("2026-08-23T10:00:00.000Z"),
    claimReminder: async () => "claim-4",
    sendReminder: async () => {
      throw new Error("mail unavailable");
    },
    persistReminder: async () => {},
    releaseClaim: async (itemId, update) => released.push({ itemId, update }),
  });

  assert.equal(result.sent, 0);
  assert.equal(result.failed[0].stage, "send");
  assert.deepEqual(released, [
    { itemId: "pending-4", update: { claimToken: "claim-4" } },
  ]);
});
