# Resolución gradual del proyecto por fases

## Objetivo

Resolver el trabajo pendiente sin introducir cambios radicales, usando GitHub como fuente compartida entre ordenadores y cerrando cada fase con verificación antes de comenzar la siguiente.

## Principios de trabajo

- El repositorio Git de la raíz representa todo el proyecto. No se crearán repositorios anidados.
- Se preservarán todos los cambios locales existentes.
- No se ejecutarán `pull`, `commit`, `merge`, `rebase` ni `push` sin informar al usuario inmediatamente antes y recibir autorización para esa operación.
- Cada bloque funcional tendrá cambios, pruebas y revisión propios.
- No se comenzará una fase posterior hasta cerrar o aplazar explícitamente la anterior.
- Se evitará trabajar simultáneamente desde dos ordenadores. El traspaso recomendado será `commit` y `push` en el equipo de origen, seguido de `pull` antes de editar en el equipo de destino.
- Los secretos, `.env`, dependencias, cachés y artefactos generados permanecerán fuera de Git.

## Infraestructura de Analytics

El proyecto utiliza dos VPS distintos y no deben mezclarse:

- `2.24.10.239`: infraestructura de Agama y Marketplace.
- `187.124.55.36`: infraestructura personal y proyectos administrados desde WF Studio.

Los informes mensuales de WF Studio utilizarán la instancia personal `https://analytics.187.124.55.36.sslip.io`. La documentación que describa la instancia antigua de `2.24.10.239` como instancia general deberá aclarar su alcance o actualizarse según el contexto.

## Fase 1: Git y conservación del trabajo

### Alcance

- Inventariar el commit local que todavía no está en `origin/main`.
- Inventariar archivos modificados, nuevos, ignorados y no preparados.
- Revisar los cambios para detectar secretos, archivos generados o mezclas de funcionalidades.
- Separar el trabajo en unidades lógicas:
  - contenido de estrategia de servicios ya confirmado localmente;
  - reglas de colaboración en `AGENTS.md`;
  - informes estadísticos mensuales y su documentación;
  - cualquier corrección necesaria descubierta durante la verificación.
- Verificar cada unidad antes de proponer su commit.
- Sincronizar con GitHub solo después de autorización explícita.

### Criterios de cierre

- No existen secretos ni artefactos generados preparados para Git.
- Los cambios se entienden y están separados por propósito.
- Las verificaciones relacionadas pasan.
- El usuario ha autorizado los commits y el `push` correspondientes.
- `main` queda alineada con `origin/main` y el árbol de trabajo queda limpio, salvo cambios aplazados y documentados.

## Fase 2: Informes mensuales y Analytics

### Alcance

- Revisar el endpoint mensual, la consulta a Umami, la generación Markdown, el almacenamiento, el correo y el cron.
- Confirmar que la instancia predeterminada sea el VPS personal `187.124.55.36`.
- Mantener las credenciales únicamente en variables de entorno del servidor.
- Validar autenticación del cron, mes natural anterior, sitios sin `websiteId`, idempotencia del email y fallos parciales de Umami.
- Revisar el comportamiento del almacenamiento en el entorno real de despliegue; no depender de persistencia local efímera como archivo histórico definitivo.
- Ejecutar pruebas específicas, lint, comprobación de tipos y build de `apps/studio-panel`.
- Actualizar la documentación operativa con la separación correcta de VPS.

### Criterios de cierre

- Las pruebas del módulo pasan.
- Lint, tipos y build no presentan errores atribuibles al cambio.
- Ninguna contraseña o token aparece en Git.
- El cron y la documentación apuntan al VPS correcto.
- El mecanismo de conservación de informes es compatible con el despliegue elegido.

## Fase 3: Saneamiento de `NEXT.md` y `NEXT.me`

### Alcance

- Contrastar ambos archivos con el estado actual del repositorio.
- Eliminar duplicados y marcar tareas terminadas u obsoletas.
- Separar tareas de la web pública, Studio Panel, infraestructura y contenido.
- Convertir objetivos amplios en entregas pequeñas con un resultado verificable.
- Ordenar el backlog según impacto, riesgo y dependencia.

### Criterios de cierre

- Existe una única visión coherente de lo pendiente.
- Cada tarea indica el área afectada y una condición observable de finalización.
- Analytics refleja correctamente los dos VPS.

## Fase 4: Mejoras rápidas y de bajo riesgo

### Alcance

- Corregir el icono o recurso usado en la vista previa de Google.
- Revisar metadatos, iconos, canonical, datos estructurados y recursos sociales de las páginas prioritarias.
- Actualizar el `README.md` raíz para reflejar la web estática y `apps/studio-panel`.
- Revisar la generación y cobertura de `sitemap.xml`.
- Aplicar mejoras SEO acotadas, comenzando por errores objetivos antes de reescribir contenido.

### Criterios de cierre

- Los iconos y metadatos se resuelven mediante rutas públicas válidas.
- Las páginas prioritarias superan las comprobaciones SEO y de enlaces definidas por el proyecto.
- El sitemap contiene las URLs públicas canónicas previstas.
- El `README.md` describe con precisión la arquitectura y los flujos de verificación.

## Fase 5: Mejora gradual de la landing

### Alcance

- Usar la sección de proceso existente como referencia visual.
- Evaluar jerarquía, propuesta de valor, pruebas de confianza, llamadas a la acción y experiencia móvil.
- Modificar una sección por ciclo, conservando el lenguaje visual actual.
- Realizar una revisión visual y funcional después de cada grupo pequeño de cambios.

### Criterios de cierre

- La propuesta y el CTA principal se comprenden en la primera pantalla.
- La landing conserva coherencia visual con el proyecto.
- No aparecen regresiones de accesibilidad, diseño adaptable, enlaces ni rendimiento básico.

## Fase 6: Formulario recomendador comercial

### Alcance funcional

- Flujo corto de preguntas con progreso visible.
- Preguntas sobre web actual, captación, número de páginas, usuarios, catálogo, contenidos SEO, reservas, pagos, automatizaciones, gestión de contenidos y área privada.
- Motor de clasificación independiente de la interfaz que recomiende `web simple` o `web personalizada`.
- Resultado inmediato con explicación breve.
- Resumen editable antes del envío.
- Captura mínima de nombre y un medio de contacto válido: email o teléfono.
- Envío de respuestas, clasificación y datos de contacto mediante el flujo seguro existente del proyecto o una extensión compatible.
- Estados accesibles de validación, envío, éxito y error.

### Criterios de cierre

- La lógica se prueba de forma aislada con casos representativos y límites.
- El formulario funciona con teclado y en móvil.
- El lead recibido incluye respuestas y recomendación.
- No se exponen secretos ni se confía únicamente en validación del navegador.
- Las pruebas automáticas y la comprobación visual pasan.

## Fase 7: Cierre general

### Alcance

- Ejecutar las verificaciones completas de la web pública y Studio Panel.
- Revisar visualmente los recorridos modificados.
- Actualizar el backlog con resultados y siguientes pasos reales.
- Revisar que los cambios estén divididos en commits comprensibles.
- Sincronizar GitHub tras autorización.

### Criterios de cierre

- Las verificaciones pasan o cualquier excepción está documentada y aceptada.
- El árbol de trabajo está limpio.
- La rama local y su upstream están sincronizados.
- El otro ordenador puede recuperar todo el trabajo versionado mediante Git.

## Orden de ejecución

Las fases se ejecutarán en orden. La primera implementación se limitará a la Fase 1. Antes de iniciar cada fase posterior se revisará su alcance con el usuario para impedir que el plan se convierta en un rediseño general no controlado.
