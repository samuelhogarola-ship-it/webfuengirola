# AUDIT

## Estado del Proyecto

`webfuengirola.com` ha dejado de ser una landing aislada y ya funciona como una base comercial más completa:

- home de captación
- páginas de servicios y productos
- portfolio/casos
- blog estático optimizado para SEO

La dirección actual es buena: el proyecto transmite más autoridad, más claridad y más intención comercial que una landing simple.

## Dirección Estratégica

El proyecto debería seguir este modelo:

- web pública rápida y estática para captar
- blog pensado para posicionar búsquedas con intención
- productos claros para cerrar por WhatsApp o formulario
- futuro módulo privado para clientes con seguimiento básico

Eso separa muy bien las piezas:

- marketing y SEO por un lado
- operación y relación con clientes por otro

## Diagnóstico SEO

### Fortalezas

- URLs limpias en blog y productos principales.
- Blog con metadatos completos y JSON-LD correcto.
- Buen punto de partida en OG, canonical y estructura semántica.
- Base rápida, ligera y favorable para Core Web Vitals.

### Debilidades

- El estándar SEO no está unificado en todo el sitio.
- `sitemap.xml` necesita mantenimiento activo al crecer contenido.
- El enlazado interno todavía puede aprovechar mejor el blog para empujar productos.
- Algunas páginas antiguas mantienen una capa SEO más básica que las nuevas.

### Riesgo

Si el blog evoluciona pero home, productos y portfolio no suben al mismo nivel, se nota una brecha entre “contenido nuevo bien hecho” y “estructura comercial antigua”.

## Diagnóstico UI/UX

### Fortalezas

- Estética sobria y seria.
- Mejora clara en la presentación del blog.
- Buen uso de cards, espacios limpios y CTAs visibles.

### Debilidades

- La home todavía puede explicar mejor la propuesta en segundos.
- No todas las páginas tienen la misma jerarquía visual.
- Falta una ayuda guiada para usuarios que no saben qué servicio necesitan.

### Oportunidad

Añadir un recomendador corto de tipo de web puede convertir visitas frías en leads mejor cualificados sin meter fricción innecesaria.

## Producto y Oferta

La escalera de valor empieza a estar clara:

- `Web Lite`
- `Web Express`
- soluciones personalizadas / web app / mini SaaS

Siguiente mejora estratégica:

- explicar todavía mejor para quién es cada opción
- reducir dudas entre `Web Lite` y `Web Express`
- usar blog y portfolio como prueba de criterio, no solo de diseño

## Futuro: Área Cliente

El futuro login de clientes encaja bien, pero conviene tratarlo como producto separado, no como “añadido rápido”.

### Hipótesis correcta para MVP

Un cliente quiere entrar y entender en 20 segundos:

- qué contrató
- en qué fase está su proyecto
- qué necesita de su parte
- qué entregas tiene disponibles

### Alcance MVP recomendado

- login simple
- vista de estado
- resumen del servicio
- enlaces/entregables
- próximos pasos
- contacto rápido

### Decisión de arquitectura

No mezclar esto con WordPress ni con el blog.

Recomendación:

- site público sigue estático
- blog puede migrar a WordPress en el futuro
- área cliente vive aparte como app pequeña

## Current Focus

Subir consistencia entre SEO, UX comercial y arquitectura futura para que el proyecto escale sin rehacerlo entero dentro de dos meses.
