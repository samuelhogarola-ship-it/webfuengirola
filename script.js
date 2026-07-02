/* ============================================================
   WEB FUENGIROLA — SCRIPT
============================================================ */

(function () {
  "use strict";

  var translations = {
    es: {
      title: "Web Fuengirola | Diseño Web en Fuengirola para Negocios Locales",
      metaDescription:
        "Creamos páginas web en Fuengirola para negocios locales: landing pages, webs corporativas y automatización con diseño claro, SEO técnico y contacto directo.",
      ogTitle: "Diseño Web en Fuengirola | Web Fuengirola",
      ogDescription:
        "Páginas web para negocios locales en Fuengirola: Página Web Lite, landing pages, webs corporativas y automatización con estructura clara y enfoque SEO.",
      navHome: "Inicio",
      navServices: "Servicios",
      navPortfolio: "Portfolio",
      navProcess: "FAQ",
      navPricing: "Precios",
      navContact: "Contacto",
      headerCta: "Pedir presupuesto",
      heroBadge: "Webs claras para negocio local",
      heroTitle: "La web que tu negocio se merece.",
      heroSubtitle:
        "Webs rápidas y profesionales con todo lo que necesitas para llegar a más clientes.",
      heroPrice: "Precio cerrado",
      heroPrimaryCta: "Pedir presupuesto",
      heroSecondaryCta: "Ver trabajos",
      imacTagTime: "para hacer<br>tu web realidad",
      imacTagPrice: "Precio cerrado",
      trustHeadline:
        "Una web no tiene que ser complicada.<br>Tiene que explicar bien tu negocio.",
      trust1Title: "Claridad",
      trust1Text:
        "Tus clientes entienden en segundos qué ofreces y por qué deberían elegirte a ti.",
      trust2Title: "Presencia online",
      trust2Text:
        "Aparece en Google cuando alguien busca tu servicio cerca. Sin web, no existes en el mapa digital.",
      trust3Title: "Contacto directo",
      trust3Text:
        "Un botón de WhatsApp o formulario visible convierte visitas en clientes reales, sin complicaciones.",
      problemLabel: "El problema",
      problemTitle:
        "Muchos negocios locales están perdiendo clientes sin saberlo",
      problem1:
        "Dependen solo de Instagram, que cambia sus algoritmos sin avisar.",
      problem2: "Tienen una web antigua que no se ve bien en el móvil.",
      problem3: "Usan fotos genéricas que no transmiten confianza.",
      problem4: "No aparecen cuando alguien busca su servicio en Google.",
      problem5: "Su web no deja claro qué hacen ni cómo contactarles.",
      problemStat1:
        "de los consumidores buscan negocios en Google antes de visitar un local",
      problemStat2:
        "abandona una web que tarda más de 3 segundos en cargar en móvil",
      problemStat3:
        "es todo lo que necesitas para tener una web profesional publicada",
      solutionLabel: "La solución",
      solutionTitle:
        "Una web sencilla, rápida y personalizada<br>para mostrar bien tu negocio",
      solutionSub:
        "Sin tecnicismos, sin complicaciones. Tú nos cuentas tu negocio y nosotros lo publicamos online de forma clara y profesional.",
      benefit1Title: "Adaptada a móvil",
      benefit1Text:
        "Se ve perfecta en cualquier pantalla. El 80% de tus clientes te buscarán desde el teléfono.",
      benefit2Title: "Fotos reales de tu negocio",
      benefit2Text:
        "Incluimos una sesión fotográfica básica del local para que la web sea tuya de verdad.",
      benefit3Title: "Textos claros",
      benefit3Text:
        "Explicamos lo que haces en un lenguaje directo que tus clientes entienden al instante.",
      benefit4Title: "WhatsApp directo",
      benefit4Text:
        "Un botón visible en cada pantalla para que tus clientes te escriban en un clic.",
      benefit5Title: "Preparada para Google",
      benefit5Text:
        "Estructura y velocidad pensadas para que Google te encuentre y te muestre a tus vecinos.",
      benefit6Title: "Publicación ágil",
      benefit6Text:
        "Trabajamos con un proceso ordenado para publicar cada proyecto con rapidez, sin mezclar la velocidad con promesas que no encajan en todos los servicios.",
      servicesLabel: "Servicios",
      servicesTitle: "Oferta clara para negocio local y desarrollo a medida",
      servicePopular: "Más popular",
      vatLabel: "+ IVA",
      serviceLiteEyebrow: "Entrada rápida",
      serviceLiteTitle: "Página Web Lite",
      serviceLiteDesc:
        "Una página sencilla para tener escaparate online cuanto antes. Pensada para negocios que ya tienen su clientela y solo necesitan estar bien visibles.",
      serviceLiteFeature1: "1 sola página tipo escaparate",
      serviceLiteFeature2: "WhatsApp, correo y dirección visibles",
      serviceLiteFeature3: "SEO base de publicación incluido",
      serviceLiteFeature4:
        "Menos trabajo SEO y menos conversión que la Landing",
      serviceLiteFeature5: "Buena para empezar y ampliar después",
      serviceLiteCta: "Quiero esta opción",
      service1Title: "Web Express",
      service1Desc:
        "Web multipágina para negocios que necesitan algo más que una presencia básica: mejor estructura, más espacio para explicar servicios y una imagen más sólida.",
      service1Feature1: "Hasta 5 páginas más blog",
      service1Feature2: "Diseño responsive para móvil y escritorio",
      service1Feature3: "WhatsApp, email y formulario básico",
      service1Feature4: "SEO medio orientado a estructura e indexación",
      service1Feature5: "Sin base de datos ni automatizaciones avanzadas",
      service1Feature6:
        "Ideal para empresas de servicios y negocios con instalaciones",
      service1Feature7: "1 ronda de revisiones incluida",
      service1Cta: "Pedir esta web",
      service2Title: "Web Pro",
      service2Price: "600€ + IVA",
      service2Desc:
        "La web corporativa más avanzada dentro de la oferta base: pensada para captar contactos, medir lo básico y autogestionar determinados contenidos sin convertir el proyecto en una aplicación a medida.",
      service2Feature1: "Todo lo incluido en Web Express",
      service2Feature2: "Hasta 10 páginas y SEO avanzado inicial",
      service2Feature3: "Formulario con almacenamiento de contactos",
      service2Feature4:
        "Panel para noticias, eventos, promociones o casos de éxito",
      service2Feature5: "Gestión básica de contenidos con alcance claro",
      service2Cta: "Solicitar presupuesto",
      service3Title: "React, chatbots y automatización",
      service3Price: "300€ implantación + 50€ / mes + IVA",
      service3PriceHtml: "300€ implantación <span>+ 50€ / mes</span>",
      service3Desc:
        "Bloques técnicos para empresas que ya no necesitan solo una web, sino interacción, eficiencia y captación automatizada.",
      service3Feature1: "Páginas dinámicas con React desde 1.400€",
      service3Feature2:
        "Entrenamiento e implantación por 300€ + cuota de 50€ al mes",
      service3Feature3: "Automatización de tareas y flujos internos",
      service3Feature4: "Setup modular según alcance real",
      service4Title: "Apps y herramientas a medida",
      service4Price: "2500€ + IVA",
      service4Desc:
        "Web apps, proyectos con Node, apps Android y herramientas internas para operaciones, reservas o gestión de clientes.",
      service4Feature1: "Web apps y paneles internos",
      service4Feature2: "Backends Node y lógica de negocio",
      service4Feature3: "Apps Android orientadas a operaciones",
      service4Feature4: "Optimización de flujos de trabajo",
      service4Feature5: "Presupuesto premium con alcance cerrado",
      consultPrice: "Consultar precio",
      servicesExplore: "Ver servicios",
      portfolioTitle: "Proyectos para negocios locales",
      portfolioSub:
        "Cada web es diferente. Estas son algunas de las que hemos creado para comercios de la zona.",
      portfolio1Desc:
        "Plataforma de aprendizaje de vocabulario. Diseño limpio y funcional centrado en la experiencia del usuario.",
      portfolio2Desc:
        "Web de captación para coach de idiomas. Landing clara con propuesta de valor, servicios y contacto directo.",
      portfolio3Title: "Personal Trainer Fuengirola",
      portfolio3Desc:
        "Web minimalista de captación para entrenador personal. Servicios, metodología y contacto directo.",
      portfolio4Title: "Im Kontext — Vokabellab",
      portfolio4Desc:
        "Herramienta de aprendizaje de alemán en contexto. Diseño enfocado en la usabilidad y la experiencia de aprendizaje.",
      portfolio4Cta: "Ser el siguiente",
      portfolioTagWebApp: "Web app",
      portfolioTagEducation: "Educación",
      portfolioTagLanding: "Landing page",
      portfolioTagSeo: "SEO",
      portfolioTagSport: "Deporte",
      portfolioTagLocalSeo: "SEO local",
      portfolioTagEditable: "Editable",
      portfolioTagYourSector: "Tu sector",
      viewSite: "Ver web",
      processLabel: "Cómo trabajamos",
      processTitle: "De la idea a una web publicada con alcance claro",
      processSub:
        "Un proceso sencillo y sin sorpresas. Tú nos das la información, nosotros hacemos el resto.",
      process1Title: "Reunión inicial",
      process1Desc:
        "Hablamos por teléfono o en persona para entender tu negocio, tu público y lo que quieres transmitir. No hace falta que sepas nada de webs.",
      process2Title: "Fotos y contenido",
      process2Desc:
        "Hacemos una sesión fotográfica básica de tu local o negocio. También recogemos la información necesaria: servicios, precios, horarios y contacto.",
      process3Title: "Diseño y publicación",
      process3Desc:
        "Creamos tu web y la publicamos con dominio y hosting incluidos. Proceso rápido, limpio y sin complicaciones técnicas para ti.",
      process4Title: "Revisión final",
      process4Desc:
        "Te mostramos el resultado y hacemos una ronda de ajustes para que quedes completamente satisfecho antes de dar el visto bueno.",
      pricingLabel: "Precios",
      pricingTitle: "Servicios a medida, paga por lo que necesitas",
      pricingMainLabel: "Producto de entrada",
      pricingMainDesc:
        "Una landing corporativa de una sola página para negocios que necesitan presencia clara, rápida y profesional.",
      pricing1: "1 sola página con estructura cerrada",
      pricing2: "1 ronda de revisiones incluida",
      pricing3: "Responsive, SEO básico, WhatsApp y formulario",
      pricing4: "Sin panel, sin login, sin reservas ni integraciones",
      pricing5: "Publicación online según alcance y material",
      pricingMainCta: "Solicitar esta web",
      pricingNote:
        "No incluye multiidioma real, blog, base de datos, React, Node, automatizaciones ni animaciones complejas. Eso pertenece a la línea avanzada.",
      pricingProBudget: "Desde 600€",
      pricingProCustom: "según alcance",
      pricingProDesc:
        "Para negocios que necesitan más recorrido que una web básica: estructura corporativa avanzada, captación de contactos y autogestión básica antes de pasar a un desarrollo a medida.",
      pricingPro1:
        "Web Pro con panel básico y registro de contactos desde 600€",
      pricingPro2:
        "Web personalizada cuando el alcance ya sale del marco cerrado",
      pricingPro3: "Chatbots y automatización por 300€ + 50€ al mes",
      pricingPro4: "Web apps, Node y herramientas internas desde 2500€",
      maintenanceLabel: "Mantenimiento",
      maintenanceTitle: "Mantén tu web al día sin preocupaciones",
      maintenanceSub:
        "Planes orientativos para actualizar y cuidar tu web una vez publicada. Precios finales según el trabajo necesario.",
      maintenance1Title: "Básico",
      maintenance1Desc:
        "Para negocios que necesitan pocos cambios al año. Actualizaciones puntuales de textos, horarios o fotos.",
      maintenance1Feature1: "Hasta 2 cambios pequeños al mes",
      maintenance1Feature2: "Actualización de contenidos básicos",
      maintenance1Feature3: "Cambios pequeños con gestión ágil",
      maintenance2Title: "Medio",
      maintenance2Desc:
        "Para negocios activos que actualizan ofertas, añaden secciones o quieren cambios periódicos.",
      maintenance2Feature1: "Hasta 5 cambios al mes",
      maintenance2Feature2: "Nuevas secciones sencillas",
      maintenance2Feature3: "Respuesta prioritaria en 24h",
      maintenance2Feature4: "Informe de visitas mensual",
      maintenance3Title: "Pro",
      maintenance3Desc:
        "Para proyectos en crecimiento que necesitan actualizaciones constantes y soporte continuo.",
      maintenance3Feature1: "Cambios ilimitados acordados",
      maintenance3Feature2: "Nuevas páginas y funcionalidades",
      maintenance3Feature3: "Respuesta en el mismo día",
      maintenance3Feature4: "Seguimiento SEO y analítica",
      calcLabel: "Calculadora",
      calcTitle: "Configura tu web y calcula una estimación rápida",
      calcSub:
        "Selecciona los servicios que te interesan y verás cómo cambia el presupuesto al momento.",
      calcBaseLabel: "Servicios",
      calcPickHint: "Puedes combinar varias opciones",
      calcEstimateLabel: "Estimación actual",
      calcEstimateNote: "Precio orientativo antes de cerrar alcance final.",
      calcWhatsapp: "Pedir este presupuesto",
      calcEmail: "Enviar por email",
      calcEmpty: "Selecciona uno o varios servicios para ver tu estimación.",
      ctaTitle: "¿Tienes un negocio local<br>y necesitas una web clara?",
      ctaSub:
        "Cuéntanos qué haces y te decimos cómo podemos ayudarte. Sin compromiso, sin tecnicismos.",
      ctaWhatsapp: "Hablar por WhatsApp",
      ctaEmail: "Enviar un email",
      footerTagline:
        "Webs para negocios locales con una presencia clara y profesional.",
      footerLegal: "Legal",
      footerLegalNotice: "Aviso legal",
      footerPrivacy: "Política de privacidad",
      footerCookies: "Política de cookies",
      footerWhatsapp: "WhatsApp",
      footerRights:
        "WF Studio — Diseño web en Fuengirola. Todos los derechos reservados.",
    },
    en: {
      title: "Web Fuengirola | Premium Web Design in Fuengirola",
      metaDescription:
        "Landing pages from €300 + VAT and premium custom development in Fuengirola: corporate websites, React, Node, chatbots, web apps and workflow automation.",
      ogTitle: "Web Fuengirola · Premium websites, apps and automation",
      ogDescription:
        "Clear entry product from €300 + VAT and advanced custom solutions in React, Node, chatbots, Android apps and workflow automation.",
      navHome: "Home",
      navServices: "Services",
      navPortfolio: "Portfolio",
      navProcess: "FAQ",
      navPricing: "Pricing",
      navContact: "Contact",
      headerCta: "Request a quote",
      heroBadge: "Available in 48 hours",
      heroTitle: "The website your business deserves.",
      heroSubtitle:
        "Fast, professional websites with everything you need to reach more customers.",
      heroPrice: "Fixed price",
      heroPrimaryCta: "Request a quote",
      heroSecondaryCta: "See projects",
      imacTagTime: "to get your<br>website live",
      imacTagPrice: "Fixed price",
      trustHeadline:
        "A website does not have to be complicated.<br>It has to explain your business well.",
      trust1Title: "Clarity",
      trust1Text:
        "Your customers understand in seconds what you offer and why they should choose you.",
      trust2Title: "Online presence",
      trust2Text:
        "Show up on Google when someone searches for your service nearby. Without a website, you do not exist on the digital map.",
      trust3Title: "Direct contact",
      trust3Text:
        "A visible WhatsApp button or contact form turns visits into real customers without friction.",
      problemLabel: "The problem",
      problemTitle:
        "Many local businesses are losing customers without realizing it",
      problem1:
        "They rely only on Instagram, which changes its algorithm without warning.",
      problem2:
        "They have an outdated website that does not work well on mobile.",
      problem3: "They use generic photos that do not build trust.",
      problem4:
        "They do not appear when someone searches for their service on Google.",
      problem5:
        "Their website does not clearly explain what they do or how to contact them.",
      problemStat1:
        "of consumers search Google before visiting a local business",
      problemStat2:
        "leave a website that takes more than 3 seconds to load on mobile",
      problemStat3: "is all you need to get a professional website published",
      solutionLabel: "The solution",
      solutionTitle:
        "A simple, fast and tailored website<br>that presents your business properly",
      solutionSub:
        "No jargon, no complications. You tell us about your business and we publish it online in a clear and professional way.",
      benefit1Title: "Mobile friendly",
      benefit1Text:
        "It looks great on any screen. Most of your customers will find you on their phone.",
      benefit2Title: "Real photos of your business",
      benefit2Text:
        "We include a basic photo session of your premises so the website truly feels like yours.",
      benefit3Title: "Clear copy",
      benefit3Text:
        "We explain what you do in direct language your customers understand immediately.",
      benefit4Title: "Direct WhatsApp",
      benefit4Text:
        "A visible button on every screen so your customers can message you in one click.",
      benefit5Title: "Ready for Google",
      benefit5Text:
        "Structure and speed designed so Google can find you and show you to nearby customers.",
      benefit6Title: "Fast launch",
      benefit6Text:
        "From first contact to a published website in less than two days. No endless waiting.",
      servicesLabel: "Services",
      servicesTitle:
        "A clear offer for local businesses and custom development",
      servicePopular: "Most popular",
      vatLabel: "+ VAT",
      serviceLiteEyebrow: "Quick start",
      serviceLiteTitle: "Lite Website",
      serviceLiteDesc:
        "A simple one-page site to get your business online fast. Made for businesses that already have clients and mainly need a clean online shop window.",
      serviceLiteFeature1: "Single showcase page",
      serviceLiteFeature2: "Visible WhatsApp, email and address",
      serviceLiteFeature3: "Basic publishing SEO included",
      serviceLiteFeature4: "Lighter SEO and conversion work than the Landing",
      serviceLiteFeature5: "Good for starting now and expanding later",
      serviceLiteCta: "I want this option",
      service1Title: "Local Landing Page",
      service1Desc:
        "One page, fixed structure and a clear message. The most direct way to get online with a solid presence.",
      service1Feature1: "1-page corporate landing",
      service1Feature2: "Responsive design and conversion-focused copy",
      service1Feature3: "WhatsApp, contact form and basic SEO",
      service1Feature4: "No advanced logic or integrations",
      service1Feature5: "Fast delivery with a defined scope",
      service1Feature6: "Ideal for local businesses and solo professionals",
      service1Feature7: "1 revision round included",
      service1Cta: "Get this website",
      service2Title: "Corporate / Pro Website",
      service2Price: "From €900 + VAT",
      service2Desc:
        "For companies that need multiple pages, a stronger narrative, a blog, scalable SEO or real integrations.",
      service2Feature1: "More complete content architecture",
      service2Feature2: "Extra pages and improved SEO hierarchy",
      service2Feature3: "Blog, advanced forms or bookings",
      service2Feature4: "Integrations and broader editorial scope",
      service2Feature5: "Budget tailored to business goals",
      service2Cta: "Request a quote",
      service3Title: "React, chatbots and automation",
      service3Price: "€300 setup + €50 / month + VAT",
      service3PriceHtml: "€300 setup <span>+ €50 / month</span>",
      service3Desc:
        "Technical building blocks for companies that no longer need just a website, but interaction, efficiency and automated lead capture.",
      service3Feature1: "Dynamic React pages from €1,400",
      service3Feature2: "Training and setup for €300 + a €50 monthly fee",
      service3Feature3: "Task and workflow automation",
      service3Feature4: "Modular setup based on real scope",
      service4Title: "Custom apps and tools",
      service4Price: "€2500 + VAT",
      service4Desc:
        "Web apps, Node projects, Android apps and internal tools for operations, bookings or customer management.",
      service4Feature1: "Web apps and internal dashboards",
      service4Feature2: "Node backends and business logic",
      service4Feature3: "Android apps for operations",
      service4Feature4: "Workflow optimization",
      service4Feature5: "Premium quote with fixed scope",
      consultPrice: "Ask for pricing",
      servicesExplore: "Explore services",
      portfolioTitle: "Projects for local businesses",
      portfolioSub:
        "Every website is different. These are some we have created for local businesses.",
      portfolio1Desc:
        "Vocabulary learning platform. Clean, functional design focused on user experience.",
      portfolio2Desc:
        "Lead generation website for a language coach. Clear landing page with value proposition, services and direct contact.",
      portfolio3Title: "Personal Trainer Fuengirola",
      portfolio3Desc:
        "Minimal site focused on lead generation. Trainer photos, method and direct contact.",
      portfolio4Title: "Im Kontext — Vokabellab",
      portfolio4Desc:
        "German-in-context learning tool. Design focused on usability and a smooth learning experience.",
      portfolio4Cta: "Be the next one",
      portfolioTagWebApp: "Web app",
      portfolioTagEducation: "Education",
      portfolioTagLanding: "Landing page",
      portfolioTagSeo: "SEO",
      portfolioTagSport: "Sport",
      portfolioTagLocalSeo: "Local SEO",
      portfolioTagEditable: "Editable",
      portfolioTagYourSector: "Your sector",
      viewSite: "View site",
      processLabel: "How we work",
      processTitle: "From zero to published in 48 hours",
      processSub:
        "A simple process with no surprises. You give us the information and we do the rest.",
      process1Title: "Initial meeting",
      process1Desc:
        "We talk by phone or in person to understand your business, your audience and what you want to communicate. No web knowledge needed.",
      process2Title: "Photos and content",
      process2Desc:
        "We do a basic photo session of your business or premises. We also collect the needed information: services, prices, opening hours and contact details.",
      process3Title: "Design and launch",
      process3Desc:
        "We build your website and publish it with domain and hosting included. Fast, clean and hassle-free for you.",
      process4Title: "Final review",
      process4Desc:
        "We show you the result and make one round of adjustments so you are fully happy before approval.",
      pricingLabel: "Pricing",
      pricingTitle: "Tailored services, pay for what you need",
      pricingMainLabel: "Entry product",
      pricingMainDesc:
        "A one-page corporate landing for businesses that need a clear, fast and professional online presence.",
      pricing1: "One page with a fixed structure",
      pricing2: "1 revision round included",
      pricing3: "Responsive, basic SEO, WhatsApp and contact form",
      pricing4: "No admin panel, login, bookings or integrations",
      pricing5: "Website published in 48 hours",
      pricingMainCta: "Request this website",
      pricingNote:
        "Does not include real multilingual support, blog, database, React, Node, automations or complex animations. That belongs to the advanced line.",
      pricingProBudget: "From €900",
      pricingProCustom: "depending on scope",
      pricingProDesc:
        "For projects with logic, automation or real growth needs: corporate websites, React, Node, chatbots, apps and internal tools.",
      pricingPro1: "Corporate / Pro website from €900",
      pricingPro2: "Dynamic React pages from €1,400",
      pricingPro3: "Chatbots and automation for €300 + €50 per month",
      pricingPro4: "Web apps, Node and internal tools from €1,800",
      maintenanceLabel: "Maintenance",
      maintenanceTitle: "Keep your website updated without worries",
      maintenanceSub:
        "Indicative plans to update and care for your website once it is live. Final prices depend on the work required.",
      maintenance1Title: "Basic",
      maintenance1Desc:
        "For businesses that need only a few changes per year. Occasional updates to text, opening hours or photos.",
      maintenance1Feature1: "Up to 2 small changes per month",
      maintenance1Feature2: "Basic content updates",
      maintenance1Feature3: "Small changes handled quickly",
      maintenance2Title: "Standard",
      maintenance2Desc:
        "For active businesses that update offers, add sections or want recurring changes.",
      maintenance2Feature1: "Up to 5 changes per month",
      maintenance2Feature2: "Simple new sections",
      maintenance2Feature3: "Priority reply within 24h",
      maintenance2Feature4: "Monthly traffic report",
      maintenance3Title: "Pro",
      maintenance3Desc:
        "For growing projects that need continuous updates and ongoing support.",
      maintenance3Feature1: "Agreed unlimited changes",
      maintenance3Feature2: "New pages and features",
      maintenance3Feature3: "Same-day response",
      maintenance3Feature4: "SEO and analytics monitoring",
      calcLabel: "Calculator",
      calcTitle: "Configure your website and get a quick estimate",
      calcSub:
        "Select the services you are interested in and the budget updates instantly.",
      calcBaseLabel: "Services",
      calcPickHint: "You can combine multiple options",
      calcEstimateLabel: "Current estimate",
      calcEstimateNote: "Indicative price before the final scope is closed.",
      calcWhatsapp: "Request this quote",
      calcEmail: "Send by email",
      calcEmpty: "Select one or more services to see your estimate.",
      ctaTitle: "Do you run a local business<br>and need a clear website?",
      ctaSub:
        "Tell us what you do and we will explain how we can help. No obligation, no jargon.",
      ctaWhatsapp: "Chat on WhatsApp",
      ctaEmail: "Send an email",
      footerTagline:
        "Websites, apps and automation for local businesses with a clear professional presence.",
      footerLegal: "Legal",
      footerLegalNotice: "Legal notice",
      footerPrivacy: "Privacy policy",
      footerCookies: "Cookie policy",
      footerWhatsapp: "WhatsApp",
      footerRights:
        "WF Studio — Web design in Fuengirola. All rights reserved.",
    },
    de: {
      title: "Web Fuengirola | Premium Webdesign in Fuengirola",
      metaDescription:
        "Wir erstellen einfache, klare und professionelle Webseiten für kleine lokale Unternehmen in Fuengirola und an der Costa del Sol. Ab 300 € zzgl. MwSt. Domain und Hosting im ersten Jahr inklusive.",
      ogTitle: "Web Fuengirola · Webseiten für lokale Unternehmen",
      ogDescription:
        "Wir erstellen einfache, klare und professionelle Webseiten, damit Ihre Kunden sofort verstehen, was Sie tun, wo Sie sind und wie sie Sie kontaktieren können. Ab 300 € zzgl. MwSt.",
      navHome: "Start",
      navServices: "Leistungen",
      navPortfolio: "Portfolio",
      navProcess: "FAQ",
      navPricing: "Preise",
      navContact: "Kontakt",
      headerCta: "Angebot anfragen",
      heroBadge: "In 48 Stunden verfügbar",
      heroTitle: "Die Website, die Ihr Unternehmen verdient.",
      heroSubtitle:
        "Schnelle, professionelle Websites mit allem, was Sie brauchen, um mehr Kunden zu erreichen.",
      heroPrice: "Festpreis",
      heroPrimaryCta: "Angebot anfragen",
      heroSecondaryCta: "Projekte ansehen",
      imacTagTime: "bis zur<br>fertigen Website",
      imacTagPrice: "Festpreis",
      trustHeadline:
        "Eine Webseite muss nicht kompliziert sein.<br>Sie muss Ihr Unternehmen gut erklären.",
      trust1Title: "Klarheit",
      trust1Text:
        "Ihre Kunden verstehen in Sekunden, was Sie anbieten und warum sie Sie wählen sollten.",
      trust2Title: "Online-Präsenz",
      trust2Text:
        "Erscheinen Sie bei Google, wenn jemand in Ihrer Nähe nach Ihrer Dienstleistung sucht. Ohne Webseite existieren Sie digital kaum.",
      trust3Title: "Direkter Kontakt",
      trust3Text:
        "Ein sichtbarer WhatsApp-Button oder ein Kontaktformular verwandelt Besuche ohne Umwege in echte Kunden.",
      problemLabel: "Das Problem",
      problemTitle:
        "Viele lokale Unternehmen verlieren Kunden, ohne es zu merken",
      problem1:
        "Sie verlassen sich nur auf Instagram, dessen Algorithmus sich ohne Vorwarnung ändert.",
      problem2:
        "Sie haben eine veraltete Webseite, die auf dem Handy nicht gut funktioniert.",
      problem3: "Sie verwenden generische Fotos, die kein Vertrauen schaffen.",
      problem4:
        "Sie erscheinen nicht, wenn jemand ihre Dienstleistung bei Google sucht.",
      problem5:
        "Ihre Webseite erklärt nicht klar, was sie tun oder wie man sie kontaktiert.",
      problemStat1:
        "der Verbraucher suchen bei Google, bevor sie ein lokales Geschäft besuchen",
      problemStat2:
        "verlassen eine Webseite, die auf dem Handy länger als 3 Sekunden lädt",
      problemStat3:
        "genügen, um eine professionelle Webseite zu veröffentlichen",
      solutionLabel: "Die Lösung",
      solutionTitle:
        "Eine einfache, schnelle und individuelle Webseite<br>für eine überzeugende Präsentation Ihres Unternehmens",
      solutionSub:
        "Keine Fachsprache, keine Komplikationen. Sie erzählen uns von Ihrem Unternehmen und wir bringen es klar und professionell online.",
      benefit1Title: "Für Mobilgeräte optimiert",
      benefit1Text:
        "Sie sieht auf jedem Bildschirm gut aus. Die meisten Ihrer Kunden suchen Sie über das Handy.",
      benefit2Title: "Echte Fotos Ihres Unternehmens",
      benefit2Text:
        "Wir machen ein einfaches Fotoshooting Ihres Geschäfts, damit die Webseite wirklich zu Ihnen passt.",
      benefit3Title: "Klare Texte",
      benefit3Text:
        "Wir erklären, was Sie tun, in direkter Sprache, die Ihre Kunden sofort verstehen.",
      benefit4Title: "Direktes WhatsApp",
      benefit4Text:
        "Ein sichtbarer Button auf jeder Ansicht, damit Kunden Sie mit einem Klick anschreiben können.",
      benefit5Title: "Für Google vorbereitet",
      benefit5Text:
        "Struktur und Geschwindigkeit sind so angelegt, dass Google Sie findet und in Ihrer Umgebung zeigt.",
      benefit6Title: "Schnelle Veröffentlichung",
      benefit6Text:
        "Vom ersten Kontakt bis zur veröffentlichten Webseite in weniger als zwei Tagen. Ohne endloses Warten.",
      servicesLabel: "Leistungen",
      servicesTitle: "Alles, was Ihr Unternehmen online braucht",
      servicePopular: "Am beliebtesten",
      vatLabel: "+ MwSt.",
      serviceLiteEyebrow: "Schneller Einstieg",
      serviceLiteTitle: "Lite-Webseite",
      serviceLiteDesc:
        "Eine einfache Ein-Seiten-Webseite als digitales Schaufenster. Für Unternehmen mit bestehendem Kundenstamm, die einfach sauber online sichtbar sein wollen.",
      serviceLiteFeature1: "1 Schaufenster-Seite",
      serviceLiteFeature2: "WhatsApp, E-Mail und Adresse sichtbar",
      serviceLiteFeature3: "Grundlegendes Veröffentlichungs-SEO inklusive",
      serviceLiteFeature4:
        "Weniger SEO- und Conversion-Arbeit als bei der Landing",
      serviceLiteFeature5: "Gut zum Starten und späteren Erweitern",
      serviceLiteCta: "Diese Option wählen",
      service1Title: "Local Express Website",
      service1Desc:
        "Die Webseite, die Ihr Unternehmen braucht, veröffentlicht in 48 Stunden. Klar, schnell und professionell.",
      service1Feature1: "Domain und Hosting im ersten Jahr",
      service1Feature2: "Responsives, individuelles Design",
      service1Feature3: "Einfache Business-Fotografie",
      service1Feature4: "Klare Texte passend zu Ihrem Unternehmen",
      service1Feature5: "WhatsApp-Button und Kontaktformular",
      service1Feature6: "Grundlegende Google-Optimierung",
      service1Feature7: "1 Korrekturrunde inklusive",
      service1Cta: "Diese Webseite wählen",
      service2Title: "Pro Website",
      service2Price: "Individuelles Angebot",
      service2Desc:
        "Für Unternehmen mit mehr Anforderungen: Onlineshop, Buchungen, erweiterte Galerie oder mehrere Seiten.",
      service2Feature1: "Alles aus der Local Express Website",
      service2Feature2: "Zusätzliche Seiten nach Maß",
      service2Feature3: "Spezielle Formulare und Funktionen",
      service2Feature4: "Integrationen mit externen Tools",
      service2Feature5: "Mehr Korrekturrunden",
      service2Cta: "Angebot anfragen",
      service3Title: "React, Chatbots und Automatisierung",
      service3Price: "300 € Einrichtung + 50 € / Monat + MwSt.",
      service3PriceHtml: "300 € Einrichtung <span>+ 50 € / Monat</span>",
      service3Desc:
        "Technische Bausteine für Unternehmen, die mehr als nur eine Webseite brauchen: Interaktion, Effizienz und automatisierte Leadgewinnung.",
      service3Feature1: "Dynamische React-Seiten ab 1.400 €",
      service3Feature2:
        "Schulung und Einrichtung für 300 € + 50 € Monatsgebühr",
      service3Feature3: "Automatisierung von Aufgaben und Abläufen",
      service3Feature4: "Modularer Setup je nach Umfang",
      service4Title: "Apps und individuelle Tools",
      service4Price: "2500 € + MwSt.",
      service4Desc:
        "Web-Apps, Node-Projekte, Android-Apps und interne Tools für Abläufe, Reservierungen oder Kundenverwaltung.",
      service4Feature1: "Web-Apps und interne Dashboards",
      service4Feature2: "Node-Backends und Geschäftslogik",
      service4Feature3: "Android-Apps für operative Prozesse",
      service4Feature4: "Optimierung von Arbeitsabläufen",
      service4Feature5: "Premium-Angebot mit klarem Umfang",
      consultPrice: "Preis anfragen",
      servicesExplore: "Leistungen ansehen",
      portfolioTitle: "Projekte für lokale Unternehmen",
      portfolioSub:
        "Jede Webseite ist anders. Hier sind einige, die wir für lokale Unternehmen erstellt haben.",
      portfolio1Desc:
        "Plattform zum Vokabellernen. Klares, funktionales Design mit Fokus auf die Nutzererfahrung.",
      portfolio2Desc:
        "Lead-Website für einen Sprachcoach. Klare Landingpage mit Nutzenversprechen, Leistungen und direktem Kontakt.",
      portfolio3Title: "Personal Trainer Fuengirola",
      portfolio3Desc:
        "Minimalistische Website mit Fokus auf Kundengewinnung. Fotos, Methode und direkter Kontakt.",
      portfolio4Title: "Im Kontext — Vokabellab",
      portfolio4Desc:
        "Deutschlernwerkzeug im Kontext. Design mit Fokus auf Benutzerfreundlichkeit und Lernerfahrung.",
      portfolio4Cta: "Als Nächstes dabei sein",
      portfolioTagWebApp: "Web-App",
      portfolioTagEducation: "Bildung",
      portfolioTagLanding: "Landingpage",
      portfolioTagSeo: "SEO",
      portfolioTagSport: "Sport",
      portfolioTagLocalSeo: "Lokales SEO",
      portfolioTagEditable: "Bearbeitbar",
      portfolioTagYourSector: "Ihre Branche",
      viewSite: "Webseite ansehen",
      processLabel: "So arbeiten wir",
      processTitle: "Von null zur Veröffentlichung in 48 Stunden",
      processSub:
        "Ein einfacher Ablauf ohne Überraschungen. Sie geben uns die Informationen, wir kümmern uns um den Rest.",
      process1Title: "Erstgespräch",
      process1Desc:
        "Wir sprechen telefonisch oder persönlich, um Ihr Unternehmen, Ihre Zielgruppe und Ihre Botschaft zu verstehen. Sie müssen nichts über Webseiten wissen.",
      process2Title: "Fotos und Inhalte",
      process2Desc:
        "Wir machen ein einfaches Fotoshooting Ihres Geschäfts oder Standorts. Außerdem sammeln wir alle nötigen Informationen: Leistungen, Preise, Öffnungszeiten und Kontaktdaten.",
      process3Title: "Design und Veröffentlichung",
      process3Desc:
        "Wir erstellen Ihre Webseite und veröffentlichen sie inklusive Domain und Hosting. Schnell, sauber und technisch unkompliziert für Sie.",
      process4Title: "Abschließende Prüfung",
      process4Desc:
        "Wir zeigen Ihnen das Ergebnis und nehmen eine Korrekturrunde vor, damit Sie vor der Freigabe vollständig zufrieden sind.",
      pricingLabel: "Preise",
      pricingTitle: "Ein klarer Preis ohne Kleingedrucktes",
      pricingMainLabel: "Unsere Hauptleistung",
      pricingMainDesc:
        "Alles, was Ihr Unternehmen braucht, um professionell online zu sein.",
      pricing1: "Domain und Hosting im ersten Jahr",
      pricing2: "1 Korrekturrunde inklusive",
      pricing3: "Responsives Design für alle Geräte",
      pricing4: "WhatsApp-Button und Kontaktformular",
      pricing5: "Online-Veröffentlichung in 48 Stunden",
      pricingMainCta: "Diese Webseite anfragen",
      pricingNote:
        "Spätere Änderungen, neue Bereiche und Wartung werden je nach Aufwand separat kalkuliert.",
      pricingProBudget: "Angebot",
      pricingProCustom: "individuell",
      pricingProDesc:
        "Für komplexere Projekte: Onlineshop, Buchungen, mehrere Seiten oder spezielle Integrationen.",
      pricingPro1: "Alles aus der Local Express Website",
      pricingPro2: "Erweiterte Funktionen nach Maß",
      pricingPro3: "Mehr Korrekturrunden",
      pricingPro4: "Priorisierter Support",
      maintenanceLabel: "Wartung",
      maintenanceTitle: "Halten Sie Ihre Webseite ohne Sorgen aktuell",
      maintenanceSub:
        "Unverbindliche Pakete zur Pflege Ihrer Webseite nach der Veröffentlichung. Endpreise je nach Aufwand.",
      maintenance1Title: "Basis",
      maintenance1Desc:
        "Für Unternehmen, die nur wenige Änderungen pro Jahr brauchen. Gelegentliche Updates von Texten, Öffnungszeiten oder Fotos.",
      maintenance1Feature1: "Bis zu 2 kleine Änderungen pro Monat",
      maintenance1Feature2: "Aktualisierung grundlegender Inhalte",
      maintenance1Feature3: "Kleine Änderungen zügig umgesetzt",
      maintenance2Title: "Mittel",
      maintenance2Desc:
        "Für aktive Unternehmen, die Angebote aktualisieren, Bereiche ergänzen oder regelmäßige Änderungen wünschen.",
      maintenance2Feature1: "Bis zu 5 Änderungen pro Monat",
      maintenance2Feature2: "Einfache neue Bereiche",
      maintenance2Feature3: "Priorisierte Antwort innerhalb von 24h",
      maintenance2Feature4: "Monatlicher Besuchsbericht",
      maintenance3Title: "Pro",
      maintenance3Desc:
        "Für wachsende Projekte, die laufende Updates und dauerhafte Unterstützung brauchen.",
      maintenance3Feature1: "Vereinbarte unbegrenzte Änderungen",
      maintenance3Feature2: "Neue Seiten und Funktionen",
      maintenance3Feature3: "Antwort am selben Tag",
      maintenance3Feature4: "SEO- und Analyse-Monitoring",
      calcLabel: "Rechner",
      calcTitle:
        "Stellen Sie Ihre Website zusammen und berechnen Sie schnell eine Schätzung",
      calcSub:
        "Wählen Sie die Leistungen aus und der Preis aktualisiert sich sofort.",
      calcBaseLabel: "Leistungen",
      calcPickHint: "Mehrere Optionen sind kombinierbar",
      calcEstimateLabel: "Aktuelle Schätzung",
      calcEstimateNote:
        "Unverbindlicher Richtpreis vor dem finalen Leistungsumfang.",
      calcWhatsapp: "Dieses Angebot anfragen",
      calcEmail: "Per E-Mail senden",
      calcEmpty:
        "Wählen Sie eine oder mehrere Leistungen, um die Schätzung zu sehen.",
      ctaTitle:
        "Haben Sie ein lokales Unternehmen<br>und brauchen eine klare Webseite?",
      ctaSub:
        "Erzählen Sie uns, was Sie tun, und wir sagen Ihnen, wie wir helfen können. Unverbindlich und ohne Fachsprache.",
      ctaWhatsapp: "Per WhatsApp schreiben",
      ctaEmail: "E-Mail senden",
      footerTagline:
        "Webseiten für lokale Unternehmen mit einem klaren und professionellen Auftritt.",
      footerLegal: "Rechtliches",
      footerLegalNotice: "Impressum",
      footerPrivacy: "Datenschutz",
      footerCookies: "Cookie-Richtlinie",
      footerWhatsapp: "WhatsApp",
      footerRights:
        "WF Studio — Webdesign in Fuengirola. Alle Rechte vorbehalten.",
    },
    fi: {
      title: "Web Fuengirola | Laadukkaat verkkosivut Fuengirolassa",
      metaDescription:
        "Rakennamme yksinkertaisia, selkeitä ja ammattimaisia verkkosivuja pienille paikallisille yrityksille Fuengirolassa ja Costa del Solilla. Alkaen 300 € + ALV. Domain ja hosting sisältyvät ensimmäiseksi vuodeksi.",
      ogTitle:
        "Web Fuengirola · Verkkosivut paikallisille yrityksille 48 tunnissa",
      ogDescription:
        "Rakennamme yksinkertaisia, selkeitä ja ammattimaisia verkkosivuja, jotta asiakkaasi ymmärtävät heti mitä teet, missä olet ja miten sinuun saa yhteyden. Alkaen 300 € + ALV.",
      navHome: "Etusivu",
      navServices: "Palvelut",
      navPortfolio: "Portfolio",
      navProcess: "FAQ",
      navPricing: "Hinnat",
      navContact: "Yhteys",
      headerCta: "Pyydä tarjous",
      heroBadge: "Valmis 48 tunnissa",
      heroTitle: "Verkkosivusto, jonka yrityksesi ansaitsee.",
      heroSubtitle:
        "Nopeat, ammattimaiset verkkosivut kaikella mitä tarvitset tavoittaaksesi enemmän asiakkaita.",
      heroPrice: "Kiinteä hinta",
      heroPrimaryCta: "Pyydä tarjous",
      heroSecondaryCta: "Katso työt",
      imacTagTime: "verkkosivustosi<br>valmiiksi",
      imacTagPrice: "Kiinteä hinta",
      trustHeadline:
        "Verkkosivujen ei tarvitse olla monimutkaiset.<br>Niiden pitää selittää yrityksesi hyvin.",
      trust1Title: "Selkeys",
      trust1Text:
        "Asiakkaasi ymmärtävät sekunneissa, mitä tarjoat ja miksi heidän kannattaa valita juuri sinut.",
      trust2Title: "Näkyvyys verkossa",
      trust2Text:
        "Näy Googlessa, kun joku etsii palveluasi lähialueella. Ilman verkkosivuja et käytännössä ole olemassa digitaalisesti.",
      trust3Title: "Suora yhteys",
      trust3Text:
        "Näkyvä WhatsApp-painike tai yhteydenottolomake muuttaa kävijät oikeiksi asiakkaiksi ilman kitkaa.",
      problemLabel: "Ongelma",
      problemTitle:
        "Monet paikalliset yritykset menettävät asiakkaita huomaamattaan",
      problem1:
        "Ne ovat vain Instagramin varassa, vaikka algoritmi muuttuu ilman varoitusta.",
      problem2:
        "Niillä on vanha verkkosivusto, joka ei toimi hyvin mobiilissa.",
      problem3:
        "Ne käyttävät geneerisiä kuvia, jotka eivät herätä luottamusta.",
      problem4: "Niitä ei löydy, kun joku hakee palvelua Googlesta.",
      problem5:
        "Verkkosivu ei kerro selvästi mitä yritys tekee tai miten siihen saa yhteyden.",
      problemStat1:
        "kuluttajista hakee Googlesta ennen paikalliseen liikkeeseen menoa",
      problemStat2:
        "poistuu sivulta, jos mobiilissa lataus kestää yli 3 sekuntia",
      problemStat3: "riittää ammattimaisen verkkosivun julkaisuun",
      solutionLabel: "Ratkaisu",
      solutionTitle:
        "Yksinkertainen, nopea ja räätälöity verkkosivu<br>joka esittelee yrityksesi kunnolla",
      solutionSub:
        "Ei jargonia eikä säätöä. Kerrot meille yrityksestäsi ja me julkaisemme sen verkkoon selkeästi ja ammattimaisesti.",
      benefit1Title: "Mobiiliystävällinen",
      benefit1Text:
        "Näyttää hyvältä kaikilla näytöillä. Suurin osa asiakkaistasi etsii sinua puhelimella.",
      benefit2Title: "Aidot kuvat yrityksestäsi",
      benefit2Text:
        "Sisällytämme peruskuvauksen liiketilasta, jotta sivusto tuntuu aidosti omaltasi.",
      benefit3Title: "Selkeät tekstit",
      benefit3Text:
        "Kerrotaan mitä teet suoralla kielellä, jonka asiakkaasi ymmärtävät heti.",
      benefit4Title: "WhatsApp suoraan",
      benefit4Text:
        "Näkyvä painike jokaisella näytöllä, jotta asiakkaat voivat viestittää yhdellä klikkauksella.",
      benefit5Title: "Valmis Googlea varten",
      benefit5Text:
        "Rakenne ja nopeus on suunniteltu niin, että Google löytää sinut ja näyttää sinut lähialueen ihmisille.",
      benefit6Title: "Julkaisu 48 tunnissa",
      benefit6Text:
        "Ensikontaktista julkaistuun verkkosivuun alle kahdessa päivässä. Ei loputonta odottelua.",
      servicesLabel: "Palvelut",
      servicesTitle: "Kaikki mitä yrityksesi tarvitsee verkossa",
      servicePopular: "Suosituin",
      vatLabel: "+ ALV",
      serviceLiteEyebrow: "Nopea aloitus",
      serviceLiteTitle: "Lite-verkkosivu",
      serviceLiteDesc:
        "Yksinkertainen yhden sivun verkkosivu nopeaksi digitaaliseksi näyteikkunaksi. Sopii yrityksille, joilla on jo asiakkaita ja jotka haluavat vain näkyä siististi verkossa.",
      serviceLiteFeature1: "Yksi esittelysivu",
      serviceLiteFeature2: "WhatsApp, sähköposti ja osoite näkyvissä",
      serviceLiteFeature3: "Julkaisun perus-SEO sisältyy",
      serviceLiteFeature4: "Vähemmän SEO- ja konversiotyötä kuin Landingissa",
      serviceLiteFeature5: "Hyvä aloitukseen ja myöhempään laajentamiseen",
      serviceLiteCta: "Haluan tämän vaihtoehdon",
      service1Title: "Local Express -verkkosivu",
      service1Desc:
        "Yrityksesi tarvitsema verkkosivu julkaistuna 48 tunnissa. Selkeä, nopea ja ammattimainen.",
      service1Feature1: "Domain ja hosting ensimmäiseksi vuodeksi",
      service1Feature2: "Responsiivinen ja räätälöity design",
      service1Feature3: "Perusyrityskuvaus",
      service1Feature4: "Selkeät tekstit yrityksellesi",
      service1Feature5: "WhatsApp-painike ja yhteydenottolomake",
      service1Feature6: "Perusoptimointi Googlea varten",
      service1Feature7: "1 kierros muutoksia sisältyy",
      service1Cta: "Haluan tämän sivun",
      service2Title: "Pro-verkkosivu",
      service2Price: "Räätälöity tarjous",
      service2Desc:
        "Yrityksille, jotka tarvitsevat enemmän: verkkokauppa, varaukset, laajempi galleria tai useita sivuja.",
      service2Feature1: "Kaikki Local Express -paketista",
      service2Feature2: "Lisäsivuja tarpeen mukaan",
      service2Feature3: "Erikoislomakkeet ja toiminnot",
      service2Feature4: "Integraatiot ulkoisiin työkaluihin",
      service2Feature5: "Useampia tarkistuskierroksia",
      service2Cta: "Pyydä tarjous",
      service3Title: "React, chatbotit ja automaatio",
      service3Price: "300 € käyttöönotto + 50 € / kk + ALV",
      service3PriceHtml: "300 € käyttöönotto <span>+ 50 € / kk</span>",
      service3Desc:
        "Tekniset ratkaisut yrityksille, jotka tarvitsevat enemmän kuin vain verkkosivun: vuorovaikutusta, tehokkuutta ja automatisoitua liidien keruuta.",
      service3Feature1: "Dynaamiset React-sivut alkaen 1.400 €",
      service3Feature2: "Koulutus ja käyttöönotto 300 € + 50 € kuukausimaksu",
      service3Feature3: "Tehtävien ja työnkulkujen automaatio",
      service3Feature4: "Modulaarinen toteutus tarpeen mukaan",
      service4Title: "Sovellukset ja räätälöidyt työkalut",
      service4Price: "2500 € + ALV",
      service4Desc:
        "Web-sovellukset, Node-projektit, Android-sovellukset ja sisäiset työkalut operaatioihin, varauksiin tai asiakashallintaan.",
      service4Feature1: "Web-sovellukset ja sisäiset dashboardit",
      service4Feature2: "Node-taustajärjestelmät ja liiketoimintalogiikka",
      service4Feature3: "Android-sovellukset operatiiviseen käyttöön",
      service4Feature4: "Työnkulkujen optimointi",
      service4Feature5: "Premium-tarjous selkeällä laajuudella",
      consultPrice: "Kysy hinta",
      servicesExplore: "Katso palvelut",
      portfolioTitle: "Projekteja paikallisille yrityksille",
      portfolioSub:
        "Jokainen verkkosivu on erilainen. Tässä on joitakin sivuja, joita olemme tehneet paikallisille yrityksille.",
      portfolio1Desc:
        "Sanaston oppimisalusta. Selkeä ja toimiva design, jossa käyttäjäkokemus on keskiössä.",
      portfolio2Desc:
        "Liidien keräämiseen suunnattu sivu kielicoachille. Selkeä landing page, palvelut ja suora yhteys.",
      portfolio3Title: "Personal Trainer Fuengirola",
      portfolio3Desc:
        "Minimalistinen sivusto asiakashankintaan. Kuvat valmentajasta, metodologia ja suora yhteys.",
      portfolio4Title: "Im Kontext — Vokabellab",
      portfolio4Desc:
        "Saksaa kontekstissa -oppimistyökalu. Suunnittelu keskittyy käytettävyyteen ja oppimiskokemukseen.",
      portfolio4Cta: "Ole seuraava",
      portfolioTagWebApp: "Web-sovellus",
      portfolioTagEducation: "Koulutus",
      portfolioTagLanding: "Landing page",
      portfolioTagSeo: "SEO",
      portfolioTagSport: "Urheilu",
      portfolioTagLocalSeo: "Paikallinen SEO",
      portfolioTagEditable: "Muokattava",
      portfolioTagYourSector: "Oma alasi",
      viewSite: "Avaa sivu",
      processLabel: "Näin työskentelemme",
      processTitle: "Nollasta julkaisuun 48 tunnissa",
      processSub:
        "Yksinkertainen prosessi ilman yllätyksiä. Sinä annat tiedot, me hoidamme loput.",
      process1Title: "Aloituspalaveri",
      process1Desc:
        "Keskustelemme puhelimessa tai paikan päällä ymmärtääksemme yrityksesi, yleisösi ja viestisi. Sinun ei tarvitse tietää verkkosivuista mitään.",
      process2Title: "Kuvat ja sisältö",
      process2Desc:
        "Teemme peruskuvauksen yrityksestäsi tai liiketilastasi. Keräämme myös tarvittavat tiedot: palvelut, hinnat, aukioloajat ja yhteystiedot.",
      process3Title: "Suunnittelu ja julkaisu",
      process3Desc:
        "Rakennamme verkkosivusi ja julkaisemme sen domainin ja hostingin kanssa. Nopea, siisti ja teknisesti vaivaton sinulle.",
      process4Title: "Lopullinen tarkistus",
      process4Desc:
        "Näytämme lopputuloksen ja teemme yhden korjauskierroksen, jotta olet täysin tyytyväinen ennen hyväksyntää.",
      pricingLabel: "Hinnat",
      pricingTitle: "Selkeä hinta ilman piiloehtoja",
      pricingMainLabel: "Pääpalvelumme",
      pricingMainDesc:
        "Kaikki mitä yrityksesi tarvitsee ammattimaiseen verkkonäkyvyyteen.",
      pricing1: "Domain ja hosting ensimmäiseksi vuodeksi",
      pricing2: "1 tarkistuskierros sisältyy",
      pricing3: "Responsiivinen design kaikille laitteille",
      pricing4: "WhatsApp-painike ja yhteydenottolomake",
      pricing5: "Sivusto julkaistaan 48 tunnissa",
      pricingMainCta: "Pyydä tämä sivu",
      pricingNote:
        "Myöhemmät muutokset, uudet osiot ja ylläpito hinnoitellaan erikseen työn määrän mukaan.",
      pricingProBudget: "Tarjous",
      pricingProCustom: "räätälöity",
      pricingProDesc:
        "Monimutkaisempiin projekteihin: verkkokauppa, varaukset, useita sivuja tai erikoisintegraatiot.",
      pricingPro1: "Kaikki Local Express -paketista",
      pricingPro2: "Edistyneet räätälöidyt toiminnot",
      pricingPro3: "Useampia tarkistuskierroksia",
      pricingPro4: "Priorisoitu tuki",
      maintenanceLabel: "Ylläpito",
      maintenanceTitle: "Pidä verkkosivusi ajan tasalla ilman huolia",
      maintenanceSub:
        "Suuntaa-antavat paketit sivuston päivittämiseen ja ylläpitoon julkaisun jälkeen. Lopullinen hinta riippuu työn määrästä.",
      maintenance1Title: "Perus",
      maintenance1Desc:
        "Yrityksille, jotka tarvitsevat vain vähän muutoksia vuodessa. Satunnaisia päivityksiä teksteihin, aukioloaikoihin tai kuviin.",
      maintenance1Feature1: "Enintään 2 pientä muutosta kuukaudessa",
      maintenance1Feature2: "Perussisällön päivitykset",
      maintenance1Feature3: "Sivu valmis 48 tunnissa",
      maintenance2Title: "Keski",
      maintenance2Desc:
        "Aktiivisille yrityksille, jotka päivittävät tarjouksia, lisäävät osioita tai haluavat säännöllisiä muutoksia.",
      maintenance2Feature1: "Enintään 5 muutosta kuukaudessa",
      maintenance2Feature2: "Yksinkertaisia uusia osioita",
      maintenance2Feature3: "Priorisoitu vastaus 24 tunnissa",
      maintenance2Feature4: "Kuukausittainen kävijäraportti",
      maintenance3Title: "Pro",
      maintenance3Desc:
        "Kasvaville projekteille, jotka tarvitsevat jatkuvia päivityksiä ja tukea.",
      maintenance3Feature1: "Sovitut rajattomat muutokset",
      maintenance3Feature2: "Uusia sivuja ja toimintoja",
      maintenance3Feature3: "Vastaus saman päivän aikana",
      maintenance3Feature4: "SEO- ja analytiikkaseuranta",
      calcLabel: "Laskuri",
      calcTitle: "Rakenna verkkosivusi ja laske nopea arvio",
      calcSub: "Valitse kiinnostavat palvelut ja arvio päivittyy heti.",
      calcBaseLabel: "Palvelut",
      calcPickHint: "Voit yhdistää useita vaihtoehtoja",
      calcEstimateLabel: "Nykyinen arvio",
      calcEstimateNote:
        "Suuntaa-antava hinta ennen lopullisen laajuuden vahvistusta.",
      calcWhatsapp: "Pyydä tämä tarjous",
      calcEmail: "Lähetä sähköpostilla",
      calcEmpty: "Valitse yksi tai useampi palvelu nähdäksesi arvion.",
      ctaTitle:
        "Onko sinulla paikallinen yritys<br>ja tarvitset selkeät verkkosivut?",
      ctaSub:
        "Kerro mitä teet, niin kerromme miten voimme auttaa. Ei sitoumuksia eikä teknistä jargonia.",
      ctaWhatsapp: "Keskustele WhatsAppissa",
      ctaEmail: "Lähetä sähköposti",
      footerTagline:
        "Verkkosivut paikallisille yrityksille selkeällä ja ammattimaisella ilmeellä.",
      footerLegal: "Lakiasiat",
      footerLegalNotice: "Lakiteksti",
      footerPrivacy: "Tietosuojakäytäntö",
      footerCookies: "Evästekäytäntö",
      footerWhatsapp: "WhatsApp",
      footerRights:
        "WF Studio — Verkkosuunnittelu Fuengirolassa. Kaikki oikeudet pidätetään.",
    },
  };

  var cookieBannerCopy = {
    es: {
      title: "Usamos cookies",
      noticeHtml:
        "<p>Utilizamos cookies necesarias para que la web funcione correctamente y, si lo aceptas, cookies analíticas para entender qué partes de la página interesan más.</p>",
      rejectLabel: "Rechazar",
      acceptLabel: "Aceptar",
      configLabel: "Configurar cookies",
      configModalTitle: "Configuración de cookies",
      configModalIntro:
        "Puedes mantener solo las cookies necesarias o activar también las analíticas. Tu elección se guarda en este navegador.",
      necessaryTitle: "Cookies necesarias",
      necessaryDescription:
        "Permiten el funcionamiento básico del sitio y guardar tu decisión de consentimiento.",
      necessaryBadge: "Siempre activas",
      analyticsTitle: "Cookies analíticas",
      analyticsDescription:
        "Nos ayudan a medir visitas y mejorar la web sin cambiar la experiencia básica.",
      saveConfigLabel: "Guardar configuración",
    },
    en: {
      title: "We use cookies",
      noticeHtml:
        "<p>We use necessary cookies so the site works properly and, if you accept them, analytics cookies to understand which parts of the page attract the most interest.</p>",
      rejectLabel: "Reject",
      acceptLabel: "Accept",
      configLabel: "Cookie settings",
      configModalTitle: "Cookie settings",
      configModalIntro:
        "You can keep only the necessary cookies or also enable analytics. Your choice is stored in this browser.",
      necessaryTitle: "Necessary cookies",
      necessaryDescription:
        "They allow the site to work properly and store your consent choice.",
      necessaryBadge: "Always active",
      analyticsTitle: "Analytics cookies",
      analyticsDescription:
        "They help us measure visits and improve the site without changing the basic experience.",
      saveConfigLabel: "Save settings",
    },
    de: {
      title: "Wir verwenden Cookies",
      noticeHtml:
        "<p>Wir verwenden notwendige Cookies, damit die Website korrekt funktioniert, und mit Ihrer Zustimmung analytische Cookies, um zu verstehen, welche Bereiche der Seite am meisten Interesse wecken.</p>",
      rejectLabel: "Ablehnen",
      acceptLabel: "Akzeptieren",
      configLabel: "Cookies einstellen",
      configModalTitle: "Cookie-Einstellungen",
      configModalIntro:
        "Sie können nur die notwendigen Cookies behalten oder zusätzlich analytische Cookies aktivieren. Ihre Auswahl wird in diesem Browser gespeichert.",
      necessaryTitle: "Notwendige Cookies",
      necessaryDescription:
        "Sie ermöglichen die Grundfunktionen der Website und speichern Ihre Einwilligungsentscheidung.",
      necessaryBadge: "Immer aktiv",
      analyticsTitle: "Analytische Cookies",
      analyticsDescription:
        "Sie helfen uns, Besuche zu messen und die Website zu verbessern, ohne die Grundfunktion zu verändern.",
      saveConfigLabel: "Einstellungen speichern",
    },
    fi: {
      title: "Käytämme evästeitä",
      noticeHtml:
        "<p>Käytämme välttämättömiä evästeitä, jotta sivusto toimii oikein, ja halutessasi analytiikkaevästeitä, jotta ymmärrämme mitkä sivun osat kiinnostavat eniten.</p>",
      rejectLabel: "Hylkää",
      acceptLabel: "Hyväksy",
      configLabel: "Evästeasetukset",
      configModalTitle: "Evästeasetukset",
      configModalIntro:
        "Voit pitää vain välttämättömät evästeet tai ottaa myös analytiikan käyttöön. Valintasi tallennetaan tähän selaimeen.",
      necessaryTitle: "Välttämättömät evästeet",
      necessaryDescription:
        "Ne mahdollistavat sivuston perustoiminnan ja tallentavat suostumusvalintasi.",
      necessaryBadge: "Aina käytössä",
      analyticsTitle: "Analytiikkaevästeet",
      analyticsDescription:
        "Ne auttavat meitä mittaamaan käyntejä ja parantamaan sivustoa muuttamatta peruskokemusta.",
      saveConfigLabel: "Tallenna asetukset",
    },
  };

  var defaultLang = "es";
  var header = document.getElementById("header");
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");
  var langButtons = document.querySelectorAll(".lang-switcher__btn");
  var cookieBannerInstance = null;
  var cookieDecisionKey = "webfuengirola_cookie_consent";
  var cookiePreferencesKey = "webfuengirola_cookie_preferences";

  function applyCookiePreferenceState(preferences) {
    var hasAnalytics = !!(preferences && preferences.analiticas);
    document.documentElement.dataset.analyticsConsent = hasAnalytics
      ? "granted"
      : "denied";
    if (window.GoogleAnalyticsCore) {
      if (hasAnalytics) GoogleAnalyticsCore.grantConsent();
      else GoogleAnalyticsCore.revokeConsent();
    }
  }

  function buildCookieBannerConfig(lang) {
    var copy = cookieBannerCopy[lang] || cookieBannerCopy[defaultLang];

    return {
      decisionStorageKey: cookieDecisionKey,
      preferencesStorageKey: cookiePreferencesKey,
      imageSrc: "img/cookie-funny.webp",
      imageAlt: "Funny cookie illustration",
      imageWidth: 180,
      imageHeight: 180,
      title: copy.title,
      noticeHtml: copy.noticeHtml,
      rejectLabel: copy.rejectLabel,
      acceptLabel: copy.acceptLabel,
      configLabel: copy.configLabel,
      configModalTitle: copy.configModalTitle,
      configModalIntro: copy.configModalIntro,
      necessaryTitle: copy.necessaryTitle,
      necessaryDescription: copy.necessaryDescription,
      necessaryBadge: copy.necessaryBadge,
      analyticsTitle: copy.analyticsTitle,
      analyticsDescription: copy.analyticsDescription,
      saveConfigLabel: copy.saveConfigLabel,
      onAccept: applyCookiePreferenceState,
      onReject: applyCookiePreferenceState,
      onSaveConfig: applyCookiePreferenceState,
    };
  }

  function initCookieBanner(lang) {
    if (
      !window.CookieBannerCore ||
      typeof window.CookieBannerCore.init !== "function"
    )
      return;

    // GA init BEFORE el banner para que los consent defaults se encolen primero
    if (window.GoogleAnalyticsCore) {
      GoogleAnalyticsCore.init({ measurementId: "G-V7KY8FGLM5" });
    }

    cookieBannerInstance = window.CookieBannerCore.init(
      buildCookieBannerConfig(lang || defaultLang),
    );
    if (
      cookieBannerInstance &&
      typeof cookieBannerInstance.getPreferences === "function"
    ) {
      applyCookiePreferenceState(cookieBannerInstance.getPreferences());
    }
  }

  function resetCookieBanner() {
    window.localStorage.removeItem(cookieDecisionKey);
    window.localStorage.removeItem(cookiePreferencesKey);
    initCookieBanner(document.documentElement.lang || defaultLang);
  }

  function applyTranslations(lang) {
    var dictionary = translations[lang] || translations[defaultLang];

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      var key = element.getAttribute("data-i18n");
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-html");
      if (dictionary[key]) {
        element.innerHTML = dictionary[key];
      }
    });

    document.querySelectorAll("[data-i18n-meta]").forEach(function (element) {
      var key = element.getAttribute("data-i18n-meta");
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document
      .querySelectorAll("[data-i18n-meta-content]")
      .forEach(function (element) {
        var key = element.getAttribute("data-i18n-meta-content");
        if (dictionary[key]) {
          element.setAttribute("content", dictionary[key]);
        }
      });

    langButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-lang") === lang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    initCookieBanner(lang);
  }

  function setLanguage(lang) {
    var nextLang = translations[lang] ? lang : defaultLang;
    applyTranslations(nextLang);
    window.localStorage.setItem("webfuengirola-language", nextLang);
  }

  /* ---- Header scroll class ---- */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  /* ---- Stacked cards on scroll (scale compress as next card slides over) ---- */
  function initStackCards() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var cards = Array.prototype.slice.call(
      document.querySelectorAll(".stack-cards-track .stack-card"),
    );
    if (cards.length < 2) return;
    var ticking = false;

    function update() {
      for (var i = 0; i < cards.length - 1; i++) {
        var card = cards[i];
        var next = cards[i + 1];
        var cardRect = card.getBoundingClientRect();
        var nextRect = next.getBoundingClientRect();
        /* How far the next card has slid over this one (0 to 1). */
        var overlap = Math.max(0, cardRect.bottom - nextRect.top);
        var progress = Math.min(
          1,
          overlap / Math.max(cardRect.height * 0.38, 1),
        );
        var scale = 1 - progress * 0.045;
        var lift = progress * -18;
        var tilt = progress * -0.45;

        card.style.transform =
          "translate3d(0, " +
          lift.toFixed(2) +
          "px, 0) rotateX(" +
          tilt.toFixed(2) +
          "deg) scale(" +
          scale.toFixed(4) +
          ")";
        card.classList.toggle("is-stacked", progress > 0.02);
      }
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  /* ---- Elegant scroll reveal ---- */
  function initReveal() {
    var els = Array.prototype.slice.call(
      document.querySelectorAll("[data-reveal]"),
    );
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
    );

    /* Double RAF: let browser paint initial hidden state before observing */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.forEach(function (el) {
          observer.observe(el);
        });
      });
    });
  }

  /* ---- Portfolio hover popup ---- */
  function initPortfolioPopup() {
    var cards = Array.prototype.slice.call(
      document.querySelectorAll(".portfolio-card"),
    );
    if (
      !cards.length ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;

    var popup = document.createElement("div");
    popup.className = "portfolio-popup";
    popup.setAttribute("aria-hidden", "true");
    popup.innerHTML = '<img class="portfolio-popup__img" src="" alt="">';
    document.body.appendChild(popup);

    var popupImg = popup.querySelector("img");
    var hideTimer = null;

    cards.forEach(function (card) {
      var thumb = card.querySelector(".portfolio-card__img");
      if (!thumb) return;

      card.addEventListener("mouseenter", function () {
        clearTimeout(hideTimer);
        if (popupImg.src !== thumb.src) {
          popupImg.src = thumb.src;
        }

        var rect = card.getBoundingClientRect();
        var popupW = 420;
        var spaceRight = window.innerWidth - rect.right - 24;
        var left =
          spaceRight >= popupW
            ? rect.right + window.scrollX + 16
            : rect.left + window.scrollX - popupW - 16;

        popup.style.top = rect.top + window.scrollY + "px";
        popup.style.left = left + "px";
        popup.classList.add("is-visible");
      });

      card.addEventListener("mouseleave", function () {
        hideTimer = setTimeout(function () {
          popup.classList.remove("is-visible");
        }, 80);
      });
    });
  }

  /* ---- iframe preview scaling ---- */
  function scalePreviewIframes() {
    var wrappers = document.querySelectorAll(".portfolio-card__preview");
    if (!wrappers.length) return;

    wrappers.forEach(function (wrapper) {
      var iframe = wrapper.querySelector("iframe");
      if (!iframe) return;
      var scale = wrapper.offsetWidth / 1280;
      iframe.style.transform = "scale(" + scale + ")";
      wrapper.style.height = Math.round(wrapper.offsetWidth * 0.75) + "px";
    });
  }

  function initServiceEstimator() {
    var root = document.querySelector("[data-estimator]");
    if (!root) return;

    var WA_BASE = "https://wa.me/34622923988?text=";
    var EMAIL = "info@webfuengirola.com";
    var stepOrder = ["pages", "blog", "changes", "tracking", "summary"];
    var stepLabels = {
      pages: "1 de 4 · Páginas",
      blog: "2 de 4 · Blog",
      changes: "3 de 4 · Actualizaciones",
      tracking: "4 de 4 · Seguimiento",
      summary: "Recomendación",
    };

    var services = {
      lite: {
        title: "Web Lite",
        basePrice: 200,
        priceLabel: "200€ + IVA",
        summaryPrice: "200€ + IVA",
        renewalLabel: "Hosting 35€/año · dominio no incluido",
        renewalSidePrice: "35€/año de hosting",
        renewalCopy:
          "El dominio va aparte. Web Lite está pensada para una presencia sencilla y publicada sin complicaciones.",
        bullets: [
          "Landing page monopágina con hasta 5 secciones.",
          "Diseño responsive, legal básico y contacto visible.",
          "SEO inicial para indexación y buenas prácticas.",
        ],
      },
      express: {
        title: "Web Express",
        basePrice: 350,
        priceLabel: "350€ + IVA",
        summaryPrice: "350€ + IVA",
        renewalLabel: "Hosting 50€/año · dominio no incluido",
        renewalSidePrice: "50€/año de hosting",
        renewalCopy:
          "Ideal para una web corporativa multipágina con más espacio para explicar servicios, instalaciones y quiénes sois.",
        bullets: [
          "Hasta 5 páginas más blog.",
          "SEO medio inicial orientado a estructura e indexación.",
          "WhatsApp, email y formulario básico sin base de datos.",
        ],
      },
      pro: {
        title: "Web Pro",
        basePrice: 600,
        priceLabel: "600€ + IVA",
        summaryPrice: "600€ + IVA",
        renewalLabel:
          "Renovación anual: hosting 60€ IVA incl. + dominio 15€ IVA incl.",
        renewalSidePrice: "Primer año incluido",
        renewalCopy:
          "Después del primer año, la renovación prevista es de 60€ IVA incluido de hosting y 15€ IVA incluido de dominio.",
        bullets: [
          "Todo lo incluido en Web Express, hasta 10 páginas y SEO avanzado inicial.",
          "Formulario con almacenamiento de contactos y registro básico de oportunidades.",
          "Panel básico para noticias, eventos, promociones o casos de éxito.",
        ],
      },
      custom: {
        title: "Web Personalizada",
        basePrice: 600,
        priceLabel: "Desde 600€ + IVA",
        summaryPrice: "Desde 600€ + IVA",
        renewalLabel:
          "Renovación anual orientativa: hosting 80€ IVA incl. + dominio 15€ IVA incl.",
        renewalSidePrice: "Primer año incluido",
        renewalCopy:
          "Pensada para proyectos con funcionalidades específicas, integraciones o procesos a medida. El precio final depende del alcance real.",
        bullets: [
          "Reservas, áreas privadas, automatizaciones o integraciones según necesidad.",
          "Desarrollo definido caso a caso, sin venderlo como una simple web más grande.",
          "Base preparada para procesos internos o herramientas propias del negocio.",
        ],
      },
    };

    var supportPlans = {
      none: {
        title: "Sin mantenimiento",
        type: "none",
        oneTime: 0,
        monthly: 0,
        label: "Sin cuota fija",
        summary:
          "Publicamos la web y dejamos el seguimiento para más adelante.",
      },
      marketing: {
        title: "Marketing y Presencia Digital",
        type: "monthly",
        oneTime: 0,
        monthly: 300,
        label: "300€/mes",
        summary:
          "Presencia digital activa, reseñas, publicaciones y seguimiento SEO local.",
      },
      carefree: {
        title: "Cero Preocupaciones",
        type: "monthly",
        oneTime: 0,
        monthly: 400,
        label: "400€/mes",
        summary:
          "Delegación más completa con actualizaciones web, supervisión técnica y soporte prioritario.",
      },
      flex: {
        title: "Bono Flexible",
        type: "pack",
        oneTime: 400,
        monthly: 0,
        label: "400€ · 10 horas",
        summary:
          "Bolsa de horas para acciones concretas con flexibilidad y seguimiento.",
      },
      priority: {
        title: "Bono Prioritario",
        type: "pack",
        oneTime: 550,
        monthly: 0,
        label: "550€ · 10 horas",
        summary:
          "Bolsa prioritaria para actuar más rápido cuando el negocio lo necesita.",
      },
    };

    var extras = {
      analytics: {
        title: "Google Analytics y Search Console",
        price: 50,
        label: "50€ + IVA",
        summary:
          "Configuración inicial, verificación de dominio y conexión con la web.",
      },
    };

    var state = {
      pages: null,
      blog: null,
      changes: null,
      tracking: null,
    };

    var activeStep = "pages";
    var steps = {};
    Array.prototype.slice
      .call(root.querySelectorAll("[data-estimator-step]"))
      .forEach(function (el) {
        steps[el.getAttribute("data-estimator-step")] = el;
      });

    var dots = Array.prototype.slice.call(
      root.querySelectorAll("[data-estimator-dot]"),
    );
    var stepLabelEl = root.querySelector("[data-estimator-step-label]");
    var barStepEl = root.querySelector("[data-estimator-bar-step]");
    var barOnceEl = root.querySelector("[data-estimator-bar-once]");
    var barEl = root.querySelector("[data-estimator-bar]");
    var summaryEl = root.querySelector("[data-estimator-summary]");
    var totalOnceEl = root.querySelector("[data-estimator-total-once]");
    var totalRecurringEl = root.querySelector(
      "[data-estimator-total-recurring]",
    );
    var backBtn = root.querySelector("[data-estimator-back]");
    var nextBtn = root.querySelector("[data-estimator-next]");
    var restartBtn = root.querySelector("[data-estimator-restart]");
    var whatsappBtn = root.querySelector("[data-estimator-wa]");
    var emailBtn = root.querySelector("[data-estimator-email]");

    function formatOneTime(amount, isFrom) {
      return (isFrom ? "Desde " : "") + amount + "€ + IVA";
    }

    function deriveRecommendation() {
      var pages = state.pages || "one";
      var blog = state.blog || "no";
      var changes = state.changes || "rarely";
      var tracking = state.tracking || "basic";

      var serviceKey;
      if (pages === "one") serviceKey = "lite";
      else if (pages === "few") serviceKey = "express";
      else if (pages === "many") serviceKey = "pro";
      else serviceKey = "custom";

      if (blog === "yes" && serviceKey === "lite") serviceKey = "express";

      var supportKey;
      if (tracking === "full") {
        supportKey = "carefree";
      } else if (tracking === "monitoring") {
        supportKey = changes === "rarely" ? "flex" : "marketing";
      } else {
        supportKey = changes === "rarely" ? "none" : "flex";
      }

      var includeAnalytics =
        (serviceKey === "pro" || serviceKey === "custom") &&
        (tracking === "monitoring" || tracking === "full");

      return {
        service: serviceKey,
        support: supportKey,
        analytics: includeAnalytics,
      };
    }

    function computeTotals(rec) {
      var service = services[rec.service];
      var support = supportPlans[rec.support];
      return {
        once:
          service.basePrice +
          support.oneTime +
          (rec.analytics ? extras.analytics.price : 0),
        monthly: support.monthly,
        hasFromPrefix: rec.service === "custom",
      };
    }

    function getCurrentEstimate() {
      return computeTotals(deriveRecommendation());
    }

    function syncSelections() {
      ["pages", "blog", "changes", "tracking"].forEach(function (field) {
        Array.prototype.slice
          .call(
            root.querySelectorAll('[data-estimator-choice="' + field + '"]'),
          )
          .forEach(function (btn) {
            btn.classList.toggle(
              "is-selected",
              btn.getAttribute("data-key") === state[field],
            );
          });
      });
    }

    function updateSummary() {
      var rec = deriveRecommendation();
      var totals = computeTotals(rec);
      var service = services[rec.service];
      var support = supportPlans[rec.support];
      var once = totals.once;
      var hasFromPrefix = totals.hasFromPrefix;

      var bulletsHtml = service.bullets
        .map(function (b) {
          return '<div class="estimator-summary__bullet">' + b + "</div>";
        })
        .join("");

      var extraLine = rec.analytics
        ? '<div class="estimator-summary__line"><span>' +
          extras.analytics.title +
          "</span><strong>" +
          extras.analytics.label +
          "</strong></div>"
        : "";

      if (summaryEl) {
        summaryEl.innerHTML =
          '<div class="estimator-summary__group">' +
          '<div class="estimator-summary__group-title">Web recomendada</div>' +
          '<div class="estimator-summary__line"><span>' +
          service.title +
          "</span><strong>" +
          service.summaryPrice +
          "</strong></div>" +
          extraLine +
          '<div class="estimator-summary__bullets">' +
          bulletsHtml +
          "</div>" +
          "</div>" +
          '<div class="estimator-summary__group">' +
          '<div class="estimator-summary__group-title">Seguimiento recomendado</div>' +
          '<div class="estimator-summary__line"><span>' +
          support.title +
          "</span><strong>" +
          support.label +
          "</strong></div>" +
          '<div class="estimator-summary__bullets"><div class="estimator-summary__bullet">' +
          support.summary +
          "</div></div>" +
          "</div>" +
          '<div class="estimator-summary__group">' +
          '<div class="estimator-summary__group-title">Renovación orientativa</div>' +
          '<div class="estimator-summary__line"><span>Costes anuales</span><strong>' +
          service.renewalLabel +
          "</strong></div>" +
          "</div>";
      }

      if (totalOnceEl)
        totalOnceEl.textContent = formatOneTime(once, hasFromPrefix);
      if (totalRecurringEl) {
        totalRecurringEl.textContent = support.monthly
          ? support.monthly + "€/mes"
          : support.type === "pack"
            ? support.oneTime + "€ en bono"
            : "Sin cuota mensual";
      }
    }

    function buildMessage() {
      var rec = deriveRecommendation();
      var totals = computeTotals(rec);
      var service = services[rec.service];
      var support = supportPlans[rec.support];
      var once = totals.once;
      var hasFromPrefix = totals.hasFromPrefix;

      var lines = [
        "Hola, he usado la calculadora de WF Studio y esta es mi recomendación:",
        "- Web: " + service.title + " (" + service.summaryPrice + ")",
        "- Seguimiento: " + support.title + " (" + support.label + ")",
      ];

      if (rec.analytics) {
        lines.push(
          "- Extra: " +
            extras.analytics.title +
            " (" +
            extras.analytics.label +
            ")",
        );
      }

      lines.push(
        "- Inversión inicial estimada: " + formatOneTime(once, hasFromPrefix),
      );
      if (support.monthly)
        lines.push("- Cuota mensual: " + support.monthly + "€/mes");
      lines.push("Me gustaría comentar material, plazos y alcance real.");
      return lines.join("\n");
    }

    function updateLinks() {
      var message = buildMessage();
      if (whatsappBtn) whatsappBtn.href = WA_BASE + encodeURIComponent(message);
      if (emailBtn) {
        emailBtn.href =
          "mailto:" +
          EMAIL +
          "?subject=" +
          encodeURIComponent("Estimación web WF Studio") +
          "&body=" +
          encodeURIComponent(message);
      }
    }

    function canContinue(stepKey) {
      return stepKey !== "summary" && !!state[stepKey];
    }

    function updateNav() {
      var idx = stepOrder.indexOf(activeStep);
      var isSummary = activeStep === "summary";

      dots.forEach(function (dot) {
        var dotIdx = stepOrder.indexOf(dot.getAttribute("data-estimator-dot"));
        dot.classList.toggle("is-active", dotIdx === idx);
        dot.classList.toggle("is-done", dotIdx < idx);
      });

      if (stepLabelEl) stepLabelEl.textContent = stepLabels[activeStep];

      root.classList.toggle("is-on-summary", isSummary);
      if (barEl) barEl.hidden = isSummary;

      if (!isSummary) {
        var qIdx = ["pages", "blog", "changes", "tracking"].indexOf(activeStep);
        if (barStepEl)
          barStepEl.textContent = "Pregunta " + (qIdx + 1) + " de 4";
        if (barOnceEl) {
          if (!state.pages) {
            barOnceEl.textContent = "—";
          } else {
            var est = getCurrentEstimate();
            barOnceEl.textContent = formatOneTime(est.once, est.hasFromPrefix);
          }
        }
      }

      if (backBtn) backBtn.hidden = idx === 0;
      if (nextBtn) {
        nextBtn.hidden = isSummary;
        nextBtn.disabled = !canContinue(activeStep);
        nextBtn.textContent =
          activeStep === "tracking" ? "Ver recomendación →" : "Siguiente →";
      }
    }

    function goTo(stepKey) {
      activeStep = stepKey;
      Object.keys(steps).forEach(function (key) {
        steps[key].classList.toggle("is-active", key === stepKey);
      });

      syncSelections();
      if (stepKey === "summary") {
        updateSummary();
        updateLinks();
      }
      updateNav();
    }

    ["pages", "blog", "changes", "tracking"].forEach(function (field) {
      Array.prototype.slice
        .call(root.querySelectorAll('[data-estimator-choice="' + field + '"]'))
        .forEach(function (btn) {
          btn.addEventListener("click", function () {
            state[field] = btn.getAttribute("data-key");
            syncSelections();
            updateNav();
          });
        });
    });

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        var idx = stepOrder.indexOf(activeStep);
        if (idx <= 0) return;
        goTo(stepOrder[idx - 1]);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        var idx = stepOrder.indexOf(activeStep);
        if (
          idx === -1 ||
          idx >= stepOrder.length - 1 ||
          !canContinue(activeStep)
        )
          return;
        goTo(stepOrder[idx + 1]);
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        state = { pages: null, blog: null, changes: null, tracking: null };
        goTo("pages");
      });
    }

    goTo("pages");
  }

  function initEditorialServices() {
    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-services-item]"),
    );
    var previews = Array.prototype.slice.call(
      document.querySelectorAll("[data-service-preview-card]"),
    );
    var stage = document.querySelector("[data-service-preview-stage]");
    if (!items.length) return;

    function activate(item) {
      var previewKey = item ? item.getAttribute("data-service-preview") : "";
      items.forEach(function (entry) {
        var isActive = entry === item;
        entry.classList.toggle("is-active", isActive);
        entry.setAttribute("aria-expanded", isActive ? "true" : "false");
      });

      previews.forEach(function (card) {
        card.classList.toggle(
          "is-active",
          card.getAttribute("data-service-preview-card") === previewKey,
        );
      });
    }

    items.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches)
          activate(item);
      });

      item.addEventListener("focus", function () {
        activate(item);
      });

      item.addEventListener("click", function () {
        if (
          window.matchMedia("(hover: none), (pointer: coarse)").matches &&
          item.classList.contains("is-active")
        ) {
          item.classList.remove("is-active");
          item.setAttribute("aria-expanded", "false");
          return;
        }

        activate(item);
      });
    });

    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    var interactionZone = stage.parentElement || stage;

    var rafId = null;
    var pointerX = 0;
    var pointerY = 0;

    function paintPreviewMotion() {
      rafId = null;
      stage.style.setProperty(
        "--preview-rotate-x",
        (pointerY * -5).toFixed(2) + "deg",
      );
      stage.style.setProperty(
        "--preview-rotate-y",
        (pointerX * 6).toFixed(2) + "deg",
      );
      stage.style.setProperty(
        "--preview-shift-x",
        (pointerX * 8).toFixed(2) + "px",
      );
      stage.style.setProperty(
        "--preview-shift-y",
        (pointerY * 6).toFixed(2) + "px",
      );
      stage.style.setProperty(
        "--preview-pan-x",
        (pointerX * -10).toFixed(2) + "px",
      );
      stage.style.setProperty(
        "--preview-pan-y",
        (pointerY * -12).toFixed(2) + "px",
      );
    }

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    interactionZone.addEventListener("mousemove", function (event) {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
        return;
      var rect = stage.getBoundingClientRect();
      pointerX = clamp(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -1,
        1,
      );
      pointerY = clamp(
        ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        -1,
        1,
      );
      if (!rafId) rafId = window.requestAnimationFrame(paintPreviewMotion);
    });

    interactionZone.addEventListener("mouseleave", function () {
      pointerX = 0;
      pointerY = 0;
      if (!rafId) rafId = window.requestAnimationFrame(paintPreviewMotion);
    });
  }

  function initHeroParallax() {
    var stage = document.querySelector("[data-hero-parallax]");
    var floats = Array.prototype.slice.call(
      document.querySelectorAll("[data-hero-float]"),
    );
    if (
      !stage ||
      !floats.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    var rafId = null;
    var pointerX = 0;
    var pointerY = 0;

    function applyTransforms() {
      rafId = null;
      floats.forEach(function (item, index) {
        var depth = 30 + index * 8;
        var verticalDirection = index % 2 === 0 ? 1 : -1;
        var offsetX = pointerX * depth;
        var offsetY = pointerY * (6 + index * 2) * verticalDirection;
        item.style.transform =
          "translate3d(" +
          offsetX.toFixed(2) +
          "px, " +
          offsetY.toFixed(2) +
          "px, 0)";
      });
    }

    stage.addEventListener("mousemove", function (event) {
      var rect = stage.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (!rafId) rafId = window.requestAnimationFrame(applyTransforms);
    });

    stage.addEventListener("mouseleave", function () {
      pointerX = 0;
      pointerY = 0;
      if (!rafId) rafId = window.requestAnimationFrame(applyTransforms);
    });
  }

  function initPageTransition() {
    var overlay = document.getElementById("page-transition");
    if (!overlay) return;

    var isLeaving = false;

    function showTransition() {
      overlay.classList.add("is-active");
      document.documentElement.classList.add("is-transitioning");
      document.body.classList.add("is-transitioning");
    }

    function hideTransition() {
      overlay.classList.add("is-enter");
      window.setTimeout(function () {
        overlay.classList.remove("is-active");
        overlay.classList.remove("is-enter");
        document.documentElement.classList.remove("is-transitioning");
        document.body.classList.remove("is-transitioning");
      }, 820);
    }

    hideTransition();

    document
      .querySelectorAll('a[data-page-transition="services"]')
      .forEach(function (link) {
        link.addEventListener("click", function (event) {
          var href = link.getAttribute("href");
          if (!href || href.charAt(0) === "#") return;
          if (link.target === "_blank" || link.hasAttribute("download")) return;
          if (isLeaving) {
            event.preventDefault();
            return;
          }

          var url;
          try {
            url = new URL(link.href, window.location.href);
          } catch (_error) {
            return;
          }

          if (url.origin !== window.location.origin) return;
          if (
            url.pathname !== "/servicios/" &&
            url.pathname !== "/servicios/index.html"
          )
            return;

          event.preventDefault();
          isLeaving = true;
          showTransition();

          window.setTimeout(function () {
            window.location.href = url.href;
          }, 760);
        });
      });

    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        overlay.classList.remove("is-active");
        overlay.classList.remove("is-enter");
        document.documentElement.classList.remove("is-transitioning");
        document.body.classList.remove("is-transitioning");
      }
    });
  }

  function initApp() {
    function closeMobileMenu() {
      nav.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("is-menu-open");
    }

    function openMobileMenu() {
      nav.classList.add("open");
      hamburger.classList.add("open");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.classList.add("is-menu-open");
    }

    /* ---- Smooth scroll for anchor links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        var headerH = header.offsetHeight;
        var top =
          target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---- Mobile menu ---- */
    hamburger.addEventListener("click", function () {
      var isOpen = nav.classList.contains("open");
      if (isOpen) closeMobileMenu();
      else openMobileMenu();
    });

    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMobileMenu();
      }
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(event.target) || hamburger.contains(event.target))
        return;
      closeMobileMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && nav.classList.contains("open")) {
        closeMobileMenu();
      }
    });

    /* ---- Language switcher ---- */
    langButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setLanguage(button.getAttribute("data-lang"));
      });
    });

    /* ---- Footer year ---- */
    var yearEl = document.getElementById("footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document
      .querySelectorAll("[data-cookie-preferences-link]")
      .forEach(function (link) {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          resetCookieBanner();
        });
      });

    /* ---- Initial language ---- */
    var savedLang = window.localStorage.getItem("webfuengirola-language");
    setLanguage(savedLang || defaultLang);

    /* Run directly (not inside requestAnimationFrame): rAF can be throttled
       indefinitely for backgrounded/non-visible tabs, which would silently
       leave the calculator, services hover, page transitions, and portfolio
       popup uninitialized with no error. initReveal() has its own internal
       double-RAF for its specific paint-timing needs. */
    initServiceEstimator();
    initHeroParallax();
    initEditorialServices();
    initPageTransition();
    initReveal();
    initPortfolioPopup();
    initStackCards();
    scalePreviewIframes();
    window.addEventListener("resize", scalePreviewIframes, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp, { once: true });
  } else {
    initApp();
  }
})();
