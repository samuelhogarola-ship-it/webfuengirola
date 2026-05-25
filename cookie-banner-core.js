/* Shared consent banner core imported from the reusable core repo. */
(function () {
  'use strict';

  var DEFAULT_DECISION_KEY = 'cookie_consent';
  var DEFAULT_PREFERENCES_KEY = 'cookie_preferences';
  var ROOT_ID = 'cookie-banner-core-root';
  var activeInstance = null;

  function getDecisionKey(cfg) {
    return cfg.decisionStorageKey || cfg.storageKey || DEFAULT_DECISION_KEY;
  }

  function getPreferencesKey(cfg) {
    if (cfg.preferencesStorageKey) return cfg.preferencesStorageKey;
    if (cfg.storageKey) return cfg.storageKey + '_preferences';
    return DEFAULT_PREFERENCES_KEY;
  }

  function getStorage() {
    try {
      return window.localStorage;
    } catch (_error) {
      return null;
    }
  }

  function readStorage(key) {
    var storage = getStorage();
    if (!storage || !key) return null;
    try {
      return storage.getItem(key);
    } catch (_error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    var storage = getStorage();
    if (!storage || !key) return;
    try {
      storage.setItem(key, value);
    } catch (_error) {}
  }

  function normalizePreferences(value) {
    return {
      necesarias: true,
      analiticas: !!(value && value.analiticas)
    };
  }

  function readDecision(cfg) {
    var decisionKey = getDecisionKey(cfg);
    var storedDecision = readStorage(decisionKey);
    if (storedDecision) return storedDecision;
    if (cfg.storageKey && cfg.storageKey !== decisionKey) {
      return readStorage(cfg.storageKey);
    }
    return null;
  }

  function readPreferences(cfg) {
    var raw = readStorage(getPreferencesKey(cfg));
    if (raw) {
      try {
        return normalizePreferences(JSON.parse(raw));
      } catch (_error) {}
    }

    var decision = readDecision(cfg);
    if (decision === 'accepted') return { necesarias: true, analiticas: true };
    if (decision === 'rejected') return { necesarias: true, analiticas: false };
    return { necesarias: true, analiticas: false };
  }

  function persistDecision(cfg, decision, preferences) {
    var normalized = normalizePreferences(preferences);
    writeStorage(getDecisionKey(cfg), decision);
    writeStorage(getPreferencesKey(cfg), JSON.stringify(normalized));
    if (cfg.storageKey && cfg.storageKey !== getDecisionKey(cfg)) {
      writeStorage(cfg.storageKey, decision);
    }
  }

  function ensureRoot() {
    var root = document.getElementById(ROOT_ID);
    if (root) return root;
    root = document.createElement('div');
    root.id = ROOT_ID;
    document.body.appendChild(root);
    return root;
  }

  function renderBanner(cfg, preferences) {
    var imgHtml = cfg.imageSrc
      ? '<div class="cookie-banner-img-container">' +
          '<img src="' + cfg.imageSrc + '" alt="' + (cfg.imageAlt || '') + '" class="cookie-banner-img">' +
        '</div>'
      : '';

    return '' +
      '<div class="cookie-banner-wrapper" data-cookie-banner-wrapper>' +
        '<div class="cookie-banner-card">' +
          imgHtml +
          '<h2>' + (cfg.title || '') + '</h2>' +
          '<div class="cookie-banner-notice">' + (cfg.noticeHtml || '') + '</div>' +
          '<div class="cookie-banner-buttons">' +
            '<button class="cb-reject cookie-btn btn-cookie-secondary" type="button" data-cookie-reject>' + (cfg.rejectLabel || 'Rechazar') + '</button>' +
            '<button class="cb-accept cookie-btn btn-cookie-primary" type="button" data-cookie-accept>' + (cfg.acceptLabel || 'Aceptar') + '</button>' +
          '</div>' +
          '<div class="cookie-banner-footer">' +
            '<button class="cookie-config-link" type="button" data-cookie-open-config>' + (cfg.configLabel || '') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="cookie-config-modal" data-cookie-config-modal aria-hidden="true">' +
          '<div class="cookie-config-backdrop" data-cookie-config-close></div>' +
          '<div class="cookie-config-dialog" role="dialog" aria-modal="true" aria-labelledby="cookieConfigTitle">' +
            '<button class="cookie-config-close" type="button" data-cookie-config-close aria-label="Cerrar">' +
              '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">' +
                '<path d="M1 1l12 12M13 1L1 13"></path>' +
              '</svg>' +
            '</button>' +
            '<h3 id="cookieConfigTitle">' + (cfg.configModalTitle || '') + '</h3>' +
            '<p class="cookie-config-intro">' + (cfg.configModalIntro || '') + '</p>' +
            '<div class="cookie-config-options">' +
              '<div class="cookie-config-option cookie-config-option-locked">' +
                '<div class="cookie-config-copy">' +
                  '<div class="cookie-config-option-title">' + (cfg.necessaryTitle || '') + '</div>' +
                  '<p>' + (cfg.necessaryDescription || '') + '</p>' +
                '</div>' +
                '<div class="cookie-config-meta">' +
                  '<span class="cookie-config-badge">' + (cfg.necessaryBadge || '') + '</span>' +
                  '<label class="cookie-switch cookie-switch-disabled">' +
                    '<input type="checkbox" checked disabled>' +
                    '<span>On</span>' +
                  '</label>' +
                '</div>' +
              '</div>' +
              '<div class="cookie-config-option">' +
                '<div class="cookie-config-copy">' +
                  '<div class="cookie-config-option-title">' + (cfg.analyticsTitle || '') + '</div>' +
                  '<p>' + (cfg.analyticsDescription || '') + '</p>' +
                '</div>' +
                '<label class="cookie-switch">' +
                  '<input type="checkbox" data-cookie-analytics-toggle' + (preferences.analiticas ? ' checked' : '') + '>' +
                  '<span aria-hidden="true"></span>' +
                '</label>' +
              '</div>' +
            '</div>' +
            '<div class="cookie-config-actions">' +
              '<button class="cookie-btn btn-cookie-primary cookie-btn-full" type="button" data-cookie-save-config>' + (cfg.saveConfigLabel || 'Guardar configuración') + '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function createInstance(cfg) {
    var root = ensureRoot();
    var currentConfig = cfg || {};
    var currentPreferences = readPreferences(currentConfig);
    var documentKeyHandler = null;

    function cleanupListeners() {
      if (documentKeyHandler) {
        document.removeEventListener('keydown', documentKeyHandler);
        documentKeyHandler = null;
      }
    }

    function hideModal() {
      var modal = root.querySelector('[data-cookie-config-modal]');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }

    function showModal() {
      var modal = root.querySelector('[data-cookie-config-modal]');
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }

    function removeBanner() {
      cleanupListeners();
      root.innerHTML = '';
    }

    function notify(callbackName, preferences) {
      var callback = currentConfig[callbackName];
      if (typeof callback === 'function') callback(normalizePreferences(preferences));
    }

    function applyDecision(decision, preferences, callbackName) {
      currentPreferences = normalizePreferences(preferences);
      persistDecision(currentConfig, decision, currentPreferences);
      removeBanner();
      notify(callbackName, currentPreferences);
    }

    function bindEvents() {
      var rejectButton = root.querySelector('[data-cookie-reject]');
      var acceptButton = root.querySelector('[data-cookie-accept]');
      var configButton = root.querySelector('[data-cookie-open-config]');
      var saveButton = root.querySelector('[data-cookie-save-config]');
      var analyticsToggle = root.querySelector('[data-cookie-analytics-toggle]');
      var closeButtons = root.querySelectorAll('[data-cookie-config-close]');

      if (rejectButton) {
        rejectButton.addEventListener('click', function () {
          applyDecision('rejected', { necesarias: true, analiticas: false }, 'onReject');
        });
      }

      if (acceptButton) {
        acceptButton.addEventListener('click', function () {
          applyDecision('accepted', { necesarias: true, analiticas: true }, 'onAccept');
        });
      }

      if (configButton) {
        configButton.addEventListener('click', function () {
          showModal();
        });
      }

      if (saveButton) {
        saveButton.addEventListener('click', function () {
          applyDecision('configured', { necesarias: true, analiticas: !!(analyticsToggle && analyticsToggle.checked) }, 'onSaveConfig');
        });
      }

      closeButtons.forEach(function (button) {
        button.addEventListener('click', hideModal);
      });

      documentKeyHandler = function (event) {
        if (event.key === 'Escape') hideModal();
      };
      document.addEventListener('keydown', documentKeyHandler);
    }

    function render() {
      cleanupListeners();
      if (readDecision(currentConfig)) {
        removeBanner();
        return;
      }
      currentPreferences = readPreferences(currentConfig);
      root.innerHTML = renderBanner(currentConfig, currentPreferences);
      bindEvents();
    }

    function update(nextConfig) {
      currentConfig = Object.assign({}, currentConfig, nextConfig || {});
      render();
    }

    function destroy() {
      removeBanner();
    }

    render();

    return {
      update: update,
      destroy: destroy,
      getDecision: function () {
        return readDecision(currentConfig);
      },
      getPreferences: function () {
        return readPreferences(currentConfig);
      }
    };
  }

  function init(cfg) {
    if (activeInstance) {
      activeInstance.update(cfg || {});
      return activeInstance;
    }
    activeInstance = createInstance(cfg || {});
    return activeInstance;
  }

  window.CookieBannerCore = { init: init };
})();
