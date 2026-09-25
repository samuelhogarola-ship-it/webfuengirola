# Web Fuengirola · Recuperación de portada y portfolio móvil

Primera versión desarrollada: 2026-09-24T23:32:56+08:00. Última actualización: 2026-09-25T15:27:35+08:00 (Asia/Makassar).

## Estado

- Desarrollado: cambios locales implementados y verificados; revisión en GitHub: https://github.com/samuelhogarola-ship-it/webfuengirola/pull/117 (borrador).
- Fusionado: no. Rama `fix/restore-visual-home-portfolio`.
- Publicado: no. La web de producción aún muestra la versión anterior a esta recuperación.
- Registro en WF-Studio pendiente: el panel exige iniciar sesión y la configuración local antigua de Supabase falla al resolver DNS. No se ha creado ninguna entrega ni adjunto en el panel. Identificadores de cliente/proyecto y búsqueda de duplicados pendientes de acceso.

## Cambios

Recuperada la portada española original con Northern Lights, fondo negro, composición de pantallas, servicios, casos destacados y calculadora desde el commit `0e69a9206056f988fddaae7b6977e08e517062e7`. Ahora se recupera el cuerpo completo de la portada: también cabecera, navegación, pie, WhatsApp flotante y transición de Servicios. Se corrige el contraste del menú móvil, y las transiciones respetan movimiento reducido y clics modificados. La versión SEO posterior había reemplazado esa composición por texto. El generador conserva ahora la plantilla original y mantiene metadatos y enlaces de idiomas actuales.

La restauración del cuerpo original corresponde a la portada española; las portadas en otros idiomas conservan sus páginas comerciales actuales.

El menú se llama Portfolio. Los catálogos de los cuatro idiomas muestran siete portadas enlazadas, con aparición al desplazarse. En móvil las tarjetas se disponen verticalmente, sin el carrusel ni superposición antiguos. Sport Massage, Personal Trainer y Agama usan las capturas originales disponibles; el resto conserva sus recursos de proyecto. Se respeta movimiento reducido y las tarjetas siguen visibles sin JavaScript.

Se versionan estilos y JavaScript para renovar la caché en un futuro despliegue. Se elimina el FAQ estructurado de la portada española que ya no coincidía con las preguntas visibles.

## Comprobaciones

- Build completo: correcto.
- 35 pruebas unitarias: superadas.
- Suite de navegador: 59 de 61 superadas en la pasada completa; las dos restantes agotaron el tiempo al iniciar el navegador y superaron la repetición (legal canonical y landings locales).
- Verificación de esta corrección: seis pruebas de navegador superadas; portada, menú oscuro, siete imágenes cargadas, enlaces a fichas, aparición y ausencia de desbordamiento a 360, 390, 768 y 1440 píxeles; movimiento reducido, ausencia de JavaScript y transición real a Servicios.
- Sintaxis JavaScript y ESLint de los archivos modificados revisados: sin errores.
- Revisión de código independiente: corregida la divergencia del FAQ estructurado; en esta corrección se detectaron y resolvieron el contraste del menú móvil y los activadores de transición.
- Capturas móviles adjuntas a esta carpeta; pendientes de subir y verificar desde WF-Studio.

## Enlaces y archivos

- Repositorio: https://github.com/samuelhogarola-ship-it/webfuengirola
- Preview local: http://127.0.0.1:3466/ (solo este ordenador).
- Producción: https://webfuengirola.com/ (sin esta recuperación publicada).
- PR: https://github.com/samuelhogarola-ship-it/webfuengirola/pull/117 (borrador).
- [Portada móvil](webfuengirola-restauracion-2026-09-24/portada-movil.png)
- [Portfolio móvil](webfuengirola-restauracion-2026-09-24/portfolio-movil.png)

## Pendientes

Revisar la propuesta, fusionar y desplegar solo cuando corresponda; verificar después la versión real en producción. Acceder a WF-Studio, identificar el cliente y proyecto concretos, buscar una entrega existente, registrar o actualizar esta ficha y sus capturas, y releer el registro y los adjuntos para confirmar persistencia y acceso.
