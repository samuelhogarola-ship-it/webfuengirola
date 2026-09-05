import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("commercial conversion links are sent to the existing analytics adapter", () => {
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  assert.match(script, /data-analytics-event/);
  assert.match(script, /WFAnalytics\.trackEvent/);
  assert.match(script, /analyticsLocale/);
  assert.match(script, /analyticsTier/);
  assert.match(script, /analyticsTargetLocale/);
  assert.match(script, /document\.body\.dataset\.sector/);
  assert.match(script, /blog_to_landing/);
  assert.match(script, /calculator_interaction/);
  assert.match(script, /calculator_choice/);
  assert.match(script, /calculator_result/);
  assert.match(script, /initialTotal/);
  assert.match(script, /monthlyTotal/);

  const formScript = fs.readFileSync(path.join(root, "contact-form.js"), "utf8");
  assert.match(formScript, /URLSearchParams/);
  assert.match(formScript, /requestedPlan/);
  assert.match(formScript, /requestedSector/);
  assert.match(formScript, /sector: pageSector/);
});
