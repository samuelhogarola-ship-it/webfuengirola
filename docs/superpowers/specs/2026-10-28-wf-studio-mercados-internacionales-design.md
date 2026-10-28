# WF-Studio: webs con identidad propia para México, USA y Brasil

Fecha: 2026-10-28

## 1. Intención

Ampliar WF-Studio desde su base actual en Fuengirola hacia tres mercados
internacionales prioritarios: México, Estados Unidos y Brasil.

La expansión no consistirá en traducir la web española. Cada mercado tendrá
una entrada comercial propia dentro de `webfuengirola.com`, con lenguaje,
moneda, argumentos, SEO, navegación y contenido adaptados a su audiencia.

El estudio seguirá operando desde Europa y prestando el servicio a distancia.
Las páginas podrán declarar los países y ciudades a los que realmente se
presta servicio, pero no inventarán oficinas, direcciones, equipos locales ni
sedes físicas.

## 2. Objetivos

- Mantener intacta la identidad local de WF-Studio · Web Fuengirola.
- Crear una web de mercado completa para México, inicialmente prioritaria.
- Crear una web de mercado para USA, con New York/New Jersey como foco
  comercial inicial y sin presentarlo como sede física.
- Crear una web de mercado en portugués brasileño para Brasil.
- Mostrar precios comprensibles en la moneda de cada mercado.
- Aplicar a todas las monedas distintas del euro una cobertura de conversión
  del 5 % sobre el cambio vigente.
- Reutilizar diseño, componentes, datos y generadores sin convertir los
  mercados en copias textuales de España.
- Medir leads y conversiones por mercado, idioma, página y modalidad.
- Permitir que las campañas, fichas elegibles y perfiles externos enlacen a la
  portada específica de cada mercado.

## 3. No objetivos

- No crear filiales, sociedades ni oficinas en México, USA o Brasil.
- No afirmar una presencia física que no exista.
- No crear o modificar fichas de Google Business Profile desde este trabajo.
- No incorporar todavía Australia; quedará como candidato futuro.
- No incorporar chino en esta fase.
- No eliminar alemán ni finés de la web de Fuengirola.
- No modificar `apps/studio-panel` ni el repositorio separado
  `wf-studio-panel`.
- No añadir checkout ni procesamiento de pagos a la web pública en esta fase.
- No generar de forma masiva combinaciones de país, ciudad, idioma y sector.

## 4. Arquitectura seleccionada

### 4.1 Enfoques considerados

#### A. Mercado primero dentro del dominio actual — seleccionado

Usar rutas reconocibles como `/mexico/`, `/usa/` y `/brasil/`, con los idiomas
secundarios anidados dentro de cada mercado.

Ventajas:

- coincide con las URLs que se quieren anunciar y enlazar;
- conserva la autoridad del dominio actual;
- diferencia mercado de idioma;
- permite contenido, moneda y medición propios;
- mantiene una sola infraestructura técnica.

#### B. Idioma y país combinados

Usar rutas como `/es-mx/`, `/en-us/`, `/es-us/` y `/pt-br/`.

Se descartó porque describe bien el locale técnico, pero comunica peor la idea
de una entrada de mercado clara y no coincide con la intención de enlazar
`webfuengirola.com/mexico/` o `webfuengirola.com/brasil/`.

#### C. Subdominios o dominios nacionales

Usar `mexico.webfuengirola.com`, `usa.webfuengirola.com` o dominios nacionales.

Se descartó para esta fase porque fragmentaría autoridad, despliegue,
analítica y mantenimiento antes de haber validado la demanda.

### 4.2 Rutas e idiomas

| Mercado             | Ruta principal | Idioma principal                   | Idiomas secundarios                 | Moneda |
| ------------------- | -------------- | ---------------------------------- | ----------------------------------- | ------ |
| España / Fuengirola | `/`            | español de España (`es-ES`)        | inglés, alemán y finés              | EUR    |
| México              | `/mexico/`     | español de México (`es-MX`)        | inglés para México (`en-MX`)        | MXN    |
| USA                 | `/usa/`        | inglés de Estados Unidos (`en-US`) | español de Estados Unidos (`es-US`) | USD    |
| Brasil              | `/brasil/`     | portugués de Brasil (`pt-BR`)      | ninguno inicialmente                | BRL    |

