"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

const ciudadesRespaldo = [
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
  "Logroño",
  "Córdoba",
  "Toledo",
  "Burgos",
  "Lugo",
  "Ourense",
  "Pontevedra",
  "Santiago de Compostela",
];

type RegistroCiudad = {
  ciudad: string | null;
};

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

function limpiarCiudad(ciudad: string) {
  return ciudad.replace(/\s+/g, " ").trim();
}

async function obtenerTodasLasCiudades(
  tabla: "eventos" | "Monumentos" | "colaboradores"
): Promise<string[]> {
  const tamanoPagina = 1000;
  let desde = 0;
  let ciudades: string[] = [];
  let quedanRegistros = true;

  while (quedanRegistros) {
    let consulta = supabase
      .from(tabla)
      .select("ciudad")
      .not("ciudad", "is", null)
      .range(desde, desde + tamanoPagina - 1);

    if (tabla === "eventos") {
      consulta = consulta
        .eq("validado", true)
        .eq("reportado", false);
    }

    if (tabla === "Monumentos") {
      consulta = consulta.eq("reportado", false);
    }

    const { data, error } = await consulta;

    if (error) {
      throw new Error(
        `No se pudieron cargar las ciudades de ${tabla}: ${error.message}`
      );
    }

    const registros = (data || []) as RegistroCiudad[];

    const ciudadesPagina = registros
      .map((registro) => registro.ciudad)
      .filter((ciudad): ciudad is string => Boolean(ciudad?.trim()))
      .map(limpiarCiudad);

    ciudades = [...ciudades, ...ciudadesPagina];

    if (registros.length < tamanoPagina) {
      quedanRegistros = false;
    } else {
      desde += tamanoPagina;
    }
  }

  return ciudades;
}

function unirCiudadesSinDuplicados(ciudades: string[]) {
  const ciudadesUnicas = new Map<string, string>();

  ciudades.forEach((ciudad) => {
    const ciudadLimpia = limpiarCiudad(ciudad);
    const clave = slugCiudad(ciudadLimpia);

    if (!clave) return;

    if (!ciudadesUnicas.has(clave)) {
      ciudadesUnicas.set(clave, ciudadLimpia);
    }
  });

  return Array.from(ciudadesUnicas.values()).sort((a, b) =>
    a.localeCompare(b, "es", {
      sensitivity: "base",
    })
  );
}

export default function QueHacerPage() {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState("");
  const [ciudadesDisponibles, setCiudadesDisponibles] =
    useState<string[]>(ciudadesRespaldo);
  const [cargandoCiudades, setCargandoCiudades] = useState(true);
  const [errorCiudades, setErrorCiudades] = useState(false);

  useEffect(() => {
    let componenteActivo = true;

    async function cargarCiudades() {
      setCargandoCiudades(true);
      setErrorCiudades(false);

      try {
        const [
          ciudadesEventos,
          ciudadesMonumentos,
          ciudadesColaboradores,
        ] = await Promise.all([
          obtenerTodasLasCiudades("eventos"),
          obtenerTodasLasCiudades("Monumentos"),
          obtenerTodasLasCiudades("colaboradores"),
        ]);

        if (!componenteActivo) return;

        const ciudadesCombinadas = unirCiudadesSinDuplicados([
          ...ciudadesEventos,
          ...ciudadesMonumentos,
          ...ciudadesColaboradores,
        ]);

        setCiudadesDisponibles(
          ciudadesCombinadas.length > 0
            ? ciudadesCombinadas
            : ciudadesRespaldo
        );
      } catch (error) {
        console.error("Error cargando las ciudades:", error);

        if (!componenteActivo) return;

        setCiudadesDisponibles(ciudadesRespaldo);
        setErrorCiudades(true);
      } finally {
        if (componenteActivo) {
          setCargandoCiudades(false);
        }
      }
    }

    cargarCiudades();

    return () => {
      componenteActivo = false;
    };
  }, []);

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
                placeholder={
                  cargandoCiudades
                    ? "Cargando ciudades..."
                    : "Escribe una ciudad: Madrid, Barcelona..."
                }
                autoComplete="off"
                aria-label="Buscar una ciudad"
                className="min-w-0 flex-1 rounded-full bg-white px-5 py-4 text-lg font-semibold text-[#0f172a] outline-none placeholder:text-[#94a3b8]"
              />

              <button
                type="submit"
                disabled={cargandoCiudades}
                className="rounded-full bg-orange-600 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cargandoCiudades ? "Cargando..." : "Buscar →"}
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

            {!cargandoCiudades &&
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