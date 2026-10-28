import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildExchangeRateSnapshot,
  parseEcbRates,
  updateExchangeRates,
} from "../scripts/update-exchange-rates.mjs";

const requiredCurrencies = ["USD", "MXN", "BRL"];
const fixtureUrl = new URL(
  "./fixtures/ecb-eurofxref-daily.xml",
  import.meta.url,
);

test("the official ECB daily format yields its date and numeric rates", async () => {
  const xmlText = await readFile(fixtureUrl, "utf8");

  assert.deepEqual(parseEcbRates(xmlText), {
    date: "2026-10-27",
    rates: {
      USD: 1.115,
      MXN: 20.78,
      BRL: 5.9624,
    },
  });
  assert.deepEqual(buildExchangeRateSnapshot(xmlText, requiredCurrencies), {
    base: "EUR",
    date: "2026-10-27",
    rates: {
      USD: 1.115,
      MXN: 20.78,
      BRL: 5.9624,
    },
  });
});

test("malformed ECB XML is rejected", () => {
  assert.throws(() => parseEcbRates("<not-xml"), /Unable to parse ECB XML/);
});

test("an ECB payload without a reference date is rejected", () => {
  assert.throws(
    () =>
      parseEcbRates(
        '<?xml version="1.0"?><Envelope><Cube><Cube currency="USD" rate="1.1" /></Cube></Envelope>',
      ),
    /ECB XML is missing a reference date/,
  );
});

test("non-numeric and non-positive ECB rates are rejected", () => {
  for (const rate of ["not-a-rate", "0", "-2"]) {
    assert.throws(
      () =>
        parseEcbRates(
          `<Envelope><Cube><Cube time="2026-10-27"><Cube currency="USD" rate="${rate}" /></Cube></Cube></Envelope>`,
        ),
      /Invalid ECB rate for USD/,
    );
  }
});

test("a snapshot cannot omit any requested currency", async () => {
  const xmlText = await readFile(fixtureUrl, "utf8");

  assert.throws(
    () => buildExchangeRateSnapshot(xmlText, [...requiredCurrencies, "CAD"]),
    /Missing ECB rate for CAD/,
  );
});

async function createOutputFile(t) {
  const directory = await mkdtemp(path.join(tmpdir(), "wf-rates-"));
  const outputFile = path.join(directory, "exchange-rates.json");
  const original = '{"existing":"snapshot"}\n';
  await writeFile(outputFile, original, "utf8");
  t.after(() => rm(directory, { recursive: true, force: true }));
  return { outputFile, original };
}

test("a successful update atomically writes the validated snapshot", async (t) => {
  const xmlText = await readFile(fixtureUrl, "utf8");
  const { outputFile } = await createOutputFile(t);
  const fetchImpl = async () => ({
    ok: true,
    status: 200,
    text: async () => xmlText,
  });

  const snapshot = await updateExchangeRates({ fetchImpl, outputFile });

  assert.deepEqual(snapshot, {
    base: "EUR",
    date: "2026-10-27",
    rates: { USD: 1.115, MXN: 20.78, BRL: 5.9624 },
  });
  assert.equal(
    await readFile(outputFile, "utf8"),
    `${JSON.stringify(snapshot, null, 2)}\n`,
  );
});

test("failed or invalid ECB responses preserve the last snapshot byte for byte", async (t) => {
  const cases = [
    {
      name: "HTTP failure",
      fetchImpl: async () => ({ ok: false, status: 503 }),
      error: /ECB request failed with HTTP 503/,
    },
    {
      name: "malformed XML",
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        text: async () => "<not-xml",
      }),
      error: /Unable to parse ECB XML/,
    },
    {
      name: "missing currency",
      fetchImpl: async () => ({
        ok: true,
        status: 200,
        text: async () =>
          '<Envelope><Cube><Cube time="2026-10-27"><Cube currency="USD" rate="1.115" /></Cube></Cube></Envelope>',
      }),
      error: /Missing ECB rate for MXN/,
    },
  ];

  for (const scenario of cases) {
    await t.test(scenario.name, async (childTest) => {
      const { outputFile, original } = await createOutputFile(childTest);

      await assert.rejects(
        updateExchangeRates({
          fetchImpl: scenario.fetchImpl,
          outputFile,
        }),
        scenario.error,
      );
      assert.equal(await readFile(outputFile, "utf8"), original);
    });
  }
});