Rutas iniciales de idiomas secundarios:

- México en inglés: `/mexico/en/`.
- USA en español: `/usa/es/`.

Los idiomas de Fuengirola se mantienen en `/en/`, `/de/` y `/fi/`. Esas rutas
pertenecen al mercado español y no se reutilizarán como portadas de USA o de
otros países.

## 5. Identidad de cada mercado

### 5.1 España / Fuengirola

- Conserva el contenido, enfoque local y arquitectura actuales.
- Mantiene español, inglés, alemán y finés por la población internacional de
  Fuengirola y la Costa del Sol.
- Mantiene precios en euros.
- No se presenta como filial en Alemania o Finlandia: son idiomas para la
  audiencia real del mercado de Fuengirola.

### 5.2 México

- Es el primer mercado a implementar.
- El español debe escribirse y revisarse como español mexicano, no como una
  traducción literal del contenido español.
- La propuesta destacará calidad y experiencia europea, atención a distancia,
  alcance en México y, cuando corresponda al servicio contratado,
  infraestructura o servidores europeos.
- La afirmación sobre servidores europeos solo aparecerá donde sea verdadera y
  verificable para el producto ofrecido.
- “Calidad europea” describirá el origen, proceso y estándar de trabajo del
  estudio; no se presentará como una certificación, premio o acreditación.
- Los precios se mostrarán en pesos mexicanos.
- La URL `/mexico/` será la página de destino recomendada para campañas y para
  cualquier perfil externo elegible dirigido al mercado mexicano.
- La industria del plástico es una oportunidad sectorial prioritaria para una
  fase posterior de contenido mexicano. No se añadirá chino todavía.

### 5.3 USA

- El inglés estadounidense será el idioma principal y el español
  estadounidense el secundario.
- Los precios se mostrarán en dólares estadounidenses.
- New York/New Jersey será el foco comercial inicial por haber acogido la
  final del Mundial 2026, sin afirmar que WF-Studio dispone allí de oficina.
- La comunicación usará fórmulas como “serving businesses in New York and New
  Jersey remotely from Europe”, no “based in New York”.
- Las páginas estadounidenses por ciudad ya existentes se conservarán durante
  el primer lanzamiento. Se enlazarán desde `/usa/` y se migrarán, si procede,
  a una jerarquía de USA en una fase posterior mediante redirecciones 301,
  evitando duplicados.

### 5.4 Brasil

- Usará portugués brasileño, no portugués europeo.
- Los precios se mostrarán en reales brasileños.
- La propuesta comunicará servicio remoto, calidad europea y adaptación al
  mercado brasileño sin declarar una sede local.
- La primera versión será una portada comercial completa. Los idiomas y
  landings sectoriales adicionales dependerán de demanda demostrada.

## 6. Precios y conversión de moneda

### 6.1 Regla aprobada

Para toda moneda diferente del euro:

```text
precio local exacto = precio base en EUR × cambio vigente × 1,05
```

El 5 % se aplica después de convertir el precio base. Esta regla se aplica a
MXN, USD, BRL y a cualquier moneda no EUR que se incorpore en el futuro.

### 6.2 Redondeo comercial aprobado

El precio público se redondeará siempre hacia arriba:

- USD: al siguiente múltiplo de 5 dólares;
- MXN: al siguiente múltiplo de 100 pesos mexicanos;
- BRL: al siguiente múltiplo de 10 reales brasileños.

La fuente base de cambio será la referencia diaria del Banco Central Europeo.
La fecha y el tipo utilizados deben quedar registrados en una fuente de datos
reproducible.

### 6.3 Precio mostrado y precio cobrado

La web pública actual es estática y no tiene checkout. Por ello:

- mostrará el precio local redondeado calculado con la última referencia
  disponible;
- mostrará de forma discreta la fecha de actualización o una nota que explique
  que el importe final depende del cambio vigente;
- conservará el precio base en EUR como fuente de verdad interna;
- evitará ejecutar conversiones distintas en cada página o idioma;
- al emitir una factura o enlace de pago, se recalculará el importe exacto con
  el cambio vigente más el 5 %;
- la integración futura de esta misma regla en WF-Panel se diseñará y ejecutará
  en el repositorio separado `wf-studio-panel`.

