"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const guiasDestacadas = ["Castellón de la Plana", "Huelva", "Guadalajara", "Lleida", "Almería", "Cádiz", "Girona", "Tarragona", "Cuenca", "Huesca", "Burgos", "Ávila", "Toledo", "Salamanca"];

const rutasDestacadas = [
  {
    "slug": "cardona",
    "ciudad": "Cardona",
    "titulo": "Del mercado medieval al castillo",
    "alt": "Castell de Cardona",
    "paradas": 5,
    "imagen": "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/lugares/cardona-castell-20261104-3a2a7284-c08c-4125-92f0-69909013487d.jpg"
  },
  {
    "slug": "cazorla",
    "ciudad": "Cazorla",
    "titulo": "De la Corredera al Castillo de la Yedra",
    "alt": "Ruinas de Santa María en Cazorla",
    "paradas": 4,
    "imagen": "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/lugares/cazorla-ruinas-20261104-91ab3ad2-6047-4edd-8c7a-013e0c68b9bc.jpg"
  },
  {
    "slug": "algeciras",
    "ciudad": "Algeciras",
    "titulo": "Del mercado al Parque María Cristina",
    "alt": "Plaza Alta de Algeciras",
    "paradas": 5,
    "imagen": "https://kfphmjxhouyfjrdgjbyg.supabase.co/storage/v1/object/public/imagenes/lugares/algeciras-plaza-alta-20261104-0b455b7b-fbeb-46e5-b5a6-9774c31c5b24.jpg"
  }
];

const ciudadesPopulares = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Málaga",
  "Zaragoza",
  "A Coruña",
  "Vigo",
  "Murcia",
  "Granada",
  "Santander",
];

