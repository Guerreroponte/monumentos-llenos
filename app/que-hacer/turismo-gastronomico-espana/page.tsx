import GastronomiaLorca from "./GastronomiaLorca";
import type { Metadata } from "next";
import Link from "next/link";
import { experiencias, enlaceAfiliado, FECHA_REVISION, FECHA_ACTUALIZACION, FUENTE_BITeseeing, RUTA_GUIA } from "./experiencias";

const base = "https://www.monumentosllenos.com";
const titulo = "Turismo gastronómico en España: experiencias, rutas y sabores que descubrir";
const descripcion = `Descubre el turismo gastronómico en España: ${experiencias.length} experiencias de tapas, mercados, paella, bodegas, vainilla y salinas, y una propuesta por libre en Lorca, con consejos prácticos y enlaces de reserva.`;
const portada = `${base}/images/gastronomia/portada.jpg`;
export const metadata: Metadata = {
  title: { absolute: `Turismo gastronómico en España: ${experiencias.length + 1} propuestas | Lugares Llenos` },
  description: descripcion,
  alternates: { canonical: `${base}${RUTA_GUIA}` },
  authors: [{ name: "Equipo de Lugares Llenos" }],
  openGraph: { title: titulo, description: descripcion, url: `${base}${RUTA_GUIA}`, siteName: "Lugares Llenos", locale: "es_ES", type: "article", publishedTime: `${FECHA_REVISION}T12:00:00+01:00`, modifiedTime: `${FECHA_ACTUALIZACION}T12:00:00+01:00`, images: [{ url: portada, width: 1200, height: 630, alt: "Trabajo artesanal en las Salinas de Janubio, Lanzarote" }] },
  twitter: { card: "summary_large_image", title: titulo, description: descripcion, images: [portada] },
};

const preguntas = [
  { pregunta: "¿Qué es el Biteseeing?", respuesta: "Es el término que GetYourGuide utiliza para describir viajes en los que la gastronomía y el origen de los ingredientes ayudan a elegir el destino. Puede tomar la forma de una visita a productores, una ruta de tapas, una cata o un taller. En esta guía lo aplicamos a experiencias en España." },
  { pregunta: "¿Hace falta reservar un tour para hacer turismo gastronómico?", respuesta: "No. También puedes organizar una visita por tu cuenta, comprar a productores o recorrer un mercado. Una actividad guiada aporta contexto, organización y, en ocasiones, acceso a espacios de trabajo. Elige según lo que quieras aprender y lo que incluya realmente la reserva." },
  { pregunta: "¿Todas estas experiencias se realizan en español?", respuesta: "No. Algunas anuncian español e inglés, mientras que varios talleres se imparten en inglés. Revisa el idioma de la sesión concreta: traducir la página de GetYourGuide al español no cambia el idioma del guía." },
  { pregunta: "¿Se puede participar con niños o sin beber alcohol?", respuesta: "Depende de la actividad. Algunas rutas ofrecen refrescos o agua, pero hay experiencias con edades mínimas y otras centradas en bebidas alcohólicas. Consulta la opción familiar y las inclusiones antes de reservar; no supongas que todas las catas tienen una alternativa equivalente sin alcohol." },
  { pregunta: "¿Hay opciones vegetarianas, veganas o para intolerancias?", respuesta: "Algunos proveedores permiten adaptar el menú con aviso previo. Confirma directamente qué podrán servirte y las condiciones de preparación. La existencia de una opción vegetariana no significa que todas las restricciones alimentarias estén cubiertas." },
  { pregunta: "¿Por qué no aparece un precio fijo?", respuesta: "Los importes dependen de la fecha, el número de participantes y la modalidad. Los botones llevan a la ficha para consultar el precio y la disponibilidad actualizados. Antes de pagar, revisa también la cancelación, el idioma y los extras." },
];

