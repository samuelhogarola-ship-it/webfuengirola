export const blogCoverBySlug = {
  "web-para-entrenador-personal-contenidos-contacto":
    "blog-entrenador-personal.webp",
  "como-medir-contactos-web-negocio-local": "blog-medir-contactos.webp",
  "contenidos-locales-utiles-sin-duplicar-paginas":
    "blog-contenido-local.webp",
  "diseno-web-para-negocio-local-en-fuengirola":
    "blog-local-web-fuengirola.webp",
  "errores-comunes-en-webs-de-negocios-locales": "blog-errores-web-local.webp",
  "google-business-profile-y-web-como-trabajan-juntos":
    "blog-google-business-web.webp",
  "cuando-conviene-una-web-de-una-sola-pagina": "blog-web-one-page.webp",
  "web-para-restaurante-en-fuengirola": "blog-restaurante-fuengirola.webp",
  "web-para-clinica-y-fisioterapia-en-fuengirola":
    "blog-clinica-fisioterapia.webp",
  "seo-local-para-servicios-a-domicilio": "blog-servicios-domicilio.webp",
  "whatsapp-en-la-web-para-convertir-mas-clientes":
    "blog-whatsapp-web-clientes.webp",
  "velocidad-web-en-movil-y-seo-local": "blog-velocidad-movil-seo.webp",
  "resenas-de-google-y-pagina-web": "blog-resenas-google-web.webp",
  "ia-en-buscadores-y-negocios-locales": "blog-ia-buscadores-locales.webp",
  "landing-page-para-campanas-de-google-y-facebook": "blog-landing-ads.webp",
  "mantenimiento-web-que-incluye-y-cuando-compensa":
    "blog-mantenimiento-web.webp",
  "dominio-hosting-y-correo-para-negocio-local":
    "blog-dominio-hosting-correo.webp",
  "cuanto-tarda-el-seo-local": "blog-seo-plazos.webp",
  "web-vs-redes-sociales-para-negocio-local": "blog-web-redes-sociales.webp",
  "por-que-crear-una-web-en-2026": "blog-web-2026-og.webp",
  "sabias-que-cada-vez-mas-gente-usa-ia-para-encontrar-un-servicio":
    "blog-ia-servicios-og.webp",
  "seo-local-fuengirola-malaga-y-publicidad-con-ia":
    "blog-seo-ciudades-ia.webp",
  "cuanto-cuesta-una-pagina-web-en-fuengirola-y-malaga":
    "blog-precio-web-local.webp",
  "como-salir-en-google-maps-en-fuengirola-y-malaga":
    "blog-google-maps-local.webp",
};

export function withBlogCover(post) {
  return { ...post, image: blogCoverBySlug[post.slug] ?? post.image };
}
