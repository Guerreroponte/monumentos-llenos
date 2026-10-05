import logo from "@/app/vista-previa/althaia/logo.jpeg";
import brindis from "@/app/vista-previa/althaia/foto1.jpg";
import fabrica from "@/app/vista-previa/althaia/foto2.png";
/* eslint-disable @next/next/no-img-element -- Embedded, local review assets. */
import styles from "@/app/vista-previa/althaia/althaia.module.css";

export default function AlthaiaPreview() {
  return <div className={styles.page}>
<main>
<div className="notice">
<strong>Propuesta para Cervezas Althaia</strong>
<span>Textos, imágenes y publicación pendientes de su aprobación.</span>
</div>
<section className="hero" aria-labelledby="titulo">
<div>
<p className="eyebrow">Propuesta de marca colaboradora</p>
<h1 id="titulo">Cervezas Althaia</h1>
<p>Cerveza de Altea, cultura cervecera y sabores locales para descubrir en Lugares Llenos.</p>
<div className="chips">
<span className="chip">Altea, Alicante</span>
<span className="chip">Cultura cervecera</span>
<span className="chip">Experiencias locales</span>
</div>
</div>
<div className="logo">
<img src={logo.src} alt="Cervezas Althaia Mediterranean Brewery" />
</div>
</section>
<div className="intro">
<section className="card about">
<p className="eyebrow">Qué es Cervezas Althaia</p>
<h2>Cerveza con origen mediterráneo</h2>
<p>Cervezas Althaia elabora sus cervezas en Altea, en la Marina Baixa. Su identidad está ligada al Mediterráneo y a una forma de disfrutar la cerveza con calma.</p>
<p>En su fábrica se puede conocer el proceso de elaboración y participar en una visita con cata y maridaje local.</p>
</section>
<aside className="card">
<p className="eyebrow">Enlaces</p>
<span className="status">Pendiente de aprobación de la marca</span>
<nav className="links" aria-label="Enlaces de Cervezas Althaia">
<a href="https://cervezasalthaia.com/">Web oficial <span aria-hidden="true">↗</span>
</a>
<a href="https://cervezasalthaia.com/collections/all">Tienda online <span aria-hidden="true">↗</span>
</a>
<a href="https://www.instagram.com/cervezasalthaia/?hl=es">Instagram <span aria-hidden="true">↗</span>
</a>
<a href="https://cervezasalthaia.com/pages/visitas-y-catas">Visitas y catas <span aria-hidden="true">↗</span>
</a>
</nav>
</aside>
</div>
<div className="features">
<section className="card">
<span className="feature-number">01 / ORIGEN</span>
<h3>Cerveza de Altea</h3>
<p>Una marca elaborada en la Marina Baixa, junto al Mediterráneo.</p>
</section>
<section className="card">
<span className="feature-number">02 / DESCUBRIR</span>
<h3>Visita a la fábrica</h3>
<p>Un recorrido para acercarse al proceso y a la cultura cervecera.</p>
</section>
<section className="card">
<span className="feature-number">03 / DISFRUTAR</span>
<h3>Sabores locales</h3>
<p>Una cata acompañada de productos locales en el Tap Room.</p>
</section>
</div>
<section className="collab">
<h2>Lugares Llenos × Cervezas Althaia</h2>
<p>Proponemos acercar Althaia a la comunidad a través de su visita y cata con maridaje, con información práctica y acceso directo a la reserva oficial.</p>
<div className="steps">
<div>
<strong>DESCUBRIR</strong>
<span>Conocer la marca</span>
</div>
<div>
<strong>PLANIFICAR</strong>
<span>Consultar la experiencia</span>
</div>
<div>
<strong>RESERVAR</strong>
<span>En la web de Althaia</span>
</div>
</div>
</section>
<section className="experience" aria-labelledby="experiencia">
<div className="experience-head">
<p className="eyebrow">Experiencia destacada · Altea</p>
<h2 id="experiencia">Visita y cata con maridaje</h2>
</div>
<img className="photo" src={brindis.src} alt="Brindis con vasos de cerveza Althaia" />
<div className="content">
<div className="facts">
<div>
<strong>28 €</strong>
<span>por persona</span>
</div>
<div>
<strong>1 h 30 min – 2 h</strong>
<span>duración</span>
</div>
<div>
<strong>4 cervezas</strong>
<span>cata comentada</span>
</div>
</div>
<h3>Qué incluye</h3>
<p>Visita guiada por la fábrica y cata en el Tap Room, con terraza y vistas a producción. El maridaje incluye quesos, embutidos locales, pan artesanal y alfajor.</p>
</div>
<img className="photo" src={fabrica.src} alt="Composición de la web de Althaia: cerveza, fachada de la fábrica, maridaje y depósitos de elaboración" loading="lazy" />
<div className="content">
<div className="details">
<section>
<h3>Horarios de visita</h3>
<dl className="schedule">
<dt>Viernes</dt>
<dd>16:00 (inglés) · 18:00 (castellano)</dd>
<dt>Sábado</dt>
<dd>12:00 y 18:00 (castellano) · 16:00 (inglés)</dd>
<dt>Domingo</dt>
<dd>12:00 (castellano)</dd>
</dl>
<p className="practical">Hasta 40 personas. Grupos privados bajo consulta.</p>
</section>
<section>
<h3>Dónde</h3>
<address>Partida el Planet 196<br />03590 Altea, Alicante<br />
<a href="tel:+34965840605">965 840 605</a>
</address>
</section>
</div>
<p className="practical">Niños gratis; cata de cerveza solo para mayores de 18 años. Plazas según disponibilidad en la reserva oficial.</p>
<div className="actions">
<a className="button" href="https://visitas.cervezasalthaia.com/schedule/cervezasalthaia/Visita_Guiada_Cervezas_Althaia">Consultar y reservar en Althaia ↗</a>
<a className="button secondary" href="https://cervezasalthaia.com/collections/all">Visitar la tienda oficial ↗</a>
</div>
</div>
</section>
<section className="review">
<h2>Para la revisión de Althaia</h2>
<p>Confirmar textos, precio, horarios y selección de imágenes; autorizar el uso del logo y las fotografías y la publicación de esta ficha.</p>
<p>
<strong>Pendiente de información:</strong> accesibilidad y adaptación del maridaje por alergias o preferencias.</p>
</section>
<div className="sources">
<p>Fuentes consultadas el 5 de octubre de 2026. Fotografías: web oficial de Cervezas Althaia. Logo facilitado para esta propuesta.</p>
<a href="https://cervezasalthaia.com/">Web oficial</a>
<a href="https://cervezasalthaia.com/pages/visitas-y-catas">Visitas y catas</a>
<a href="https://cervezasalthaia.com/pages/contactar">Contacto</a>
</div>
</main>
</div>;
}
