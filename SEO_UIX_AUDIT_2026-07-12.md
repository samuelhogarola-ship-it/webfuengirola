# Auditoria SEO + UIX · webfuengirola.com

Fecha: `2026-07-12`

## Alcance

- Repo revisado en `/Users/sam/Desktop/webs/web fuengirola`
- Auditoria centrada en la web publica, no en el panel
- Revision basada en HTML, generadores, sitemap, robots, smoke tests y arquitectura actual del repo

## Resumen ejecutivo

La base tecnica del proyecto ya esta por encima de la media de una web local: canonicals, robots, sitemap, JSON-LD, breadcrumbs, legacy redirects y una arquitectura publica bastante mas clara que al inicio. El cuello de botella ya no es "SEO roto", sino foco comercial, consistencia de arquitectura y profundidad real en las money pages.

Ahora mismo el mejor activo del proyecto es el cluster principal:

- `/`
- `/servicios/`
- `/servicios/diseno-web/`
- `/diseno-web-fuengirola/`
- `/servicios/seo-local/`
- `/seo-local-fuengirola/`
- `/casos/`
- `/blog/`

La mayor oportunidad no es abrir mas URLs, sino hacer que esas URLs:

- compitan menos entre si
- transmitan mas prueba local
- conviertan mejor
- y no se diluyan con elementos secundarios

## Evidencia rapida

- `sitemap.xml` expone `41` URLs indexables.
- `robots.txt` ya bloquea previews privados y mantiene el sitemap publico.
- La home ya usa un H1 local fuerte en [index.html](/Users/sam/Desktop/webs/web%20fuengirola/index.html:216).
- La home ya no muestra acceso cliente en cabecera ni selector de idioma visible.
- Los restos de `lang-switcher` oculto en interiores ya se han retirado del HTML publico.
- No aparece `sameAs` en los JSON-LD revisados.
- Las imagenes publicas indexables ya declaran `width` y `height`; los restos detectados quedan solo en una landing privada fuera de indice.
- Hay `835` usos de `style=""`, señal clara de deuda de mantenibilidad UI.
- Hay `68` ocurrencias de `srcset` o `sizes`, asi que la adopcion responsive existe, pero no esta homogenizada.

## Estado actual

Lo que ya queda razonablemente bien resuelto en esta ronda:

- legacy URLs principales consolidadas
- sitemap publico limpio
- robots de previews y landings privadas
- naming publico unificado a `Web Fuengirola`
- cluster local principal ya presente en repo
- smoke suite publica util para no reabrir deuda basica
- cabecera publica de home mas enfocada, sin acceso cliente visible ni selector de idioma activo
- restos de `lang-switcher` residual retirados del HTML publico
- imagenes publicas sin `width` y `height` resueltas a nivel indexable y cubiertas con smoke
- jerarquia mas clara entre home, hub de `diseño web` y landing local de Fuengirola
- jerarquia mas clara entre el hub de `SEO local` y la landing exacta de Fuengirola
- hub de `diseño web` reforzado con mejor encaje, filtro comercial y prueba cercana sin pisar la landing local
- hub de `SEO local` reforzado con mejor encaje, expectativas y prueba cercana sin duplicar la landing exacta
- capa de prueba visible reforzada en home y en las landings BOFU principales
- landings BOFU principales reforzadas con mejor resolución de objeciones de compra
- copy de home mas compacto en los bloques que mas frenaban lectura y decision

Lo que sigue abierto:

- afinar la jerarquia entre home, hubs y landings locales
- subir prueba social y EEAT local
- simplificar friccion comercial en la home
- decidir que hacer con internacionalizacion, productos y cluster IA
- ordenar el front para que la UI no dependa tanto de estilos inline

## Informe priorizado

### Critico

