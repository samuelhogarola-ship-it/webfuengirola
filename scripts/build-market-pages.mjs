import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { brand, tiers } from "../data/commercial-pages-data.mjs";
import defaultSnapshot from "../data/exchange-rates.json" with { type: "json" };
import { getHomepageRecord } from "../data/home-pages-data.mjs";
import { marketPages } from "../data/market-pages-data.mjs";
import { getMarket } from "../data/markets-data.mjs";
import { priceForMarket } from "../lib/market-pricing.mjs";
import { generateHomepages, renderHomepage } from "./render-homepage.mjs";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function absolute(route) {
  return `${brand.site}${route}`;
}

function baseLocale(page) {
  return page.localeCode.split("-")[0];
}

export function renderMarketHreflang(marketKey) {
  const market = getMarket(marketKey);
  const alternates = Object.entries(market.routes)
    .map(
      ([localeCode, route]) =>
        `  <link rel="alternate" hreflang="${localeCode}" href="${absolute(route)}" />`,
    )
    .join("\n");

  return `${alternates}\n  <link rel="alternate" hreflang="x-default" href="${absolute(market.routes[market.primaryLocale])}" />`;
}

export function renderMarketTierCards(page, snapshot = defaultSnapshot) {
  const market = getMarket(page.marketKey);
  const sourceLocale = baseLocale(page);
  const tierLocale = sourceLocale === "pt" ? "en" : sourceLocale;
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  return `<div class="commercial-tier-grid">
    ${tiers
      .map((tier, index) => {
        const price = priceForMarket({
          eurAmount: tier.price,
          marketKey: page.marketKey,
          snapshot,
        });
        const symbol = market.currency === "BRL" ? "R$ " : "$";
        return `<article class="commercial-tier${tier.popular ? " commercial-tier--featured" : ""}" data-tier="${tier.key}">${
          tier.popular
            ? `<span class="commercial-tier__badge">${sourceLocale === "es" ? "Más popular" : sourceLocale === "pt" ? "Mais popular" : "Most popular"}</span>`
            : ""
        }
      <h3>${escapeHtml(tier.name[tierLocale])}</h3>
      <p class="commercial-tier__price"><span data-tier-price="${price.display}" data-currency="${market.currency}">${symbol}${formatter.format(price.display)} ${market.currency}</span></p>
      <p>${escapeHtml(page.tierUses[index])}</p>
      <ul>${tier.features[tierLocale].map((feature) => `<li>✓ ${escapeHtml(feature)}</li>`).join("")}</ul>
      <a class="btn ${tier.popular ? "btn--primary" : "btn--outline"}" href="#contact" data-analytics-event="tier_select" data-analytics-market="${page.marketKey}" data-analytics-locale="${page.localeCode}" data-analytics-tier="${tier.key}">${escapeHtml(page.labels.packageCta)}</a>
    </article>`;
      })
      .join("\n")}
  </div>
  <p class="commercial-price-note">${escapeHtml(page.labels.rateNote)}: ${escapeHtml(snapshot.date)} · ${escapeHtml(page.labels.taxNote)}</p>`;
}

export function renderMarketPage(page, snapshot = defaultSnapshot) {
  return renderHomepage(
    getHomepageRecord(page.marketKey, page.localeCode),
    snapshot,
  );
}

export async function generateMarketPages(
  outputRoot = projectRoot,
  { marketKeys = Object.keys(marketPages), snapshot = defaultSnapshot } = {},
) {
  return generateHomepages(outputRoot, { marketKeys, snapshot });
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const written = await generateMarketPages();
  console.log(`Generated ${written.length} WF-Studio market pages.`);
}