const datosEstructurados = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${base}${RUTA_GUIA}#articulo`, headline: titulo, description: descripcion, inLanguage: "es-ES", image: [portada], datePublished: `${FECHA_REVISION}T12:00:00+01:00`, dateModified: `${FECHA_ACTUALIZACION}T12:00:00+01:00`, mainEntityOfPage: `${base}${RUTA_GUIA}`, author: { "@type": "Organization", name: "Equipo de Lugares Llenos" }, publisher: { "@type": "Organization", name: "Lugares Llenos", url: base } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: base }, { "@type": "ListItem", position: 2, name: "Qué hacer", item: `${base}/que-hacer` }, { "@type": "ListItem", position: 3, name: "Turismo gastronómico en España", item: `${base}${RUTA_GUIA}` }] },
  ],
};
const h2 = "text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl";
const parrafo = "mt-5 text-base leading-8 text-slate-700 sm:text-lg";
const enlace = "font-semibold text-orange-800 underline decoration-orange-300 underline-offset-4 hover:decoration-orange-800";

export default function GuiaGastronomica() {
  return (
    <main className="min-h-screen bg-[#fff7ed] text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados).replace(/</g, "\\u003c") }} />
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <nav aria-label="Migas de pan" className="flex flex-wrap gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:underline">Inicio</Link><span aria-hidden="true">/</span><Link href="/que-hacer" className="hover:underline">Qué hacer</Link><span aria-hidden="true">/</span><span aria-current="page">Turismo gastronómico</span>
        </nav>
        <header className="mt-10 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-800">España · Viajar a través de los sabores</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{titulo}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-600">Una barra, un mercado, una bodega o un ingrediente pueden ser el principio de un viaje. {experiencias.length} experiencias y una propuesta por libre en Lorca para conocer España con curiosidad y sentarse a la mesa con algo más que hambre.</p>
          <p className="mt-6 text-sm text-slate-600">Por <span className="font-semibold">Equipo de Lugares Llenos</span> · Actualizado el <time dateTime={FECHA_ACTUALIZACION}>26 de noviembre de 2026</time> · Lorca incorporada como propuesta gastronómica por libre</p>
        </header>

        <figure className="mt-8">
          {/* Imagen editorial del material de prensa Biteseeing, servida localmente sin rastreo externo. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/gastronomia/janubio.webp" alt="Trabajadores recogen sal a mano entre las parcelas y montones blancos de las Salinas de Janubio, Lanzarote" width={1600} height={1067} fetchPriority="high" className="aspect-[16/9] w-full rounded-3xl object-cover" />
          <figcaption className="mt-3 text-xs leading-5 text-slate-600">Salinas de Janubio, Lanzarote. Fotografía facilitada por GetYourGuide para la cobertura editorial de Biteseeing.</figcaption>
        </figure>

        <aside aria-label="Información sobre afiliación" className="mt-7 rounded-2xl border border-orange-200 bg-white px-5 py-4 text-sm leading-6 text-slate-700">
          <strong>Transparencia.</strong> Esta es una selección editorial inspirada en la propuesta Biteseeing de GetYourGuide. Los botones de reserva son enlaces de afiliación: Lugares Llenos puede recibir una comisión si reservas a través de ellos. Las reservas se gestionan en GetYourGuide. No hemos probado personalmente todas las actividades; contrastamos sus fichas y señalamos las condiciones relevantes.
        </aside>

        <nav aria-label="Índice de la guía" className="mt-10 rounded-3xl border border-orange-200 bg-white p-6">
          <h2 className="text-lg font-bold">En esta guía</h2>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[["biteseeing", "Qué es el Biteseeing"], ["comparar", "Elegir una experiencia"], ["experiencias", `${experiencias.length} experiencias en España`], ["lorca", "Lorca: gastronomía por libre"], ["escapadas", "Cómo organizar tu escapada"], ["reservar", "Qué revisar antes de reservar"], ["preguntas", "Preguntas frecuentes"]].map(([id, texto]) => <a key={id} href={`#${id}`} className={enlace}>{texto} ↓</a>)}
          </div>
        </nav>

        <section id="biteseeing" className="mt-14 scroll-mt-28 max-w-3xl">
          <h2 className={h2}>Qué es el Biteseeing y por qué invita a viajar de otra manera</h2>
          <p className={parrafo}>Hay escapadas que empiezan al ver una fotografía de una plaza. Otras nacen de una pregunta mucho más pequeña: cómo se cultiva una especia, qué ocurre dentro de una bodega o qué pedir en una barra llena de bocados desconocidos. El turismo gastronómico abre esa segunda puerta. Comer deja de ser un hueco entre visitas y se convierte en una forma de acercarse al lugar.</p>
          <p className={parrafo}>GetYourGuide llama <em>Biteseeing</em> a esta forma de descubrir destinos a través de la comida y sus ingredientes. En su investigación de octubre de 2026, el 79 % de las personas encuestadas decía que viajaría por experiencias de cocina regional y el 57 % por un ingrediente concreto. La plataforma comunicó, además, un crecimiento interanual del 47 % en reservas gastronómicas, frente al 16 % de visitas culturales e históricas.</p>
          <p className="mt-4 border-l-2 border-orange-300 pl-4 text-sm leading-6 text-slate-600">Son datos de GetYourGuide. La encuesta de Bounce Insights reunió a 1.252 adultos de 18 a 64 años de Reino Unido, Francia, Alemania e Italia; no es una encuesta de viajeros españoles. El crecimiento de reservas corresponde a la plataforma. <a className={enlace} href={FUENTE_BITeseeing} target="_blank" rel="noopener noreferrer">Consultar la investigación y su metodología</a>.</p>
          <p className={parrafo}>En España, proponemos trasladar esa curiosidad a planes concretos: aprender una receta, hablar de los productos de un mercado o descubrir el trabajo que hay detrás de algo tan cotidiano como la sal. La idea no exige un menú caro ni una lista interminable de restaurantes. Basta con elegir una experiencia que te permita mirar, preguntar y comprender, además de probar.</p>
        </section>

        <section id="comparar" className="mt-14 scroll-mt-28">
          <h2 className={h2}>Qué experiencia gastronómica elegir según tu viaje</h2>
          <p className={`${parrafo} max-w-3xl`}>Empieza por el tiempo del que dispones y por lo que quieres hacer. Una ruta de tapas sirve para recorrer una ciudad en compañía; un taller requiere ganas de participar; una bodega permite concentrarse en un producto. Las duraciones son orientativas y corresponden a las fichas revisadas.</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-orange-200 bg-white">
            <table className="w-full min-w-[570px] text-left text-sm">
              <caption className="sr-only">Comparativa de las {experiencias.length} experiencias gastronómicas seleccionadas</caption>
              <thead className="bg-orange-100 text-slate-900"><tr>{["Destino", "Plan", "Tiempo", "Idioma anunciado"].map(t => <th key={t} scope="col" className="px-4 py-4 font-bold">{t}</th>)}</tr></thead>
              <tbody>{experiencias.map(e => <tr key={e.id} className="border-t border-orange-100"><th scope="row" className="px-4 py-4"><a className={enlace} href={`#${e.id}`}>{e.ciudad}</a></th><td className="px-4 py-4">{e.tipo}</td><td className="whitespace-nowrap px-4 py-4">{e.duracion}</td><td className="px-4 py-4">{e.idioma}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">En móvil puedes deslizar la tabla. Consulta el idioma y la duración de tu sesión al reservar.</p>
        </section>

        <section id="experiencias" className="mt-14 scroll-mt-28">
          <h2 className={h2}>{experiencias.length} experiencias de turismo gastronómico en España</h2>
          <p className={`${parrafo} max-w-3xl`}>Esta selección combina ciudades peninsulares y dos propuestas canarias centradas en el origen de los ingredientes. No pretende ordenar «las mejores» experiencias de España: reúne maneras distintas de explorar su gastronomía. Las fichas estaban publicadas al revisarlas; las plazas para una fecha concreta se consultan en el calendario de reserva.</p>
          <div className="mt-8 space-y-6">
            {experiencias.map((e, i) => (
              <section id={e.id} key={e.id} aria-labelledby={`${e.id}-titulo`} className="scroll-mt-28 rounded-3xl border border-orange-200 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-orange-800">{String(i + 1).padStart(2, "0")} · {e.tipo}</p>
                <h3 id={`${e.id}-titulo`} className="mt-3 text-2xl font-bold leading-snug">{e.titulo}</h3>
                <p className="mt-3 text-sm font-medium text-slate-600">{e.duracion} · {e.idioma}</p>
                <p className="mt-5 text-base leading-7 text-slate-700">{e.descripcion}</p>
                <p className="mt-4 text-base leading-7 text-slate-700"><strong className="text-slate-900">Para aprovecharlo:</strong> {e.consejo}</p>
                <p className="mt-4 rounded-xl bg-orange-50 p-4 text-sm leading-6 text-slate-700"><strong>Antes de reservar:</strong> {e.detalle}</p>
                {e.id === "donostia-san-sebastian" && <div className="mt-6 space-y-5 border-t border-orange-100 pt-6">
                  <div><h4 className="text-lg font-bold">De pintxos por libre en San Sebastián</h4><p className="mt-2 leading-7 text-slate-700">La Parte Vieja permite alternar el paseo con pequeñas paradas para comer. Puedes empezar por una gilda, con guindilla, anchoa y aceituna, y preguntar por las especialidades calientes de cada barra. Consulta precios e ingredientes antes de pedir: no presupongas que el pintxo está incluido con la bebida. Elige pocas paradas y deja espacio a quienes trabajan y comen en el local.</p></div>
                  <div><h4 className="text-lg font-bold">Combina patrimonio y gastronomía</h4><p className="mt-2 leading-7 text-slate-700">Nuestra <Link href="/que-hacer/donostia-san-sebastian#guia-local" className={enlace}>guía y ruta a pie de San Sebastián</Link> termina en la Parte Vieja, donde puedes organizar una comida por libre. Si reservas el tour, comprueba su punto de encuentro y deja margen para llegar: el paseo monumental no forma parte de la experiencia gastronómica.</p></div>
                  <p className="text-sm leading-6 text-slate-600">Fuentes consultadas el 21/11/2026: <a href="https://sansebastianturismoa.eus/gastronomia/de-pintxos/" className={enlace} target="_blank" rel="noopener noreferrer">San Sebastián Turismo</a>, <a href="https://www.euskadi.eus/gobierno-vasco/-/es/platos-pinchos/gildas/" className={enlace} target="_blank" rel="noopener noreferrer">Turismo de Euskadi</a> y <a href="https://devourtours.com/tours/san-sebastian-ultimate-pintxos-wine-tour/" className={enlace} target="_blank" rel="noopener noreferrer">Devour Tours</a>, contrastado con GetYourGuide.</p>
                </div>}
                {e.id === "malaga" && <div className="mt-6 space-y-5 border-t border-orange-100 pt-6">
                  <div>
                    <h4 className="text-lg font-bold">Qué probar por tu cuenta en Málaga</h4>
                    <p className="mt-2 leading-7 text-slate-700">Los espetos de sardinas y el pescaíto frito son dos propuestas para acercarte a la cocina marinera. También puedes buscar ajoblanco, una sopa fría de almendras, o albóndigas en salsa de almendras. Consulta la carta y los ingredientes de cada establecimiento: estas recomendaciones no son un menú garantizado del tour.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Atarazanas y una pausa para comer por libre</h4>
                    <p className="mt-2 leading-7 text-slate-700">El Mercado de Atarazanas, en la calle Atarazanas, 10, combina puestos de productos frescos y bares. La web de Mercados de Málaga publica apertura de lunes a sábado de 8 a 15 horas; comprueba festivos y el horario de cada puesto antes de ir. Acércate por la mañana, deja paso a quienes hacen la compra y pregunta antes de fotografiar. Esta visita se organiza por tu cuenta y no forma parte de la ruta de vinos enlazada.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Cómo combinar gastronomía y paseo monumental</h4>
                    <p className="mt-2 leading-7 text-slate-700">Consulta nuestra <Link href="/que-hacer/malaga#guia-local" className={enlace}>guía de Málaga</Link> para enlazar el centro, la Catedral y el entorno del Teatro Romano y la Alcazaba. Puedes dedicar la mañana al mercado y al paseo, o reservar la ruta gastronómica para otro momento. Si prefieres comer junto al mar, calcula el desplazamiento de ida y vuelta antes de encajar una visita con hora fija. Son ideas de organización propias, no un paquete de entradas y comida.</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">Fuentes consultadas el 21/11/2026: <a href="https://www.spain.info/export/sites/segtur/.content/Folletos/folletos/Malaga_ES.pdf" className={enlace} target="_blank" rel="noopener noreferrer">guía de Málaga de Turespaña</a>, <a href="https://mercados.malagacomercio.es/mercados/mercado-de-atarazanas/" className={enlace} target="_blank" rel="noopener noreferrer">Mercados de Málaga</a> y <a href="https://www.spainfoodsherpas.com/malaga-evening-tapas-tour/" className={enlace} target="_blank" rel="noopener noreferrer">ficha oficial de Spain Food Sherpas</a>, contrastada con GetYourGuide. Se indican las diferencias detectadas para confirmar las condiciones de la sesión concreta.</p>
                </div>}
                {e.id === "granada" && <div className="mt-6 space-y-5 border-t border-orange-100 pt-6">
                  <div>
                    <h4 className="text-lg font-bold">Qué probar por tu cuenta en Granada</h4>
                    <p className="mt-2 leading-7 text-slate-700">Busca en las cartas remojón granadino, con bacalao y naranja, habas con jamón o tortilla del Sacromonte. Para un final dulce, los piononos de Santa Fe son una especialidad de la provincia. Son ideas para comer por libre, no platos garantizados en la ruta de tapas. Pregunta por ingredientes y disponibilidad en cada local.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Zonas para tapear y cómo funciona la tapa</h4>
                    <p className="mt-2 leading-7 text-slate-700">El entorno de la Catedral y la plaza de la Romanilla permite hacer una pausa durante el paseo por el centro. También puedes acercarte a la calle Navas o a las plazas del Campillo y Mariana Pineda. Es frecuente que la bebida incluya una tapa, pero cada bar decide cuáles ofrece, si se pueden elegir y qué consumiciones la incluyen. Consulta antes de pedir; una ración o una tapa extra pueden cobrarse aparte.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Cómo combinar tapeo y paseo monumental</h4>
                    <p className="mt-2 leading-7 text-slate-700">Utiliza nuestra <Link href="/que-hacer/granada#guia-local" className={enlace}>guía de Granada</Link> para organizar el centro y el Albaicín. Si tienes entradas para la Alhambra, respeta primero sus horarios y deja margen para los desplazamientos. Otra opción es pasear por el Albaicín y bajar después al centro para comer: cuenta con las pendientes y evita encajar la ruta gastronómica justo al terminar otra visita. Son propuestas por libre, no el itinerario del tour.</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">Fuentes consultadas el 20/11/2026: <a href="https://turismo.granada.org/es/que-hacer/tapas-granada" className={enlace} target="_blank" rel="noopener noreferrer">rutas de tapas del Ayuntamiento de Granada</a>, <a href="https://turismo.granada.org/es/turismo-gastronomico" className={enlace} target="_blank" rel="noopener noreferrer">gastronomía local</a> y <a href="https://foodlovertour.com/granada-tapas-crawl-tour/" className={enlace} target="_blank" rel="noopener noreferrer">ficha oficial de Food Lover Tour</a>, contrastada con la actividad enlazada en GetYourGuide.</p>
                </div>}
                {e.id === "cordoba" && <div className="mt-6 space-y-5 border-t border-orange-100 pt-6">
                  <div>
                    <h4 className="text-lg font-bold">Qué probar por tu cuenta en Córdoba</h4>
                    <p className="mt-2 leading-7 text-slate-700">El salmorejo, una crema fría de tomate, pan, aceite y ajo, es una buena puerta de entrada a la cocina local. También puedes buscar flamenquín, rabo de toro o berenjenas con miel. Para terminar, el pastel cordobés combina hojaldre y cabello de ángel. Son propuestas para elegir en las cartas de las tabernas, no un menú incluido en esta cata. Consulta ingredientes y adaptaciones con cada establecimiento.</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Cómo combinar gastronomía y paseo monumental</h4>
                    <p className="mt-2 leading-7 text-slate-700">Organiza primero las visitas con hora reservada y utiliza nuestra <Link href="/que-hacer/cordoba#guia-local" className={enlace}>guía y ruta a pie de Córdoba</Link> para enlazar el patrimonio. Reserva un hueco para comer por tu cuenta y calcula después el desplazamiento hasta la calle Moriscos: la cata no comienza junto a cada parada del paseo. Si prefieres un plan sin alcohol, puedes seguir las recomendaciones de platos y prescindir de la actividad vinícola.</p>
                  </div>
                  <p className="text-sm leading-6 text-slate-600">Fuentes consultadas el 20/11/2026: <a href="https://www.turismodecordoba.org/la-gastronomia-cordobesa/" className={enlace} target="_blank" rel="noopener noreferrer">Turismo de Córdoba</a> y <a href="https://ontdekcordoba.com/en/tours-cordoba/wine-tasting-cordoba" className={enlace} target="_blank" rel="noopener noreferrer">ficha oficial de Ontdek Córdoba</a>, contrastadas con la actividad enlazada en GetYourGuide. La web del organizador en inglés describe sesiones en inglés; confirma el idioma concreto al reservar en la plataforma.</p>
                </div>}
                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <a href={enlaceAfiliado(e.url)} target="_blank" rel="sponsored nofollow noopener noreferrer" aria-label={`Ver disponibilidad y reservar: ${e.titulo} (GetYourGuide, enlace afiliado, nueva pestaña)`} className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-700 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-800">Ver disponibilidad y reservar ↗</a>
                  {e.guia && <Link href={`/que-hacer/${e.guia}`} className={`${enlace} text-sm`}>{e.id === "rioja" ? "Completa tu estancia en Bilbao" : `Qué hacer en ${e.ciudad}`} →</Link>}
                </div>
                <p className="mt-3 text-xs text-slate-500">GetYourGuide · Enlace afiliado · Precio y condiciones en la ficha de reserva</p>
                {e.id === "donostia-san-sebastian" && <p className="mt-2 text-sm leading-6 text-slate-600">Si GetYourGuide abre una lista de resultados, selecciona «San Sebastián: tour de pintxos y vino», de Devour Tours.</p>}
                {e.id === "malaga" && <p className="mt-2 text-sm leading-6 text-slate-600">Si GetYourGuide abre una lista de resultados, selecciona «Málaga: tour de vino y tapas», de Spain Food Sherpas.</p>}
                {e.id === "granada" && <p className="mt-2 text-sm leading-6 text-slate-600">Si GetYourGuide abre una lista de resultados, selecciona «Granada: ruta de tapas - todo incluido», de Food Lover Tour Andalucia.</p>}
                {e.id === "cordoba" && <p className="mt-2 text-sm leading-6 text-slate-600">Si GetYourGuide abre una lista de resultados, selecciona «Córdoba: tarde de cata de vino local», de Ontdek Córdoba.</p>}
              </section>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gastronomia/vainilla.webp" alt="Detalle de una vaina abierta de vainilla y sus pequeñas semillas oscuras" width={900} height={1125} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 text-xs leading-5 text-slate-600">Vainilla: observar el ingrediente antes de cocinarlo. Fotografía: Angelo Dal Bo, facilitada por GetYourGuide. Imagen del ingrediente, no de la visita a la finca.</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/gastronomia/sal.webp" alt="Una mano sostiene cristales blancos de sal" width={900} height={1357} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
            <figcaption className="mt-3 text-xs leading-5 text-slate-600">Un ingrediente cotidiano también puede contar una historia. Fotografía facilitada por GetYourGuide para la cobertura de Biteseeing.</figcaption>
          </figure>
        </div>

        <GastronomiaLorca />

        <section id="escapadas" className="mt-14 scroll-mt-28 max-w-3xl">
          <h2 className={h2}>Cómo organizar una escapada gastronómica sin llenarla de reservas</h2>
          <p className={parrafo}>Elige una actividad principal al día y construye el resto alrededor. Si has reservado una comida larga, deja la tarde para pasear; si la experiencia empieza temprano en un mercado, duerme cerca o calcula el traslado con margen. El objetivo es volver con una historia que recuerdes, no encadenar degustaciones hasta dejar de distinguirlas.</p>
          <h3 className="mt-8 text-xl font-bold">Una escapada urbana: mercado, cocina y paseo</h3>
          <p className={parrafo}>En Valencia, Barcelona o Sevilla puedes dedicar la primera parte del día a mercado y taller, y reservar después tiempo libre para conocer la ciudad. Evita comprar una entrada con hora cerrada justo al finalizar la clase: comer en grupo, recoger y despedirse también requiere tiempo. Para completar el recorrido, consulta nuestras guías de <Link className={enlace} href="/que-hacer/valencia">Valencia</Link>, <Link className={enlace} href="/que-hacer/barcelona">Barcelona</Link> y <Link className={enlace} href="/que-hacer/sevilla">Sevilla</Link>.</p>
          <h3 className="mt-8 text-xl font-bold">Un fin de semana de barras y bodegas</h3>
          <p className={parrafo}>Si te interesa el vino, diferencia una cata urbana de una excursión a una zona de producción. La primera deja más tiempo para la ciudad; la segunda exige reservar prácticamente la jornada y revisar los traslados. Puedes combinar un día de pintxos en Bilbao con otro dedicado a Rioja, o centrarte en una visita breve durante una estancia en Jerez. Son propuestas de organización propias, no paquetes conjuntos: cada experiencia se reserva por separado.</p>
          <h3 className="mt-8 text-xl font-bold">Un viaje a las islas con una parada para aprender</h3>
          <p className={parrafo}>La vainilla de Tenerife y la sal de Lanzarote permiten introducir una visita centrada en un ingrediente dentro de un viaje más amplio. Elige la que corresponda a la isla donde te alojas; no las planteamos como actividades consecutivas de una misma jornada. Antes de cerrar la reserva, comprueba los tiempos de carretera desde tu alojamiento y deja margen para posibles cambios del tiempo.</p>
          <h3 className="mt-8 text-xl font-bold">Qué hacer por tu cuenta antes y después</h3>
          <p className={parrafo}>Anota el nombre de un producto que hayas descubierto y busca después una tienda donde preguntar por él. Compra una cantidad que realmente vayas a utilizar, pide indicaciones de conservación y prueba en casa una receta sencilla. En los mercados, deja libres los puestos para quienes están comprando y pide permiso antes de fotografiar a los comerciantes. Es una forma de participar en la vida del lugar sin convertirla en un decorado.</p>
        </section>

        <section id="reservar" className="mt-14 scroll-mt-28 max-w-3xl">
          <h2 className={h2}>Qué revisar antes de reservar una experiencia gastronómica</h2>
          <p className={parrafo}>Dos actividades con títulos parecidos pueden ofrecer cosas muy distintas. Dedica unos minutos a la ficha completa y compara la modalidad elegida, no solo el reclamo del anuncio. Estas preguntas ayudan a decidir si el plan encaja contigo:</p>
          <ul className="mt-6 space-y-5 text-base leading-7 text-slate-700">
            <li><strong className="text-slate-900">¿Vas a cocinar, observar o degustar?</strong> En una demostración el chef lleva el peso del trabajo; en un taller participativo puede haber tareas compartidas. Si quieres practicar una técnica, pregunta cuánto tiempo pasarás realmente cocinando.</li>
            <li><strong className="text-slate-900">¿Qué sustituye a una comida?</strong> Una cata con aperitivos y una ruta con múltiples platos no se planifican igual. Revisa cantidades, bebidas, extras y si la comida está incluida en todas las opciones.</li>
            <li><strong className="text-slate-900">¿El mercado abre ese día?</strong> La actividad puede seguir celebrándose aunque se suprima la visita a los puestos. Comprueba domingos, festivos y horarios; es especialmente relevante si el mercado es el motivo principal de tu reserva.</li>
            <li><strong className="text-slate-900">¿Entenderás al guía?</strong> Confirma el idioma de la sesión y si el grupo es bilingüe. Una experiencia culinaria tiene explicaciones que merece la pena comprender, desde ingredientes hasta instrucciones de cocina.</li>
            <li><strong className="text-slate-900">¿Encaja con tus necesidades?</strong> Consulta edades mínimas, accesibilidad, tiempo de pie y adaptaciones del menú. Comunica alergias o restricciones antes de reservar, no cuando ya se está preparando la comida.</li>
            <li><strong className="text-slate-900">¿Cómo llegas y cómo vuelves?</strong> Distingue transporte incluido, recogida en hotel y simple punto de encuentro. Si vas a beber, organiza la vuelta sin conducir. En las excursiones, verifica también el mínimo de participantes.</li>
            <li><strong className="text-slate-900">¿Qué sucede si cambias de plan?</strong> Lee la política aplicable a tu reserva, su plazo y los posibles condicionantes meteorológicos. Guarda el bono y el contacto del proveedor para consultar cualquier cambio de lugar u horario.</li>
          </ul>
          <p className={parrafo}>También puedes disfrutar del turismo gastronómico con un presupuesto ajustado. Alterna una experiencia guiada que te interese especialmente con paseos y compras por tu cuenta. Paga por aquello que aporta acceso, aprendizaje u organización; no necesitas reservar todas las comidas para que el viaje tenga un hilo gastronómico.</p>
        </section>

        <section id="preguntas" className="mt-14 scroll-mt-28">
          <h2 className={h2}>Preguntas frecuentes</h2>
          <div className="mt-6 divide-y divide-orange-200 rounded-2xl border border-orange-200 bg-white px-6">
            {preguntas.map(p => <details key={p.pregunta} className="group py-5"><summary className="cursor-pointer text-base font-bold leading-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700">{p.pregunta}</summary><p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">{p.respuesta}</p></details>)}
          </div>
        </section>

        <section className="mt-12 rounded-3xl bg-white p-6 sm:p-8" aria-labelledby="seguir-explorando">
          <h2 id="seguir-explorando" className="text-2xl font-bold">Sigue explorando España</h2>
          <p className="mt-3 leading-7 text-slate-600">Completa la mesa con paseos, lugares y propuestas culturales de nuestras guías.</p>
          <div className="mt-5 flex flex-wrap gap-3">{[["donostia-san-sebastian", "San Sebastián"], ["malaga", "Málaga"], ["granada", "Granada"], ["cordoba", "Córdoba"], ["madrid", "Madrid"], ["bilbao", "Bilbao"], ["valencia", "Valencia"], ["barcelona", "Barcelona"], ["sevilla", "Sevilla"], ["jerez-de-la-frontera", "Jerez"], ["aranda-de-duero", "Aranda de Duero"]].map(([slug, ciudad]) => <Link key={slug} href={`/que-hacer/${slug}`} className="rounded-full border border-orange-200 px-4 py-3 text-sm font-bold text-orange-800 hover:bg-orange-50">{ciudad} →</Link>)}</div>
          <Link href="/que-hacer" className={`mt-6 inline-block ${enlace}`}>Ver todas las guías de Qué hacer →</Link>
        </section>
        <footer className="mt-10 border-t border-orange-200 pt-6 text-sm leading-6 text-slate-600">
          <p><strong>Fuentes y revisión editorial.</strong> Investigación Biteseeing de GetYourGuide, publicada el 4 de noviembre de 2026, y fichas de las nueve actividades originales, consultadas el 11 de noviembre de 2026. La experiencia de Córdoba se incorporó y contrastó con GetYourGuide, Ontdek Córdoba y Turismo de Córdoba el 20 de noviembre de 2026; Granada se añadió ese mismo día, contrastando GetYourGuide, Food Lover Tour y el Ayuntamiento de Granada. Málaga se incorporó el 21 de noviembre de 2026 con fuentes de Turespaña, Mercados de Málaga, Spain Food Sherpas y GetYourGuide. San Sebastián se añadió ese mismo día con fuentes de turismo oficiales, Devour Tours y GetYourGuide. Lorca se añadió como propuesta por libre el 26 de noviembre de 2026, con fuentes de Turismo de Lorca. Estas ampliaciones no suponen una nueva revisión de las nueve actividades originales. Los consejos para organizar el viaje son propuestas editoriales de Lugares Llenos. No se garantizan plazas, precios ni inclusiones fuera de la modalidad confirmada por el proveedor.</p>
          <p className="mt-3">Fotografías procedentes del <a href="https://drive.google.com/drive/folders/1mDhCVwJZc0W1L_r_3OZ-c0ifF8MS-B5n" className={enlace} target="_blank" rel="noopener noreferrer">material de prensa Biteseeing</a>, facilitado para cubrir esta historia. Vainilla: Angelo Dal Bo. Se han adaptado tamaño y encuadre para la web.</p>
          <p className="mt-4 font-semibold">Equipo de Lugares Llenos</p>
        </footer>
      </article>
    </main>
  );
}