1. La home sigue teniendo demasiada responsabilidad comercial a la vez: captar demanda fria, explicar servicios, mostrar casos, abrir recursos y dar acceso a clientes.
2. La home compite semanticamente con `/servicios/diseno-web/` y `/diseno-web-fuengirola/`, asi que hace falta fijar con mas dureza el papel de cada URL.
3. `/servicios/seo-local/` y `/seo-local-fuengirola/` ya separan mejor papel general y papel transaccional, pero todavia pueden afinar mas la autoridad interna a favor de ambas.
4. La home ya muestra prueba cuantificada antes y mejor repartida, pero aun faltan señales de confianza local mas duras como mini testimonios o evidencia visual mas específica.
5. El front publico depende demasiado de `inline styles`, lo que complica consistencia visual, velocidad de iteracion y control de regresiones.
6. El sitio tiene buena base SEO tecnica, pero aun no se ve un posicionamiento de marca totalmente concentrado en una promesa principal.
7. El cluster `publicidad-ia-*` puede abrir demasiado el foco antes de consolidar del todo diseño web y SEO local como pilares.
8. Falta una prueba real de indexacion y rendimiento en entorno vivo con Search Console o logs; hoy la auditoria es fuerte a nivel repo, pero no aun a nivel datos de demanda real.
9. La home todavia tiene demasiados caminos para un usuario frio incluso despues de la simplificacion hecha.
10. La internacionalizacion sigue sin estrategia real aunque ya no se vea como UI residual en publico.

### Alto

11. La home ya mejoro mucho, pero sigue haciendo demasiadas promesas de tipo distinto en el primer scroll.
12. La prioridad comercial deberia quedar mas clara: primero captar para diseño web y SEO local, despues abrir resto de servicios.
13. El enlazado de la home hacia varias rutas funciona, pero todavia dispersa parte de la autoridad hacia secciones menos rentables.
14. No hay `hreflang` en las URLs revisadas y tampoco una arquitectura internacional real que justifique mantener atributos y capas de idioma a medio camino.
15. No hay `sameAs` en la entidad principal, por lo que la marca pierde una oportunidad clara de reforzar entidad.
16. No aparecen `Review` ni `AggregateRating` en el marcado revisado.
17. La home usa `ProfessionalService` y `FAQPage`, bien, pero aun puede reforzar mucho mejor la entidad y el contexto local.
18. `/servicios/` ya esta mejor orientada, pero todavia necesita consolidarse como mapa de decisiones y no solo como listado de ofertas.
19. `/servicios/diseno-web/` ya separa mejor su papel de hub general, pero todavia puede sumar mas prueba cuantificada propia.
20. `/servicios/seo-local/` ya tiene mejor tono de encaje y decision, pero todavia puede sumar mas prueba cuantificada propia.
21. `/servicios/aplicaciones-web/` sigue con un H1 correcto para conversion, pero flojo para demanda de busqueda concreta.
22. `/servicios/hosting/` y `/servicios/mantenimiento/` tienen utilidad comercial, pero no deberian robar peso al cluster principal.
23. `/recursos/` y sus subsecciones ya no estan vacias, pero siguen teniendo mas pinta de arquitectura preparada que de hub realmente diferencial.
24. `/recursos/herramientas/` puede generar valor, pero necesita activos mas memorables o mas compartibles para merecer protagonismo SEO.
25. `/recursos/guias/` y `/recursos/checklists/` aun pueden sonar a categoria editorial secundaria en vez de a recurso imprescindible.
26. El blog tiene buena direccion, pero todavia no hay suficiente masa para dominar intenciones locales y BOFU de forma sostenida.
27. La capa de pruebas locales reales en la home ya compite mejor con la explicacion, aunque aun puede reforzarse con evidencia mas visual y comparativa.
28. Las paginas de casos funcionan bien como soporte, pero les falta una taxonomia mas clara por vertical, reto o resultado.
29. El cluster Malaga existe y puede ser util, pero conviene vigilar que no consuma foco antes de exprimir Fuengirola.
30. El copy de algunos hubs todavia puede simplificarse para responder antes a la pregunta del usuario frio.
31. La home ya se ha compactado parcialmente, pero todavia arrastra demasiados tramos editoriales y explicativos para un usuario frio.
32. El CTA principal tiende a ir siempre a WhatsApp; eso ayuda a cerrar rapido, pero reduce trazabilidad y variedad de conversion.
33. Contacto existe y esta bien resuelto, pero no tiene tanto peso comparativo frente al resto de CTAs de mensajeria.
34. No se aprecia un modulo fuerte de "por que confiar en nosotros frente a otra agencia local".
35. La home ya responde mejor a objeciones visibles, pero aun puede convertir esa capa en algo todavia mas diferencial con prueba visual o comparativas antes/despues.
36. La narrativa de marca es buena, pero aun no esta anclada a suficientes resultados o casos cuantificados.
37. El proyecto ya tiene base para competir mejor que muchas agencias locales, pero aun no explota toda la ventaja de claridad que podria tener.

