/* Adapted from the shared core legal module for Web Fuengirola. */
(function (globalScope) {
  "use strict";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function field(value, placeholder) {
    if (value) return escapeHtml(value);
    return '<span class="legal-rellenar">' + escapeHtml(placeholder) + "</span>";
  }

  function createLegalPageMarkup(appConfig) {
    var cfg = appConfig || {};

    var appName = cfg.appName || "";
    var brandName = cfg.brandName || appName || "este sitio web";
    var legalTitle = cfg.legalTitle || "Información legal";
    var legalIntro = cfg.legalIntro || "";
    var ownerName = field(cfg.ownerName, "[RELLENAR: nombre completo o razón social]");
    var ownerNif = field(cfg.ownerNif, "[RELLENAR: DNI con letra o CIF de la empresa]");
    var ownerAddress = field(cfg.ownerAddress, "[RELLENAR: dirección postal completa]");
    var contactEmail = field(cfg.contactEmail, "[RELLENAR: email de contacto]");
    var siteUrl = field(cfg.siteUrl, "[RELLENAR: URL del sitio]");
    var hostingProvider = field(cfg.hostingProvider, "[RELLENAR: proveedor de hosting o email]");
    var lastUpdated = escapeHtml(cfg.lastUpdated || "mayo de 2026");
    var extraSections = cfg.extraSections || [];

    var h = "";

    if (appName) {
      h += '<p class="legal-kicker">' + escapeHtml(appName) + "</p>";
    }
    h += '<h1 class="legal-title">' + escapeHtml(legalTitle) + "</h1>";
    if (legalIntro) {
      h += '<p class="legal-intro">' + escapeHtml(legalIntro) + "</p>";
    }

    h += '<nav class="legal-index" aria-label="Índice de secciones legales">';
    h += "<p>Contenido de esta página</p>";
    h += "<ol>";
    h += '<li><a href="#aviso-legal">1. Aviso Legal e Información Identificativa</a></li>';
    h += '<li><a href="#privacidad">2. Política de Privacidad y Protección de Datos</a></li>';
    h += '<li><a href="#cookies">3. Política de Cookies</a></li>';
    h += '<li><a href="#actualizaciones">4. Actualizaciones de esta Política</a></li>';
    for (var i = 0; i < extraSections.length; i += 1) {
      if (extraSections[i].id && extraSections[i].title) {
        h += '<li><a href="#' + escapeHtml(extraSections[i].id) + '">' + escapeHtml((i + 5) + ". " + extraSections[i].title) + "</a></li>";
      }
    }
    h += "</ol>";
    h += "</nav>";

    h += '<section class="legal-section" id="aviso-legal">';
    h += "<h2>1. Aviso Legal e Información Identificativa</h2>";
    h += "<p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan a continuación los datos identificativos del titular de este sitio web.</p>";
    h += '<table class="legal-table">';
    h += "<tr><td>Titular de la web</td><td>" + ownerName + "</td></tr>";
    h += "<tr><td>NIF / CIF</td><td>" + ownerNif + "</td></tr>";
    h += "<tr><td>Domicilio fiscal</td><td>" + ownerAddress + "</td></tr>";
    h += "<tr><td>Email de contacto</td><td>" + contactEmail + "</td></tr>";
    h += "<tr><td>Sitio web</td><td>" + siteUrl + "</td></tr>";
    h += "</table>";
    h += "<h3>Condiciones de uso</h3>";
    h += "<p>El acceso y uso de este sitio web atribuye al visitante la condición de usuario y supone la aceptación plena de las presentes condiciones de uso. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios, sin emplearlos para actividades ilícitas o contrarias a la buena fe, al orden público o a los derechos de terceros.</p>";
    h += "<p>Los contenidos de este sitio web —textos, imágenes, diseño y código— son propiedad del titular o cuentan con la debida autorización de uso. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.</p>";
    h += "<p>El titular se reserva el derecho a modificar, suspender o dar de baja los contenidos y servicios del sitio en cualquier momento, sin previo aviso.</p>";
    h += "</section>";

    h += '<section class="legal-section" id="privacidad">';
    h += "<h2>2. Política de Privacidad y Protección de Datos</h2>";
    h += "<p>En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), se informa al usuario de la siguiente política de tratamiento de datos personales.</p>";
    h += "<h3>Responsable del tratamiento</h3>";
    h += "<p>" + ownerName + "<br>NIF / CIF: " + ownerNif + "<br>Email: " + contactEmail + "</p>";
    h += "<h3>Finalidad del tratamiento</h3>";
    h += "<p>Los datos personales que pudieran recogerse a través del formulario de contacto o del correo electrónico facilitado en esta web se utilizan exclusivamente para:</p>";
    h += "<ul><li>Responder a las consultas y mensajes enviados por el usuario.</li><li>Gestionar solicitudes de presupuesto, información comercial y comunicaciones relacionadas con los servicios de " + escapeHtml(brandName) + ".</li></ul>";
    h += "<p>No se realizan perfiles de usuario ni se toman decisiones automatizadas basadas en los datos facilitados.</p>";
    h += "<h3>Base de legitimación</h3>";
    h += "<p>El tratamiento de los datos se basa en el consentimiento del usuario, prestado de forma libre, específica, informada e inequívoca al enviar un mensaje de contacto o solicitar información a través de este sitio.</p>";
    h += "<h3>Destinatarios</h3>";
    h += "<p>No se cederán datos personales a terceros, salvo obligación legal. Los datos pueden almacenarse en servicios gestionados por " + hostingProvider + " y en herramientas imprescindibles para el funcionamiento técnico del sitio, dentro del Espacio Económico Europeo o con garantías adecuadas conforme a la normativa vigente.</p>";
    h += "<h3>Plazo de conservación</h3>";
    h += "<p>Los datos se conservarán durante el tiempo necesario para atender la solicitud del usuario y, posteriormente, durante los plazos legalmente establecidos para atender posibles responsabilidades derivadas del tratamiento.</p>";
    h += "<h3>Derechos del usuario</h3>";
    h += "<p>El usuario tiene derecho a acceder, rectificar, suprimir, oponerse, limitar y portar sus datos personales. Para ejercer cualquiera de estos derechos, puede enviar un correo a " + contactEmail + ", indicando el derecho que desea ejercer y adjuntando una copia de su documento de identidad.</p>";
    h += "<p>Si considera que el tratamiento de sus datos no se ajusta a la normativa vigente, puede presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>";
    h += "</section>";

    h += '<section class="legal-section" id="cookies">';
    h += "<h2>3. Política de Cookies</h2>";
    h += "<h3>¿Qué es una cookie?</h3>";
    h += "<p>Una cookie es un pequeño archivo de texto que un sitio web guarda en el navegador del usuario cuando este lo visita. Las cookies permiten recordar información sobre la visita, como preferencias de navegación o decisiones de consentimiento, haciendo el servicio más útil.</p>";
    h += "<h3>Cookies utilizadas en este sitio</h3>";
    h += '<table class="cookie-table"><thead><tr><th>Tipo</th><th>Nombre / Origen</th><th>Finalidad</th><th>Duración</th></tr></thead><tbody>';
    h += "<tr><td>Técnica / Funcional</td><td>localStorage (navegador)</td><td>Guardar la preferencia de idioma seleccionada por el usuario y la decisión tomada en el banner de cookies.</td><td>Persistente (hasta que el usuario la elimina)</td></tr>";
    h += "<tr><td>Técnica</td><td>Cookies o almacenamiento esencial del sitio</td><td>Permitir el funcionamiento básico de la navegación, enlaces internos y componentes necesarios para la visualización de la web.</td><td>Sesión o persistente, según el navegador</td></tr>";
    h += "</tbody></table>";
    h += "<p>Este sitio web no activa por defecto cookies publicitarias ni perfiles de seguimiento invasivos. Si en el futuro se incorporaran herramientas analíticas o de terceros que requieran consentimiento, esta política se actualizará y se solicitará autorización previa al usuario.</p>";
    h += "<h3>Cómo gestionar o desactivar las cookies</h3>";
    h += "<p>El usuario puede configurar su navegador para rechazar, bloquear o borrar las cookies en cualquier momento. A continuación se indican enlaces de ayuda de los navegadores más habituales:</p>";
    h += '<ul><li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Google Chrome</a></li><li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noreferrer">Mozilla Firefox</a></li><li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li><li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noreferrer">Microsoft Edge</a></li></ul>';
    h += "<p>Deshabilitar determinadas cookies técnicas puede afectar al funcionamiento correcto de algunas preferencias guardadas en el sitio.</p>";
    h += "</section>";

    h += '<section class="legal-section" id="actualizaciones">';
    h += "<h2>4. Actualizaciones de esta Política</h2>";
    h += "<p>Esta política puede modificarse en función de cambios legislativos o de nuevas funcionalidades incorporadas al sitio. Se recomienda revisarla periódicamente.</p>";
    h += "<p>Última actualización: " + lastUpdated + ".</p>";
    h += "</section>";

    for (var j = 0; j < extraSections.length; j += 1) {
      if (extraSections[j].id && extraSections[j].title && extraSections[j].html) {
        h += '<section class="legal-section" id="' + escapeHtml(extraSections[j].id) + '">';
        h += "<h2>" + escapeHtml(extraSections[j].title) + "</h2>";
        h += extraSections[j].html;
        h += "</section>";
      }
    }

    return '<main class="legal-wrap">' + h + "</main>";
  }

  globalScope.LegalCore = {
    createLegalPageMarkup: createLegalPageMarkup
  };
})(typeof window !== "undefined" ? window : globalThis);
