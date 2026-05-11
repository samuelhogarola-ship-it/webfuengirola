/* ============================================================
   WEB FUENGIROLA — SCRIPT
============================================================ */

(function () {
  'use strict';

  var translations = {
    es: {
      title: 'Diseño Web y SEO en Fuengirola | Web Fuengirola',
      metaDescription: 'Impulsa tu negocio con nuestros servicios de diseño web, posicionamiento SEO y marketing online en Fuengirola y Mijas. ¡Pide tu presupuesto hoy!',
      ogTitle: 'Diseño Web y SEO en Fuengirola | Web Fuengirola',
      ogDescription: 'Diseño web profesional y SEO local para comercios en Fuengirola y Mijas. Desde 300€ + IVA. Publicación en 48h.',
      navHome: 'Inicio',
      navServices: 'Servicios',
      navPortfolio: 'Portfolio',
      navProcess: 'Proceso',
      navPricing: 'Precios',
      navContact: 'Contacto',
      headerCta: 'Pedir presupuesto',
      heroBadge: 'Disponible en 48 horas',
      heroTitle: 'Diseño web y SEO en Fuengirola para comercios locales',
      heroSubtitle: 'Creamos webs sencillas, claras y profesionales para que tus clientes entiendan qué haces, dónde estás y cómo contactar contigo.',
      heroPrice: 'Precio cerrado',
      heroPrimaryCta: 'Pedir presupuesto',
      heroSecondaryCta: 'Ver trabajos',
      trustHeadline: 'Una web no tiene que ser complicada.<br>Tiene que explicar bien tu negocio.',
      trust1Title: 'Claridad',
      trust1Text: 'Tus clientes entienden en segundos qué ofreces y por qué deberían elegirte a ti.',
      trust2Title: 'Presencia online',
      trust2Text: 'Aparece en Google cuando alguien busca tu servicio cerca. Sin web, no existes en el mapa digital.',
      trust3Title: 'Contacto directo',
      trust3Text: 'Un botón de WhatsApp o formulario visible convierte visitas en clientes reales, sin rodeos.',
      problemLabel: 'El problema',
      problemTitle: 'Muchos negocios locales están perdiendo clientes sin saberlo',
      problem1: 'Dependen solo de Instagram, que cambia sus algoritmos sin avisar.',
      problem2: 'Tienen una web antigua que no se ve bien en el móvil.',
      problem3: 'Usan fotos genéricas que no transmiten confianza.',
      problem4: 'No aparecen cuando alguien busca su servicio en Google.',
      problem5: 'Su web no deja claro qué hacen ni cómo contactarles.',
      problemStat1: 'de los consumidores buscan negocios en Google antes de visitar un local',
      problemStat2: 'abandona una web que tarda más de 3 segundos en cargar en móvil',
      problemStat3: 'es todo lo que necesitas para tener una web profesional publicada',
      solutionLabel: 'La solución',
      solutionTitle: 'Una web sencilla, rápida y personalizada<br>para mostrar bien tu negocio',
      solutionSub: 'Sin tecnicismos, sin complicaciones. Tú nos cuentas tu negocio y nosotros lo publicamos online de forma clara y profesional.',
      benefit1Title: 'Adaptada a móvil',
      benefit1Text: 'Se ve perfecta en cualquier pantalla. El 80% de tus clientes te buscarán desde el teléfono.',
      benefit2Title: 'Fotos reales de tu negocio',
      benefit2Text: 'Incluimos una sesión fotográfica básica del local para que la web sea tuya de verdad.',
      benefit3Title: 'Textos claros',
      benefit3Text: 'Explicamos lo que haces en un lenguaje directo que tus clientes entienden al instante.',
      benefit4Title: 'WhatsApp directo',
      benefit4Text: 'Un botón visible en cada pantalla para que tus clientes te escriban en un clic.',
      benefit5Title: 'Preparada para Google',
      benefit5Text: 'Estructura y velocidad pensadas para que Google te encuentre y te muestre a tus vecinos.',
      benefit6Title: 'Publicación en 48h',
      benefit6Text: 'Del primer contacto a la web publicada en menos de dos días. Sin esperas eternas.',
      servicesLabel: 'Servicios',
      servicesTitle: 'Todo lo que necesita tu negocio online',
      servicePopular: 'Más popular',
      vatLabel: '+ IVA',
      service1Title: 'Web Local Express',
      service1Desc: 'La web que tu negocio necesita, publicada en 48 horas. Clara, rápida y profesional.',
      service1Feature1: 'Dominio y hosting el primer año',
      service1Feature2: 'Diseño responsive y personalizado',
      service1Feature3: 'Fotos básicas del negocio',
      service1Feature4: 'Textos claros adaptados a ti',
      service1Feature5: 'Botón WhatsApp y formulario de contacto',
      service1Feature6: 'Optimización básica para Google',
      service1Feature7: '1 ronda de revisiones incluida',
      service1Cta: 'Pedir esta web',
      service2Title: 'Web Pro',
      service2Price: 'Presupuesto personalizado',
      service2Desc: 'Para negocios que necesitan más: tienda online, reservas, galería avanzada o páginas múltiples.',
      service2Feature1: 'Todo lo de Web Local Express',
      service2Feature2: 'Páginas adicionales a medida',
      service2Feature3: 'Formularios y funcionalidades especiales',
      service2Feature4: 'Integraciones con herramientas externas',
      service2Feature5: 'Mayor número de revisiones',
      service2Cta: 'Solicitar presupuesto',
      service3Title: 'Community Manager',
      service3Price: 'Desde consultar',
      service3Desc: 'Gestión básica de redes sociales para mantener tu presencia activa sin esfuerzo por tu parte.',
      service3Feature1: 'Publicaciones semanales en Instagram',
      service3Feature2: 'Contenido adaptado a tu negocio',
      service3Feature3: 'Gestión de comentarios básica',
      service3Feature4: 'Informe mensual de alcance',
      service4Title: 'SEO Local y Analítica',
      service4Price: 'Desde consultar',
      service4Desc: 'Posiciona tu negocio en búsquedas locales y entiende qué funciona con datos reales.',
      service4Feature1: 'Configuración de Google Analytics',
      service4Feature2: 'Alta en Google Search Console',
      service4Feature3: 'Optimización de Google Business Profile',
      service4Feature4: 'Informe SEO local básico',
      service4Feature5: 'Blog con artículos optimizados (opcional)',
      consultPrice: 'Consultar precio',
      portfolioTitle: 'Proyectos para negocios locales',
      portfolioSub: 'Cada web es diferente. Estas son algunas de las que hemos creado para comercios de la zona.',
      portfolio1Desc: 'Plataforma de aprendizaje de vocabulario. Diseño limpio y funcional centrado en la experiencia del usuario.',
      portfolio2Desc: 'Web de captación para coach de idiomas. Landing clara con propuesta de valor, servicios y contacto directo.',
      portfolio3Title: 'Personal Trainer Fuengirola',
      portfolio3Desc: 'Web minimalista de captación para entrenador personal. Servicios, metodología y contacto directo.',
      portfolio4Title: 'Im Kontext — Vokabellab',
      portfolio4Desc: 'Herramienta de aprendizaje de alemán en contexto. Diseño enfocado en la usabilidad y la experiencia de aprendizaje.',
      portfolio4Cta: 'Ser el siguiente',
      portfolioTagWebApp: 'Web app',
      portfolioTagEducation: 'Educación',
      portfolioTagLanding: 'Landing page',
      portfolioTagSeo: 'SEO',
      portfolioTagSport: 'Deporte',
      portfolioTagLocalSeo: 'SEO local',
      portfolioTagEditable: 'Editable',
      portfolioTagYourSector: 'Tu sector',
      viewSite: 'Ver web',
      processLabel: 'Cómo trabajamos',
      processTitle: 'De cero a publicado en 48 horas',
      processSub: 'Un proceso sencillo y sin sorpresas. Tú nos das la información, nosotros hacemos el resto.',
      process1Title: 'Reunión inicial',
      process1Desc: 'Hablamos por teléfono o en persona para entender tu negocio, tu público y lo que quieres transmitir. No hace falta que sepas nada de webs.',
      process2Title: 'Fotos y contenido',
      process2Desc: 'Hacemos una sesión fotográfica básica de tu local o negocio. También recogemos la información necesaria: servicios, precios, horarios y contacto.',
      process3Title: 'Diseño y publicación',
      process3Desc: 'Creamos tu web y la publicamos con dominio y hosting incluidos. Proceso rápido, limpio y sin complicaciones técnicas para ti.',
      process4Title: 'Revisión final',
      process4Desc: 'Te mostramos el resultado y hacemos una ronda de ajustes para que quedes completamente satisfecho antes de dar el visto bueno.',
      pricingLabel: 'Precios',
      pricingTitle: 'Un precio claro, sin letra pequeña',
      pricingMainLabel: 'Nuestro servicio principal',
      pricingMainDesc: 'Todo lo que necesita tu negocio para estar online de forma profesional.',
      pricing1: 'Dominio y hosting el primer año',
      pricing2: '1 ronda de revisiones incluida',
      pricing3: 'Diseño responsive para todos los dispositivos',
      pricing4: 'Botón de WhatsApp y formulario de contacto',
      pricing5: 'Publicación online en 48 horas',
      pricingMainCta: 'Solicitar esta web',
      pricingNote: 'Los cambios posteriores, nuevas secciones y el mantenimiento se presupuestan aparte según el trabajo necesario.',
      pricingProBudget: 'Presupuesto',
      pricingProCustom: 'personalizado',
      pricingProDesc: 'Para proyectos más complejos: tienda online, reservas, varias páginas o integraciones especiales.',
      pricingPro1: 'Todo lo de Web Local Express',
      pricingPro2: 'Funcionalidades avanzadas a medida',
      pricingPro3: 'Mayor número de revisiones',
      pricingPro4: 'Soporte prioritario',
      maintenanceLabel: 'Mantenimiento',
      maintenanceTitle: 'Mantén tu web al día sin preocupaciones',
      maintenanceSub: 'Planes orientativos para actualizar y cuidar tu web una vez publicada. Precios finales según el trabajo necesario.',
      maintenance1Title: 'Básico',
      maintenance1Desc: 'Para negocios que necesitan pocos cambios al año. Actualizaciones puntuales de textos, horarios o fotos.',
      maintenance1Feature1: 'Hasta 2 cambios pequeños al mes',
      maintenance1Feature2: 'Actualización de contenidos básicos',
      maintenance1Feature3: 'Web lista en 48h',
      maintenance2Title: 'Medio',
      maintenance2Desc: 'Para negocios activos que actualizan ofertas, añaden secciones o quieren cambios periódicos.',
      maintenance2Feature1: 'Hasta 5 cambios al mes',
      maintenance2Feature2: 'Nuevas secciones sencillas',
      maintenance2Feature3: 'Respuesta prioritaria en 24h',
      maintenance2Feature4: 'Informe de visitas mensual',
      maintenance3Title: 'Pro',
      maintenance3Desc: 'Para proyectos en crecimiento que necesitan actualizaciones constantes y soporte continuo.',
      maintenance3Feature1: 'Cambios ilimitados acordados',
      maintenance3Feature2: 'Nuevas páginas y funcionalidades',
      maintenance3Feature3: 'Respuesta en el mismo día',
      maintenance3Feature4: 'Seguimiento SEO y analítica',
      ctaTitle: '¿Tienes un negocio local<br>y necesitas una web clara?',
      ctaSub: 'Cuéntanos qué haces y te decimos cómo podemos ayudarte. Sin compromiso, sin tecnicismos.',
      ctaWhatsapp: 'Hablar por WhatsApp',
      ctaEmail: 'Enviar un email',
      footerTagline: 'Webs para comercios locales en la Costa del Sol.',
      footerLegal: 'Legal',
      footerLegalNotice: 'Aviso legal',
      footerPrivacy: 'Política de privacidad',
      footerCookies: 'Política de cookies',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'Web Fuengirola. Todos los derechos reservados.'
    },
    en: {
      title: 'Web Fuengirola · Websites for local businesses in 48h',
      metaDescription: 'We build simple, clear and professional websites for small local businesses in Fuengirola and the Costa del Sol. From €300 + VAT. Domain and hosting included for the first year.',
      ogTitle: 'Web Fuengirola · Websites for local businesses in 48h',
      ogDescription: 'We build simple, clear and professional websites so your customers understand what you do, where you are and how to contact you. From €300 + VAT.',
      navHome: 'Home',
      navServices: 'Services',
      navPortfolio: 'Portfolio',
      navProcess: 'Process',
      navPricing: 'Pricing',
      navContact: 'Contact',
      headerCta: 'Request a quote',
      heroBadge: 'Available in 48 hours',
      heroTitle: 'Websites for local businesses in 48h',
      heroSubtitle: 'We create simple, clear and professional websites so your customers instantly understand what you do, where you are and how to contact you.',
      heroPrice: 'Fixed price',
      heroPrimaryCta: 'Request a quote',
      heroSecondaryCta: 'See projects',
      trustHeadline: 'A website does not have to be complicated.<br>It has to explain your business well.',
      trust1Title: 'Clarity',
      trust1Text: 'Your customers understand in seconds what you offer and why they should choose you.',
      trust2Title: 'Online presence',
      trust2Text: 'Show up on Google when someone searches for your service nearby. Without a website, you do not exist on the digital map.',
      trust3Title: 'Direct contact',
      trust3Text: 'A visible WhatsApp button or contact form turns visits into real customers without friction.',
      problemLabel: 'The problem',
      problemTitle: 'Many local businesses are losing customers without realizing it',
      problem1: 'They rely only on Instagram, which changes its algorithm without warning.',
      problem2: 'They have an outdated website that does not work well on mobile.',
      problem3: 'They use generic photos that do not build trust.',
      problem4: 'They do not appear when someone searches for their service on Google.',
      problem5: 'Their website does not clearly explain what they do or how to contact them.',
      problemStat1: 'of consumers search Google before visiting a local business',
      problemStat2: 'leave a website that takes more than 3 seconds to load on mobile',
      problemStat3: 'is all you need to get a professional website published',
      solutionLabel: 'The solution',
      solutionTitle: 'A simple, fast and tailored website<br>that presents your business properly',
      solutionSub: 'No jargon, no complications. You tell us about your business and we publish it online in a clear and professional way.',
      benefit1Title: 'Mobile friendly',
      benefit1Text: 'It looks great on any screen. Most of your customers will find you on their phone.',
      benefit2Title: 'Real photos of your business',
      benefit2Text: 'We include a basic photo session of your premises so the website truly feels like yours.',
      benefit3Title: 'Clear copy',
      benefit3Text: 'We explain what you do in direct language your customers understand immediately.',
      benefit4Title: 'Direct WhatsApp',
      benefit4Text: 'A visible button on every screen so your customers can message you in one click.',
      benefit5Title: 'Ready for Google',
      benefit5Text: 'Structure and speed designed so Google can find you and show you to nearby customers.',
      benefit6Title: 'Published in 48h',
      benefit6Text: 'From first contact to a published website in less than two days. No endless waiting.',
      servicesLabel: 'Services',
      servicesTitle: 'Everything your business needs online',
      servicePopular: 'Most popular',
      vatLabel: '+ VAT',
      service1Title: 'Local Express Website',
      service1Desc: 'The website your business needs, published in 48 hours. Clear, fast and professional.',
      service1Feature1: 'Domain and hosting for the first year',
      service1Feature2: 'Responsive and tailored design',
      service1Feature3: 'Basic business photography',
      service1Feature4: 'Clear copy adapted to your business',
      service1Feature5: 'WhatsApp button and contact form',
      service1Feature6: 'Basic Google optimization',
      service1Feature7: '1 revision round included',
      service1Cta: 'Get this website',
      service2Title: 'Pro Website',
      service2Price: 'Custom quote',
      service2Desc: 'For businesses that need more: online store, bookings, advanced gallery or multiple pages.',
      service2Feature1: 'Everything in Local Express Website',
      service2Feature2: 'Additional custom pages',
      service2Feature3: 'Special forms and features',
      service2Feature4: 'Integrations with external tools',
      service2Feature5: 'More revision rounds',
      service2Cta: 'Request a quote',
      service3Title: 'Community Management',
      service3Price: 'From quote on request',
      service3Desc: 'Basic social media management to keep your presence active without taking your time.',
      service3Feature1: 'Weekly Instagram posts',
      service3Feature2: 'Content tailored to your business',
      service3Feature3: 'Basic comment management',
      service3Feature4: 'Monthly reach report',
      service4Title: 'Local SEO and Analytics',
      service4Price: 'From quote on request',
      service4Desc: 'Rank your business in local searches and understand what works with real data.',
      service4Feature1: 'Google Analytics setup',
      service4Feature2: 'Google Search Console setup',
      service4Feature3: 'Google Business Profile optimization',
      service4Feature4: 'Basic local SEO report',
      service4Feature5: 'Blog with optimized articles (optional)',
      consultPrice: 'Ask for pricing',
      portfolioTitle: 'Projects for local businesses',
      portfolioSub: 'Every website is different. These are some we have created for local businesses.',
      portfolio1Desc: 'Vocabulary learning platform. Clean, functional design focused on user experience.',
      portfolio2Desc: 'Lead generation website for a language coach. Clear landing page with value proposition, services and direct contact.',
      portfolio3Title: 'Personal Trainer Fuengirola',
      portfolio3Desc: 'Minimal site focused on lead generation. Trainer photos, method and direct contact.',
      portfolio4Title: 'Im Kontext — Vokabellab',
      portfolio4Desc: 'German-in-context learning tool. Design focused on usability and a smooth learning experience.',
      portfolio4Cta: 'Be the next one',
      portfolioTagWebApp: 'Web app',
      portfolioTagEducation: 'Education',
      portfolioTagLanding: 'Landing page',
      portfolioTagSeo: 'SEO',
      portfolioTagSport: 'Sport',
      portfolioTagLocalSeo: 'Local SEO',
      portfolioTagEditable: 'Editable',
      portfolioTagYourSector: 'Your sector',
      viewSite: 'View site',
      processLabel: 'How we work',
      processTitle: 'From zero to published in 48 hours',
      processSub: 'A simple process with no surprises. You give us the information and we do the rest.',
      process1Title: 'Initial meeting',
      process1Desc: 'We talk by phone or in person to understand your business, your audience and what you want to communicate. No web knowledge needed.',
      process2Title: 'Photos and content',
      process2Desc: 'We do a basic photo session of your business or premises. We also collect the needed information: services, prices, opening hours and contact details.',
      process3Title: 'Design and launch',
      process3Desc: 'We build your website and publish it with domain and hosting included. Fast, clean and hassle-free for you.',
      process4Title: 'Final review',
      process4Desc: 'We show you the result and make one round of adjustments so you are fully happy before approval.',
      pricingLabel: 'Pricing',
      pricingTitle: 'A clear price, no small print',
      pricingMainLabel: 'Our main service',
      pricingMainDesc: 'Everything your business needs to be online professionally.',
      pricing1: 'Domain and hosting for the first year',
      pricing2: '1 revision round included',
      pricing3: 'Responsive design for all devices',
      pricing4: 'WhatsApp button and contact form',
      pricing5: 'Website published in 48 hours',
      pricingMainCta: 'Request this website',
      pricingNote: 'Later changes, new sections and maintenance are quoted separately depending on the work required.',
      pricingProBudget: 'Quote',
      pricingProCustom: 'tailored',
      pricingProDesc: 'For more complex projects: online store, bookings, multiple pages or special integrations.',
      pricingPro1: 'Everything in Local Express Website',
      pricingPro2: 'Advanced custom features',
      pricingPro3: 'More revision rounds',
      pricingPro4: 'Priority support',
      maintenanceLabel: 'Maintenance',
      maintenanceTitle: 'Keep your website updated without worries',
      maintenanceSub: 'Indicative plans to update and care for your website once it is live. Final prices depend on the work required.',
      maintenance1Title: 'Basic',
      maintenance1Desc: 'For businesses that need only a few changes per year. Occasional updates to text, opening hours or photos.',
      maintenance1Feature1: 'Up to 2 small changes per month',
      maintenance1Feature2: 'Basic content updates',
      maintenance1Feature3: 'Website ready in 48h',
      maintenance2Title: 'Standard',
      maintenance2Desc: 'For active businesses that update offers, add sections or want recurring changes.',
      maintenance2Feature1: 'Up to 5 changes per month',
      maintenance2Feature2: 'Simple new sections',
      maintenance2Feature3: 'Priority reply within 24h',
      maintenance2Feature4: 'Monthly traffic report',
      maintenance3Title: 'Pro',
      maintenance3Desc: 'For growing projects that need continuous updates and ongoing support.',
      maintenance3Feature1: 'Agreed unlimited changes',
      maintenance3Feature2: 'New pages and features',
      maintenance3Feature3: 'Same-day response',
      maintenance3Feature4: 'SEO and analytics monitoring',
      ctaTitle: 'Do you run a local business<br>and need a clear website?',
      ctaSub: 'Tell us what you do and we will explain how we can help. No obligation, no jargon.',
      ctaWhatsapp: 'Chat on WhatsApp',
      ctaEmail: 'Send an email',
      footerTagline: 'Websites for local businesses on the Costa del Sol.',
      footerLegal: 'Legal',
      footerLegalNotice: 'Legal notice',
      footerPrivacy: 'Privacy policy',
      footerCookies: 'Cookie policy',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'Web Fuengirola. All rights reserved.'
    },
    de: {
      title: 'Web Fuengirola · Webseiten für lokale Unternehmen in 48h',
      metaDescription: 'Wir erstellen einfache, klare und professionelle Webseiten für kleine lokale Unternehmen in Fuengirola und an der Costa del Sol. Ab 300 € zzgl. MwSt. Domain und Hosting im ersten Jahr inklusive.',
      ogTitle: 'Web Fuengirola · Webseiten für lokale Unternehmen in 48h',
      ogDescription: 'Wir erstellen einfache, klare und professionelle Webseiten, damit Ihre Kunden sofort verstehen, was Sie tun, wo Sie sind und wie sie Sie kontaktieren können. Ab 300 € zzgl. MwSt.',
      navHome: 'Start',
      navServices: 'Leistungen',
      navPortfolio: 'Portfolio',
      navProcess: 'Ablauf',
      navPricing: 'Preise',
      navContact: 'Kontakt',
      headerCta: 'Angebot anfragen',
      heroBadge: 'In 48 Stunden verfügbar',
      heroTitle: 'Webseiten für lokale Unternehmen in 48h',
      heroSubtitle: 'Wir erstellen einfache, klare und professionelle Webseiten, damit Ihre Kunden sofort verstehen, was Sie tun, wo Sie sind und wie sie Sie kontaktieren können.',
      heroPrice: 'Festpreis',
      heroPrimaryCta: 'Angebot anfragen',
      heroSecondaryCta: 'Projekte ansehen',
      trustHeadline: 'Eine Webseite muss nicht kompliziert sein.<br>Sie muss Ihr Unternehmen gut erklären.',
      trust1Title: 'Klarheit',
      trust1Text: 'Ihre Kunden verstehen in Sekunden, was Sie anbieten und warum sie Sie wählen sollten.',
      trust2Title: 'Online-Präsenz',
      trust2Text: 'Erscheinen Sie bei Google, wenn jemand in Ihrer Nähe nach Ihrer Dienstleistung sucht. Ohne Webseite existieren Sie digital kaum.',
      trust3Title: 'Direkter Kontakt',
      trust3Text: 'Ein sichtbarer WhatsApp-Button oder ein Kontaktformular verwandelt Besuche ohne Umwege in echte Kunden.',
      problemLabel: 'Das Problem',
      problemTitle: 'Viele lokale Unternehmen verlieren Kunden, ohne es zu merken',
      problem1: 'Sie verlassen sich nur auf Instagram, dessen Algorithmus sich ohne Vorwarnung ändert.',
      problem2: 'Sie haben eine veraltete Webseite, die auf dem Handy nicht gut funktioniert.',
      problem3: 'Sie verwenden generische Fotos, die kein Vertrauen schaffen.',
      problem4: 'Sie erscheinen nicht, wenn jemand ihre Dienstleistung bei Google sucht.',
      problem5: 'Ihre Webseite erklärt nicht klar, was sie tun oder wie man sie kontaktiert.',
      problemStat1: 'der Verbraucher suchen bei Google, bevor sie ein lokales Geschäft besuchen',
      problemStat2: 'verlassen eine Webseite, die auf dem Handy länger als 3 Sekunden lädt',
      problemStat3: 'genügen, um eine professionelle Webseite zu veröffentlichen',
      solutionLabel: 'Die Lösung',
      solutionTitle: 'Eine einfache, schnelle und individuelle Webseite<br>für eine überzeugende Präsentation Ihres Unternehmens',
      solutionSub: 'Keine Fachsprache, keine Komplikationen. Sie erzählen uns von Ihrem Unternehmen und wir bringen es klar und professionell online.',
      benefit1Title: 'Für Mobilgeräte optimiert',
      benefit1Text: 'Sie sieht auf jedem Bildschirm gut aus. Die meisten Ihrer Kunden suchen Sie über das Handy.',
      benefit2Title: 'Echte Fotos Ihres Unternehmens',
      benefit2Text: 'Wir machen ein einfaches Fotoshooting Ihres Geschäfts, damit die Webseite wirklich zu Ihnen passt.',
      benefit3Title: 'Klare Texte',
      benefit3Text: 'Wir erklären, was Sie tun, in direkter Sprache, die Ihre Kunden sofort verstehen.',
      benefit4Title: 'Direktes WhatsApp',
      benefit4Text: 'Ein sichtbarer Button auf jeder Ansicht, damit Kunden Sie mit einem Klick anschreiben können.',
      benefit5Title: 'Für Google vorbereitet',
      benefit5Text: 'Struktur und Geschwindigkeit sind so angelegt, dass Google Sie findet und in Ihrer Umgebung zeigt.',
      benefit6Title: 'Veröffentlicht in 48h',
      benefit6Text: 'Vom ersten Kontakt bis zur veröffentlichten Webseite in weniger als zwei Tagen. Ohne endloses Warten.',
      servicesLabel: 'Leistungen',
      servicesTitle: 'Alles, was Ihr Unternehmen online braucht',
      servicePopular: 'Am beliebtesten',
      vatLabel: '+ MwSt.',
      service1Title: 'Local Express Website',
      service1Desc: 'Die Webseite, die Ihr Unternehmen braucht, veröffentlicht in 48 Stunden. Klar, schnell und professionell.',
      service1Feature1: 'Domain und Hosting im ersten Jahr',
      service1Feature2: 'Responsives, individuelles Design',
      service1Feature3: 'Einfache Business-Fotografie',
      service1Feature4: 'Klare Texte passend zu Ihrem Unternehmen',
      service1Feature5: 'WhatsApp-Button und Kontaktformular',
      service1Feature6: 'Grundlegende Google-Optimierung',
      service1Feature7: '1 Korrekturrunde inklusive',
      service1Cta: 'Diese Webseite wählen',
      service2Title: 'Pro Website',
      service2Price: 'Individuelles Angebot',
      service2Desc: 'Für Unternehmen mit mehr Anforderungen: Onlineshop, Buchungen, erweiterte Galerie oder mehrere Seiten.',
      service2Feature1: 'Alles aus der Local Express Website',
      service2Feature2: 'Zusätzliche Seiten nach Maß',
      service2Feature3: 'Spezielle Formulare und Funktionen',
      service2Feature4: 'Integrationen mit externen Tools',
      service2Feature5: 'Mehr Korrekturrunden',
      service2Cta: 'Angebot anfragen',
      service3Title: 'Community Management',
      service3Price: 'Preis auf Anfrage',
      service3Desc: 'Grundlegendes Social-Media-Management, damit Ihre Präsenz aktiv bleibt, ohne Ihre Zeit zu beanspruchen.',
      service3Feature1: 'Wöchentliche Instagram-Posts',
      service3Feature2: 'Inhalte passend zu Ihrem Unternehmen',
      service3Feature3: 'Grundlegende Kommentarverwaltung',
      service3Feature4: 'Monatlicher Reichweitenbericht',
      service4Title: 'Lokales SEO und Analytik',
      service4Price: 'Preis auf Anfrage',
      service4Desc: 'Positionieren Sie Ihr Unternehmen in lokalen Suchanfragen und verstehen Sie mit echten Daten, was funktioniert.',
      service4Feature1: 'Einrichtung von Google Analytics',
      service4Feature2: 'Einrichtung der Google Search Console',
      service4Feature3: 'Optimierung des Google Business Profile',
      service4Feature4: 'Einfacher lokaler SEO-Bericht',
      service4Feature5: 'Blog mit optimierten Artikeln (optional)',
      consultPrice: 'Preis anfragen',
      portfolioTitle: 'Projekte für lokale Unternehmen',
      portfolioSub: 'Jede Webseite ist anders. Hier sind einige, die wir für lokale Unternehmen erstellt haben.',
      portfolio1Desc: 'Plattform zum Vokabellernen. Klares, funktionales Design mit Fokus auf die Nutzererfahrung.',
      portfolio2Desc: 'Lead-Website für einen Sprachcoach. Klare Landingpage mit Nutzenversprechen, Leistungen und direktem Kontakt.',
      portfolio3Title: 'Personal Trainer Fuengirola',
      portfolio3Desc: 'Minimalistische Website mit Fokus auf Kundengewinnung. Fotos, Methode und direkter Kontakt.',
      portfolio4Title: 'Im Kontext — Vokabellab',
      portfolio4Desc: 'Deutschlernwerkzeug im Kontext. Design mit Fokus auf Benutzerfreundlichkeit und Lernerfahrung.',
      portfolio4Cta: 'Als Nächstes dabei sein',
      portfolioTagWebApp: 'Web-App',
      portfolioTagEducation: 'Bildung',
      portfolioTagLanding: 'Landingpage',
      portfolioTagSeo: 'SEO',
      portfolioTagSport: 'Sport',
      portfolioTagLocalSeo: 'Lokales SEO',
      portfolioTagEditable: 'Bearbeitbar',
      portfolioTagYourSector: 'Ihre Branche',
      viewSite: 'Webseite ansehen',
      processLabel: 'So arbeiten wir',
      processTitle: 'Von null zur Veröffentlichung in 48 Stunden',
      processSub: 'Ein einfacher Ablauf ohne Überraschungen. Sie geben uns die Informationen, wir kümmern uns um den Rest.',
      process1Title: 'Erstgespräch',
      process1Desc: 'Wir sprechen telefonisch oder persönlich, um Ihr Unternehmen, Ihre Zielgruppe und Ihre Botschaft zu verstehen. Sie müssen nichts über Webseiten wissen.',
      process2Title: 'Fotos und Inhalte',
      process2Desc: 'Wir machen ein einfaches Fotoshooting Ihres Geschäfts oder Standorts. Außerdem sammeln wir alle nötigen Informationen: Leistungen, Preise, Öffnungszeiten und Kontaktdaten.',
      process3Title: 'Design und Veröffentlichung',
      process3Desc: 'Wir erstellen Ihre Webseite und veröffentlichen sie inklusive Domain und Hosting. Schnell, sauber und technisch unkompliziert für Sie.',
      process4Title: 'Abschließende Prüfung',
      process4Desc: 'Wir zeigen Ihnen das Ergebnis und nehmen eine Korrekturrunde vor, damit Sie vor der Freigabe vollständig zufrieden sind.',
      pricingLabel: 'Preise',
      pricingTitle: 'Ein klarer Preis ohne Kleingedrucktes',
      pricingMainLabel: 'Unsere Hauptleistung',
      pricingMainDesc: 'Alles, was Ihr Unternehmen braucht, um professionell online zu sein.',
      pricing1: 'Domain und Hosting im ersten Jahr',
      pricing2: '1 Korrekturrunde inklusive',
      pricing3: 'Responsives Design für alle Geräte',
      pricing4: 'WhatsApp-Button und Kontaktformular',
      pricing5: 'Online-Veröffentlichung in 48 Stunden',
      pricingMainCta: 'Diese Webseite anfragen',
      pricingNote: 'Spätere Änderungen, neue Bereiche und Wartung werden je nach Aufwand separat kalkuliert.',
      pricingProBudget: 'Angebot',
      pricingProCustom: 'individuell',
      pricingProDesc: 'Für komplexere Projekte: Onlineshop, Buchungen, mehrere Seiten oder spezielle Integrationen.',
      pricingPro1: 'Alles aus der Local Express Website',
      pricingPro2: 'Erweiterte Funktionen nach Maß',
      pricingPro3: 'Mehr Korrekturrunden',
      pricingPro4: 'Priorisierter Support',
      maintenanceLabel: 'Wartung',
      maintenanceTitle: 'Halten Sie Ihre Webseite ohne Sorgen aktuell',
      maintenanceSub: 'Unverbindliche Pakete zur Pflege Ihrer Webseite nach der Veröffentlichung. Endpreise je nach Aufwand.',
      maintenance1Title: 'Basis',
      maintenance1Desc: 'Für Unternehmen, die nur wenige Änderungen pro Jahr brauchen. Gelegentliche Updates von Texten, Öffnungszeiten oder Fotos.',
      maintenance1Feature1: 'Bis zu 2 kleine Änderungen pro Monat',
      maintenance1Feature2: 'Aktualisierung grundlegender Inhalte',
      maintenance1Feature3: 'Webseite in 48h fertig',
      maintenance2Title: 'Mittel',
      maintenance2Desc: 'Für aktive Unternehmen, die Angebote aktualisieren, Bereiche ergänzen oder regelmäßige Änderungen wünschen.',
      maintenance2Feature1: 'Bis zu 5 Änderungen pro Monat',
      maintenance2Feature2: 'Einfache neue Bereiche',
      maintenance2Feature3: 'Priorisierte Antwort innerhalb von 24h',
      maintenance2Feature4: 'Monatlicher Besuchsbericht',
      maintenance3Title: 'Pro',
      maintenance3Desc: 'Für wachsende Projekte, die laufende Updates und dauerhafte Unterstützung brauchen.',
      maintenance3Feature1: 'Vereinbarte unbegrenzte Änderungen',
      maintenance3Feature2: 'Neue Seiten und Funktionen',
      maintenance3Feature3: 'Antwort am selben Tag',
      maintenance3Feature4: 'SEO- und Analyse-Monitoring',
      ctaTitle: 'Haben Sie ein lokales Unternehmen<br>und brauchen eine klare Webseite?',
      ctaSub: 'Erzählen Sie uns, was Sie tun, und wir sagen Ihnen, wie wir helfen können. Unverbindlich und ohne Fachsprache.',
      ctaWhatsapp: 'Per WhatsApp schreiben',
      ctaEmail: 'E-Mail senden',
      footerTagline: 'Webseiten für lokale Unternehmen an der Costa del Sol.',
      footerLegal: 'Rechtliches',
      footerLegalNotice: 'Impressum',
      footerPrivacy: 'Datenschutz',
      footerCookies: 'Cookie-Richtlinie',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'Web Fuengirola. Alle Rechte vorbehalten.'
    },
    fi: {
      title: 'Web Fuengirola · Verkkosivut paikallisille yrityksille 48 tunnissa',
      metaDescription: 'Rakennamme yksinkertaisia, selkeitä ja ammattimaisia verkkosivuja pienille paikallisille yrityksille Fuengirolassa ja Costa del Solilla. Alkaen 300 € + ALV. Domain ja hosting sisältyvät ensimmäiseksi vuodeksi.',
      ogTitle: 'Web Fuengirola · Verkkosivut paikallisille yrityksille 48 tunnissa',
      ogDescription: 'Rakennamme yksinkertaisia, selkeitä ja ammattimaisia verkkosivuja, jotta asiakkaasi ymmärtävät heti mitä teet, missä olet ja miten sinuun saa yhteyden. Alkaen 300 € + ALV.',
      navHome: 'Etusivu',
      navServices: 'Palvelut',
      navPortfolio: 'Portfolio',
      navProcess: 'Prosessi',
      navPricing: 'Hinnat',
      navContact: 'Yhteys',
      headerCta: 'Pyydä tarjous',
      heroBadge: 'Valmis 48 tunnissa',
      heroTitle: 'Verkkosivut paikallisille yrityksille 48 tunnissa',
      heroSubtitle: 'Teemme yksinkertaiset, selkeät ja ammattimaiset verkkosivut, jotta asiakkaasi ymmärtävät heti mitä teet, missä olet ja miten sinuun saa yhteyden.',
      heroPrice: 'Kiinteä hinta',
      heroPrimaryCta: 'Pyydä tarjous',
      heroSecondaryCta: 'Katso työt',
      trustHeadline: 'Verkkosivujen ei tarvitse olla monimutkaiset.<br>Niiden pitää selittää yrityksesi hyvin.',
      trust1Title: 'Selkeys',
      trust1Text: 'Asiakkaasi ymmärtävät sekunneissa, mitä tarjoat ja miksi heidän kannattaa valita juuri sinut.',
      trust2Title: 'Näkyvyys verkossa',
      trust2Text: 'Näy Googlessa, kun joku etsii palveluasi lähialueella. Ilman verkkosivuja et käytännössä ole olemassa digitaalisesti.',
      trust3Title: 'Suora yhteys',
      trust3Text: 'Näkyvä WhatsApp-painike tai yhteydenottolomake muuttaa kävijät oikeiksi asiakkaiksi ilman kitkaa.',
      problemLabel: 'Ongelma',
      problemTitle: 'Monet paikalliset yritykset menettävät asiakkaita huomaamattaan',
      problem1: 'Ne ovat vain Instagramin varassa, vaikka algoritmi muuttuu ilman varoitusta.',
      problem2: 'Niillä on vanha verkkosivusto, joka ei toimi hyvin mobiilissa.',
      problem3: 'Ne käyttävät geneerisiä kuvia, jotka eivät herätä luottamusta.',
      problem4: 'Niitä ei löydy, kun joku hakee palvelua Googlesta.',
      problem5: 'Verkkosivu ei kerro selvästi mitä yritys tekee tai miten siihen saa yhteyden.',
      problemStat1: 'kuluttajista hakee Googlesta ennen paikalliseen liikkeeseen menoa',
      problemStat2: 'poistuu sivulta, jos mobiilissa lataus kestää yli 3 sekuntia',
      problemStat3: 'riittää ammattimaisen verkkosivun julkaisuun',
      solutionLabel: 'Ratkaisu',
      solutionTitle: 'Yksinkertainen, nopea ja räätälöity verkkosivu<br>joka esittelee yrityksesi kunnolla',
      solutionSub: 'Ei jargonia eikä säätöä. Kerrot meille yrityksestäsi ja me julkaisemme sen verkkoon selkeästi ja ammattimaisesti.',
      benefit1Title: 'Mobiiliystävällinen',
      benefit1Text: 'Näyttää hyvältä kaikilla näytöillä. Suurin osa asiakkaistasi etsii sinua puhelimella.',
      benefit2Title: 'Aidot kuvat yrityksestäsi',
      benefit2Text: 'Sisällytämme peruskuvauksen liiketilasta, jotta sivusto tuntuu aidosti omaltasi.',
      benefit3Title: 'Selkeät tekstit',
      benefit3Text: 'Kerrotaan mitä teet suoralla kielellä, jonka asiakkaasi ymmärtävät heti.',
      benefit4Title: 'WhatsApp suoraan',
      benefit4Text: 'Näkyvä painike jokaisella näytöllä, jotta asiakkaat voivat viestittää yhdellä klikkauksella.',
      benefit5Title: 'Valmis Googlea varten',
      benefit5Text: 'Rakenne ja nopeus on suunniteltu niin, että Google löytää sinut ja näyttää sinut lähialueen ihmisille.',
      benefit6Title: 'Julkaisu 48 tunnissa',
      benefit6Text: 'Ensikontaktista julkaistuun verkkosivuun alle kahdessa päivässä. Ei loputonta odottelua.',
      servicesLabel: 'Palvelut',
      servicesTitle: 'Kaikki mitä yrityksesi tarvitsee verkossa',
      servicePopular: 'Suosituin',
      vatLabel: '+ ALV',
      service1Title: 'Local Express -verkkosivu',
      service1Desc: 'Yrityksesi tarvitsema verkkosivu julkaistuna 48 tunnissa. Selkeä, nopea ja ammattimainen.',
      service1Feature1: 'Domain ja hosting ensimmäiseksi vuodeksi',
      service1Feature2: 'Responsiivinen ja räätälöity design',
      service1Feature3: 'Perusyrityskuvaus',
      service1Feature4: 'Selkeät tekstit yrityksellesi',
      service1Feature5: 'WhatsApp-painike ja yhteydenottolomake',
      service1Feature6: 'Perusoptimointi Googlea varten',
      service1Feature7: '1 kierros muutoksia sisältyy',
      service1Cta: 'Haluan tämän sivun',
      service2Title: 'Pro-verkkosivu',
      service2Price: 'Räätälöity tarjous',
      service2Desc: 'Yrityksille, jotka tarvitsevat enemmän: verkkokauppa, varaukset, laajempi galleria tai useita sivuja.',
      service2Feature1: 'Kaikki Local Express -paketista',
      service2Feature2: 'Lisäsivuja tarpeen mukaan',
      service2Feature3: 'Erikoislomakkeet ja toiminnot',
      service2Feature4: 'Integraatiot ulkoisiin työkaluihin',
      service2Feature5: 'Useampia tarkistuskierroksia',
      service2Cta: 'Pyydä tarjous',
      service3Title: 'Community Manager',
      service3Price: 'Hinta pyynnöstä',
      service3Desc: 'Perustason somehallinta, jotta näkyvyytesi pysyy aktiivisena ilman että se vie aikaasi.',
      service3Feature1: 'Viikoittaiset Instagram-julkaisut',
      service3Feature2: 'Yrityksellesi sopiva sisältö',
      service3Feature3: 'Peruskommenttien hallinta',
      service3Feature4: 'Kuukausittainen tavoittavuusraportti',
      service4Title: 'Paikallinen SEO ja analytiikka',
      service4Price: 'Hinta pyynnöstä',
      service4Desc: 'Nosta yrityksesi paikallisiin hakuihin ja ymmärrä datan avulla mikä toimii.',
      service4Feature1: 'Google Analytics -asennus',
      service4Feature2: 'Google Search Console -asennus',
      service4Feature3: 'Google Business Profile -optimointi',
      service4Feature4: 'Perusraportti paikallisesta SEO:sta',
      service4Feature5: 'Blogi optimoiduilla artikkeleilla (valinnainen)',
      consultPrice: 'Kysy hinta',
      portfolioTitle: 'Projekteja paikallisille yrityksille',
      portfolioSub: 'Jokainen verkkosivu on erilainen. Tässä on joitakin sivuja, joita olemme tehneet paikallisille yrityksille.',
      portfolio1Desc: 'Sanaston oppimisalusta. Selkeä ja toimiva design, jossa käyttäjäkokemus on keskiössä.',
      portfolio2Desc: 'Liidien keräämiseen suunnattu sivu kielicoachille. Selkeä landing page, palvelut ja suora yhteys.',
      portfolio3Title: 'Personal Trainer Fuengirola',
      portfolio3Desc: 'Minimalistinen sivusto asiakashankintaan. Kuvat valmentajasta, metodologia ja suora yhteys.',
      portfolio4Title: 'Im Kontext — Vokabellab',
      portfolio4Desc: 'Saksaa kontekstissa -oppimistyökalu. Suunnittelu keskittyy käytettävyyteen ja oppimiskokemukseen.',
      portfolio4Cta: 'Ole seuraava',
      portfolioTagWebApp: 'Web-sovellus',
      portfolioTagEducation: 'Koulutus',
      portfolioTagLanding: 'Landing page',
      portfolioTagSeo: 'SEO',
      portfolioTagSport: 'Urheilu',
      portfolioTagLocalSeo: 'Paikallinen SEO',
      portfolioTagEditable: 'Muokattava',
      portfolioTagYourSector: 'Oma alasi',
      viewSite: 'Avaa sivu',
      processLabel: 'Näin työskentelemme',
      processTitle: 'Nollasta julkaisuun 48 tunnissa',
      processSub: 'Yksinkertainen prosessi ilman yllätyksiä. Sinä annat tiedot, me hoidamme loput.',
      process1Title: 'Aloituspalaveri',
      process1Desc: 'Keskustelemme puhelimessa tai paikan päällä ymmärtääksemme yrityksesi, yleisösi ja viestisi. Sinun ei tarvitse tietää verkkosivuista mitään.',
      process2Title: 'Kuvat ja sisältö',
      process2Desc: 'Teemme peruskuvauksen yrityksestäsi tai liiketilastasi. Keräämme myös tarvittavat tiedot: palvelut, hinnat, aukioloajat ja yhteystiedot.',
      process3Title: 'Suunnittelu ja julkaisu',
      process3Desc: 'Rakennamme verkkosivusi ja julkaisemme sen domainin ja hostingin kanssa. Nopea, siisti ja teknisesti vaivaton sinulle.',
      process4Title: 'Lopullinen tarkistus',
      process4Desc: 'Näytämme lopputuloksen ja teemme yhden korjauskierroksen, jotta olet täysin tyytyväinen ennen hyväksyntää.',
      pricingLabel: 'Hinnat',
      pricingTitle: 'Selkeä hinta ilman piiloehtoja',
      pricingMainLabel: 'Pääpalvelumme',
      pricingMainDesc: 'Kaikki mitä yrityksesi tarvitsee ammattimaiseen verkkonäkyvyyteen.',
      pricing1: 'Domain ja hosting ensimmäiseksi vuodeksi',
      pricing2: '1 tarkistuskierros sisältyy',
      pricing3: 'Responsiivinen design kaikille laitteille',
      pricing4: 'WhatsApp-painike ja yhteydenottolomake',
      pricing5: 'Sivusto julkaistaan 48 tunnissa',
      pricingMainCta: 'Pyydä tämä sivu',
      pricingNote: 'Myöhemmät muutokset, uudet osiot ja ylläpito hinnoitellaan erikseen työn määrän mukaan.',
      pricingProBudget: 'Tarjous',
      pricingProCustom: 'räätälöity',
      pricingProDesc: 'Monimutkaisempiin projekteihin: verkkokauppa, varaukset, useita sivuja tai erikoisintegraatiot.',
      pricingPro1: 'Kaikki Local Express -paketista',
      pricingPro2: 'Edistyneet räätälöidyt toiminnot',
      pricingPro3: 'Useampia tarkistuskierroksia',
      pricingPro4: 'Priorisoitu tuki',
      maintenanceLabel: 'Ylläpito',
      maintenanceTitle: 'Pidä verkkosivusi ajan tasalla ilman huolia',
      maintenanceSub: 'Suuntaa-antavat paketit sivuston päivittämiseen ja ylläpitoon julkaisun jälkeen. Lopullinen hinta riippuu työn määrästä.',
      maintenance1Title: 'Perus',
      maintenance1Desc: 'Yrityksille, jotka tarvitsevat vain vähän muutoksia vuodessa. Satunnaisia päivityksiä teksteihin, aukioloaikoihin tai kuviin.',
      maintenance1Feature1: 'Enintään 2 pientä muutosta kuukaudessa',
      maintenance1Feature2: 'Perussisällön päivitykset',
      maintenance1Feature3: 'Sivu valmis 48 tunnissa',
      maintenance2Title: 'Keski',
      maintenance2Desc: 'Aktiivisille yrityksille, jotka päivittävät tarjouksia, lisäävät osioita tai haluavat säännöllisiä muutoksia.',
      maintenance2Feature1: 'Enintään 5 muutosta kuukaudessa',
      maintenance2Feature2: 'Yksinkertaisia uusia osioita',
      maintenance2Feature3: 'Priorisoitu vastaus 24 tunnissa',
      maintenance2Feature4: 'Kuukausittainen kävijäraportti',
      maintenance3Title: 'Pro',
      maintenance3Desc: 'Kasvaville projekteille, jotka tarvitsevat jatkuvia päivityksiä ja tukea.',
      maintenance3Feature1: 'Sovitut rajattomat muutokset',
      maintenance3Feature2: 'Uusia sivuja ja toimintoja',
      maintenance3Feature3: 'Vastaus saman päivän aikana',
      maintenance3Feature4: 'SEO- ja analytiikkaseuranta',
      ctaTitle: 'Onko sinulla paikallinen yritys<br>ja tarvitset selkeät verkkosivut?',
      ctaSub: 'Kerro mitä teet, niin kerromme miten voimme auttaa. Ei sitoumuksia eikä teknistä jargonia.',
      ctaWhatsapp: 'Keskustele WhatsAppissa',
      ctaEmail: 'Lähetä sähköposti',
      footerTagline: 'Verkkosivut paikallisille yrityksille Costa del Solilla.',
      footerLegal: 'Lakiasiat',
      footerLegalNotice: 'Lakiteksti',
      footerPrivacy: 'Tietosuojakäytäntö',
      footerCookies: 'Evästekäytäntö',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'Web Fuengirola. Kaikki oikeudet pidätetään.'
    }
  };

  var defaultLang = 'es';
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var langButtons = document.querySelectorAll('.lang-switcher__btn');

  function applyTranslations(lang) {
    var dictionary = translations[lang] || translations[defaultLang];

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-html');
      if (dictionary[key]) {
        element.innerHTML = dictionary[key];
      }
    });

    document.querySelectorAll('[data-i18n-meta]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-meta');
      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    document.querySelectorAll('[data-i18n-meta-content]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-meta-content');
      if (dictionary[key]) {
        element.setAttribute('content', dictionary[key]);
      }
    });

    langButtons.forEach(function (button) {
      var isActive = button.getAttribute('data-lang') === lang;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setLanguage(lang) {
    var nextLang = translations[lang] ? lang : defaultLang;
    applyTranslations(nextLang);
    window.localStorage.setItem('webfuengirola-language', nextLang);
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var headerH = header.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- Header scroll class ---- */
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Language switcher ---- */
  langButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.getAttribute('data-lang'));
    });
  });

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Fade-in on scroll ---- */
  var fadeEls = document.querySelectorAll(
    '.trust__block, .benefit__item, .service-card, .portfolio-card, .process__step, .maintenance__plan, .problem__stat-card, .pricing__card, .blog-teaser__cta-block'
  );

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    var ease = 'cubic-bezier(.4, 0, .2, 1)';
    fadeEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      var delay = (i % 4) * 0.08;
      el.style.transition = 'opacity .55s ' + ease + ' ' + delay + 's, transform .55s ' + ease + ' ' + delay + 's';
      observer.observe(el);
    });
  }

  /* ---- iframe preview scaling ---- */
  function scalePreviewIframes() {
    document.querySelectorAll('.portfolio-card__preview').forEach(function (wrapper) {
      var iframe = wrapper.querySelector('iframe');
      if (!iframe) return;
      var scale = wrapper.offsetWidth / 1280;
      iframe.style.transform = 'scale(' + scale + ')';
      wrapper.style.height = Math.round(wrapper.offsetWidth * 0.75) + 'px';
    });
  }
  scalePreviewIframes();
  window.addEventListener('resize', scalePreviewIframes, { passive: true });

  /* ---- Visible helper ---- */
  var style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);

  /* ---- Initial language ---- */
  var savedLang = window.localStorage.getItem('webfuengirola-language');
  setLanguage(savedLang || defaultLang);
})();
