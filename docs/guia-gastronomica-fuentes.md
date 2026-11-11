# Guía gastronómica: fuentes y mantenimiento

Revisión: 11 de noviembre de 2026.
Ruta: `/que-hacer/turismo-gastronomico-espana`.
Firma pública: Equipo de Lugares Llenos.

## Enfoque editorial

Artículo original inspirado en la propuesta Biteseeing de GetYourGuide. Combina nueve fichas contrastadas con orientación propia para organizar escapadas. No se afirma haber realizado personalmente las actividades. Se distingue disponibilidad de la ficha de plazas para una fecha concreta; estas últimas deben consultarse en el calendario de la plataforma. No se fijan precios, puntuaciones ni descuentos volátiles.

Fuente de la campaña y metodología:
https://www.getyourguide.press/blog/biteseeing

Encuesta encargada a Bounce Insights en octubre de 2026: 1.252 adultos de 18–64 años de Reino Unido, Francia, Alemania e Italia. No incluye España. Los crecimientos de reservas son datos de GetYourGuide, no del conjunto del mercado turístico.

Las URLs canónicas de las nueve actividades y las condiciones extraídas se conservan en `app/que-hacer/turismo-gastronomico-espana/experiencias.ts`. Revisar al actualizar: idiomas, horarios de mercados, accesibilidad, edades mínimas y diferencias entre modalidades. Se descartaron dos resultados de catálogo que al abrirlos ya no mostraban una ficha de actividad.

## Afiliación

Identificador `3B0Y74E`, recuperado de la integración existente `components/ConsentScripts.tsx` (`data-gyg-partner-id`). No se cambió la integración de cookies ni el analizador.

Formato oficial de enlace manual: URL del producto + `?partner_id=` + identificador.
https://partner.getyourguide.support/hc/en-us/articles/13981115676061-Deep-links-101
https://partner.getyourguide.support/hc/en-us/articles/13830964721693-Trouble-with-unique-link-not-found-error

Los nueve botones incorporan `rel="sponsored nofollow noopener noreferrer"`. La función de enlaces valida el dominio y utiliza URL.searchParams. No se añaden campañas ni códigos no verificados. Se han verificado configuración y formato; la atribución real de conversiones solo podrá comprobarse en los informes del portal de afiliados.

## Fotografías y procedencia

Material facilitado por el equipo de comunicación para la cobertura editorial de la historia Biteseeing, enlazado desde su nota de prensa y ofrecido en su correo de presentación. Uso limitado a esta cobertura, no licencia abierta ni permiso de reventa. Se conserva crédito editorial y enlace al material en el artículo.

Carpeta pública de prensa:
https://drive.google.com/drive/folders/1mDhCVwJZc0W1L_r_3OZ-c0ifF8MS-B5n

| Archivo de origen | ID de Drive | Uso local | Crédito |
| --- | --- | --- | --- |
| Salt Lanzarote | 1T69lqGU9rzIf_DS16vyoaQBteqcrASdd | janubio.webp y portada.jpg | Facilitada por GetYourGuide; sin autor individual indicado en metadatos examinados |
| Vanilla | 1EwwX_xY4yBSptQZXmczT-G9taJSh8MOz | vainilla.webp | Angelo Dal Bo (dc:creator en el original), facilitada por GetYourGuide |
| Salt in hand | 1zbAwweHPLZP1knptk0DsfEaMMiO0AhW- | sal.webp | Facilitada por GetYourGuide; sin autor individual indicado en metadatos examinados |

Adaptaciones: orientación, reducción de resolución, compresión WebP/JPEG y recorte de presentación. No se generaron ni alteraron elementos de las fotografías. La vainilla se identifica como imagen del ingrediente, no como fotografía de la finca o del tour.

## Integración y comprobaciones

Página estática dentro de la arquitectura Next.js existente; no cambia tablas, autenticación, rutas de ciudades ni dependencias. Tarjeta de entrada en Qué hacer y URL en el sitemap existente. Metadatos propios: canonical, descripción, Open Graph, Twitter, Article y BreadcrumbList. Sin marcado de reseñas, puntuaciones o precios inventados.

- `npm run build`: correcto.
- HTML servido: un H1, canonical y Open Graph de la guía, autor corporativo, JSON-LD válido.
- Nueve enlaces con el identificador correcto, relación sponsored y nueva pestaña.
- Anclas y preguntas desplegables comprobadas.
- HTTP 200 para la guía, Qué hacer, las siete guías enlazadas, Eventos y cuatro archivos de imagen.
- Sitemap XML válido, con la nueva URL.
- Navegador: comprobación visual y ancho móvil de 390 px sin desbordamiento de página; tabla con desplazamiento propio. Sin errores de consola observados.
- Cambios de Bocairent previamente presentes conservados e independientes de esta entrega.

## Entrega a prensa

URL prevista: https://www.monumentosllenos.com/que-hacer/turismo-gastronomico-espana
Destinatario indicado por la campaña: press@getyourguide.com
Asunto solicitado: Affiliate Partner: Biteseeing
Compartir la URL una vez comprobada su publicación. No se envía correo como parte de esta modificación del sitio.
