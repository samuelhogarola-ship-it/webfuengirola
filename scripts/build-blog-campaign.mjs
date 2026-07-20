import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "blog");

const existingPosts = [
  {
    slug: "cuanto-tarda-el-seo-local",
    title: "Cuánto tarda el SEO local en dar resultados",
    excerpt:
      "Qué puede cambiar antes, qué suele tardar más y cómo distinguir entre un problema de visibilidad y una base todavía mal preparada.",
    dateLabel: "12 julio 2026",
    minutes: "6 min",
    image: "blog-home-og.webp",
    tag: "Nuevo",
    tagClass: "tag--orange",
  },
  {
    slug: "web-vs-redes-sociales-para-negocio-local",
    title: "Web vs redes sociales para negocio local",
    excerpt:
      "Cuándo las redes ayudan, cuándo se quedan cortas y por qué una web suele ser la base que mejor convierte la atención en contacto real.",
    dateLabel: "12 julio 2026",
    minutes: "6 min",
    image: "blog-home-og.webp",
    tag: "Nuevo",
    tagClass: "tag--blue",
  },
  {
    slug: "por-que-crear-una-web-en-2026",
    title: "Por qué crear una web en 2026",
    excerpt:
      "Ventajas, desventajas, diferencias entre Google y redes sociales, anuncios en Meta, engagement real y por qué tener casa propia sigue siendo clave.",
    dateLabel: "6 junio 2026",
    minutes: "6 min",
    image: "blog-web-2026-og.webp",
    tag: "Publicado",
    tagClass: "tag--green",
  },
  {
    slug: "sabias-que-cada-vez-mas-gente-usa-ia-para-encontrar-un-servicio",
    title: "Sabías que cada vez más gente usa IA para encontrar un servicio",
    excerpt:
      "Cómo ChatGPT, Gemini o Perplexity ya influyen en la forma en la que los clientes descubren negocios y comparan opciones.",
    dateLabel: "6 junio 2026",
    minutes: "4 min",
    image: "blog-ia-servicios-og.webp",
    tag: "Relacionado",
    tagClass: "tag--orange",
  },
  {
    slug: "seo-local-fuengirola-malaga-y-publicidad-con-ia",
    title: "SEO local en Fuengirola y Málaga con apoyo de publicidad e IA",
    excerpt:
      "Qué conviene separar por ciudad, cuándo tiene sentido crear landings locales y cómo encaja la IA en la captación.",
    dateLabel: "5 julio 2026",
    minutes: "5 min",
    image: "blog-home-og.webp",
    tag: "Nuevo",
    tagClass: "tag--blue",
  },
  {
    slug: "cuanto-cuesta-una-pagina-web-en-fuengirola-y-malaga",
    title: "Cuánto cuesta una página web en Fuengirola y Málaga",
    excerpt:
      "Qué influye de verdad en el precio, cuándo conviene una web sencilla y por qué no siempre tiene sentido comparar solo la cifra final.",
    dateLabel: "5 julio 2026",
    minutes: "5 min",
    image: "blog-home-og.webp",
    tag: "Nuevo",
    tagClass: "tag--green",
  },
  {
    slug: "como-salir-en-google-maps-en-fuengirola-y-malaga",
    title: "Cómo salir en Google Maps en Fuengirola y Málaga",
    excerpt:
      "Ficha, reseñas, señales locales y página web: lo que más suele mover la aguja para Maps y búsquedas cercanas.",
    dateLabel: "5 julio 2026",
    minutes: "5 min",
    image: "blog-home-og.webp",
    tag: "Nuevo",
    tagClass: "tag--orange",
  },
];