function slugCiudad(ciudad: string) {
  return ciudad
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function limpiarCiudad(ciudad: string) { return ciudad.replace(/\s+/g, " ").trim(); }

export default function QueHacerPage({ ciudadesDisponibles, ciudadesConRuta, errorCiudades = false }: { ciudadesDisponibles: string[]; ciudadesConRuta: string[]; errorCiudades?: boolean }) {
  const router = useRouter();
  const tituloGuias = useRef<HTMLHeadingElement>(null);
  const ciudadesRuta = new Set(ciudadesConRuta.map(slugCiudad));
  const guias = [...guiasDestacadas, ...ciudadesConRuta.filter((ciudad) => !guiasDestacadas.includes(ciudad))]
    .sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));
  const guiasConRuta = guias.filter((ciudad) => ciudadesRuta.has(slugCiudad(ciudad)));

  const [busqueda, setBusqueda] = useState("");
  const [soloRutas, setSoloRutas] = useState(false);
  const guiasVisibles = soloRutas ? guiasConRuta : guias;

  function mostrarRutas() {
    setSoloRutas(true);
    tituloGuias.current?.focus({ preventScroll: true });
    tituloGuias.current?.scrollIntoView({ block: "start" });
  }

  const sugerencias = useMemo(() => {
    const textoBuscado = slugCiudad(busqueda);

    if (!textoBuscado) return [];

    return ciudadesDisponibles
      .filter((ciudad) => slugCiudad(ciudad).includes(textoBuscado))
      .sort((a, b) => {
        const slugA = slugCiudad(a);
        const slugB = slugCiudad(b);

        const aEmpieza = slugA.startsWith(textoBuscado);
        const bEmpieza = slugB.startsWith(textoBuscado);

        if (aEmpieza && !bEmpieza) return -1;
        if (!aEmpieza && bEmpieza) return 1;

        return a.localeCompare(b, "es", {
          sensitivity: "base",
        });
      })
      .slice(0, 8);
  }, [busqueda, ciudadesDisponibles]);

  function buscarCiudad(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const ciudad = limpiarCiudad(busqueda);

    if (!ciudad) return;

    const coincidenciaExacta = ciudadesDisponibles.find(
      (ciudadDisponible) =>
        slugCiudad(ciudadDisponible) === slugCiudad(ciudad)
    );

    const ciudadDestino = coincidenciaExacta ?? sugerencias[0];

    if (!ciudadDestino) return;

    router.push(`/que-hacer/${slugCiudad(ciudadDestino)}`);
  }

  function seleccionarCiudad(ciudad: string) {
    setBusqueda(ciudad);
    router.push(`/que-hacer/${slugCiudad(ciudad)}`);
  }

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Guía por ciudades
          </p>

          <h1 className="mt-4 text-5xl font-extrabold text-slate-900 md:text-6xl">
            ¿Qué hacer?
          </h1>

          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            Descubre eventos, lugares especiales y salas colaboradoras en
            cualquier ciudad de España.
          </p>

          <form
            onSubmit={buscarCiudad}
            className="relative mx-auto mt-10 max-w-2xl"
          >
            <div className="flex flex-col gap-3 rounded-[2rem] border border-orange-200 bg-white p-3 shadow-sm sm:flex-row">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Escribe una ciudad: Madrid, Barcelona..."
                autoComplete="off"
                aria-label="Buscar una ciudad"
                className="min-w-0 flex-1 rounded-full bg-white px-5 py-4 text-lg font-semibold text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
              />

              <button
                type="submit"

                className="rounded-full bg-orange-600 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Buscar →
              </button>
            </div>

            {sugerencias.length > 0 && (
              <div className="absolute left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-orange-100 bg-white text-left shadow-xl">
                {sugerencias.map((ciudad) => (
                  <button
                    key={slugCiudad(ciudad)}
                    type="button"
                    onClick={() => seleccionarCiudad(ciudad)}
                    className="block w-full border-b border-orange-50 px-5 py-4 text-left font-semibold text-slate-800 transition hover:bg-orange-50 last:border-b-0"
                  >
                    📍 {ciudad}
                  </button>
                ))}
              </div>
            )}

            {
              busqueda.trim().length > 0 &&
              sugerencias.length === 0 && (
                <div className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-orange-100 bg-white px-5 py-4 text-left shadow-xl">
                  <p className="font-semibold text-slate-700">
                    No encontramos esa ciudad.
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Todavía no tiene eventos, lugares o colaboradores
                    publicados.
                  </p>
                </div>
              )}
          </form>

          {errorCiudades && (
            <p className="mt-4 text-sm font-medium text-slate-500">
              No se pudo actualizar el listado. Se muestran las ciudades
              principales.
            </p>
          )}
        </div>

        <section className="mt-12" aria-labelledby="rutas-destacadas">
          <h2 id="rutas-destacadas" className="text-3xl font-bold text-slate-900">Rutas destacadas</h2>
          <p className="mt-2 text-slate-600">Tres paseos para descubrir una ciudad a pie.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rutasDestacadas.map((ruta) => (
              <Link
                key={ruta.slug}
                href={`/que-hacer/${ruta.slug}#guia-local`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-orange-200 bg-white shadow-sm transition hover:border-orange-400 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
              >
                <img src={ruta.imagen} alt={ruta.alt} loading="lazy" className="aspect-[16/9] w-full bg-orange-100 object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm font-semibold text-orange-800">{ruta.ciudad} · {ruta.paradas} paradas</p>
                  <h3 className="mt-2 flex-1 text-xl font-bold text-slate-900">{ruta.titulo}</h3>
                  <span className="mt-4 font-semibold text-orange-800 group-hover:underline">Ver ruta y mapa →</span>
                </div>
              </Link>
            ))}
          </div>
          {guiasConRuta.length > 0 && (
            <button
              type="button"
              onClick={mostrarRutas}
              className="mt-6 min-h-11 rounded-full border border-orange-300 bg-white px-5 py-2 text-sm font-bold text-orange-800 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
            >
              {guiasConRuta.length === 1 ? "Ver la ruta a pie" : `Ver las ${guiasConRuta.length} rutas a pie`} →
            </button>
          )}
        </section>

        <section className="mt-16" aria-labelledby="guias-destacadas">
          <h2 ref={tituloGuias} id="guias-destacadas" tabIndex={-1} className="scroll-mt-24 text-3xl font-bold text-slate-900">
            Todas las guías
          </h2>
          <p className="mt-3 text-slate-600">
            Ideas de rutas, visitas y consejos prácticos para combinar con tu próximo plan.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-orange-200 bg-white px-3 text-sm font-semibold text-slate-900">
              <input type="checkbox" checked={soloRutas} onChange={(event) => setSoloRutas(event.target.checked)} className="size-4 accent-orange-700" />
              Solo rutas a pie
            </label>
            <p className="text-sm text-slate-600" role="status">{guiasVisibles.length} guías</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {guiasVisibles.map((ciudad) => (
              <Link key={ciudad} href={`/que-hacer/${slugCiudad(ciudad)}#guia-local`}
                className="rounded-2xl border border-orange-200 bg-white p-6 shadow-sm transition hover:border-orange-400 hover:shadow-md">
                <h3 className="text-xl font-bold text-slate-900">{ciudad}</h3>
                {ciudadesRuta.has(slugCiudad(ciudad)) && (
                  <span className="mt-2 inline-block rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-900">Ruta a pie</span>
                )}
                <p className="mt-3 font-semibold text-orange-700">Ver guía y lugares →</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-900">
            Ciudades populares
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ciudadesPopulares.map((ciudad) => (
              <Link
                key={ciudad}
                href={`/que-hacer/${slugCiudad(ciudad)}`}
                className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  📍 {ciudad}
                </h3>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <p>🎵 Eventos</p>
                  <p>🏛️ Lugares</p>
                  <p>🤝 Salas colaboradoras</p>
                </div>

                <div className="mt-6 font-semibold text-orange-600">
                  Descubrir {ciudad} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
