/* ═══════════════════════════════════════════════════════════════
   google-analytics-core.js — GA4 + Consent Mode v2
   Exposes window.GoogleAnalyticsCore.init(config).

   ── Two loading modes ────────────────────────────────────────

   Advanced (default, loadBeforeConsent: true)
     Google's recommended "advanced consent mode":
     1. dataLayer + gtag() set up
     2. gtag('consent', 'default', ...) — BEFORE the script tag
     3. <script async gtag.js> injected regardless of consent
     4. gtag('config', measurementId)
     No personal data is sent while analytics_storage is denied.
     → On grantConsent(): consent update + fresh page_view so the current
        page is captured under granted state (the initial page_view fired
        while analytics_storage was still 'denied').

   Conservative (loadBeforeConsent: false)
     "Basic/manual" consent mode — no script touches the network
     until the user explicitly accepts analytics:
     1. dataLayer + gtag() set up
     2. gtag('consent', 'default', denied)
     3. Script NOT loaded yet
     → On grantConsent(): load script + gtag('config', ...)
     → Returning visitor (analiticas:true in localStorage):
        script loads immediately inside init(), same as advanced.
     Use this for legally cautious projects or clients who prefer
     no third-party requests before explicit opt-in.

   ── Integration with CookieBannerCore ────────────────────────
     Pass grantConsent / revokeConsent as callbacks:
       onAccept:    (prefs) => prefs.analiticas && GoogleAnalyticsCore.grantConsent()
       onReject:    ()      => GoogleAnalyticsCore.revokeConsent()
       onSaveConfig:(prefs) => prefs.analiticas
                                 ? GoogleAnalyticsCore.grantConsent()
                                 : GoogleAnalyticsCore.revokeConsent()
═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var _config                = null;
  var _initialized           = false;
  var _scriptLoaded          = false;
  var _initialConsentGranted = false; // true when init() ran with consent already stored

  function getStorage() {
    try { return window.localStorage; } catch (_) { return null; }
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

  function setupDataLayer() {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    window.gtag('js', new Date());
  }

  function applyConsentDefault(analyticsGranted) {
    window.gtag('consent', 'default', {
      analytics_storage:    analyticsGranted ? 'granted' : 'denied',
      ad_storage:           'denied',
      ad_user_data:         'denied',
      ad_personalization:   'denied',
      functionality_storage:'granted',
      security_storage:     'granted'
    });
  }

  function loadScript(measurementId) {
    if (document.querySelector('script[data-google-analytics-core]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.dataset.googleAnalyticsCore = 'true';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
  }

  function activateTracking() {
    loadScript(_config.measurementId);
    window.gtag('config', _config.measurementId, {
      send_page_view: _config.sendPageView !== false,
      anonymize_ip:   true
    });
    _scriptLoaded = true;
  }

  function init(config) {
    if (_initialized) return;
    _config = config || {};

    var measurementId = _config.measurementId;
    if (!measurementId) {
      if (_config.debug) console.warn('[GoogleAnalyticsCore] measurementId is required');
      return;
    }

    var prefsKey = _config.preferencesKey !== undefined
      ? _config.preferencesKey
      : 'cookie_preferences';

    var alreadyConsented = readStoredAnalyticsConsent(prefsKey);
    var loadEarly = _config.loadBeforeConsent !== false; // default: true

    // Consent default must be set BEFORE the script tag (Consent Mode v2)
    setupDataLayer();
    applyConsentDefault(alreadyConsented);

    _initialConsentGranted = alreadyConsented;

    if (loadEarly) {
      // Advanced mode: load now, Consent Mode v2 handles the rest
      activateTracking();
    } else if (alreadyConsented) {
      // Conservative mode, returning visitor who already accepted:
      // safe to load immediately — no need to wait for banner
      activateTracking();
    }
    // else: conservative mode, first visit — wait for grantConsent()

    _initialized = true;

    if (_config.debug) {
      console.log(
        '[GoogleAnalyticsCore] initialized', measurementId,
        '| mode:', loadEarly ? 'advanced' : 'conservative',
        '| consent:', alreadyConsented,
        '| script loaded:', _scriptLoaded
      );
    }
  }

  function grantConsent() {
    if (!_initialized || typeof window.gtag !== 'function') return;

    // Consent update MUST be queued before activateTracking() so that
    // gtag('config', ...) and the initial page_view fire under 'granted',
    // not under the previous 'denied' default.
    window.gtag('consent', 'update', { analytics_storage: 'granted' });

    if (!_scriptLoaded) {
      // Conservative mode: first grant → load script now
      activateTracking();
    } else if (_config.sendPageView !== false && !_initialConsentGranted) {
      // Advanced mode: the initial page_view fired under analytics_storage: 'denied'.
      // Fire a fresh one now so this session is captured under granted state.
      // Flip the flag immediately so repeated grantConsent() calls are idempotent.
      _initialConsentGranted = true;
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_title:    document.title
      });
    }

    if (_config && _config.debug) console.log('[GoogleAnalyticsCore] consent granted');
  }

  function revokeConsent() {
    if (!_initialized || typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
    if (_config && _config.debug) console.log('[GoogleAnalyticsCore] consent revoked');
  }

  function trackEvent(eventName, params) {
    if (!_initialized || typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  function trackPageview(path, title) {
    if (!_initialized || typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
      page_path:  path  || (typeof window !== 'undefined' && window.location ? window.location.pathname : ''),
      page_title: title || (typeof document !== 'undefined' ? document.title : '')
    });
  }

  // Visible for testing — resets module state so tests can re-init cleanly
  function _reset() {
    _config                = null;
    _initialized           = false;
    _scriptLoaded          = false;
    _initialConsentGranted = false;
  }

  window.GoogleAnalyticsCore = {
    init: init,
    grantConsent: grantConsent,
    revokeConsent: revokeConsent,
    trackEvent: trackEvent,
    trackPageview: trackPageview,
    _reset: _reset
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      init: init,
      grantConsent: grantConsent,
      revokeConsent: revokeConsent,
      trackEvent: trackEvent,
      trackPageview: trackPageview,
      _reset: _reset
    };
  }
})();
