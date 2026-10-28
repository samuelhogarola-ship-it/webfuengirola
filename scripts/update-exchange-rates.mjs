import { rename, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ECB_DAILY_URL =
  "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";
const DEFAULT_OUTPUT_FILE = fileURLToPath(
  new URL("../data/exchange-rates.json", import.meta.url),
);
const REQUIRED_CURRENCIES = Object.freeze(["USD", "MXN", "BRL"]);

function readAttribute(attributes, name) {
  const match = attributes.match(
    new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"),
  );
  return match?.[2];
}

export function parseEcbRates(xmlText) {
  if (
    typeof xmlText !== "string" ||
    !xmlText.includes("<") ||
    !xmlText.includes(">") ||
    !/<\/[^>]+>/.test(xmlText)
  ) {
    throw new Error("Unable to parse ECB XML");
  }

  const datedCube = xmlText.match(
    /<Cube\b([^>]*\btime\s*=\s*(["'])(.*?)\2[^>]*)>/i,
  );
  const date = datedCube?.[3];

  if (!date || !DATE_PATTERN.test(date)) {
    throw new Error("ECB XML is missing a reference date");
  }

  const rates = {};
  const cubePattern = /<Cube\b([^>]*)\/?\s*>/gi;
  let cubeMatch;

  while ((cubeMatch = cubePattern.exec(xmlText)) !== null) {
    const currency = readAttribute(cubeMatch[1], "currency");
    if (!currency) continue;

    const rawRate = readAttribute(cubeMatch[1], "rate");
    const rate = Number(rawRate);

    if (!rawRate || !Number.isFinite(rate) || rate <= 0) {
      throw new Error(`Invalid ECB rate for ${currency}`);
    }

    rates[currency] = rate;
  }

  return { date, rates };
}

export function buildExchangeRateSnapshot(xmlText, requiredCurrencies) {
  const parsed = parseEcbRates(xmlText);
  const rates = {};

  for (const currency of requiredCurrencies) {
    const rate = parsed.rates[currency];

    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error(`Missing ECB rate for ${currency}`);
    }

    rates[currency] = rate;
  }

  return {
    base: "EUR",
    date: parsed.date,
    rates,
  };
}

export async function updateExchangeRates({
  fetchImpl = globalThis.fetch,
  outputFile = DEFAULT_OUTPUT_FILE,
} = {}) {
  const response = await fetchImpl(ECB_DAILY_URL);

  if (!response?.ok) {
    throw new Error(
      `ECB request failed with HTTP ${response?.status ?? "unknown"}`,
    );
  }

  const xmlText = await response.text();
  const snapshot = buildExchangeRateSnapshot(xmlText, REQUIRED_CURRENCIES);
  const temporaryFile = `${outputFile}.tmp-${process.pid}-${Date.now()}`;

  try {
    await writeFile(
      temporaryFile,
      `${JSON.stringify(snapshot, null, 2)}\n`,
      "utf8",
    );
    await rename(temporaryFile, outputFile);
  } catch (error) {
    await rm(temporaryFile, { force: true });
    throw error;
  }

  return snapshot;
}

if (
  process.argv[1] &&
  pathToFileURL(process.argv[1]).href === import.meta.url
) {
  updateExchangeRates()
    .then(({ date }) => {
      console.log(`ECB exchange rates updated for ${date}`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