### Medio

41. `sitemap.xml` tiene `41` URLs; esta bien de tamaño, pero hay que asegurar que cada una merezca ser indexada de verdad.
42. `robots.txt` es simple y correcto, aunque convendria sumar una comprobacion post-deploy en la rutina de release.
43. La home tiene H1 fuerte, pero el resto de titulos y secciones todavia pueden ordenarse mas en torno a una unica decision.
44. `/servicios/diseno-web/` ya no arrastra promesas comerciales antiguas, lo cual esta bien, pero aun puede afinar mejor el salto entre paquetes.
45. `/servicios/diseno-web/` ya explica mejor por que existe ademas de `/diseno-web-fuengirola/`, aunque todavia puede afinar mas el comparativo entre formatos.
46. `/diseno-web-fuengirola/` es una de las mejores piezas del sitio y todavia deberia recibir mas enlaces internos contextuales.
47. `/seo-local-fuengirola/` tambien esta mejor resuelta que el hub general y merece mas empuje interno desde blog, recursos y casos.
48. El hub de servicios podria incorporar mejor rutas por problema real: "necesito captar", "necesito ordenar", "necesito automatizar".
49. El blog tiene articulos utiles, pero aun faltan piezas muy BOFU con intencion de compra clara.
50. Sigue faltando una pieza muy fuerte sobre `agencia diseño web fuengirola` o alternativa semantica equivalente.
51. Sigue faltando una pieza muy fuerte sobre `cuanto tarda el seo local` o consultas cercanas de expectativa y plazo.
52. Sigue faltando una pieza comparativa clara `web vs redes sociales` enlazada desde home y servicios.
53. Sigue faltando una pieza bien pensada para objecion de precio por fases o por alcance.
54. La home tiene una seccion de credibilidad mejor que al inicio, pero todavia puede traducirse mejor a prueba comercial concreta.
55. El footer ya esta razonablemente ordenado, aunque ocupa mucho espacio repetitivo en algunas plantillas.
56. Los breadcrumbs estan bastante extendidos y eso suma.
57. El enlazado interno existe, pero aun no siempre usa anchors con suficiente intencion semantica.
58. Quedan muchas llamadas a `Pedir presupuesto`, pero menos anchors ricos del tipo `diseño web en Fuengirola` o `SEO local en Fuengirola`.
59. Los casos ayudan a confianza, aunque no todos explotan igual el contexto local en subtitulos y microcopy.
60. El sitio podria usar mejor una taxonomia de verticales: salud, servicios locales, entrenadores, negocios multilingües, operaciones.
61. La pagina `sobre-nosotros` transmite cercania, pero todavia prioriza relato sobre prueba.
62. La pagina `como-trabajamos` es util, aunque puede memorizarse mejor si se convierte en proceso mas distintivo.
63. `contacto/` tiene un enfoque correcto, pero puede reforzarse con respuesta esperada, tiempos y tipo de proyectos aceptados.
64. `legal.html` es correcta como pagina legal, aunque no necesita competir visualmente con paginas comerciales.
65. El sitio ya corrigio bastante naming antiguo, pero conviene seguir vigilando residuos en contenidos generados y portfolio legacy.
66. Los productos `/productos/*` pueden ser utiles para BOFU, pero su rol estrategico no esta del todo explicado en la arquitectura principal.
67. Si esos productos siguen vivos, deberian enlazarse con mas criterio desde servicios o casos, no quedar como isla.
68. Si no son clave para captacion, podria interesar rebajar su peso en crawl e interlinking.
69. Los clusters de IA tienen potencial, pero deben alinearse con un caso de negocio mas reconocible.
70. La home ya no se siente generica, pero aun tiene margen para sonar mas "local-first" y menos "multiestudio".
71. Faltan pequenos detalles de EEAT como fecha visible de actualizacion en algunas paginas clave de servicio o guia.
72. En el blog, autoria y organizacion existen en JSON-LD, pero visualmente podria reforzarse mejor la responsabilidad editorial.
73. La arquitectura de recursos puede crecer bien si se convierte en verdaderos activos descargables o herramientas interactivas.
74. Las paginas de recursos todavia pueden leerse como contenido de apoyo mas que como destino organicamente imprescindible.
75. La home podria aprovechar mejor el valor de haber trabajado con negocios de Fuengirola, Mijas, Benalmadena y Malaga en un mismo bloque.

