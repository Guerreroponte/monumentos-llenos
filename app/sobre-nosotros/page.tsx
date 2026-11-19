import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre nosotros y contacto",
  description: "Conoce cómo seleccionamos y revisamos los eventos de Lugares Llenos, cómo funcionan los enlaces de entradas y cómo contactar con el equipo.",
  alternates: { canonical: "/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-900">
      <article className="mx-auto max-w-4xl rounded-3xl border border-orange-100 bg-white p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">El proyecto y nuestro criterio</p>
        <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">Sobre Lugares Llenos</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">Lugares Llenos es una comunidad para descubrir eventos, lugares y planes en España. Reunimos propuestas culturales e información práctica para ayudarte a decidir qué hacer y preparar tu visita.</p>
        <div className="mt-8 space-y-8 text-base leading-7 text-slate-700">
          <section aria-labelledby="seleccion">
            <h2 id="seleccion" className="text-xl font-bold text-slate-900">Cómo seleccionamos los eventos</h2>
            <p className="mt-2">Seleccionamos los eventos de nuestra agenda editorial a partir de agendas oficiales de ayuntamientos, salas, recintos, organizadores y plataformas de entradas. También recibimos programación de colaboradores y aportaciones de la comunidad.</p>
            <p className="mt-3">Buscamos propuestas que ayuden a descubrir la vida cultural y los planes de cada lugar. Las opiniones, fotos y recomendaciones de visitantes complementan la información de los eventos.</p>
          </section>
          <section aria-labelledby="revision">
            <h2 id="revision" className="text-xl font-bold text-slate-900">Nuestro compromiso con la información</h2>
            <p className="mt-2">Procuramos que la información sea correcta, clara y útil. Contrastamos los datos de la agenda editorial con las fuentes disponibles, especialmente fechas, horarios, ubicación, precios y enlaces, y corregimos los errores que detectamos.</p>
            <p className="mt-3">La programación puede cambiar después de nuestra revisión. No podemos garantizar que todos los datos estén actualizados en todo momento. Antes de desplazarte o comprar, confirma la información y las condiciones en la web oficial del organizador o en la plataforma de venta.</p>
          </section>
          <section aria-labelledby="entradas">
            <h2 id="entradas" className="text-xl font-bold text-slate-900">Entradas, reservas y celebración de los eventos</h2>
            <p className="mt-2">Lugares Llenos difunde información y facilita enlaces a terceros. Publicar un evento no implica que lo organicemos ni que vendamos sus entradas. Las compras y reservas realizadas en webs externas se gestionan con el organizador, vendedor o proveedor correspondiente y están sujetas a sus condiciones.</p>
            <p className="mt-3">No gestionamos los cobros, la emisión de entradas, las devoluciones ni las condiciones de acceso de esos servicios. Las consultas y reclamaciones sobre una compra, un cambio de fecha, una cancelación o una incidencia durante el evento deben dirigirse a la plataforma donde compraste o al organizador, según corresponda.</p>
            <p className="mt-3">Lugares Llenos no asume responsabilidad por la organización o ejecución de eventos ajenos, ni por las ventas y servicios prestados por terceros, sin perjuicio de las responsabilidades que legalmente nos correspondan y de los derechos de las personas consumidoras.</p>
          </section>
          <section aria-labelledby="afiliacion">
            <h2 id="afiliacion" className="text-xl font-bold text-slate-900">Colaboraciones y enlaces de afiliación</h2>
            <p className="mt-2">Colaboramos con salas, proyectos culturales, marcas y plataformas de experiencias. Algunos enlaces son de afiliación: Lugares Llenos puede recibir una comisión si realizas una compra a través de ellos. La reserva y la atención sobre la compra corresponden al proveedor indicado.</p>
          </section>
          <section id="contacto" className="scroll-mt-28 rounded-2xl border border-orange-200 bg-orange-50 p-5" aria-labelledby="contacto-titulo">
            <h2 id="contacto-titulo" className="text-xl font-bold text-slate-900">Contacto y correcciones</h2>
            <p className="mt-2">Si detectas un dato incorrecto, un evento cancelado o un enlace que no funciona, escríbenos con el enlace de la ficha y la información que debemos revisar. También puedes contactar para compartir programación o proponer una colaboración.</p>
            <a href="mailto:contacto@monumentosllenos.com" className="mt-4 inline-block break-all font-semibold text-orange-800 underline underline-offset-4">contacto@monumentosllenos.com</a>
          </section>
          <p className="text-sm">Puedes consultar también nuestro <Link href="/aviso-legal" className="font-semibold text-orange-800 underline underline-offset-4">aviso legal</Link> y la <Link href="/politica-privacidad" className="font-semibold text-orange-800 underline underline-offset-4">política de privacidad</Link>.</p>
        </div>
      </article>
    </main>
  );
}
