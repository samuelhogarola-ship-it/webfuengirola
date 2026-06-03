/* ============================================================
   WEB FUENGIROLA — SCRIPT
============================================================ */

(function () {
  'use strict';

  var translations = {
    es: {
      title: 'Diseño Web en Fuengirola | Páginas Web para Negocios Locales',
      metaDescription: 'Creamos páginas web en Fuengirola para negocios locales: landing pages, webs corporativas y automatización con diseño claro, SEO técnico y contacto directo.',
      ogTitle: 'Diseño Web en Fuengirola | Web Fuengirola',
      ogDescription: 'Páginas web para negocios locales en Fuengirola: landing pages, webs corporativas y automatización con estructura clara y enfoque SEO.',
      navHome: 'Inicio',
      navServices: 'Servicios',
      navPortfolio: 'Portfolio',
      navProcess: 'Proceso',
      navPricing: 'Precios',
      navContact: 'Contacto',
      headerCta: 'Pedir presupuesto',
      heroBadge: 'Disponible en 48 horas',
      heroTitle: 'La web que tu negocio se merece.',
      heroSubtitle: 'Webs rápidas y profesionales con todo lo que necesitas para llegar a más clientes.',
      heroPrice: 'Precio cerrado',
      heroPrimaryCta: 'Pedir presupuesto',
      heroSecondaryCta: 'Ver trabajos',
      imacTagTime: 'para hacer<br>tu web realidad',
      imacTagPrice: 'Precio cerrado',
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
      servicesTitle: 'Oferta clara para negocio local y desarrollo a medida',
      servicePopular: 'Más popular',
      vatLabel: '+ IVA',
      service1Title: 'Landing Web Local',
      service1Desc: 'Una sola página, estructura cerrada y mensaje claro. La forma más directa de salir online con buena presencia.',
      service1Feature1: 'Landing corporativa de 1 página',
      service1Feature2: 'Responsive y copy orientado a conversión',
      service1Feature3: 'WhatsApp, formulario y SEO básico',
      service1Feature4: 'Sin lógica avanzada ni integraciones',
      service1Feature5: 'Entrega rápida con alcance definido',
      service1Feature6: 'Ideal para negocios locales y autónomos',
      service1Feature7: '1 ronda de revisiones incluida',
      service1Cta: 'Pedir esta web',
      service2Title: 'Web Corporativa / Web Pro',
      service2Price: 'Desde 900€ + IVA',
      service2Desc: 'Cuando una empresa necesita varias páginas, narrativa más sólida, blog, SEO escalable o integraciones reales.',
      service2Feature1: 'Arquitectura de contenidos más completa',
      service2Feature2: 'Páginas adicionales y mejor jerarquía SEO',
      service2Feature3: 'Blog, formularios avanzados o reservas',
      service2Feature4: 'Integraciones y alcance editorial superior',
      service2Feature5: 'Presupuesto adaptado a negocio y objetivos',
      service2Cta: 'Solicitar presupuesto',
      service3Title: 'React, chatbots y automatización',
      service3Price: 'Desde 600€ + IVA',
      service3Desc: 'Bloques técnicos para empresas que ya no necesitan solo una web, sino interacción, eficiencia y captación automatizada.',
      service3Feature1: 'Páginas dinámicas con React desde 1.400€',
      service3Feature2: 'Chatbots de soporte o captación desde 600€',
      service3Feature3: 'Automatización de tareas y flujos internos',
      service3Feature4: 'Setup modular según alcance real',
      service4Title: 'Apps y herramientas a medida',
      service4Price: 'Desde 1.800€ + IVA',
      service4Desc: 'Web apps, proyectos con Node, apps Android y herramientas internas para operaciones, reservas o gestión de clientes.',
      service4Feature1: 'Web apps y paneles internos',
      service4Feature2: 'Backends Node y lógica de negocio',
      service4Feature3: 'Apps Android orientadas a operaciones',
      service4Feature4: 'Optimización de flujos de trabajo',
      service4Feature5: 'Presupuesto premium con alcance cerrado',
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
      pricingTitle: 'Servicios a medida, paga por lo que necesitas',
      pricingMainLabel: 'Producto de entrada',
      pricingMainDesc: 'Una landing corporativa de una sola página para negocios que necesitan presencia clara, rápida y profesional.',
      pricing1: '1 sola página con estructura cerrada',
      pricing2: '1 ronda de revisiones incluida',
      pricing3: 'Responsive, SEO básico, WhatsApp y formulario',
      pricing4: 'Sin panel, sin login, sin reservas ni integraciones',
      pricing5: 'Publicación online en 48 horas',
      pricingMainCta: 'Solicitar esta web',
      pricingNote: 'No incluye multiidioma real, blog, base de datos, React, Node, automatizaciones ni animaciones complejas. Eso pertenece a la línea avanzada.',
      pricingProBudget: 'Desde 900€',
      pricingProCustom: 'según alcance',
      pricingProDesc: 'Para proyectos con lógica, automatización o crecimiento real: webs corporativas, React, Node, chatbots, apps y herramientas internas.',
      pricingPro1: 'Web corporativa / Web Pro desde 900€',
      pricingPro2: 'Páginas dinámicas con React desde 1.400€',
      pricingPro3: 'Chatbots y automatización desde 600€',
      pricingPro4: 'Web apps, Node y herramientas internas desde 1.800€',
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
      footerTagline: 'Webs para negocios locales en la Costa del Sol.',
      footerLegal: 'Legal',
      footerLegalNotice: 'Aviso legal',
      footerPrivacy: 'Política de privacidad',
      footerCookies: 'Política de cookies',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'WF Studio — Diseño web en Fuengirola. Todos los derechos reservados.'
    },
    en: {
      title: 'Premium Web Design in Fuengirola | Websites, Apps and Automation',
      metaDescription: 'Landing pages from €300 + VAT and premium custom development in Fuengirola: corporate websites, React, Node, chatbots, web apps and workflow automation.',
      ogTitle: 'Web Fuengirola · Premium websites, apps and automation',
      ogDescription: 'Clear entry product from €300 + VAT and advanced custom solutions in React, Node, chatbots, Android apps and workflow automation.',
      navHome: 'Home',
      navServices: 'Services',
      navPortfolio: 'Portfolio',
      navProcess: 'Process',
      navPricing: 'Pricing',
      navContact: 'Contact',
      headerCta: 'Request a quote',
      heroBadge: 'Available in 48 hours',
      heroTitle: 'The website your business deserves.',
      heroSubtitle: 'Fast, professional websites with everything you need to reach more customers.',
      heroPrice: 'Fixed price',
      heroPrimaryCta: 'Request a quote',
      heroSecondaryCta: 'See projects',
      imacTagTime: 'to get your<br>website live',
      imacTagPrice: 'Fixed price',
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
      servicesTitle: 'A clear offer for local businesses and custom development',
      servicePopular: 'Most popular',
      vatLabel: '+ VAT',
      service1Title: 'Local Landing Page',
      service1Desc: 'One page, fixed structure and a clear message. The most direct way to get online with a solid presence.',
      service1Feature1: '1-page corporate landing',
      service1Feature2: 'Responsive design and conversion-focused copy',
      service1Feature3: 'WhatsApp, contact form and basic SEO',
      service1Feature4: 'No advanced logic or integrations',
      service1Feature5: 'Fast delivery with a defined scope',
      service1Feature6: 'Ideal for local businesses and solo professionals',
      service1Feature7: '1 revision round included',
      service1Cta: 'Get this website',
      service2Title: 'Corporate / Pro Website',
      service2Price: 'From €900 + VAT',
      service2Desc: 'For companies that need multiple pages, a stronger narrative, a blog, scalable SEO or real integrations.',
      service2Feature1: 'More complete content architecture',
      service2Feature2: 'Extra pages and improved SEO hierarchy',
      service2Feature3: 'Blog, advanced forms or bookings',
      service2Feature4: 'Integrations and broader editorial scope',
      service2Feature5: 'Budget tailored to business goals',
      service2Cta: 'Request a quote',
      service3Title: 'React, chatbots and automation',
      service3Price: 'From €600 + VAT',
      service3Desc: 'Technical building blocks for companies that no longer need just a website, but interaction, efficiency and automated lead capture.',
      service3Feature1: 'Dynamic React pages from €1,400',
      service3Feature2: 'Support or lead-gen chatbots from €600',
      service3Feature3: 'Task and workflow automation',
      service3Feature4: 'Modular setup based on real scope',
      service4Title: 'Custom apps and tools',
      service4Price: 'From €1,800 + VAT',
      service4Desc: 'Web apps, Node projects, Android apps and internal tools for operations, bookings or customer management.',
      service4Feature1: 'Web apps and internal dashboards',
      service4Feature2: 'Node backends and business logic',
      service4Feature3: 'Android apps for operations',
      service4Feature4: 'Workflow optimization',
      service4Feature5: 'Premium quote with fixed scope',
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
      pricingTitle: 'Tailored services, pay for what you need',
      pricingMainLabel: 'Entry product',
      pricingMainDesc: 'A one-page corporate landing for businesses that need a clear, fast and professional online presence.',
      pricing1: 'One page with a fixed structure',
      pricing2: '1 revision round included',
      pricing3: 'Responsive, basic SEO, WhatsApp and contact form',
      pricing4: 'No admin panel, login, bookings or integrations',
      pricing5: 'Website published in 48 hours',
      pricingMainCta: 'Request this website',
      pricingNote: 'Does not include real multilingual support, blog, database, React, Node, automations or complex animations. That belongs to the advanced line.',
      pricingProBudget: 'From €900',
      pricingProCustom: 'depending on scope',
      pricingProDesc: 'For projects with logic, automation or real growth needs: corporate websites, React, Node, chatbots, apps and internal tools.',
      pricingPro1: 'Corporate / Pro website from €900',
      pricingPro2: 'Dynamic React pages from €1,400',
      pricingPro3: 'Chatbots and automation from €600',
      pricingPro4: 'Web apps, Node and internal tools from €1,800',
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
      footerTagline: 'Landing pages, apps and automation for businesses on the Costa del Sol.',
      footerLegal: 'Legal',
      footerLegalNotice: 'Legal notice',
      footerPrivacy: 'Privacy policy',
      footerCookies: 'Cookie policy',
      footerWhatsapp: 'WhatsApp',
      footerRights: 'WF Studio — Web design in Fuengirola. All rights reserved.'
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
      heroTitle: 'Die Website, die Ihr Unternehmen verdient.',
      heroSubtitle: 'Schnelle, professionelle Websites mit allem, was Sie brauchen, um mehr Kunden zu erreichen.',
      heroPrice: 'Festpreis',
      heroPrimaryCta: 'Angebot anfragen',
      heroSecondaryCta: 'Projekte ansehen',
      imacTagTime: 'bis zur<br>fertigen Website',
      imacTagPrice: 'Festpreis',
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
      service3Title: 'React, Chatbots und Automatisierung',
      service3Price: 'Ab 600 € + MwSt.',
      service3Desc: 'Technische Bausteine für Unternehmen, die mehr als nur eine Webseite brauchen: Interaktion, Effizienz und automatisierte Leadgewinnung.',
      service3Feature1: 'Dynamische React-Seiten ab 1.400 €',
      service3Feature2: 'Support- oder Lead-Chatbots ab 600 €',
      service3Feature3: 'Automatisierung von Aufgaben und Abläufen',
      service3Feature4: 'Modularer Setup je nach Umfang',
      service4Title: 'Apps und individuelle Tools',
      service4Price: 'Ab 1.800 € + MwSt.',
      service4Desc: 'Web-Apps, Node-Projekte, Android-Apps und interne Tools für Abläufe, Reservierungen oder Kundenverwaltung.',
      service4Feature1: 'Web-Apps und interne Dashboards',
      service4Feature2: 'Node-Backends und Geschäftslogik',
      service4Feature3: 'Android-Apps für operative Prozesse',
      service4Feature4: 'Optimierung von Arbeitsabläufen',
      service4Feature5: 'Premium-Angebot mit klarem Umfang',
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
      footerRights: 'WF Studio — Webdesign in Fuengirola. Alle Rechte vorbehalten.'
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
      heroTitle: 'Verkkosivusto, jonka yrityksesi ansaitsee.',
      heroSubtitle: 'Nopeat, ammattimaiset verkkosivut kaikella mitä tarvitset tavoittaaksesi enemmän asiakkaita.',
      heroPrice: 'Kiinteä hinta',
      heroPrimaryCta: 'Pyydä tarjous',
      heroSecondaryCta: 'Katso työt',
      imacTagTime: 'verkkosivustosi<br>valmiiksi',
      imacTagPrice: 'Kiinteä hinta',
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
      service3Title: 'React, chatbotit ja automaatio',
      service3Price: 'Alkaen 600 € + ALV',
      service3Desc: 'Tekniset ratkaisut yrityksille, jotka tarvitsevat enemmän kuin vain verkkosivun: vuorovaikutusta, tehokkuutta ja automatisoitua liidien keruuta.',
      service3Feature1: 'Dynaamiset React-sivut alkaen 1.400 €',
      service3Feature2: 'Tuki- tai liidichatbotit alkaen 600 €',
      service3Feature3: 'Tehtävien ja työnkulkujen automaatio',
      service3Feature4: 'Modulaarinen toteutus tarpeen mukaan',
      service4Title: 'Sovellukset ja räätälöidyt työkalut',
      service4Price: 'Alkaen 1.800 € + ALV',
      service4Desc: 'Web-sovellukset, Node-projektit, Android-sovellukset ja sisäiset työkalut operaatioihin, varauksiin tai asiakashallintaan.',
      service4Feature1: 'Web-sovellukset ja sisäiset dashboardit',
      service4Feature2: 'Node-taustajärjestelmät ja liiketoimintalogiikka',
      service4Feature3: 'Android-sovellukset operatiiviseen käyttöön',
      service4Feature4: 'Työnkulkujen optimointi',
      service4Feature5: 'Premium-tarjous selkeällä laajuudella',
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
      footerRights: 'WF Studio — Verkkosuunnittelu Fuengirolassa. Kaikki oikeudet pidätetään.'
    }
  };

  var cookieBannerCopy = {
    es: {
      title: 'Usamos cookies',
      noticeHtml: '<p>Utilizamos cookies necesarias para que la web funcione correctamente y, si lo aceptas, cookies analíticas para entender qué partes de la página interesan más.</p>',
      rejectLabel: 'Rechazar',
      acceptLabel: 'Aceptar',
      configLabel: 'Configurar cookies',
      configModalTitle: 'Configuración de cookies',
      configModalIntro: 'Puedes mantener solo las cookies necesarias o activar también las analíticas. Tu elección se guarda en este navegador.',
      necessaryTitle: 'Cookies necesarias',
      necessaryDescription: 'Permiten el funcionamiento básico del sitio y guardar tu decisión de consentimiento.',
      necessaryBadge: 'Siempre activas',
      analyticsTitle: 'Cookies analíticas',
      analyticsDescription: 'Nos ayudan a medir visitas y mejorar la web sin cambiar la experiencia básica.',
      saveConfigLabel: 'Guardar configuración'
    },
    en: {
      title: 'We use cookies',
      noticeHtml: '<p>We use necessary cookies so the site works properly and, if you accept them, analytics cookies to understand which parts of the page attract the most interest.</p>',
      rejectLabel: 'Reject',
      acceptLabel: 'Accept',
      configLabel: 'Cookie settings',
      configModalTitle: 'Cookie settings',
      configModalIntro: 'You can keep only the necessary cookies or also enable analytics. Your choice is stored in this browser.',
      necessaryTitle: 'Necessary cookies',
      necessaryDescription: 'They allow the site to work properly and store your consent choice.',
      necessaryBadge: 'Always active',
      analyticsTitle: 'Analytics cookies',
      analyticsDescription: 'They help us measure visits and improve the site without changing the basic experience.',
      saveConfigLabel: 'Save settings'
    },
    de: {
      title: 'Wir verwenden Cookies',
      noticeHtml: '<p>Wir verwenden notwendige Cookies, damit die Website korrekt funktioniert, und mit Ihrer Zustimmung analytische Cookies, um zu verstehen, welche Bereiche der Seite am meisten Interesse wecken.</p>',
      rejectLabel: 'Ablehnen',
      acceptLabel: 'Akzeptieren',
      configLabel: 'Cookies einstellen',
      configModalTitle: 'Cookie-Einstellungen',
      configModalIntro: 'Sie können nur die notwendigen Cookies behalten oder zusätzlich analytische Cookies aktivieren. Ihre Auswahl wird in diesem Browser gespeichert.',
      necessaryTitle: 'Notwendige Cookies',
      necessaryDescription: 'Sie ermöglichen die Grundfunktionen der Website und speichern Ihre Einwilligungsentscheidung.',
      necessaryBadge: 'Immer aktiv',
      analyticsTitle: 'Analytische Cookies',
      analyticsDescription: 'Sie helfen uns, Besuche zu messen und die Website zu verbessern, ohne die Grundfunktion zu verändern.',
      saveConfigLabel: 'Einstellungen speichern'
    },
    fi: {
      title: 'Käytämme evästeitä',
      noticeHtml: '<p>Käytämme välttämättömiä evästeitä, jotta sivusto toimii oikein, ja halutessasi analytiikkaevästeitä, jotta ymmärrämme mitkä sivun osat kiinnostavat eniten.</p>',
      rejectLabel: 'Hylkää',
      acceptLabel: 'Hyväksy',
      configLabel: 'Evästeasetukset',
      configModalTitle: 'Evästeasetukset',
      configModalIntro: 'Voit pitää vain välttämättömät evästeet tai ottaa myös analytiikan käyttöön. Valintasi tallennetaan tähän selaimeen.',
      necessaryTitle: 'Välttämättömät evästeet',
      necessaryDescription: 'Ne mahdollistavat sivuston perustoiminnan ja tallentavat suostumusvalintasi.',
      necessaryBadge: 'Aina käytössä',
      analyticsTitle: 'Analytiikkaevästeet',
      analyticsDescription: 'Ne auttavat meitä mittaamaan käyntejä ja parantamaan sivustoa muuttamatta peruskokemusta.',
      saveConfigLabel: 'Tallenna asetukset'
    }
  };

  var defaultLang = 'es';
  var header = document.getElementById('header');
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var langButtons = document.querySelectorAll('.lang-switcher__btn');
  var cookieBannerInstance = null;
  var cookieDecisionKey = 'webfuengirola_cookie_consent';
  var cookiePreferencesKey = 'webfuengirola_cookie_preferences';

  function applyCookiePreferenceState(preferences) {
    var hasAnalytics = !!(preferences && preferences.analiticas);
    document.documentElement.dataset.analyticsConsent = hasAnalytics ? 'granted' : 'denied';
    if (window.GoogleAnalyticsCore) {
      if (hasAnalytics) GoogleAnalyticsCore.grantConsent();
      else              GoogleAnalyticsCore.revokeConsent();
    }
  }

  function buildCookieBannerConfig(lang) {
    var copy = cookieBannerCopy[lang] || cookieBannerCopy[defaultLang];

    return {
      decisionStorageKey: cookieDecisionKey,
      preferencesStorageKey: cookiePreferencesKey,
      imageSrc: 'img/cookie-funny.webp',
      imageAlt: 'Funny cookie illustration',
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
      onSaveConfig: applyCookiePreferenceState
    };
  }

  function initCookieBanner(lang) {
    if (!window.CookieBannerCore || typeof window.CookieBannerCore.init !== 'function') return;

    // GA init BEFORE el banner para que los consent defaults se encolen primero
    if (window.GoogleAnalyticsCore) {
      GoogleAnalyticsCore.init({ measurementId: 'G-V7KY8FGLM5' });
    }

    cookieBannerInstance = window.CookieBannerCore.init(buildCookieBannerConfig(lang || defaultLang));
    if (cookieBannerInstance && typeof cookieBannerInstance.getPreferences === 'function') {
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

    initCookieBanner(lang);
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

  document.querySelectorAll('[data-cookie-preferences-link]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      resetCookieBanner();
    });
  });

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
