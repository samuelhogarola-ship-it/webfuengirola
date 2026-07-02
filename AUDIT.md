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

## Cierre Técnico · 2026-07-01

### Alcance revisado

La revisión técnica ejecutada se ha centrado en la parte de mayor riesgo operativo del repo:

- `apps/studio-panel`
- `supabase/migrations`
- documentación y CI vinculados al panel

La web pública sigue teniendo un perfil de riesgo mucho menor porque es mayoritariamente estática. Por eso el foco de remediación se ha puesto en autenticación, redirecciones, esquema de datos y reproducibilidad de despliegue.

### Estado ejecutivo

- `Cerrado` Seguridad crítica de autenticación y redirección.
- `Cerrado` Consistencia principal entre código del panel, migraciones y documentación de despliegue.
- `Cerrado` Cobertura mínima automatizada para evitar regresiones de seguridad y de esquema.
- `Residual` Validación contra una base Supabase completamente limpia y prueba E2E autenticada del panel.

### Remediaciones ya aplicadas

#### P0 · Seguridad crítica

- Se bloqueó el `open redirect` en `/auth/callback` mediante sanitización centralizada de `next`.
- Se eliminó la dependencia de `host` y `x-forwarded-host` para generar magic links.
- La URL canónica del panel pasa a depender de `APP_URL`, con `NEXT_PUBLIC_APP_URL` alineada como espejo público.
- Se amplió la protección del `middleware` para cubrir rutas protegidas actuales del panel.

#### P1 · Despliegue y consistencia de datos

- Se añadió una migración incremental de compatibilidad para introducir `minutes_total` y `minutes_used` antes de que otras migraciones los consuman.
- Se corrigió la vista `client_summary` para evitar dobles conteos al agregar packs y actividades.
- Se incorporó la migración hardening que normaliza piezas activas del modelo (`messages`, `services`, `invoices`, `next_invoice_number`, estados y RLS relacionados).
- Se actualizó la documentación del panel y del repo para que la configuración de variables y el despliegue respondan a la arquitectura real.

#### P2 · Control de acceso y calidad

- Se añadieron tests de seguridad para callback, redirecciones internas y URL canónica de auth.
- Se añadieron tests para el alta pública de clientes con estado `pending` y rollback de usuario Auth si falla el insert de negocio.
- Se añadieron tests estructurales de migraciones para detectar roturas en la cadena SQL del panel.
- El workflow de CI del panel ejecuta `lint`, `typecheck`, `test` y `build`.

#### P3 · Endurecimiento operativo

- Se añadió `metadataBase` para evitar defaults incorrectos durante el build.
- Se limpiaron warnings relevantes del panel que degradaban la señal de CI.
- Se alineó la guía de despliegue del formulario público con los endpoints y variables reales del panel/API.

### Validación ejecutada

Se han verificado con éxito estas comprobaciones en `apps/studio-panel`:

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

Además, la documentación de entorno ahora refleja explícitamente:

- `APP_URL` como referencia canónica de servidor
- `NEXT_PUBLIC_APP_URL` como equivalente público alineado
- dependencias reales del formulario `/contacto/`
- orden esperado de validación en CI

### Riesgo residual real

No quedan hallazgos abiertos del nivel `P0` o `P1` dentro del alcance revisado, pero sí quedan dos validaciones recomendables antes de dar el cierre máximo:

- Ejecutar las migraciones sobre una base Supabase limpia real para validar el recorrido completo, no solo por inspección y tests de archivos.
- Añadir una prueba E2E autenticada del panel para cubrir login, ruta protegida y un flujo mínimo de negocio.

### Conclusión

El repo ya no está en una situación de “panel frágil con riesgo de auth y despliegue”. La base actual es razonablemente segura, reproducible y verificable para seguir iterando.

La siguiente fase ya no debería ser otra ronda de contención, sino consolidación:

- una validación real de bootstrap Supabase
- una suite E2E mínima del panel
- evolución de producto y UX sobre una base técnica mucho más estable
