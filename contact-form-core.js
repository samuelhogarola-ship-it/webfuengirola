(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.WFContactFormCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var messages = {
    es: {
      name: "Escribe tu nombre.",
      email: "Introduce un email válido.",
      message: "Cuéntanos un poco más para poder ayudarte.",
      auditUrl: "Introduce la URL completa de la web.",
      sector: "Indica el sector del negocio.",
      location: "Indica la localidad del negocio.",
      consent: "Acepta el uso de los datos para que podamos responder.",
      token: "Confirma primero la verificación anti-spam.",
      sending: "Enviando...",
      success: "Mensaje enviado. Te responderemos en menos de 24h.",
      auditSuccess: "Auditoría solicitada. Revisaremos la web y te responderemos en menos de 24h.",
      error: "No hemos podido enviar el formulario. Puedes escribirnos por WhatsApp o email.",
      unavailable: "El formulario está temporalmente no disponible. Puedes escribirnos por WhatsApp o email.",
    },
    en: {
      name: "Enter your name.",
      email: "Enter a valid email address.",
      message: "Tell us a little more so we can help.",
      auditUrl: "Enter the full website URL.",
      sector: "Enter the business sector.",
      location: "Enter the business location.",
      consent: "Agree to the use of your details so we can reply.",
      token: "Complete the anti-spam check first.",
      sending: "Sending...",
      success: "Message sent. We will reply within 24 hours.",
      auditSuccess: "Audit requested. We will review the website and reply within 24 hours.",
      error: "We could not send the form. You can contact us by WhatsApp or email.",
      unavailable: "The form is temporarily unavailable. You can contact us by WhatsApp or email.",
    },
    de: {
      name: "Bitte geben Sie Ihren Namen ein.",
      email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      message: "Beschreiben Sie kurz, wobei wir helfen können.",
      auditUrl: "Bitte geben Sie die vollständige Website-URL ein.",
      sector: "Bitte geben Sie die Branche an.",
      location: "Bitte geben Sie den Ort des Unternehmens an.",
      consent: "Bitte stimmen Sie der Nutzung Ihrer Angaben zur Beantwortung zu.",
      token: "Bitte schließen Sie zuerst die Anti-Spam-Prüfung ab.",
      sending: "Wird gesendet...",
      success: "Nachricht gesendet. Wir antworten innerhalb von 24 Stunden.",
      auditSuccess: "Analyse angefragt. Wir prüfen die Website und antworten innerhalb von 24 Stunden.",
      error: "Das Formular konnte nicht gesendet werden. Kontaktieren Sie uns per WhatsApp oder E-Mail.",
      unavailable: "Das Formular ist vorübergehend nicht verfügbar. Kontaktieren Sie uns per WhatsApp oder E-Mail.",
    },
    fi: {
      name: "Kirjoita nimesi.",
      email: "Anna kelvollinen sähköpostiosoite.",
      message: "Kerro hieman lisää, jotta voimme auttaa.",
      auditUrl: "Anna verkkosivun täydellinen osoite.",
      sector: "Anna yrityksen toimiala.",
      location: "Anna yrityksen paikkakunta.",
      consent: "Hyväksy tietojen käyttö, jotta voimme vastata.",
      token: "Suorita ensin roskapostin estävä tarkistus.",
      sending: "Lähetetään...",
      success: "Viesti lähetetty. Vastaamme 24 tunnin kuluessa.",
      auditSuccess: "Analyysi pyydetty. Tarkistamme sivuston ja vastaamme 24 tunnin kuluessa.",
      error: "Lomaketta ei voitu lähettää. Voit ottaa yhteyttä WhatsAppilla tai sähköpostilla.",
      unavailable: "Lomake ei ole juuri nyt käytettävissä. Voit ottaa yhteyttä WhatsAppilla tai sähköpostilla.",
    },
  };

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
  }

  function isHttpUrl(value) {
    try {
      var url = new URL(String(value || ""));
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_error) {
      return false;
    }
  }

  function localeMessages(locale) {
    return messages[locale] || messages.es;
  }

  function validate(data, kind, locale) {
    var copy = localeMessages(locale);
    if (!data.name || String(data.name).trim().length < 2)
      return { ok: false, field: "name", message: copy.name };
    if (!isEmail(data.email))
      return { ok: false, field: "email", message: copy.email };
    if (kind === "audit" && !isHttpUrl(data.auditUrl))
      return { ok: false, field: "auditUrl", message: copy.auditUrl };
    if (kind === "audit" && !String(data.sector || "").trim())
      return { ok: false, field: "sector", message: copy.sector };
    if (kind === "audit" && !String(data.location || "").trim())
      return { ok: false, field: "location", message: copy.location };
    if (!data.message || String(data.message).trim().length < 10)
      return { ok: false, field: "message", message: copy.message };
    if (!data.consent)
      return { ok: false, field: "consent", message: copy.consent };
    if (!data.token)
      return { ok: false, field: "token", message: copy.token };
    return { ok: true };
  }

  function composeMessage(data, kind) {
    if (kind !== "audit") return String(data.message || "").trim();
    return (
      "[Website audit] URL: " +
      String(data.auditUrl || "").trim() +
      " | Sector: " +
      String(data.sector || "").trim() +
      " | Location: " +
      String(data.location || "").trim() +
      " | Problem: " +
      String(data.message || "").trim()
    );
  }

  function eventForForm(kind, stage) {
    if (stage === "start") return "form_start";
    if (stage === "success")
      return kind === "audit" ? "audit_request" : "form_submit";
    return "form_error";
  }

  return {
    composeMessage: composeMessage,
    eventForForm: eventForForm,
    isEmail: isEmail,
    messages: messages,
    localeMessages: localeMessages,
    validate: validate,
  };
});