El sistema de la web debe conservar una instantánea local de los últimos tipos
válidos para que un fallo temporal de red no impida construir o publicar el
sitio. La actualización de tipos será una operación explícita y verificable,
no una llamada de terceros realizada desde el navegador del visitante.

### 6.4 Impuestos

Las páginas internacionales no reutilizarán automáticamente “+ IVA” o “+ VAT”.
Usarán una formulación neutral equivalente a “impuestos, si corresponden”
hasta que se determine el tratamiento fiscal aplicable según cliente,
contratación y factura.

## 7. Contenido de las portadas de mercado

Cada portada tendrá, como mínimo:

1. Propuesta principal específica del mercado.
2. Explicación transparente del servicio remoto desde Europa.
3. Problemas comerciales y digitales de su audiencia.
4. Modalidades Lite, Express y Profesional en moneda local.
5. Alcance y características de cada modalidad.
6. Argumentos de calidad y experiencia verificables.
7. Portfolio o casos relevantes.
8. Proceso de trabajo a distancia.
9. Preguntas frecuentes propias del mercado.
10. Contacto y solicitud de presupuesto con mercado e idioma preseleccionados.
11. Enlaces a páginas de ciudad o sector solo cuando aporten contenido propio.

Los textos no presentarán la adaptación regional como un selector cosmético.
Cada mercado debe poder explicar por sí mismo por qué WF-Studio es una opción
válida para su audiencia.

La primera redacción regional formará parte de la implementación. Se apoyará
exclusivamente en servicios, precios, portfolio y hechos que ya sean públicos o
verificables. El propietario revisará el copy de cada mercado antes de
indexarlo. No se publicarán testimonios, reconocimientos, resultados o
afirmaciones de infraestructura que no estén documentados.

## 8. Navegación y selección de mercado

Idioma y mercado serán conceptos separados:

- el selector de idioma cambiará entre versiones equivalentes dentro del mismo
  mercado;
- un selector o enlace de mercado permitirá ir a España, México, USA o Brasil;
- cambiar de idioma no enviará accidentalmente al usuario a Fuengirola;
- cambiar de mercado llevará a la portada del mercado elegido si no existe una
  página equivalente.

El encabezado y el pie podrán compartir estructura visual, pero mostrarán
moneda, locale, propuesta y enlaces correctos para el mercado activo.

En la primera entrega, el selector de mercado se incorporará a las nuevas
portadas, a la portada principal y a las páginas comerciales producidas por el
generador compartido. No se reescribirán de forma masiva todas las páginas
manuales o históricas; recibirán el selector cuando se migren al sistema común
o cuando sean necesarias para un recorrido comercial concreto.

## 9. SEO técnico

- Cada URL tendrá canonical propio.
- Los `hreflang` se limitarán a traducciones equivalentes dentro de un mismo
  mercado.
- México usará `es-MX` y `en-MX`; USA, `en-US` y `es-US`; Brasil, `pt-BR`.
- España conservará sus grupos `es`, `en`, `de` y `fi` actuales hasta una
  migración separada de etiquetas regionales, si resulta necesaria.
- Cada grupo tendrá `x-default` apuntando a su idioma principal.
- No se relacionarán mediante `hreflang` páginas que compartan servicio pero
  tengan distinta propuesta, moneda y mercado.
- El sitemap incluirá únicamente las versiones completas e indexables.
- Los datos estructurados usarán `areaServed` para mercados realmente
  atendidos y no inventarán direcciones locales.
- La página USA podrá mencionar New York/New Jersey como mercado servido; la
  ubicación del Mundial se usará solo con contexto factual y no como prueba de
  presencia empresarial.

## 10. Formularios, contacto y medición

Los formularios de cada mercado conservarán como metadatos explícitos en el
cliente y en la analítica:

- mercado;
- idioma;
- moneda mostrada;
- modalidad elegida;
- URL de origen;
- sector, cuando corresponda.

El endpoint actual recibe un payload reducido y no almacena esos valores como
columnas independientes. Para no convertir esta fase en un cambio de backend,
mercado, idioma, moneda, modalidad y sector se incluirán de forma estructurada
en el mensaje enviado, además de los eventos analíticos. Una futura ampliación
del endpoint podrá convertirlos en campos separados sin cambiar el formulario
visible.

La analítica distinguirá como mínimo:

