"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Evento = {
  id: string;
  nombre: string | null;
  slug: string | null;
  ciudad: string | null;
  fecha_inicio: string | null;
  imagen: string | null;
  subtipo: string | null;
};

type Lugar = {
  id: string;
  nombre: string | null;
  slug: string | null;
  ciudad: string | null;
  imagen: string | null;
  imagen_fullback: string | null;
  descripcion: string | null;
  rating: number | null;
};

type Colaborador = {
  id: string;
  nombre: string | null;
  ciudad: string | null;
  tipo: string | null;
  descripcion: string | null;
  web: string | null;
  instagram: string | null;
  logo_url: string | null;
  logo: string | null;
  imagen: string | null;
  programacion_url: string | null;
  programacion_enlace: string | null;
};

const categorias = [
  { label: "🎵 Conciertos", href: "#eventos" },
  { label: "🎭 Teatro", href: "#eventos" },
  { label: "😂 Monólogos", href: "#eventos" },
  { label: "🍸 Tardeo", href: "#eventos" },
  { label: "🏛️ Monumentos", href: "#lugares" },
  { label: "🌳 Naturaleza", href: "#lugares" },
  { label: "👨‍👩‍👧‍👦 Planes en familia", href: "#lugares" },
  { label: "🤝 Salas colaboradoras", href: "#colaboradores" },
];

const ciudadesConTilde: Record<string, string> = {
  malaga: "Málaga",
  "a-coruna": "A Coruña",
  cordoba: "Córdoba",
  cadiz: "Cádiz",
  leon: "León",
  avila: "Ávila",
  caceres: "Cáceres",
  merida: "Mérida",
  logrono: "Logroño",
  gijon: "Gijón",
  "san-sebastian": "San Sebastián",
};

