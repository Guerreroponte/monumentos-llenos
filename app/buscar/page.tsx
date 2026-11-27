import type { Metadata } from "next";
import Link from "next/link";
import BusquedaGlobalForm from "@/components/BusquedaGlobalForm";
import { cargarBusqueda, type FichaBusqueda } from "@/lib/busqueda-data";
import { buscarCoincidencias, normalizarBusqueda, paginaBusqueda, textoConsulta } from "@/lib/busqueda";
import { claveCiudad, nombreCiudad } from "@/lib/ciudad-identidad";
import { fechaAgenda } from "@/lib/agenda-ui";

export const metadata: Metadata = {
  title: "Buscar eventos, lugares y ciudades",
  description: "Encuentra eventos próximos, lugares y ciudades en una sola búsqueda.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.monumentosllenos.com/buscar" },
};
type Params = Record<string, string | string[] | undefined>;
const estiloLink = "font-semibold text-orange-700 underline underline-offset-4";
export default async function BuscarPage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const q = textoConsulta(params.q);
  const valida = normalizarBusqueda(q).length >= 2;
  const datos = valida ? await cargarBusqueda() : null;
  // Known city aliases use the same identity as city guides.
  const consulta = nombreCiudad(q);
  const campos = (item: FichaBusqueda) => [item.nombre || "", nombreCiudad(item.ciudad), item.tipo || "", item.subtipo || "", item.ubicacion_detalle || ""];
  const eventos = paginaBusqueda(datos?.eventos.status === "fulfilled" ? buscarCoincidencias(datos.eventos.value, consulta, campos) : [], params.eventos);
  const lugares = paginaBusqueda(datos?.lugares.status === "fulfilled" ? buscarCoincidencias(datos.lugares.value, consulta, campos) : [], params.lugares);
  const ciudades = paginaBusqueda(datos?.ciudades.status === "fulfilled" ? buscarCoincidencias(datos.ciudades.value, consulta, ciudad => [ciudad]) : [], params.ciudades);
  const enlacePagina = (grupo: string, pagina: number) => {
    const valores = new URLSearchParams({ q });
    for (const [key, value] of [["eventos", eventos.pagina], ["lugares", lugares.pagina], ["ciudades", ciudades.pagina]] as const) {
      if (value > 1) valores.set(key, String(value));
    }
    valores.set(grupo, String(pagina));
    return `/buscar?${valores}#${grupo}`;
  };
  const paginacion = (grupo: string, resultado: { pagina: number; paginas: number }) => resultado.paginas > 1 && <nav aria-label={`Páginas de ${grupo}`} className="mt-5 flex flex-wrap items-center gap-5 text-sm">
    {resultado.pagina > 1 && <Link className={estiloLink} href={enlacePagina(grupo, resultado.pagina - 1)}>Anterior</Link>}
    <span>Página {resultado.pagina} de {resultado.paginas}</span>
    {resultado.pagina < resultado.paginas && <Link className={estiloLink} href={enlacePagina(grupo, resultado.pagina + 1)}>Siguiente</Link>}
  </nav>;
  const vacio = (grupo: string, error: boolean) => <p className="mt-4 text-slate-600">{error ? `No hemos podido cargar ${grupo}. Vuelve a intentarlo en unos minutos.` : `No encontramos ${grupo} para esta búsqueda.`}</p>;
  return <main className="min-h-screen bg-[#fff7ed] text-slate-900 px-4 py-10 sm:py-14">
    <div className="mx-auto max-w-5xl">
      <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Busca tu próximo plan</h1>
      <p className="mb-6 mt-3 text-slate-600">Eventos, lugares y ciudades en una sola búsqueda. Puedes escribir con o sin tildes.</p>
      <BusquedaGlobalForm key={q} consulta={q} />
      {!datos ? <div className="mt-8 rounded-3xl bg-white p-6">
        <p>{q ? "Escribe al menos dos letras o números para buscar." : "Busca una ciudad, un artista, un monumento o un tipo de evento."}</p>
        <div className="mt-4 flex flex-wrap gap-4">{["Madrid", "Lorca", "Jazz"].map(e => <Link key={e} className={estiloLink} href={`/buscar?q=${encodeURIComponent(e)}`}>{e}</Link>)}</div>
      </div> : <>
        <h2 className="mt-8 text-xl font-bold text-slate-900">Resultados para «{q}»</h2>
        <nav aria-label="Tipos de resultados" className="my-5 flex flex-wrap gap-3">
          {[["ciudades", "Ciudades", ciudades.total, datos.ciudades.status], ["eventos", "Eventos", eventos.total, datos.eventos.status], ["lugares", "Lugares", lugares.total, datos.lugares.status]].map(([id, label, total, status]) => <a key={id} href={`#${id}`} className="rounded-full border border-orange-200 bg-white px-4 py-2 font-semibold text-slate-700">{label}{status === "fulfilled" ? ` · ${total}` : " · No disponible"}</a>)}
        </nav>
        <section id="ciudades" className="mt-6 scroll-mt-28 rounded-3xl bg-white p-6">
          <h2 className="text-2xl font-bold">Ciudades</h2>
          {ciudades.items.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">{ciudades.items.map(ciudad => <li key={claveCiudad(ciudad)}><Link className="block rounded-2xl border border-orange-100 p-4 hover:bg-orange-50" href={`/que-hacer/${claveCiudad(ciudad)}`}><h3 className="font-bold text-orange-700">{ciudad}</h3><p className="mt-1 text-sm text-slate-600">Ver agenda, lugares y propuestas de la ciudad →</p></Link></li>)}</ul> : vacio("ciudades", datos.ciudades.status === "rejected")}
          {paginacion("ciudades", ciudades)}
        </section>
        <section id="eventos" className="mt-6 scroll-mt-28 rounded-3xl bg-white p-6">
          <h2 className="text-2xl font-bold">Eventos próximos y en curso</h2>
          {eventos.items.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">{eventos.items.map(e => <li key={e.id}><Link className="block h-full rounded-2xl border border-orange-100 p-4 hover:bg-orange-50" href={`/eventos/${encodeURIComponent(e.slug || e.id)}`}><h3 className="font-bold text-orange-700">{e.nombre}</h3><p className="mt-2 text-sm text-slate-700">{nombreCiudad(e.ciudad)} · {fechaAgenda(e.fecha_inicio, e.fecha_fin, datos.hoy)}</p><p className="mt-1 text-sm text-slate-600">{e.ubicacion_detalle}</p><p className="mt-2 text-sm font-semibold">{e.hora_inicio ? `${e.hora_inicio.slice(0, 5)} · ` : ""}{e.precio || "Consultar precio"}</p><span className="mt-3 block text-sm font-semibold text-orange-700">Ver evento →</span></Link></li>)}</ul> : vacio("eventos vigentes", datos.eventos.status === "rejected")}
          {paginacion("eventos", eventos)}
        </section>
        <section id="lugares" className="mt-6 scroll-mt-28 rounded-3xl bg-white p-6">
          <h2 className="text-2xl font-bold">Lugares</h2>
          {lugares.items.length ? <ul className="mt-4 grid gap-3 sm:grid-cols-2">{lugares.items.map(l => <li key={l.id}><Link className="block rounded-2xl border border-orange-100 p-4 hover:bg-orange-50" href={`/lugar/${encodeURIComponent(l.slug || l.id)}`}><h3 className="font-bold text-orange-700">{l.nombre}</h3><p className="mt-2 text-sm text-slate-600">{nombreCiudad(l.ciudad)}</p><span className="mt-3 block text-sm font-semibold text-orange-700">Ver lugar →</span></Link></li>)}</ul> : vacio("lugares", datos.lugares.status === "rejected")}
          {paginacion("lugares", lugares)}
        </section>
        <p className="mt-6 text-slate-600">¿No encuentras lo que buscas? Prueba con otra palabra o explora <Link className={estiloLink} href="/eventos">la agenda y sus filtros</Link>.</p>
      </>}
    </div>
  </main>;
}
