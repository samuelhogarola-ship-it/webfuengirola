/*
   umami-analytics-core.js - Umami + CookieBannerCore consent
   Exposes window.UmamiAnalyticsCore.init(config).

   The script is intentionally conservative: no Umami request is made until
   the visitor accepts analytics cookies or already has that preference saved.
*/
(function () {
  "use strict";

  var DEFAULT_SCRIPT_SRC = "https://analytics.2.24.10.239.sslip.io/script.js";
  var PLACEHOLDER_WEBSITE_IDS = {
    "": true,
    REPLACE_WITH_UMAMI_WEBSITE_ID: true,
  };

  var _config = null;
  var _initialized = false;
  var _consentGranted = false;
  var _queue = [];

  function getStorage() {
    try {
      return window.localStorage;
    } catch (_) {
      return null;
    }
  }

  function readStoredAnalyticsConsent(preferencesKey) {
    var storage = getStorage();
    if (!storage || !preferencesKey) return false;
    try {
      var raw = storage.getItem(preferencesKey);
      if (!raw) return false;
      var prefs = JSON.parse(raw);
      return !!(prefs && prefs.analiticas);
    } catch (_) {
      return false;
    }
  }

  function hasValidWebsiteId() {
    return !!(
      _config &&
      _config.websiteId &&
      !PLACEHOLDER_WEBSITE_IDS[_config.websiteId]
    );
  }

  function logMissingConfig() {
    if (_config && _config.debug) {
      console.warn("[UmamiAnalyticsCore] websiteId is required");
    }
  }

  function flushQueue() {
    if (!window.umami || typeof window.umami.track !== "function") return;
    while (_queue.length) {
      var item = _queue.shift();
      window.umami.track(item.eventName, item.params || {});
    }
  }

  function loadScript() {
    if (!_initialized || !_consentGranted) return;
    if (!hasValidWebsiteId()) {
      logMissingConfig();
      return;
    }

    if (document.querySelector("script[data-umami-analytics-core]")) {
      flushQueue();
      return;
    }

    var script = document.createElement("script");
    script.defer = true;
    script.async = true;
    script.dataset.umamiAnalyticsCore = "true";
    script.dataset.websiteId = _config.websiteId;
    script.src = _config.scriptSrc || DEFAULT_SCRIPT_SRC;

    if (_config.hostUrl) script.dataset.hostUrl = _config.hostUrl;
    if (_config.domains) script.dataset.domains = _config.domains;
    if (_config.autoTrack === false) script.dataset.autoTrack = "false";

    script.addEventListener("load", flushQueue);
    document.head.appendChild(script);
  }

  function init(config) {
    if (_initialized) return;
    _config = config || {};

    var prefsKey =
      _config.preferencesKey !== undefined
        ? _config.preferencesKey
        : "cookie_preferences";

    _consentGranted = readStoredAnalyticsConsent(prefsKey);
    _initialized = true;

    if (_consentGranted) loadScript();
  }

  function grantConsent() {
    _consentGranted = true;
    loadScript();
  }

  function revokeConsent() {
    _consentGranted = false;
    _queue = [];
  }

  function trackEvent(eventName, params) {
    if (!_initialized || !_consentGranted || !eventName) return;

    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(eventName, params || {});
      return;
    }

    _queue.push({ eventName: eventName, params: params || {} });
    loadScript();
  }

  function trackPageview(path, title) {
    trackEvent("pageview", {
      url:
        path ||
        (typeof window !== "undefined" && window.location
          ? window.location.pathname
          : ""),
      title: title || (typeof document !== "undefined" ? document.title : ""),
    });
  }

  function _reset() {
    _config = null;
    _initialized = false;
    _consentGranted = false;
    _queue = [];
  }

  var api = {
    init: init,
    grantConsent: grantConsent,
    revokeConsent: revokeConsent,
    trackEvent: trackEvent,
    trackPageview: trackPageview,
    _reset: _reset,
  };

  window.UmamiAnalyticsCore = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
