(function () {
  'use strict';

  var FORM_SELECTOR = '[data-contact-form]';
  var DEFAULT_API_BASE = 'https://admin.webfuengirola.com';

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setStatus(node, message, type) {
    if (!node) return;
    node.textContent = message || '';
    node.className = 'contact-form__status' + (type ? ' is-' + type : '');
  }

  function loadTurnstile(siteKey, target, onReady) {
    var widgetId = null;

    function renderWidget() {
      if (!window.turnstile || !siteKey || !target) return;
      target.innerHTML = '';
      widgetId = window.turnstile.render(target, {
        sitekey: siteKey,
        theme: 'light',
      });
      if (typeof onReady === 'function') onReady(widgetId);
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    var script = document.querySelector('script[data-turnstile-script]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = 'true';
      script.onload = renderWidget;
      document.head.appendChild(script);
      return;
    }

    script.addEventListener('load', renderWidget, { once: true });
  }

  function initContactForm(form) {
    var apiBase = form.getAttribute('data-api-base') || DEFAULT_API_BASE;
    var submitBtn = form.querySelector('[data-contact-submit]');
    var statusNode = form.querySelector('[data-contact-status]');
    var turnstileSlot = form.querySelector('[data-turnstile]');
    var honeypot = form.querySelector('input[name="website"]');
    var turnstileWidgetId = null;

    fetch(apiBase + '/api/contact/config', { headers: { Accept: 'application/json' } })
      .then(function (response) {
        if (!response.ok) throw new Error('config');
        return response.json();
      })
      .then(function (config) {
        if (!config || !config.turnstileSiteKey) {
          throw new Error('turnstile');
        }
        loadTurnstile(config.turnstileSiteKey, turnstileSlot, function (widgetId) {
          turnstileWidgetId = widgetId;
        });
      })
      .catch(function () {
        setStatus(
          statusNode,
          'El formulario está temporalmente no disponible. Puedes escribirnos por WhatsApp o email.',
          'error',
        );
        if (submitBtn) submitBtn.disabled = true;
      });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var payload = {
        name: String(formData.get('name') || '').trim(),
        email: String(formData.get('email') || '').trim(),
        company: String(formData.get('company') || '').trim(),
        message: String(formData.get('message') || '').trim(),
        website: String(formData.get('website') || '').trim(),
        token: String(formData.get('cf-turnstile-response') || '').trim(),
        pageUrl: window.location.href,
      };

      if (honeypot && honeypot.value) {
        setStatus(statusNode, 'Gracias. Hemos recibido tu mensaje.', 'success');
        form.reset();
        return;
      }

      if (!payload.name || payload.name.length < 2) {
        setStatus(statusNode, 'Escribe tu nombre.', 'error');
        return;
      }

      if (!isEmail(payload.email)) {
        setStatus(statusNode, 'Introduce un email válido.', 'error');
        return;
      }

      if (!payload.message || payload.message.length < 10) {
        setStatus(statusNode, 'Cuéntanos un poco más para poder ayudarte.', 'error');
        return;
      }

      if (!payload.token) {
        setStatus(statusNode, 'Confirma primero la verificación anti-spam.', 'error');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      setStatus(statusNode, 'Enviando...', '');

      fetch(apiBase + '/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (data) {
            if (!response.ok || !data.success) {
              throw new Error(data.error || 'submit');
            }
            return data;
          });
        })
        .then(function () {
          form.reset();
          if (window.turnstile && turnstileWidgetId !== null) {
            window.turnstile.reset(turnstileWidgetId);
          }
          setStatus(statusNode, 'Mensaje enviado. Te responderemos en menos de 24h.', 'success');
        })
        .catch(function () {
          setStatus(
            statusNode,
            'No hemos podido enviar el formulario. Puedes escribirnos por WhatsApp o email.',
            'error',
          );
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  function boot() {
    var form = document.querySelector(FORM_SELECTOR);
    if (!form) return;
    initContactForm(form);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
