"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function QueHacerPage({ ciudadesDisponibles, errorCiudades = false }: { ciudadesDisponibles: string[]; errorCiudades?: boolean }) {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState("");

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
