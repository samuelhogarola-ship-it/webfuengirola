# Web Fuengirola · Navegación, Vokabel Lab y Web Solidaria

Última actualización: 2026-09-25T15:53:23+08:00.

## Estado

- Desarrollado: cambios implementados; verificación final de navegador completada.
- Fusionado: no. Esta entrega es posterior a la restauración fusionada en la PR #117.
- Publicado: no.
- Registro en WF-Studio pendiente: no hay sesión autenticada disponible; el intento de acceso anterior mostraba formulario de entrada y el navegador integrado no estaba disponible. La configuración antigua de Supabase no resuelve DNS. Cliente, proyecto y posible entrega existente pendientes de verificar. No se ha creado ni actualizado un registro en el panel.

## Cambios

Selector de idiomas desplegable con enlaces a páginas equivalentes, accesible mediante teclado y sin JavaScript. Cabecera en una sola fila en escritorio, sin textos partidos; menú móvil por debajo de 1200 px. Escape y clic exterior cierran el desplegable. Corregido el margen que causaba desbordamiento horizontal de la portada en tablet.

Vokabel Lab usa una captura real de https://www.vokabellab.com/ obtenida el 25 de septiembre de 2026, sin aviso de cookies, optimizada en WebP. Se aplica al catálogo, ficha de proyecto y metadatos sociales. Archivo: img/vokabellab-real.webp.

Web Solidaria incluye Horses of Gili con descripción de su misión de bienestar equino, estado «En desarrollo» y un espacio provisional para la futura web. El enlace «Conocer la asociación» lleva a su web actual; no presenta el rediseño como publicado ni ofrece paseos a caballo.

## Revisión

- Build completo y 35 pruebas unitarias: correctos.
- ESLint de archivos modificados: correcto.
- Revisión independiente: corregida la propagación de Escape al cerrar el menú móvil.
- Primera pasada de navegador: 33 pruebas superadas; tres fallos investigados (desbordamiento de 2 px en tablet y comparación de bordes en vez de centros de enlaces). Repetición final: seis pruebas superadas, incluyendo las tres anteriores, Escape en móvil, enlaces de idioma sin JavaScript, portada real y ficha solidaria.

## Enlaces

- Revisión local: http://127.0.0.1:3466/?restauracion=13
- Web Solidaria local: http://127.0.0.1:3466/web-solidaria/
- PR: pendiente de creación.
- Producción: https://webfuengirola.com/ — sin verificar publicación de esta entrega.
- [Cabecera en escritorio](webfuengirola-navegacion-proyectos-2026-09-25/cabecera-escritorio.png).
- [Captura real de Vokabel Lab](../../img/vokabellab-real.webp).
- Adjuntos pendientes de subir y verificar en WF-Studio.