- visita y conversión por mercado e idioma;
- clic en WhatsApp, teléfono y correo;
- inicio y envío de formulario;
- selección de modalidad;
- cambio de mercado y de idioma;
- paso entre portada, ciudad, sector y contacto.

Los números de teléfono locales, colaboradores comerciales y telemarketing no
forman parte de esta implementación. Podrán evaluarse después con un análisis
específico por país.

## 11. Implementación técnica prevista

La web actual usa HTML estático generado mediante scripts y una fuente común
en `data/commercial-pages-data.mjs`. La ampliación debe evolucionar ese modelo,
no introducir una segunda aplicación.

El sistema necesitará:

- configuración explícita de mercados independiente de la configuración de
  idiomas;
- catálogos de copy localizados por mercado;
- precio base único en EUR;
- tipos de cambio versionados y función única de conversión/redondeo;
- generador de portadas y páginas equivalentes por mercado;
- navegación consciente de mercado e idioma;
- generación de canonical, `hreflang`, sitemap y datos estructurados;
- pruebas de rutas, moneda, redondeo, idioma y afirmaciones de ubicación.

Los HTML generados no serán la fuente manual de verdad. La configuración y el
contenido estructurado deben poder regenerarlos sin perder cambios.

## 12. Fases

### Fase 1: base común y México

- Introducir el modelo de mercados.
- Introducir conversión y redondeo con instantánea de tipos.
- Crear `/mexico/` y `/mexico/en/`.
- Adaptar formularios, navegación, sitemap, `hreflang` y analítica.
- Verificar español mexicano, MXN y mensajes de calidad europea.

### Fase 2: USA

- Crear `/usa/` y `/usa/es/`.
- Mostrar precios en USD.
- Crear el hub de New York/New Jersey y enlazar las páginas de ciudades
  estadounidenses existentes.
- Corregir el uso actual de euros y “+ VAT” en las páginas USA.
- Definir la migración futura de rutas de ciudad sin perder URLs indexadas.

### Fase 3: Brasil

- Crear `/brasil/` en portugués brasileño.
- Mostrar precios en BRL.
- Añadir contenido, formulario, SEO y medición específicos de Brasil.

### Fase 4: validación y siguientes mercados

- Comparar tráfico, consultas y leads cualificados por mercado.
- Mejorar únicamente las páginas que demuestren demanda o aprendizaje útil.
- Evaluar la landing industrial del plástico para México.
- Evaluar Australia solo después de obtener datos de las tres primeras líneas.

## 13. Criterios de publicación

Una portada de mercado no se publicará hasta cumplir:

- contenido escrito para el mercado, no traducción literal;
- locale, moneda, símbolo y redondeo correctos;
- fecha y tipo de cambio trazables;
- ausencia de direcciones u oficinas inexistentes;
- aprobación humana del copy regional y de las pruebas comerciales utilizadas;
- navegación coherente entre mercado e idioma;
- canonical, `hreflang`, sitemap y datos estructurados válidos;
- formularios que registren mercado e idioma;
- eventos analíticos diferenciados;
- revisión móvil y de accesibilidad;
- enlaces, contacto y llamadas a la acción funcionales;
- pruebas automatizadas del cálculo del 5 % y sus redondeos;
- copia fiscal neutral revisada antes de indexar.

## 14. Señales de éxito

- Solicitudes de presupuesto cualificadas procedentes de México, USA o Brasil.
- Conversión desde las portadas de mercado hacia contacto o WhatsApp.
- Impresiones y clics orgánicos para búsquedas comerciales regionales.
- Uso real de las versiones secundarias en inglés o español.
- Capacidad de actualizar precios sin editar manualmente todas las páginas.
- Evidencia suficiente para decidir si ampliar sectores, ciudades o Australia.

## 15. Decisiones delegadas a la implementación

La persona que implemente podrá decidir, sin cambiar este diseño:

- nombres exactos de módulos y archivos de configuración;
- estructura interna de los datos de mercados y tipos de cambio;
- microcopy de la nota de conversión y de impuestos;
- formato visual del selector de mercado;
- cadencia operativa de actualización de la instantánea de cambio, siempre que
  el tipo cobrado se recalcule al momento de facturar o generar el pago;
- orden exacto de secciones dentro de cada portada, manteniendo el contenido
  mínimo definido.