const posts = [
  {
    slug: "diseno-web-para-negocio-local-en-fuengirola",
    title: "Diseño web para negocio local en Fuengirola: qué debe tener",
    description:
      "Qué debe tener una web de negocio local en Fuengirola para generar confianza, aparecer en Google y convertir visitas en contactos reales.",
    excerpt:
      "La estructura mínima que necesita una web local para explicar bien el negocio, activar llamadas y no depender solo de redes.",
    date: "2026-07-15",
    dateLabel: "15 julio 2026",
    minutes: "6 min",
    image: "blog-local-web-fuengirola.webp",
    tag: "SEO local",
    tagClass: "tag--blue",
    badge: "Diseño web local",
    section: "Diseño web",
    keywords: [
      "diseño web Fuengirola",
      "web negocio local",
      "página web para empresa local",
    ],
    takeaways: [
      "Una web local debe responder dudas antes de pedir contacto.",
      "La ubicación y los servicios necesitan páginas claras.",
      "WhatsApp, teléfono y formulario deben estar siempre a mano.",
    ],
    faq: [
      [
        "¿Qué debe tener una web de negocio local?",
        "Debe explicar servicios, zona de trabajo, confianza, reseñas, formas de contacto y llamadas a la acción visibles.",
      ],
      [
        "¿Una web local necesita muchas páginas?",
        "No siempre. Puede empezar con pocas páginas si cada una responde una intención de búsqueda concreta.",
      ],
      [
        "¿Qué es más importante: diseño o SEO?",
        "Las dos cosas se necesitan. El diseño da confianza y el SEO ayuda a que esa confianza llegue a gente que ya está buscando.",
      ],
    ],
    sections: [
      [
        "La web tiene que resolver antes de vender",
        [
          "Un cliente local no entra en tu web para admirar animaciones. Entra porque necesita entender si puedes ayudarle, cuánto puede costar, dónde estás y cómo contactarte sin fricción.",
          "Por eso la primera capa de una web local debe ser clara: qué haces, para quién, en qué zona trabajas y cuál es el siguiente paso. Si esa información se esconde, la web pierde oportunidades aunque visualmente sea bonita.",
        ],
      ],
      [
        "La estructura mínima que suele funcionar",
        [
          "Para muchos negocios de Fuengirola basta con una página de inicio clara, una página de servicios, una página local orientada a Google, casos o testimonios y contacto. A partir de ahí se puede crecer con blog, guías y páginas por servicio.",
          "La clave no es tener mucho contenido, sino que cada bloque responda una duda real del cliente.",
        ],
      ],
      [
        "Google necesita señales locales",
        [
          "Mencionar Fuengirola no es suficiente. Conviene conectar la web con la ficha de Google Business Profile, usar datos de contacto consistentes, explicar zonas cercanas y publicar contenido que demuestre actividad real.",
          "Una web local bien montada ayuda a Google a entender qué haces y ayuda al cliente a decidir más rápido.",
        ],
      ],
    ],
  },
  {
    slug: "errores-comunes-en-webs-de-negocios-locales",
    title: "Errores comunes en webs de negocios locales",
    description:
      "Errores frecuentes que hacen que una web local no convierta: textos genéricos, contacto escondido, falta de SEO local y diseño poco claro.",
    excerpt:
      "Los fallos que más dañan una web local, aunque parezca correcta a simple vista.",
    date: "2026-07-16",
    dateLabel: "16 julio 2026",
    minutes: "6 min",
    image: "blog-errores-web-local.webp",
    tag: "Checklist",
    tagClass: "tag--orange",
    badge: "Errores web",
    section: "Diseño web",
    keywords: ["errores página web", "web negocio local", "diseño web negocio"],
    takeaways: [
      "Los textos genéricos bajan la confianza.",
      "Un contacto difícil mata conversiones.",
      "Sin intención local, Google entiende peor la página.",
    ],
    faq: [
      [
        "¿Por qué mi web no genera contactos?",
        "Puede faltar claridad, confianza, llamadas a la acción visibles o una estructura alineada con búsquedas locales.",
      ],
      [
        "¿Es malo tener una web bonita pero simple?",
        "No. El problema aparece cuando es bonita pero no explica servicios, ubicación, precios orientativos o contacto.",
      ],
      [
        "¿Qué error conviene arreglar primero?",
        "Normalmente el contacto, la propuesta clara y las páginas de servicios principales.",
      ],
    ],
    sections: [
      [
        "Textos que podrían servir para cualquier empresa",
        [
          "Si cambias el nombre de tu negocio por otro y la web sigue diciendo lo mismo, hay un problema. El contenido genérico no ayuda a diferenciarte ni a posicionarte.",
          "Una web local debe sonar específica: servicios concretos, zona real, dudas reales y forma de trabajar.",
        ],
      ],
      [
        "Contactar cuesta demasiado",
        [
          "Hay webs donde el teléfono está escondido, WhatsApp aparece solo al final o el formulario pide más datos de los necesarios. Cada paso extra reduce contactos.",
          "El objetivo no es llenar la página de botones, sino poner la acción correcta en los puntos donde el usuario ya está preparado para avanzar.",
        ],
      ],
      [
        "No hay páginas para lo que la gente busca",
        [
          "Muchos negocios quieren aparecer para servicios concretos, pero solo tienen una página general. Google necesita URLs claras para entender cada intención.",
          "Una clínica, un restaurante o una empresa de reformas no compiten igual con una sola página que con una estructura pensada por servicios.",
        ],
      ],
    ],
  },
  {
    slug: "google-business-profile-y-web-como-trabajan-juntos",
    title: "Google Business Profile y web: cómo trabajan juntos",
    description:
      "Cómo conectar la ficha de Google Business Profile con una web local para mejorar confianza, SEO local y conversiones.",
    excerpt:
      "La ficha de Google y la web no deberían competir: cuando se refuerzan, el cliente decide con más seguridad.",
    date: "2026-07-17",
    dateLabel: "17 julio 2026",
    minutes: "6 min",
    image: "blog-google-business-web.webp",
    tag: "Google Maps",
    tagClass: "tag--green",
    badge: "Google Business",
    section: "SEO local",
    keywords: [
      "Google Business Profile",
      "Google Maps Fuengirola",
      "SEO local",
    ],
    takeaways: [
      "La ficha capta búsquedas rápidas.",
      "La web explica lo que no cabe en Maps.",
      "La consistencia de datos mejora confianza.",
    ],
    faq: [
      [
        "¿La ficha de Google sustituye a una web?",
        "No. La ficha ayuda a aparecer en Maps, pero la web explica servicios, casos, precios y proceso con más profundidad.",
      ],
      [
        "¿Qué datos deben coincidir entre ficha y web?",
        "Nombre, teléfono, dirección, horarios, servicios principales y enlaces de contacto.",
      ],
      [
        "¿Las reseñas ayudan al SEO local?",
        "Sí, especialmente si son reales, recientes y mencionan servicios o contexto local.",
      ],
    ],
    sections: [
      [
        "La ficha es la entrada rápida",
        [
          "Muchas búsquedas locales empiezan y terminan en Maps. El cliente mira fotos, reseñas, horario y botón de llamada. Si eso está descuidado, pierde confianza antes de entrar a la web.",
          "La ficha debe estar completa, pero no puede explicarlo todo.",
        ],
      ],
      [
        "La web es la prueba de profundidad",
        [
          "Cuando alguien quiere comparar o entender mejor, salta a la web. Ahí busca detalles: tratamientos, precios orientativos, proyectos, garantías o cómo se trabaja.",
          "Una web bien enlazada desde la ficha convierte la curiosidad en contacto más informado.",
        ],
      ],
      [
        "Consistencia y señales",
        [
          "Si la ficha dice una cosa y la web otra, el usuario duda y Google también. Mantener datos coherentes es una de las tareas más básicas y más olvidadas del SEO local.",
          "También ayuda publicar contenidos que respondan preguntas frecuentes del cliente local.",
        ],
      ],
    ],
  },
  {
    slug: "cuando-conviene-una-web-de-una-sola-pagina",
    title: "Cuándo conviene una web de una sola página",
    description:
      "Cuándo una web one page puede ser suficiente para un negocio local y cuándo conviene crear más páginas para captar mejor en Google.",
    excerpt:
      "Una web de una sola página puede funcionar si el objetivo es claro, pero no siempre es la mejor base para SEO.",
    date: "2026-07-18",
    dateLabel: "18 julio 2026",
    minutes: "5 min",
    image: "blog-web-one-page.webp",
    tag: "Web Lite",
    tagClass: "tag--blue",
    badge: "Web sencilla",
    section: "Diseño web",
    keywords: [
      "web de una sola página",
      "one page negocio local",
      "web sencilla",
    ],
    takeaways: [
      "Una one page sirve para salir rápido.",
      "No es ideal para muchos servicios diferentes.",
      "Puede crecer después con páginas internas.",
    ],
    faq: [
      [
        "¿Una web de una sola página posiciona en Google?",
        "Puede posicionar para búsquedas concretas, pero tiene menos margen si quieres trabajar muchos servicios o ciudades.",
      ],
      [
        "¿Cuándo conviene una one page?",
        "Cuando el negocio tiene una oferta simple, necesita salir rápido y el objetivo principal es contacto.",
      ],
      [
        "¿Se puede ampliar después?",
        "Sí. Lo ideal es crearla con estructura preparada para añadir servicios, blog o páginas locales.",
      ],
    ],
    sections: [
      [
        "Cuando el mensaje es simple",
        [
          "Una web de una sola página funciona bien cuando puedes explicar el negocio sin ramificar demasiado: qué haces, por qué confiar, ejemplos y contacto.",
          "Es una buena salida para validar presencia online sin montar un proyecto grande desde el primer día.",
        ],
      ],
      [
        "Dónde se queda corta",
        [
          "Si tienes muchos servicios, varias ubicaciones o quieres atacar búsquedas concretas, una sola página obliga a meter demasiadas intenciones juntas.",
          "Google suele entender mejor páginas enfocadas: un servicio, una ciudad, una duda.",
        ],
      ],
      [
        "La mejor versión: una base que pueda crecer",
        [
          "Una one page no tiene que ser un callejón sin salida. Puede ser la primera versión de una web que luego suma páginas internas y contenido SEO.",
          "Así evitas rehacerlo todo cuando el negocio ya necesita más visibilidad.",
        ],
      ],
    ],
  },
  {
    slug: "web-para-restaurante-en-fuengirola",
    title: "Web para restaurante en Fuengirola: reservas, carta y Google",
    description:
      "Qué necesita una web de restaurante en Fuengirola para mejorar reservas, enseñar la carta, reforzar Google Maps y evitar depender solo de redes.",
    excerpt:
      "Reservas, carta, horarios, fotos reales y Google Maps: lo básico para que un restaurante local convierta mejor.",
    date: "2026-07-19",
    dateLabel: "19 julio 2026",
    minutes: "6 min",
    image: "blog-restaurante-fuengirola.webp",
    tag: "Hostelería",
    tagClass: "tag--orange",
    badge: "Restaurantes",
    section: "Diseño web",
    keywords: [
      "web restaurante Fuengirola",
      "reservas restaurante",
      "carta online",
    ],
    takeaways: [
      "La carta debe ser fácil de ver en móvil.",
      "Las reservas no pueden depender de mensajes sueltos.",
      "Fotos reales y reseñas ayudan mucho.",
    ],
    faq: [
      [
        "¿Qué debe tener una web de restaurante?",
        "Carta actualizada, horarios, ubicación, reservas, fotos reales, enlaces a reseñas y contacto rápido.",
      ],
      [
        "¿Es mejor carta PDF o carta web?",
        "Una carta web suele ser mejor en móvil y para Google. El PDF puede existir, pero no debería ser la única opción.",
      ],
      [
        "¿La web ayuda a reservar más?",
        "Sí, si reduce dudas y facilita el contacto o la reserva en pocos pasos.",
      ],
    ],
    sections: [
      [
        "El cliente decide en móvil",
        [
          "Quien busca restaurante suele estar en la calle, en el hotel o comparando opciones rápido. Si la carta tarda, no se lee o el botón de reserva no aparece, se pierde la oportunidad.",
          "La web tiene que ser rápida, clara y cómoda con una mano.",
        ],
      ],
      [
        "Carta, horarios y ubicación sin fricción",
        [
          "La información básica no debería estar repartida entre stories antiguas, fotos borrosas y una ficha sin actualizar. Carta, horarios, ubicación y contacto deben vivir en la web y coincidir con Google.",
          "Eso también reduce mensajes repetidos preguntando lo mismo.",
        ],
      ],
      [
        "Fotos reales, no decoración vacía",
        [
          "Para hostelería, la imagen importa muchísimo. Pero no hace falta una producción enorme: fotos honestas del local, platos, terraza y ambiente suelen funcionar mejor que un banco de imágenes frío.",
          "La web debe hacer que el cliente imagine la visita.",
        ],
      ],
    ],
  },
  {
    slug: "web-para-clinica-y-fisioterapia-en-fuengirola",
    title: "Web para clínica y fisioterapia en Fuengirola",
    description:
      "Cómo debe plantearse una web para clínica, fisioterapia o salud local: servicios, confianza, reservas, reseñas y contenido útil.",
    excerpt:
      "Una web sanitaria local tiene que transmitir confianza antes que espectáculo: servicios claros, equipo, reseñas y cita fácil.",
    date: "2026-07-20",
    dateLabel: "20 julio 2026",
    minutes: "6 min",
    image: "blog-clinica-fisioterapia.webp",
    tag: "Clínicas",
    tagClass: "tag--green",
    badge: "Salud local",
    section: "Diseño web",
    keywords: [
      "web clínica Fuengirola",
      "web fisioterapia Fuengirola",
      "SEO clínica local",
    ],
    takeaways: [
      "La confianza pesa más que el impacto visual.",
      "Cada tratamiento merece explicación propia.",
      "La cita debe ser inmediata y visible.",
    ],
    faq: [
      [
        "¿Qué debe incluir una web de clínica?",
        "Servicios, equipo, ubicación, contacto, sistema de cita, reseñas y explicaciones claras de tratamientos.",
      ],
      [
        "¿Conviene publicar artículos de salud?",
        "Sí, si responden dudas reales y no prometen resultados médicos de forma irresponsable.",
      ],
      [
        "¿La web puede ayudar a captar pacientes?",
        "Sí, especialmente cuando conecta búsquedas locales con páginas de tratamientos concretos.",
      ],
    ],
    sections: [
      [
        "Confianza antes que espectáculo",
        [
          "En salud, el usuario no busca una web llamativa sin más. Busca señales de confianza: quién atiende, qué experiencia hay, qué tratamientos existen y cómo pedir cita.",
          "La estética debe acompañar, pero la claridad manda.",
        ],
      ],
      [
        "Páginas por tratamiento",
        [
          "Una clínica que ofrece fisioterapia, punción seca, pilates terapéutico o rehabilitación no debería meterlo todo en una lista sin explicación.",
          "Cada servicio importante puede tener su página para posicionar y resolver dudas.",
        ],
      ],
      [
        "Cita rápida y datos consistentes",
        [
          "Teléfono, WhatsApp, formulario y dirección deben aparecer sin esfuerzo. Además, los datos tienen que coincidir con Google Business Profile para evitar confusión.",
          "La web debe reducir ansiedad, no añadir pasos.",
        ],
      ],
    ],
  },
  {
    slug: "seo-local-para-servicios-a-domicilio",
    title: "SEO local para servicios a domicilio",
    description:
      "Cómo plantear SEO local para servicios que se desplazan: zonas, páginas de servicio, reseñas y señales de confianza.",
    excerpt:
      "Si tu negocio va a casa del cliente, tu web debe explicar zonas, servicios y disponibilidad con mucha precisión.",
    date: "2026-07-21",
    dateLabel: "21 julio 2026",
    minutes: "6 min",
    image: "blog-servicios-domicilio.webp",
    tag: "SEO local",
    tagClass: "tag--blue",
    badge: "Servicios a domicilio",
    section: "SEO local",
    keywords: [
      "SEO servicios a domicilio",
      "SEO local Málaga",
      "negocio a domicilio",
    ],
    takeaways: [
      "Las zonas de cobertura deben estar claras.",
      "No conviene duplicar páginas sin contenido real.",
      "Las reseñas con contexto ayudan mucho.",
    ],
    faq: [
      [
        "¿Cómo posiciona un servicio a domicilio?",
        "Con páginas claras de servicio, zonas de cobertura, reseñas y contenido que demuestre actividad real en el área.",
      ],
      [
        "¿Hay que crear una página por ciudad?",
        "Solo si cada página aporta contenido útil y específico. Duplicar textos cambiando la ciudad suele ser débil.",
      ],
      [
        "¿Qué convierte mejor en estos casos?",
        "Disponibilidad, confianza, precios orientativos y contacto rápido.",
      ],
    ],
    sections: [
      [
        "La ubicación funciona distinto",
        [
          "Un servicio a domicilio no depende de que el cliente visite un local. Depende de que entienda si cubres su zona y si puedes atender su problema.",
          "Eso cambia la forma de escribir la web y trabajar el SEO.",
        ],
      ],
      [
        "Zonas reales, no una lista infinita",
        [
          "Poner veinte municipios en el footer no es estrategia. Conviene priorizar zonas reales, explicar cobertura y crear páginas solo cuando haya intención de búsqueda suficiente.",
          "La precisión da más confianza que aparentar estar en todas partes.",
        ],
      ],
      [
        "Prueba social con contexto",
        [
          "Las reseñas son más útiles cuando mencionan el servicio, la zona o el problema resuelto. Ayudan al usuario y también refuerzan señales locales.",
          "La web puede seleccionar y ordenar esas pruebas sin depender solo de la ficha de Google.",
        ],
      ],
    ],
  },
  {
    slug: "whatsapp-en-la-web-para-convertir-mas-clientes",
    title: "WhatsApp en la web: cómo usarlo para convertir más clientes",
    description:
      "Cómo colocar WhatsApp en una web de negocio local sin ser pesado y convirtiendo mejor las visitas en conversaciones útiles.",
    excerpt:
      "WhatsApp puede convertir mucho, pero solo si aparece en el momento correcto y con mensajes bien preparados.",
    date: "2026-07-22",
    dateLabel: "22 julio 2026",
    minutes: "5 min",
    image: "blog-whatsapp-web-clientes.webp",
    tag: "Conversión",
    tagClass: "tag--green",
    badge: "WhatsApp",
    section: "Conversión",
    keywords: [
      "WhatsApp web negocio",
      "convertir visitas en clientes",
      "CTA WhatsApp",
    ],
    takeaways: [
      "WhatsApp debe estar visible sin bloquear la lectura.",
      "Los mensajes prellenados ayudan a iniciar conversación.",
      "No sustituye una buena explicación del servicio.",
    ],
    faq: [
      [
        "¿Conviene poner WhatsApp en la web?",
        "Sí, especialmente en negocios locales donde el cliente quiere resolver dudas rápido antes de contratar.",
      ],
      [
        "¿Dónde se coloca mejor el botón de WhatsApp?",
        "En cabecera, llamadas a la acción y botón flotante si no tapa contenido importante.",
      ],
      [
        "¿Qué mensaje debe abrir WhatsApp?",
        "Uno breve y contextual, por ejemplo: Hola, quiero información sobre este servicio.",
      ],
    ],
    sections: [
      [
        "WhatsApp reduce fricción",
        [
          "Muchos clientes locales prefieren preguntar por WhatsApp antes que rellenar un formulario. Es directo, familiar y rápido.",
          "Pero si la web no explica nada, WhatsApp se llena de dudas repetidas. La página debe preparar la conversación.",
        ],
      ],
      [
        "Botones con contexto",
        [
          "No es lo mismo un WhatsApp genérico que uno desde una página de SEO local o una página de restaurante. El mensaje prellenado puede decir desde dónde viene el usuario y qué necesita.",
          "Eso ahorra tiempo y mejora la calidad del contacto.",
        ],
      ],
      [
        "Visible, pero no invasivo",
        [
          "Un botón flotante puede funcionar muy bien, siempre que no tape texto, formularios o botones importantes en móvil.",
          "La conversión no consiste en perseguir al usuario, sino en estar disponible cuando decide actuar.",
        ],
      ],
    ],
  },
  {
    slug: "velocidad-web-en-movil-y-seo-local",
    title: "Velocidad web en móvil y SEO local",
    description:
      "Por qué la velocidad móvil importa para SEO local, conversión y experiencia de usuario en negocios que reciben visitas desde Google Maps.",
    excerpt:
      "Si una web local tarda demasiado en móvil, pierde visitas justo cuando el cliente tenía intención real.",
    date: "2026-07-23",
    dateLabel: "23 julio 2026",
    minutes: "6 min",
    image: "blog-velocidad-movil-seo.webp",
    tag: "Performance",
    tagClass: "tag--blue",
    badge: "Velocidad móvil",
    section: "SEO técnico",
    keywords: ["velocidad web móvil", "SEO local móvil", "Core Web Vitals"],
    takeaways: [
      "La mayoría de contactos locales empiezan en móvil.",
      "Imágenes pesadas son un fallo frecuente.",
      "Rapidez y claridad convierten juntas.",
    ],
    faq: [
      [
        "¿La velocidad web afecta al SEO?",
        "Sí, especialmente si la experiencia móvil es mala y el usuario abandona antes de interactuar.",
      ],
      [
        "¿Qué suele ralentizar una web?",
        "Imágenes pesadas, plantillas cargadas, plugins innecesarios y scripts externos sin control.",
      ],
      [
        "¿Una web rápida convierte más?",
        "Normalmente sí, porque reduce espera y mantiene al usuario en la decisión.",
      ],
    ],
    sections: [
      [
        "El cliente local no espera demasiado",
        [
          "Cuando alguien busca desde el móvil, suele comparar varias opciones. Si tu web tarda, vuelve atrás y abre otra.",
          "La velocidad no es solo una métrica técnica. Es parte de la primera impresión.",
        ],
      ],
      [
        "Imágenes y scripts: los sospechosos habituales",
        [
          "Muchas webs locales cargan fotos enormes, sliders pesados y scripts que no aportan nada a la conversión.",
          "Optimizar imágenes, reducir dependencias y ordenar CSS/JS puede mejorar mucho sin cambiar el diseño.",
        ],
      ],
      [
        "Rápida y entendible",
        [
          "Una web puede cargar rápido y aun así no convertir si el mensaje es confuso. La combinación buena es velocidad, jerarquía clara y contacto visible.",
          "SEO técnico y copy trabajan mejor juntos.",
        ],
      ],
    ],
  },
  {
    slug: "resenas-de-google-y-pagina-web",
    title: "Reseñas de Google y página web: cómo aprovecharlas",
    description:
      "Cómo usar reseñas de Google dentro de una web local para reforzar confianza, SEO y conversión sin inventar testimonios.",
    excerpt:
      "Las reseñas no deberían quedarse encerradas en Google Maps: la web puede convertirlas en prueba de confianza.",
    date: "2026-07-24",
    dateLabel: "24 julio 2026",
    minutes: "5 min",
    image: "blog-resenas-google-web.webp",
    tag: "Confianza",
    tagClass: "tag--orange",
    badge: "Reseñas",
    section: "SEO local",
    keywords: [
      "reseñas Google web",
      "testimonios web local",
      "confianza online",
    ],
    takeaways: [
      "Las reseñas deben ser reales y verificables.",
      "Conviene ordenarlas por servicio o duda.",
      "Pedir reseñas forma parte del sistema comercial.",
    ],
    faq: [
      [
        "¿Puedo poner reseñas de Google en mi web?",
        "Sí, siempre que sean reales y se presenten de forma honesta, idealmente enlazando a la ficha.",
      ],
      [
        "¿Las reseñas ayudan a vender?",
        "Sí, porque reducen incertidumbre y muestran experiencia de otros clientes.",
      ],
      [
        "¿Cuándo pedir una reseña?",
        "Después de una entrega satisfactoria, cuando el cliente ya ha vivido el valor del servicio.",
      ],
    ],
    sections: [
      [
        "La reseña responde una duda silenciosa",
        [
          "Antes de contactar, el cliente se pregunta si puede fiarse. Una reseña concreta puede responder mejor que un párrafo corporativo.",
          "Por eso conviene poner testimonios cerca de servicios y llamadas a la acción.",
        ],
      ],
      [
        "No todas las reseñas pesan igual",
        [
          "Una reseña que dice “muy bien” ayuda, pero una que menciona el servicio, el problema y el resultado ayuda mucho más.",
          "La web puede destacar las más útiles sin manipular el sentido.",
        ],
      ],
      [
        "Convertir reseñas en sistema",
        [
          "Pedir reseñas no debería depender de acordarse de vez en cuando. Puede formar parte del cierre de cada servicio.",
          "Con el tiempo, esa prueba social mejora ficha, web y confianza general.",
        ],
      ],
    ],
  },
  {
    slug: "ia-en-buscadores-y-negocios-locales",
    title: "IA en buscadores: qué cambia para negocios locales",
    description:
      "Qué cambia para negocios locales cuando los usuarios buscan recomendaciones en ChatGPT, Gemini, Perplexity y respuestas con IA.",
    excerpt:
      "Las búsquedas con IA premian webs claras, datos estructurados y contenido útil que las máquinas puedan entender.",
    date: "2026-07-25",
    dateLabel: "25 julio 2026",
    minutes: "6 min",
    image: "blog-ia-buscadores-locales.webp",
    tag: "IA",
    tagClass: "tag--blue",
    badge: "Búsqueda con IA",
    section: "IA y SEO",
    keywords: [
      "IA buscadores negocio local",
      "ChatGPT servicios locales",
      "SEO para IA",
    ],
    takeaways: [
      "La IA necesita información clara y verificable.",
      "Las respuestas visibles ayudan a resolver dudas reales.",
      "La autoridad local seguirá importando.",
    ],
    faq: [
      [
        "¿La IA sustituye al SEO local?",
        "No. Cambia parte del descubrimiento, pero sigue necesitando fuentes, datos claros y señales de confianza.",
      ],
      [
        "¿Qué contenido ayuda en búsquedas con IA?",
        "Preguntas frecuentes, servicios bien explicados, datos locales, casos y páginas con estructura limpia.",
      ],
      [
        "¿Las preguntas frecuentes pueden ayudar?",
        "Sí, cuando responden dudas reales de forma visible y aportan contexto útil antes de contactar.",
      ],
    ],
    sections: [
      [
        "La búsqueda se está volviendo más conversacional",
        [
          "Cada vez más personas preguntan a herramientas de IA antes de elegir un servicio. No buscan solo una lista: quieren comparación, resumen y recomendación.",
          "Eso obliga a que tu web sea más clara y menos ambigua.",
        ],
      ],
      [
        "Datos estructurados y contenido útil",
        [
          "Páginas de servicios, casos, respuestas útiles y datos consistentes ayudan a que los sistemas entiendan mejor quién eres y qué ofreces.",
          "No se trata de escribir para robots, sino de ordenar bien la información para humanos y máquinas.",
        ],
      ],
      [
        "La confianza local no desaparece",
        [
          "Reseñas, casos, ubicación, experiencia y coherencia siguen siendo señales fuertes. La IA puede resumir, pero necesita fuentes que inspiren confianza.",
          "Una web pobre deja poco que recomendar.",
        ],
      ],
    ],
  },
  {
    slug: "landing-page-para-campanas-de-google-y-facebook",
    title: "Landing page para campañas de Google y Facebook",
    description:
      "Cómo debe ser una landing page para campañas de Google Ads o Facebook Ads: foco, mensaje, formulario, velocidad y medición.",
    excerpt:
      "Enviar anuncios a una página genérica suele desperdiciar presupuesto. Una landing enfocada convierte mejor.",
    date: "2026-07-26",
    dateLabel: "26 julio 2026",
    minutes: "6 min",
    image: "blog-landing-ads.webp",
    tag: "Publicidad",
    tagClass: "tag--green",
    badge: "Landing pages",
    section: "Publicidad",
    keywords: [
      "landing page Google Ads",
      "landing Facebook Ads",
      "página campaña",
    ],
    takeaways: [
      "Una campaña necesita una página alineada con el anuncio.",
      "Menos opciones suelen convertir mejor.",
      "La medición debe estar preparada desde el inicio.",
    ],
    faq: [
      [
        "¿Qué es una landing page?",
        "Es una página enfocada en una acción concreta, normalmente contacto, reserva, compra o solicitud.",
      ],
      [
        "¿Por qué no enviar anuncios a la home?",
        "Porque la home suele tener demasiadas opciones y no siempre responde al mensaje exacto del anuncio.",
      ],
      [
        "¿Qué debe medir una landing?",
        "Visitas, clics, formularios, llamadas, WhatsApp y conversiones relevantes para la campaña.",
      ],
    ],
    sections: [
      [
        "El anuncio promete, la landing confirma",
        [
          "Si el anuncio habla de un servicio concreto, la página debe continuar esa conversación sin obligar al usuario a buscar.",
          "Cuanto más alineado esté el mensaje, menos fricción hay.",
        ],
      ],
      [
        "Foco y velocidad",
        [
          "Una landing no necesita explicar toda la empresa. Necesita resolver la duda principal, demostrar confianza y facilitar la acción.",
          "También debe cargar rápido, sobre todo si el tráfico viene de móvil.",
        ],
      ],
      [
        "Medir antes de gastar",
        [
          "Sin medición, una campaña se convierte en intuición cara. Conviene preparar eventos de formulario, WhatsApp, teléfono y conversiones antes de invertir fuerte.",
          "Así se puede mejorar con datos, no con sensaciones.",
        ],
      ],
    ],
  },
  {
    slug: "mantenimiento-web-que-incluye-y-cuando-compensa",
    title: "Mantenimiento web: qué incluye y cuándo compensa",
    description:
      "Qué incluye el mantenimiento web para negocios locales: actualizaciones, seguridad, cambios, SEO básico y soporte técnico.",
    excerpt:
      "Una web publicada no está terminada para siempre. El mantenimiento evita pequeños problemas que luego salen caros.",
    date: "2026-07-27",
    dateLabel: "27 julio 2026",
    minutes: "5 min",
    image: "blog-mantenimiento-web.webp",
    tag: "Mantenimiento",
    tagClass: "tag--orange",
    badge: "Mantenimiento",
    section: "Mantenimiento web",
    keywords: [
      "mantenimiento web",
      "soporte web negocio",
      "actualizar página web",
    ],
    takeaways: [
      "Una web necesita revisiones periódicas.",
      "Seguridad y backups son básicos.",
      "Los cambios pequeños mantienen la web viva.",
    ],
    faq: [
      [
        "¿Qué incluye el mantenimiento web?",
        "Puede incluir actualizaciones, backups, seguridad, pequeños cambios, revisión técnica y soporte.",
      ],
      [
        "¿Todas las webs necesitan mantenimiento?",
        "Sí, aunque el nivel depende de si es estática, WordPress, ecommerce o aplicación web.",
      ],
      [
        "¿Cuándo compensa contratarlo?",
        "Cuando la web forma parte real de la captación o cuando no quieres depender de arreglos urgentes.",
      ],
    ],
    sections: [
      [
        "Publicar no es terminar",
        [
          "Una web puede funcionar muy bien el día uno y empezar a quedarse atrás si nadie revisa textos, enlaces, formularios o seguridad.",
          "El mantenimiento no es glamour, pero sostiene lo que ya genera valor.",
        ],
      ],
      [
        "Seguridad, backups y cambios",
        [
          "En WordPress, por ejemplo, actualizaciones y copias son especialmente importantes. En webs estáticas, el mantenimiento se centra más en contenido, SEO y pequeños ajustes.",
          "Cada tecnología tiene su forma sana de cuidarse.",
        ],
      ],
      [
        "SEO también necesita seguimiento",
        [
          "Una página que posiciona hoy puede necesitar mejoras cuando cambia la competencia o aparecen nuevas búsquedas.",
          "Revisar datos, añadir FAQs y publicar contenido útil mantiene la web en movimiento.",
        ],
      ],
    ],
  },
  {
    slug: "dominio-hosting-y-correo-para-negocio-local",
    title: "Dominio, hosting y correo para negocio local",
    description:
      "Qué debe saber un negocio local sobre dominio, hosting y correo profesional antes de contratar una web.",
    excerpt:
      "Dominio, hosting y correo parecen detalles técnicos, pero afectan a confianza, continuidad y control del negocio.",
    date: "2026-07-28",
    dateLabel: "28 julio 2026",
    minutes: "5 min",
    image: "blog-dominio-hosting-correo.webp",
    tag: "Infraestructura",
    tagClass: "tag--blue",
    badge: "Dominio y hosting",
    section: "Hosting",
    keywords: [
      "dominio hosting correo",
      "correo profesional negocio",
      "hosting web local",
    ],
    takeaways: [
      "El dominio debe estar bajo control del negocio.",
      "El correo profesional mejora confianza.",
      "Hosting barato puede salir caro si falla.",
    ],
    faq: [
      [
        "¿Quién debe ser dueño del dominio?",
        "Lo ideal es que el negocio tenga control claro del dominio, aunque un proveedor lo gestione técnicamente.",
      ],
      [
        "¿Merece la pena un correo profesional?",
        "Sí. Un email con dominio propio transmite más confianza que una cuenta gratuita genérica.",
      ],
      [
        "¿Qué hosting necesita una web local?",
        "Depende de la tecnología, tráfico y mantenimiento, pero debe ser estable, seguro y fácil de respaldar.",
      ],
    ],
    sections: [
      [
        "El dominio es un activo",
        [
          "El dominio no es un trámite menor. Es una parte de la identidad digital del negocio y conviene saber quién lo controla, cuándo renueva y cómo recuperarlo.",
          "Perder acceso al dominio puede bloquear web, correo y reputación.",
        ],
      ],
      [
        "Correo profesional",
        [
          "Usar un correo con tu dominio transmite más seriedad y orden. También ayuda a separar comunicación profesional de cuentas personales.",
          "No siempre hace falta una suite enorme, pero sí una configuración fiable.",
        ],
      ],
      [
        "Hosting adecuado al proyecto",
        [
          "Una web sencilla no necesita lo mismo que una tienda online o una aplicación. Elegir hosting solo por precio puede traer lentitud, caídas o soporte pobre.",
          "La infraestructura debe acompañar al uso real de la web.",
        ],
      ],
    ],
  },
];