function formatearCiudad(slug: string) {
  if (ciudadesConTilde[slug]) return ciudadesConTilde[slug];

  return slug
    .split("-")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function formatearFecha(fecha?: string | null) {
  if (!fecha) return "Fecha por confirmar";

  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return "Fecha por confirmar";

  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CiudadPage() {
  const params = useParams();
  const ciudadSlug = params?.ciudad as string;
  const ciudadFormateada = formatearCiudad(ciudadSlug);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);

  const [cargandoEventos, setCargandoEventos] = useState(true);
  const [cargandoLugares, setCargandoLugares] = useState(true);
  const [cargandoColaboradores, setCargandoColaboradores] = useState(true);

  useEffect(() => {
    if (!ciudadFormateada) return;

    const cargarDatosCiudad = async () => {
      setCargandoEventos(true);
      setCargandoLugares(true);
      setCargandoColaboradores(true);

      const hoy = new Date().toISOString().split("T")[0];

      const { data: eventosData } = await supabase
        .from("eventos")
        .select("id,nombre,slug,ciudad,fecha_inicio,imagen,subtipo")
        .ilike("ciudad", ciudadFormateada)
        .eq("validado", true)
        .eq("reportado", false)
        .gte("fecha_inicio", hoy)
        .order("fecha_inicio", { ascending: true })
        .limit(8);

      setEventos(eventosData || []);
      setCargandoEventos(false);

      const { data: lugaresData } = await supabase
        .from("Monumentos")
        .select(
          "id,nombre,slug,ciudad,imagen,imagen_fullback,descripcion,rating"
        )
        .ilike("ciudad", ciudadFormateada)
        .eq("reportado", false)
        .order("created_at", { ascending: false })
        .limit(8);

      setLugares(lugaresData || []);
      setCargandoLugares(false);

      const { data: colaboradoresData } = await supabase
        .from("colaboradores")
        .select(
          "id,nombre,ciudad,tipo,descripcion,web,instagram,logo_url,logo,imagen,programacion_url,programacion_enlace"
        )
        .ilike("ciudad", ciudadFormateada)
        .order("nombre", { ascending: true })
        .limit(8);

      setColaboradores(colaboradoresData || []);
      setCargandoColaboradores(false);
    };

    cargarDatosCiudad();
  }, [ciudadFormateada]);

  return (
    <main className="bg-[#fff7ed] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm font-semibold text-slate-500">
          <Link href="/" className="hover:text-orange-600">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/que-hacer" className="hover:text-orange-600">Qué hacer</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{ciudadFormateada}</span>
        </nav>

        <p className="text-orange-600 font-bold uppercase tracking-[0.25em] text-sm">
          Guía por ciudades
        </p>

        <h1 className="mt-4 text-5xl font-extrabold text-slate-900">
          ¿Qué hacer en {ciudadFormateada}?
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Descubre qué hacer en {ciudadFormateada} hoy, este fin de semana o cuando tú quieras. Encuentra conciertos, lugares especiales, planes diferentes y salas colaboradoras de la ciudad.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#eventos" className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            🎵 {eventos.length} próximos eventos
          </a>

          <a href="#lugares" className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            🏛️ {lugares.length} lugares
          </a>

          <a href="#colaboradores" className="rounded-full border border-orange-100 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            🤝 {colaboradores.length} salas colaboradoras
          </a>
        </div>

        <section className="mt-12 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            ¿Qué buscas hoy en {ciudadFormateada}?
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {categorias.map((categoria) => (
              <a
                key={categoria.label}
                href={categoria.href}
                className="rounded-full border border-orange-100 bg-[#fff7ed] px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
              >
                {categoria.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-orange-600 font-bold uppercase tracking-[0.18em] text-xs">
                Comunidad real
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                ¿Organizas planes en {ciudadFormateada}?
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Publica gratis eventos, lugares o planes locales para que más personas los descubran.
              </p>
            </div>

            <Link href="/participa" className="inline-flex rounded-full bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-700">
              Publicar gratis →
            </Link>
          </div>
        </section>

        <section id="eventos" className="scroll-mt-32 mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-orange-600 font-bold uppercase tracking-[0.18em] text-xs">
                Agenda local
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                🎵 Próximos eventos en {ciudadFormateada}
              </h2>
            </div>

            <Link href={`/eventos?ciudad=${encodeURIComponent(ciudadFormateada)}`} className="text-sm font-bold text-orange-600 hover:text-orange-700">
              Ver todos los eventos →
            </Link>
          </div>

          {cargandoEventos ? (
            <p className="mt-6 text-slate-600">Cargando eventos...</p>
          ) : eventos.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-orange-200 bg-white p-6">
              <p className="font-bold text-slate-900">
                Todavía no hay próximos eventos publicados en {ciudadFormateada}.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventos.map((evento) => (
                <Link key={evento.id} href={`/eventos/${evento.slug}`} className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <img
                    src={evento.imagen || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"}
                    alt={evento.nombre || "Evento"}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-5">
                    {evento.subtipo && (
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-600">
                        {evento.subtipo}
                      </p>
                    )}

                    <h3 className="text-lg font-bold text-slate-900">
                      {evento.nombre || "Evento"}
                    </h3>

                    <p className="mt-3 text-sm text-slate-600">
                      📅 {formatearFecha(evento.fecha_inicio)}
                    </p>

                    <p className="mt-4 text-sm font-semibold text-orange-600">
                      Ver evento →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section id="lugares" className="scroll-mt-32 mt-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-orange-600 font-bold uppercase tracking-[0.18em] text-xs">
                Lugares para descubrir
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                🏛️ Lugares especiales en {ciudadFormateada}
              </h2>
            </div>

            <Link href={`/lugar?ciudad=${encodeURIComponent(ciudadFormateada)}`} className="text-sm font-bold text-orange-600 hover:text-orange-700">
              Ver todos los lugares →
            </Link>
          </div>

          {cargandoLugares ? (
            <p className="mt-6 text-slate-600">Cargando lugares...</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {lugares.map((lugar) => (
                <Link key={lugar.id} href={`/lugar/${lugar.slug}`} className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <img
                    src={lugar.imagen || lugar.imagen_fullback || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"}
                    alt={lugar.nombre || "Lugar"}
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-orange-600">
                      Lugar destacado
                    </p>

                    <h3 className="text-lg font-bold text-slate-900">
                      {lugar.nombre || "Lugar"}
                    </h3>

                    {lugar.descripcion && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {lugar.descripcion}
                      </p>
                    )}

                    {lugar.rating && (
                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        ⭐ {lugar.rating}
                      </p>
                    )}

                    <p className="mt-4 text-sm font-semibold text-orange-600">
                      Ver lugar →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section id="colaboradores" className="scroll-mt-32 mt-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-orange-600 font-bold uppercase tracking-[0.18em] text-xs">
                Comunidad cultural
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                🤝 Salas colaboradoras en {ciudadFormateada}
              </h2>
            </div>

            <Link href="/colaboradores" className="text-sm font-bold text-orange-600 hover:text-orange-700">
              Ver todos los colaboradores →
            </Link>
          </div>

          {cargandoColaboradores ? (
            <p className="mt-6 text-slate-600">Cargando colaboradores...</p>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {colaboradores.map((colaborador) => {
                const imagenPrincipal =
                  colaborador.imagen ||
                  colaborador.logo_url ||
                  colaborador.logo ||
                  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80";

                const logoPrincipal = colaborador.logo_url || colaborador.logo || null;

                const enlaceProgramacion =
                  colaborador.programacion_enlace ||
                  colaborador.programacion_url ||
                  colaborador.web ||
                  colaborador.instagram ||
                  null;

                return (
                  <article key={colaborador.id} className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <img
                      src={imagenPrincipal}
                      alt={colaborador.nombre || "Sala colaboradora"}
                      className="h-40 w-full object-cover"
                    />

                    <div className="p-5">
                      <div className="mb-4 flex items-center gap-3">
                        {logoPrincipal && (
                          <img
                            src={logoPrincipal}
                            alt={colaborador.nombre || "Logo colaborador"}
                            className="h-12 w-12 rounded-xl border border-orange-100 bg-white object-contain p-1"
                          />
                        )}

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-orange-600">
                            Sala colaboradora
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-slate-900">
                            {colaborador.nombre}
                          </h3>
                        </div>
                      </div>

                      {colaborador.descripcion && (
                        <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                          {colaborador.descripcion}
                        </p>
                      )}

                      <p className="mt-3 text-sm text-slate-600">
                        📍 {colaborador.ciudad || ciudadFormateada}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {enlaceProgramacion && (
                          <a href={enlaceProgramacion} target="_blank" rel="noopener noreferrer" className="rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700">
                            Ver programación →
                          </a>
                        )}

                        {colaborador.instagram && (
                          <a href={colaborador.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full border border-orange-200 px-4 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-50">
                            Instagram
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-20 rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
          <p className="text-orange-600 font-bold uppercase tracking-[0.18em] text-xs">
            Guía local
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Qué hacer en {ciudadFormateada}
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            {ciudadFormateada} ofrece una gran variedad de planes para todos los gustos: conciertos, salas de música en directo, monumentos, lugares especiales y propuestas culturales para descubrir la ciudad de una forma diferente. En Lugares Llenos reunimos eventos próximos, espacios colaboradores y lugares recomendados para que puedas encontrar planes reales en un solo sitio.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            Esta página se actualiza con nuevos eventos y lugares publicados en la comunidad, para que puedas consultar qué hacer en {ciudadFormateada} hoy, mañana, este fin de semana o en tus próximas visitas.
          </p>
        </section>
      </section>
    </main>
  );
}