### Bajo

76. El uso de `style=""` asciende a `835` ocurrencias; eso no rompe SEO, pero si dificulta mucho mantener UI consistente.
77. Hay componentes visuales repetidos que deberian consolidarse en clases compartidas.
78. Algunos bloques siguen demasiado acoplados al HTML de pagina y no a un sistema de estilos.
79. Los generadores de servicios y casos hacen mucho trabajo bien, pero todavia mantienen estructura duplicada.
80. Los contenidos generados y los manuales aun pueden derivar visualmente si no se sigue un patron comun.
81. Las imagenes clave estan mejor cuidadas que antes, pero aun quedan `7` sin `width` y `height`.
82. Esas ausencias aparecen sobre todo en blog, asi que conviene cerrarlas ahi primero.
83. Hay `68` usos de `srcset` o `sizes`, lo que indica adopcion parcial; faltaria estandarizarlo mejor en todo el sitio.
84. El criterio de imagen OG aun mezcla `.jpg`, `.webp` y `.svg` segun pagina.
85. Las imagenes de OG funcionan, pero una politica comun simplificaria mantenimiento.
86. Algunas paginas de blog podrian resumir mejor la promesa del articulo antes del scroll largo.
87. Los excerpts del blog son utiles, aunque aun pueden volverse mas BOFU en algunos casos.
88. La UI de home es potente, pero a ratos cambia demasiado de ritmo visual.
89. El sitio tiene una personalidad bastante marcada, aunque todavia puede modular mejor la densidad de informacion por bloque.
90. Algunas secciones de recursos usan titulos buenos para UX, pero no necesariamente los mas fuertes para demanda SEO.
91. El footer de algunas piezas blog/articulo podria aprovechar mejor el siguiente paso contextual.
92. La navegacion principal funciona, aunque podria testearse una version aun mas enfocada a negocio frio.
93. Las paginas de servicios secundarios podrian heredar mas prueba desde casos o microtestimonios.
94. La home tiene una buena banda de confianza, pero aun puede compactarse un poco mas para subir legibilidad.
95. Hay copy muy bueno repartido por el sitio que todavia no siempre vive en las paginas con mas valor SEO.
96. Algunas FAQs existen solo en las landings fuertes; podria estudiarse llevar parte de esa potencia a otras money pages.
97. Las categorias de recursos podrian diferenciarse visualmente mejor para que no parezcan variaciones de la misma plantilla.
98. Los hubs de servicio aun pueden incorporar mas comparacion entre opciones, no solo descripcion.
99. El sitio ya esta en un punto donde la siguiente mejora importante no es "hacer mas", sino "hacer mas obvio".
100.  La oportunidad principal sigue intacta: ser la web local mas clara, mas directa y mas util para small business en Fuengirola.

## Oportunidades frente a competidores

1. Ganar por claridad local antes que por amplitud de portfolio.
2. Convertir `diseno-web-fuengirola` en una landing de referencia con mas interlinking y mas prueba.
3. Usar `seo-local-fuengirola` como segunda money page fuerte en vez de dispersar demasiado pronto la energia en IA.
4. Hacer que los casos no sean solo portfolio, sino prueba de compra para sectores concretos.
5. Convertir el blog en apoyo BOFU y no en solo contenido inspiracional.
6. Simplificar la home lo suficiente para que la propuesta entre antes que la exploracion.
7. Reforzar entidad y confianza local para competir contra agencias con mensaje mas inflado pero menos claro.
8. Hacer que cada URL principal responda a una intencion unica y evidente.

## Checklist de implementacion

### Fase 1 · Acciones inmediatas

