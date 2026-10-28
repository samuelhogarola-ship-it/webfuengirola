export const marketOrder = Object.freeze(["spain", "mexico", "usa", "brasil"]);

export const markets = Object.freeze({
  spain: Object.freeze({
    key: "spain",
    label: "España",
    published: true,
    primaryLocale: "es-ES",
    currency: "EUR",
    contactPhone: "+34622923988",
    roundingIncrement: 1,
    routes: Object.freeze({
      "es-ES": "/",
      "en-GB": "/en/",
      "de-DE": "/de/",
      "fi-FI": "/fi/",
    }),
    localeLabels: Object.freeze({
      "es-ES": "Español",
      "en-GB": "English",
      "de-DE": "Deutsch",
      "fi-FI": "Suomi",
    }),
  }),
  mexico: Object.freeze({
    key: "mexico",
    label: "México",
    published: true,
    primaryLocale: "es-MX",
    currency: "MXN",
    contactPhone: "+525516529733",
    roundingIncrement: 100,
    routes: Object.freeze({
      "es-MX": "/mexico/",
      "en-MX": "/mexico/en/",
    }),
    localeLabels: Object.freeze({
      "es-MX": "Español",
      "en-MX": "English",
    }),
  }),
  usa: Object.freeze({
    key: "usa",
    label: "USA",
    published: true,
    primaryLocale: "en-US",
    currency: "USD",
    contactPhone: "+34622923988",
    roundingIncrement: 5,
    routes: Object.freeze({
      "en-US": "/usa/",
      "es-US": "/usa/es/",
    }),
    localeLabels: Object.freeze({
      "en-US": "English",
      "es-US": "Español",
    }),
  }),
  brasil: Object.freeze({
    key: "brasil",
    label: "Brasil",
    published: true,
    primaryLocale: "pt-BR",
    currency: "BRL",
    contactPhone: "+34622923988",
    roundingIncrement: 10,
    routes: Object.freeze({
      "pt-BR": "/brasil/",
    }),
    localeLabels: Object.freeze({
      "pt-BR": "Português",
    }),
  }),
});

export function getMarket(marketKey) {
  const market = markets[marketKey];

  if (!market) {
    throw new Error(`Unknown market: ${marketKey}`);
  }

  return market;
}

export function getPublishedMarkets() {
  return marketOrder.map(getMarket).filter(({ published }) => published);
}

export function getMarketLocale(marketKey, localeCode) {
  const market = getMarket(marketKey);
  const route = market.routes[localeCode];

  if (!route) {
    throw new Error(`Unknown locale ${localeCode} for market ${marketKey}`);
  }

  return Object.freeze({
    code: localeCode,
    route,
    label: market.localeLabels[localeCode],
  });
}