// The campaign is published as a real one-post-per-day sequence ending today.
const campaignEnd = new Date("2026-07-18T12:00:00Z");
const campaignStart = new Date(campaignEnd);
campaignStart.setUTCDate(campaignEnd.getUTCDate() - posts.length + 1);
for (const [index, post] of posts.entries()) {
  const published = new Date(campaignStart);
  published.setUTCDate(campaignStart.getUTCDate() + index);
  post.date = published.toISOString().slice(0, 10);
  post.dateLabel = new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(published);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function jsonLd(data) {
  return JSON.stringify(data, null, 4).replaceAll("</", "<\\/");
}

function card(post) {
  return `          <article class="blog-card">
            <a href="./${post.slug}/" class="blog-card__media" aria-label="Abrir artículo ${escapeHtml(post.title)}">
              <img
                src="../img/${post.image}"
                alt="Imagen del artículo ${escapeHtml(post.title)}"
                class="blog-card__image"
                width="1200"
                height="630"
                loading="lazy"
                decoding="async"
              />
            </a>
            <span class="tag ${post.tagClass}">${escapeHtml(post.tag)}</span>
            <h3 class="blog-card__title"><a href="./${post.slug}/">${escapeHtml(post.title)}</a></h3>
            <p class="blog-card__excerpt">${escapeHtml(post.excerpt)}</p>
            <div class="blog-card__meta">
              <span>${escapeHtml(post.dateLabel)}</span>
              <span>${escapeHtml(post.minutes)}</span>
            </div>
            <a href="./${post.slug}/" class="btn btn--ghost btn--sm">Leer artículo</a>
          </article>`;
}

function article(post, relatedPosts) {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://webfuengirola.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://webfuengirola.com/blog/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: `https://webfuengirola.com/blog/${post.slug}/`,
        },
      ],
    },
    {
      "@type": "BlogPosting",
      "@id": `https://webfuengirola.com/blog/${post.slug}/#article`,
      mainEntityOfPage: `https://webfuengirola.com/blog/${post.slug}/`,
      headline: post.title,
      description: post.description,
      image: `https://webfuengirola.com/img/${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        "@id": "https://webfuengirola.com/sobre-nosotros/#samuel",
        name: "Samuel",
        url: "https://webfuengirola.com/sobre-nosotros/",
        worksFor: { "@id": "https://webfuengirola.com/#organization" },
      },
      publisher: {
        "@type": "Organization",
        name: "Web Fuengirola",
        logo: {
          "@type": "ImageObject",
          url: "https://webfuengirola.com/img/logo-wf.webp",
        },
      },
      inLanguage: "es-ES",
      articleSection: post.section,
      keywords: post.keywords,
    },
  ];

  const bodySections = post.sections
    .map(
      ([heading, paragraphs], index) => `
            <h2>${escapeHtml(heading)}</h2>
            ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n            ")}
            ${
              index === 0
                ? `<div class="blog-callout">
              <strong>Idea clave:</strong>
              <p>${escapeHtml(post.takeaways[0])}</p>
            </div>`
                : ""
            }`,
    )
    .join("\n");

  const faqHtml = post.faq
    .map(
      ([question, answer]) => `
              <details class="blog-faq__item">
                <summary>${escapeHtml(question)}</summary>
                <p>${escapeHtml(answer)}</p>
              </details>`,
    )
    .join("\n");

  const relatedLinks = relatedPosts
    .map((item) => `<a href="../${item.slug}/">${escapeHtml(item.title)}</a>`)
    .join("\n              ");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(post.title)} | Web Fuengirola</title>
  <meta name="description" content="${escapeHtml(post.description)}" />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="https://webfuengirola.com/blog/${post.slug}/" />
  <link rel="icon" type="image/webp" href="https://webfuengirola.com/favicon.webp" sizes="48x48" />
  <link rel="shortcut icon" href="https://webfuengirola.com/favicon.webp" />
  <link rel="apple-touch-icon" href="https://webfuengirola.com/apple-touch-icon.png" sizes="180x180" />
  <link rel="manifest" href="https://webfuengirola.com/site.webmanifest" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${escapeHtml(post.title)}" />
  <meta property="og:description" content="${escapeHtml(post.description)}" />
  <meta property="og:url" content="https://webfuengirola.com/blog/${post.slug}/" />
  <meta property="og:image" content="https://webfuengirola.com/img/${post.image}" />
  <meta property="og:image:secure_url" content="https://webfuengirola.com/img/${post.image}" />
  <meta property="og:image:type" content="${post.image.endsWith(".png") ? "image/png" : "image/webp"}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Imagen del artículo ${escapeHtml(post.title)}" />
  <meta property="og:site_name" content="Web Fuengirola" />
  <meta property="og:locale" content="es_ES" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(post.title)}" />
  <meta name="twitter:description" content="${escapeHtml(post.description)}" />
  <meta name="twitter:image" content="https://webfuengirola.com/img/${post.image}" />
  <meta name="twitter:image:alt" content="Imagen del artículo ${escapeHtml(post.title)}" />
  <link rel="stylesheet" href="../../cookie-banner-core.css" />
  <link rel="stylesheet" href="../../style.css?v=10" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  ${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
  </script>
</head>
<body class="project-page blog-page">
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="../../index.html" class="logo" aria-label="Web Fuengirola">
        <img src="../../img/logo-wf.webp" alt="Web Fuengirola" class="logo__img" width="36" height="36" loading="eager" />
      </a>
      <nav class="nav" id="nav" aria-label="Navegación principal">
        <ul class="nav__list">
          <li><a href="../../index.html" class="nav__link">Inicio</a></li>
          <li><a href="../../servicios/" class="nav__link">Servicios</a></li>
          <li><a href="../../casos/" class="nav__link">Casos de éxito</a></li>
          <li><a href="../../como-trabajamos/" class="nav__link">Proceso</a></li>
          <li><a href="../" class="nav__link nav__link--active">Blog</a></li>
          <li><a href="../../contacto/" class="nav__link">Contacto</a></li>
        </ul>
      </nav>
      <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20para%20mi%20negocio" class="btn btn--primary header__cta" target="_blank" rel="noopener noreferrer">Pedir presupuesto</a>
      <button type="button" class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>
    <section class="subpage-hero blog-hero blog-hero--article">
      <div class="container blog-hero__inner">
        <nav class="project-breadcrumb" aria-label="Breadcrumb">
          <a href="../../index.html">Inicio</a>
          <span>/</span>
          <a href="../">Blog</a>
          <span>/</span>
          <span>${escapeHtml(post.title)}</span>
        </nav>
        <span class="badge">${escapeHtml(post.badge)}</span>
        <h1 class="subpage-hero__title">${escapeHtml(post.title)}</h1>
        <p class="subpage-hero__sub">${escapeHtml(post.excerpt)}</p>
        <div class="blog-meta">
          <span>Publicado el ${escapeHtml(post.dateLabel)}</span>
          <span>Lectura de ${escapeHtml(post.minutes)}</span>
          <span>Por <a href="../../sobre-nosotros/">Samuel, Web Fuengirola</a></span>
        </div>
      </div>
    </section>

    <section class="service-detail blog-detail">
      <div class="container blog-layout">
        <article class="blog-article">
          <figure class="blog-featured-media">
            <img
              src="../../img/${post.image}"
              alt="Imagen destacada del artículo ${escapeHtml(post.title)}"
              class="blog-featured-media__image"
              width="1200"
              height="630"
              loading="eager"
              decoding="async"
            />
          </figure>
          <div class="blog-article__panel">
            <p>${escapeHtml(post.description)}</p>
${bodySections}
            <section class="blog-faq" id="faq">
              <h2>Preguntas frecuentes</h2>
${faqHtml}
            </section>
            <section class="blog-inline-cta">
              <span class="section-label">Siguiente paso</span>
              <h2 class="section-title">Si quieres convertir estas ideas en una web que capte mejor</h2>
              <p class="section-sub">Podemos revisar tu caso, priorizar lo que más impacto tenga y montar una base clara para captar clientes desde Google, Maps, WhatsApp y búsquedas con IA.</p>
              <div class="project-subhero__actions">
                <a href="../../servicios/diseno-web/" class="btn btn--primary btn--lg">Ver diseño web</a>
                <a href="../../servicios/seo-local/" class="btn btn--outline btn--lg">Ver SEO local</a>
              </div>
            </section>
          </div>
        </article>

        <aside class="blog-aside">
          <div class="blog-aside__card">
            <h3>Qué te llevas de este post</h3>
            <ul class="service-detail__checklist">
              ${post.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n              ")}
            </ul>
          </div>
          <div class="blog-aside__card">
            <h3>Artículos relacionados</h3>
            <div class="blog-aside__links">
              ${relatedLinks}
            </div>
          </div>
          <div class="blog-aside__card blog-aside__card--related">
            <span class="section-label">Contacto rápido</span>
            <h3>¿Quieres que lo revisemos contigo?</h3>
            <p class="blog-aside__intro">Cuéntanos qué negocio tienes y qué quieres captar mejor. Te diremos por dónde empezar sin marearte.</p>
            <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20mejorar%20mi%20web%20y%20SEO%20local" class="btn btn--primary btn--full" target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>
          </div>
        </aside>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="../../index.html" class="logo logo--light" aria-label="Web Fuengirola">
          <img src="../../img/logo-wf.webp" alt="Web Fuengirola" class="logo__img" width="36" height="36" loading="lazy" />
        </a>
        <p class="footer__tagline">Webs, SEO local y automatización para negocios locales en la Costa del Sol.</p>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Blog</h4>
        <ul class="footer__links">
          <li><a href="../${posts[0].slug}/">${escapeHtml(posts[0].title)}</a></li>
          <li><a href="../${posts[1].slug}/">${escapeHtml(posts[1].title)}</a></li>
          <li><a href="../${posts[2].slug}/">${escapeHtml(posts[2].title)}</a></li>
          <li><a href="../">Ver todos los artículos</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Servicios</h4>
        <ul class="footer__links">
          <li><a href="../../servicios/diseno-web/">Diseño Web</a></li>
          <li><a href="../../servicios/seo-local/">SEO Local</a></li>
          <li><a href="../../servicios/mantenimiento/">Mantenimiento</a></li>
          <li><a href="../../servicios/">Ver todos los servicios</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Contacto</h4>
        <ul class="footer__links">
          <li><a href="https://wa.me/34622923988" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href="mailto:info@webfuengirola.com">info@webfuengirola.com</a></li>
          <li><a href="../../legal.html">Legal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; <span id="footer-year"></span> Web Fuengirola. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <script src="../../google-analytics-core.js"></script>
  <script src="../../script.js"></script>
  <a
    href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20para%20mi%20negocio"
    class="whatsapp-fab"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 22c-1.85 0-3.67-.5-5.25-1.44l-.38-.22-3.67.96.98-3.58-.24-.38A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10Zm5.48-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
    <span>Pedir presupuesto</span>
  </a>
</body>
</html>`;
}

