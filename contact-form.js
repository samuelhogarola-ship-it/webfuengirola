(function () {
  "use strict";

  var FORM_SELECTOR = "[data-contact-form]";
  var DEFAULT_API_BASE = "https://admin.webfuengirola.com";

  function setStatus(node, message, type) {
    if (!node) return;
    node.textContent = message || "";
    node.className = "contact-form__status" + (type ? " is-" + type : "");
  }

  function loadTurnstile(siteKey, target, onReady, onError) {
    var widgetId = null;

    function handleScriptError() {
      if (typeof onError === "function") onError();
    }

    function renderWidget() {
      if (!window.turnstile || !siteKey || !target) return;
      target.innerHTML = "";
      widgetId = window.turnstile.render(target, {
        sitekey: siteKey,
        theme: "light",
      });
      if (typeof onReady === "function") onReady(widgetId);
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    var script = document.querySelector("script[data-turnstile-script]");
    if (!script) {
      script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.turnstileScript = "true";
      script.onload = renderWidget;
      script.onerror = function () {
        script.dataset.turnstileFailed = "true";
        handleScriptError();
      };
      document.head.appendChild(script);
      return;
    }

    if (script.dataset.turnstileFailed === "true") {
      handleScriptError();
      return;
    }

    script.addEventListener("load", renderWidget, { once: true });
    script.addEventListener(
      "error",
      function () {
        script.dataset.turnstileFailed = "true";
        handleScriptError();
      },
      { once: true },
    );
  }

  function initContactForm(form) {
    var core = window.WFContactFormCore;
    if (!core) return;
    var apiBase = form.getAttribute("data-api-base") || DEFAULT_API_BASE;
    var locale = form.getAttribute("data-form-locale") || "es";
    var formKind = form.getAttribute("data-form-kind") || "contact";
    var query = new URLSearchParams(window.location.search);
    var requestedPlan = query.get("plan") || "";
    if (!["lite", "express", "professional"].includes(requestedPlan)) {
      requestedPlan = "";
    }
    var requestedSector = query.get("sector") || "";
    if (!/^[a-z][a-zA-Z0-9-]{0,39}$/.test(requestedSector)) requestedSector = "";
    var pageSector = requestedSector || document.body.dataset.sector || "";
    var copy = core.localeMessages(locale);
    var submitBtn = form.querySelector("[data-contact-submit]");
    var statusNode = form.querySelector("[data-contact-status]");
    var turnstileSlot = form.querySelector("[data-turnstile]");
    var honeypot = form.querySelector('input[name="website"]');
    var turnstileWidgetId = null;
    var hasTrackedStart = false;

    function track(stage) {
      if (!window.WFAnalytics || !window.WFAnalytics.trackEvent) return;
      window.WFAnalytics.trackEvent(core.eventForForm(formKind, stage), {
        locale: locale,
        form: formKind,
        plan: requestedPlan,
        sector: pageSector,
      });
    }

    form.addEventListener("focusin", function () {
      if (hasTrackedStart) return;
      hasTrackedStart = true;
      track("start");
    });

    function showUnavailable() {
      setStatus(
        statusNode,
        copy.unavailable,
        "error",
      );
      if (submitBtn) submitBtn.disabled = true;
    }

    fetch(apiBase + "/api/contact/config", {
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (!response.ok) throw new Error("config");
        return response.json();
      })
      .then(function (config) {
        if (!config || !config.turnstileSiteKey) {
          throw new Error("turnstile");
        }
        loadTurnstile(
          config.turnstileSiteKey,
          turnstileSlot,
          function (widgetId) {
            turnstileWidgetId = widgetId;
          },
          showUnavailable,
        );
      })
      .catch(showUnavailable);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var interest = String(formData.get("interest") || "").trim();
      var rawMessage = String(formData.get("message") || "").trim();
      var formValues = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        company: String(formData.get("company") || "").trim(),
        message: rawMessage,
        auditUrl: String(formData.get("auditUrl") || "").trim(),
        sector: String(formData.get("sector") || "").trim(),
        location: String(formData.get("location") || "").trim(),
        consent: formData.get("consent") === "on",
        website: String(formData.get("website") || "").trim(),
        token: String(formData.get("cf-turnstile-response") || "").trim(),
      };
      var fullMessage = core.composeMessage(formValues, formKind);
      if (requestedPlan) {
        fullMessage = "[Plan: " + requestedPlan + "] " + fullMessage;
      }
      if (requestedSector) {
        fullMessage = "[Sector: " + requestedSector + "] " + fullMessage;
      }
      if (interest) fullMessage = "[" + interest + "] " + fullMessage;
      var payload = {
        name: formValues.name,
        email: formValues.email,
        company: formValues.company,
        message: fullMessage,
        website: formValues.website,
        token: formValues.token,
        pageUrl: window.location.href,
      };

      if (honeypot && honeypot.value) {
        setStatus(statusNode, "Gracias. Hemos recibido tu mensaje.", "success");
        form.reset();
        return;
      }

      var validation = core.validate(formValues, formKind, locale);
      if (!validation.ok) {
        setStatus(statusNode, validation.message, "error");
        track("error");
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      setStatus(statusNode, copy.sending, "");

      fetch(apiBase + "/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              if (!response.ok || !data.success) {
                throw new Error(data.error || "submit");
              }
              return data;
            });
        })
        .then(function () {
          form.reset();
          if (window.turnstile && turnstileWidgetId !== null) {
            window.turnstile.reset(turnstileWidgetId);
          }
          setStatus(
            statusNode,
            formKind === "audit" ? copy.auditSuccess : copy.success,
            "success",
          );
          track("success");
        })
        .catch(function () {
          setStatus(statusNode, copy.error, "error");
          track("error");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  function boot() {
    var forms = document.querySelectorAll(FORM_SELECTOR);
    for (var i = 0; i < forms.length; i++) {
      initContactForm(forms[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
