(function () {
  "use strict";

  var mount = document.getElementById("legal-root");
  if (!mount || !window.LegalCore || typeof window.LegalCore.createLegalPageMarkup !== "function") return;

  mount.innerHTML = window.LegalCore.createLegalPageMarkup({
    appName: "Web Fuengirola",
    brandName: "Web Fuengirola",
    legalTitle: "Información legal, privacidad y cookies",
    legalIntro: "Aquí encontrarás la base legal del sitio, cómo tratamos los datos de contacto y qué almacenamiento técnico utilizamos para el funcionamiento básico de la web.",
    ownerName: "WF-Studio",
    ownerNif: "",
    ownerAddress: "",
    contactEmail: "webfuengirola@pm.me",
    siteUrl: "https://webfuengirola.es",
    hostingProvider: "",
    lastUpdated: "mayo de 2026",
    extraSections: [
      {
        id: "preferencias-cookies",
        title: "Preferencias de cookies",
        html: '<p>Si quieres volver a ver el banner de consentimiento y cambiar tu elección, puedes hacerlo aquí.</p><p><a href="#" id="reset-cookie-consent-link">Reabrir configuración de cookies</a></p>'
      }
    ]
  });

  var resetLink = document.getElementById("reset-cookie-consent-link");
  if (resetLink) {
    resetLink.addEventListener("click", function (event) {
      event.preventDefault();
      try {
        window.localStorage.removeItem("webfuengirola_cookie_consent");
        window.localStorage.removeItem("webfuengirola_cookie_preferences");
      } catch (_error) {}
      window.location.href = "index.html";
    });
  }
})();