function buildIndex() {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://webfuengirola.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://webfuengirola.com/blog/",
        },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://webfuengirola.com/blog/#blog",
      url: "https://webfuengirola.com/blog/",
      name: "Blog de Web Fuengirola",
      description:
        "Artículos sobre webs, Google, redes sociales, SEO local e IA para negocios locales.",
      image: "https://webfuengirola.com/img/blog-home-og.webp",
      inLanguage: "es",
      publisher: {
        "@type": "Organization",
        name: "Web Fuengirola",
        url: "https://webfuengirola.com/",
        logo: {
          "@type": "ImageObject",
          url: "https://webfuengirola.com/img/logo-wf.webp",
        },
      },
    },
  ];

  const allCards = [...posts, ...existingPosts].map(card).join("\n\n");
  const footerLinks = posts
    .slice(0, 6)
    .map(
      (post) =>
        `<li><a href="./${post.slug}/">${escapeHtml(post.title)}</a></li>`,
    )
    .join("\n          ");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog de diseño web en Fuengirola | Web Fuengirola</title>
  <meta name="description" content="Blog de Web Fuengirola con consejos claros sobre páginas web, Google, redes sociales, SEO local e IA para negocios que quieren captar clientes." />
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
  <link rel="canonical" href="https://webfuengirola.com/blog/" />
  <link rel="icon" type="image/webp" href="https://webfuengirola.com/favicon.webp" sizes="48x48" />
  <link rel="shortcut icon" href="https://webfuengirola.com/favicon.webp" />
  <link rel="apple-touch-icon" href="https://webfuengirola.com/apple-touch-icon.png" sizes="180x180" />
  <link rel="manifest" href="https://webfuengirola.com/site.webmanifest" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Blog de diseño web en Fuengirola | Web Fuengirola" />
  <meta property="og:description" content="Artículos claros sobre webs, SEO local, Google, redes sociales e IA para negocios locales que quieren vender mejor online." />
  <meta property="og:url" content="https://webfuengirola.com/blog/" />
  <meta property="og:image" content="https://webfuengirola.com/img/blog-home-og.webp" />
  <meta property="og:image:secure_url" content="https://webfuengirola.com/img/blog-home-og.webp" />
  <meta property="og:image:type" content="image/webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Portada del blog de Web Fuengirola" />
  <meta property="og:site_name" content="Web Fuengirola" />
  <meta property="og:locale" content="es_ES" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Blog de diseño web en Fuengirola | Web Fuengirola" />
  <meta name="twitter:description" content="Artículos claros sobre webs, SEO local, Google, redes sociales e IA para negocios locales que quieren vender mejor online." />
  <meta name="twitter:image" content="https://webfuengirola.com/img/blog-home-og.webp" />
  <meta name="twitter:image:alt" content="Portada del blog de Web Fuengirola" />
  <link rel="stylesheet" href="../cookie-banner-core.css" />
  <link rel="stylesheet" href="../style.css?v=10" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  ${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
  </script>
</head>
<body class="project-page blog-page">
  <header class="header" id="header">
    <div class="container header__inner">
      <a href="../index.html" class="logo" aria-label="Web Fuengirola">
        <img src="../img/logo-wf.webp" alt="Web Fuengirola" class="logo__img" width="36" height="36" loading="eager" />
      </a>
      <nav class="nav" id="nav" aria-label="Navegación principal">
        <ul class="nav__list">
          <li><a href="../" class="nav__link">Inicio</a></li>
          <li><a href="../servicios/" class="nav__link">Servicios</a></li>
          <li><a href="../casos/" class="nav__link">Casos de éxito</a></li>
          <li><a href="./" class="nav__link nav__link--active">Blog</a></li>
          <li><a href="../recursos/" class="nav__link">Calculadora de precios</a></li>
          <li><a href="../sobre-nosotros/" class="nav__link">Sobre nosotros</a></li>
        </ul>
      </nav>
      <a href="https://wa.me/34622923988?text=Hola%2C%20quiero%20una%20web%20para%20mi%20negocio" class="btn btn--primary header__cta" target="_blank" rel="noopener noreferrer">Pedir presupuesto</a>
      <button type="button" class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>
    <section class="subpage-hero blog-hero">
      <div class="container blog-hero__inner">
        <nav class="project-breadcrumb" aria-label="Breadcrumb">
          <a href="../index.html">Inicio</a>
          <span>/</span>
          <span>Blog</span>
        </nav>
        <div class="lang-switcher" aria-label="Idioma del blog">
          <a class="lang-switcher__btn is-active" href="./" hreflang="es">Español</a>
          <a class="lang-switcher__btn" href="../en/blog/" hreflang="en">English</a>
          <a class="lang-switcher__btn" href="../de/blog/" hreflang="de">Deutsch</a>
          <a class="lang-switcher__btn" href="../fi/blog/" hreflang="fi">Suomi</a>
        </div>
        <span class="badge">Blog para negocio local</span>
        <h1 class="subpage-hero__title">Ideas claras para que tu negocio venda mejor online</h1>
        <p class="subpage-hero__sub">Artículos breves, directos y pensados para negocios locales que quieren entender qué les conviene de verdad entre web, Google, redes sociales e IA.</p>
        <div class="subpage-hero__highlights">
          <div class="subpage-hero__highlight"><strong>Sin humo</strong><span>Explicamos lo útil y también lo que no compensa.</span></div>
          <div class="subpage-hero__highlight"><strong>Enfoque local</strong><span>Contenido pensado para captar clientes reales, no solo visitas.</span></div>
          <div class="subpage-hero__highlight"><strong>Orientado a decisión</strong><span>Contenido pensado para ayudarte a decidir qué conviene hacer antes.</span></div>
        </div>
      </div>
    </section>

    <section class="service-detail blog-listing">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Plan editorial</span>
          <h2 class="section-title">14 artículos nuevos para atacar dudas de negocio local</h2>
          <p class="section-sub">Una tanda publicada artículo a artículo para responder búsquedas concretas y conectar cada tema con una decisión real del negocio.</p>
        </div>

        <div class="blog-grid">
${allCards}
        </div>

        <section class="service-detail" style="margin-top:3rem">
          <div class="section-header" style="max-width:820px">
            <span class="section-label">Rutas útiles</span>
            <h2 class="section-title">Si has venido al blog para tomar una decisión, aquí tienes el salto corto</h2>
            <p class="section-sub">Estas son las páginas que más suelen ayudar cuando ya estás comparando formato web, SEO local o ciudad concreta y no quieres seguir leyendo contenido más general.</p>
          </div>
          <div class="services-routes__grid" style="justify-content:flex-start; margin-top:2rem">
            <a href="../servicios/diseno-web/" class="services-routes__link">Servicio de diseño web</a>
            <a href="../servicios/seo-local/" class="services-routes__link">Servicio de SEO local</a>
            <a href="../diseno-web-fuengirola/" class="services-routes__link">Diseño web en Fuengirola</a>
            <a href="../seo-local-fuengirola/" class="services-routes__link">SEO local en Fuengirola</a>
            <a href="../diseno-web-malaga/" class="services-routes__link">Diseño web en Málaga</a>
            <a href="../seo-local-malaga/" class="services-routes__link">SEO local en Málaga</a>
          </div>
        </section>

        <section class="project-detail__cta blog-home-cta">
          <div class="project-detail__cta-copy">
            <span class="section-label">Para empezar rápido</span>
            <h2 class="section-title">Si quieres salir ya, no hace falta complicarlo</h2>
            <p class="project-detail__copy">Una web sencilla bien pensada suele rendir mejor que depender solo de Instagram o Facebook. Si quieres una base clara para empezar, mira estas dos opciones.</p>
          </div>
          <div class="project-detail__cta-actions">
            <a href="../servicios/diseno-web/" class="btn btn--primary btn--lg">Ver Diseño Web</a>
            <a href="../servicios/" class="btn btn--outline btn--lg">Ver todos los servicios</a>
          </div>
        </section>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="../index.html" class="logo logo--light" aria-label="Web Fuengirola">
          <img src="../img/logo-wf.webp" alt="Web Fuengirola" class="logo__img" width="36" height="36" loading="lazy" />
        </a>
        <p class="footer__tagline">Webs, SEO local y automatización para negocios locales en la Costa del Sol.</p>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Blog</h4>
        <ul class="footer__links">
          ${footerLinks}
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Servicios</h4>
        <ul class="footer__links">
          <li><a href="../servicios/diseno-web/">Diseño Web</a></li>
          <li><a href="../servicios/seo-local/">SEO Local</a></li>
          <li><a href="../servicios/mantenimiento/">Mantenimiento</a></li>
          <li><a href="../servicios/">Ver todos los servicios</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4 class="footer__col-title">Contacto</h4>
        <ul class="footer__links">
          <li><a href="https://wa.me/34622923988" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href="mailto:info@webfuengirola.com">info@webfuengirola.com</a></li>
          <li><a href="../legal.html">Legal</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <div class="container">
        <p>&copy; <span id="footer-year"></span> Web Fuengirola. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <script src="../google-analytics-core.js"></script>
  <script src="../script.js"></script>
</body>
</html>`;
}

for (const [index, post] of posts.entries()) {
  const postDir = path.join(blogDir, post.slug);
  fs.mkdirSync(postDir, { recursive: true });
  const related = [
    posts[(index + 1) % posts.length],
    posts[(index + 2) % posts.length],
    existingPosts[index % existingPosts.length],
  ];
  fs.writeFileSync(path.join(postDir, "index.html"), article(post, related));
}

fs.writeFileSync(path.join(blogDir, "index.html"), buildIndex());

console.log(`Generated ${posts.length} blog posts and updated the blog index.`);
