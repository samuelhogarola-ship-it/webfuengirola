import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("commercial conversion links are delegated to the common analytics runtime", () => {
  const script = fs.readFileSync(path.join(root, "script.js"), "utf8");
  assert.match(script, /analyticsEvent/);
  assert.match(script, /UmamiAnalyticsCore\.bindAutoEvents/);
  assert.match(script, /inferAnalyticsEvent/);
  assert.match(script, /function fetchAnalyticsConfig/);
  assert.match(script, /fetchAnalyticsConfig\("\/umami-config\.json"\)/);
  assert.match(script, /fetchAnalyticsConfig\("\/analytics-profile\.json"\)/);
  assert.match(script, /analyticsTier/);
  assert.match(script, /analyticsTargetLocale/);
  assert.match(script, /analyticsMarket/);
  assert.match(script, /analyticsTargetMarket/);
  assert.match(script, /document\.body\.dataset\.market/);
  assert.match(script, /document\.body\.dataset\.currency/);
  assert.match(script, /document\.body\.dataset\.sector/);
  assert.match(script, /blog_to_landing/);
  assert.match(script, /plan: element\.dataset\.analyticsTier/);
  assert.doesNotMatch(script, /destination:/);
  assert.doesNotMatch(script, /calculator_interaction/);
  assert.doesNotMatch(script, /calculator_choice/);
  assert.doesNotMatch(script, /calculator_result/);

  const formScript = fs.readFileSync(
    path.join(root, "contact-form.js"),
    "utf8",
  );
  assert.match(formScript, /URLSearchParams/);
  assert.match(formScript, /requestedPlan/);
  assert.match(formScript, /requestedSector/);
  assert.match(formScript, /sector: pageSector/);
  assert.match(formScript, /data-form-market/);
  assert.match(formScript, /data-form-currency/);
  assert.match(formScript, /composeContextMessage/);
  assert.match(formScript, /createContactPayload/);
  assert.match(formScript, /formAnalyticsData/);
  assert.doesNotMatch(
    formScript,
    /trackEvent\([^)]*(?:name|email|phone|message)/s,
  );
});
