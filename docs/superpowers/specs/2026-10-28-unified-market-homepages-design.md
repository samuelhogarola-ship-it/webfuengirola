# Portadas unificadas de WF-Studio por idioma y país

Fecha: 2026-10-28

## Intención

La portada española de WF-Studio para Fuengirola es la única referencia de
estructura, diseño, componentes y comportamiento. Las demás versiones no son
plantillas alternativas: deben ser adaptaciones regionales de ese mismo
modelo.

El lanzamiento conjunto incluye España, México, USA y Brasil. Cada país
mantiene identidad comercial, idioma, moneda, SEO y contacto propios sin
inventar oficinas o presencia física local.

## Modelo común

- Todas las portadas usan la estructura visual de `/`: cabecera, hero
  cinematográfico, presentación de servicios, portfolio/casos, proceso,
  confianza, contacto y pie.
- El HTML de cada portada se genera desde una plantilla estructural única y
  datos regionales; ningún HTML generado es fuente manual de verdad.
- España/Fuengirola conserva el aspecto y contenido español actual como
  referencia, pero pasa por el mismo generador que las demás versiones.
- Los idiomas de España (`/`, `/en/`, `/de/`, `/fi/`) son adaptaciones
  equivalentes de la portada de Fuengirola, no landings comerciales con otro
  diseño.
- México (`/mexico/`, `/mexico/en/`), USA (`/usa/`, `/usa/es/`) y Brasil
  (`/brasil/`) usan el mismo modelo visual, con copy escrito para cada mercado.

## Navegación

- Idioma y país siguen siendo selectores separados.
- Cambiar de idioma conserva el país.
- Cambiar de país conserva el idioma cuando el destino lo ofrece: España EN
  ↔ México EN ↔ USA EN; España ES ↔ México ES ↔ USA ES.
- Si el destino no ofrece el idioma actual, se usa el idioma principal de ese
  país. Brasil, por ahora, siempre conduce a `pt-BR`.
- Los cuatro países aparecen juntos en el selector cuando sus portadas están
  completas y verificadas.

## Adaptación regional

- España: español, inglés, alemán y finés; EUR; Fuengirola/Costa del Sol.
- México: español mexicano e inglés; MXN; servicio remoto desde Europa y
  estándares europeos, sin oficina mexicana ficticia.
- USA: inglés estadounidense y español estadounidense; USD; foco comercial
  New York/New Jersey, sin afirmar sede física.
- Brasil: portugués brasileño; BRL; servicio remoto desde Europa, sin sede
  brasileña ficticia.
- Los precios no EUR usan `EUR × tipo BCE × 1,05` y el redondeo aprobado del
  diseño internacional existente.
- La copia fiscal permanece neutral y la fecha del cambio es visible.

## SEO y publicación

- Cada URL tiene canonical propio, locale regional y datos estructurados con
  `areaServed` correcto.
- `hreflang` solo une idiomas equivalentes del mismo mercado; `x-default`
  apunta al idioma principal de ese mercado.
- Sitemap y contenedor incluyen conjuntamente las cinco nuevas rutas de
  México, USA y Brasil, además de las cuatro portadas españolas existentes.
- Las rutas estadounidenses antiguas por ciudad se conservan y pueden
  enlazarse desde USA; no se redirigen ni eliminan en este trabajo.
- No se despliega ni indexa hasta que las nueve portadas, sus textos y sus
  afirmaciones superen revisión visual y automatizada.

## Formularios y analítica

- Cada portada conserva mercado, locale, moneda, plan/servicio y URL de origen
  en formulario y analítica sin alterar el contrato del backend.
- Los enlaces de WhatsApp y contacto usan copy y rutas del mercado activo.

## No objetivos

- No modificar `apps/studio-panel` ni `wf-studio-panel`.
- No añadir China, Australia, checkout, filiales ni direcciones locales.
- No migrar en masa las páginas interiores históricas; esta fase unifica las
  nueve portadas y deja sus recorridos esenciales correctos.

## Criterios de aceptación

- Las nueve portadas comparten la misma estructura y clases principales que
  la portada española de referencia.
- Ninguna portada conserva el antiguo modelo `commercial-page--home`.
- Los selectores realizan las correspondencias y fallbacks definidos.
- Todas las monedas, precios, locales, canonical, `hreflang`, datos
  estructurados, formularios y analítica son correctos.
- No hay desbordamiento horizontal ni errores de consola en 390 px y
  escritorio.
- La generación es determinista y las pruebas completas del repositorio pasan.

## Enfoques considerados

1. **Plantilla única generada — seleccionado.** Evita divergencias y convierte
   ES/Fuengirola en fuente estructural real.
2. Copias manuales por idioma/país. Rechazado porque volverían a separarse.
3. Mantener dos plantillas e igualar su CSS. Rechazado porque conserva la causa
   del problema actual.