- [x] Sacar el boton `Clientes` de la cabecera publica de home.
- [x] Diferenciar mejor `/`, `/servicios/diseno-web/` y `/diseno-web-fuengirola/` para que home actue como entrada, el hub como servicio general y la landing como intención local exacta.
- [x] Diferenciar mejor `/servicios/seo-local/` y `/seo-local-fuengirola/` para que el hub resuma el servicio general y la landing ataque la intención local exacta.
- [x] Retirar la capa de `lang-switcher` donde ya no aportaba nada en la web publica.
- [x] Retirar el selector de idioma visible de la home mientras no exista una estrategia internacional real.
- [ ] Añadir `sameAs` en los JSON-LD si existen perfiles reales.
- [x] Reforzar home con prueba más concreta apoyada en sectores y casos reales ya publicados dentro del sitio.
- [x] Dejar las imagenes publicas indexables con `width` y `height` y sacar del foco las privadas `noindex`.

### Fase 2 · SEO de money pages

- [x] Definir la home como puerta de entrada a la propuesta local general.
- [x] Definir `/diseno-web-fuengirola/` como landing transaccional exacta principal.
- [x] Definir `/servicios/diseno-web/` como hub de servicio general, comparativo y de encaje.
- [x] Definir `/seo-local-fuengirola/` como landing transaccional exacta principal de SEO.
- [x] Definir `/servicios/seo-local/` como hub general de metodologia, encaje y alcance.
- [x] Empujar mas enlaces internos contextuales desde blog y casos hacia esas cuatro URLs.
- [ ] Revisar anchors internos para que haya mas semantica local y menos genericidad.
- [ ] Vigilar que Malaga no consuma antes la energia de Fuengirola.

### Fase 3 · UIX comercial

- [x] Compactar parte del copy de home para que la propuesta entre antes y varios bloques respiren mejor.
- [ ] Compactar el primer scroll de home un paso mas si la lectura real sigue densa en movil.
- [ ] Reforzar una seccion `para que tipo de negocios` con verticales claras.
- [x] Reforzar una seccion `que suele preguntar un negocio antes de encargar esto`.
- [x] Reforzar un modulo `por que confiar` con metodo, tiempos, ownership y casos.
- [x] Decidir si WhatsApp sigue como CTA dominante o comparte peso con formulario.
- [ ] Revisar si hay demasiados caminos en la home para un usuario frio.
- [ ] Simplificar zonas donde la exploracion pesa mas que la decision.

### Fase 4 · Contenido

- [ ] Crear o reforzar pieza fuerte sobre `agencia diseño web fuengirola`.
- [ ] Crear o reforzar pieza fuerte sobre precio y alcance real de una web local.
- [x] Crear pieza `web vs redes sociales`.
- [x] Crear pieza `cuanto tarda el SEO local`.
- [ ] Crear pieza `cuando renovar una web`.
- [x] Enlazar cada articulo a una landing, un hub y un caso concreto.
- [ ] Convertir recursos en activos mas diferenciales o rebajar su peso.

### Fase 5 · EEAT y entidad

- [ ] Añadir `sameAs` si hay Google Business Profile, LinkedIn, Instagram u otras propiedades reales.
- [ ] Mostrar mejor quien lidera el proyecto y como se trabaja.
- [ ] Añadir señales visibles de trabajos reales o sectores atendidos.
- [ ] Reforzar `sobre-nosotros` con evidencia, no solo relato.
- [ ] Reforzar `contacto` con tiempos de respuesta y tipo de proyectos encajados.

### Fase 6 · Mantenibilidad front

- [ ] Reducir progresivamente los `835` `inline styles`.
- [ ] Consolidar componentes visuales comunes.
- [ ] Revisar patrones duplicados entre HTML manual y HTML generado.
- [ ] Estandarizar mejor `srcset`, `sizes`, OG images y bloques repetidos.
- [ ] Dejar una rutina de QA post-deploy para robots, sitemap, canonicals, money pages y capturas visuales.

## Prioridad sugerida para mañana

1. Home: quitar friccion comercial innecesaria y reforzar prueba.
2. Jerarquia SEO: definir de una vez el papel de home, hub y landing local.
3. EEAT: subir entidad, confianza y pruebas visibles.
4. Contenido BOFU: ampliar solo donde apoya a las money pages.
5. UI del sistema: empezar a bajar deuda de `inline styles` y piezas duplicadas.
