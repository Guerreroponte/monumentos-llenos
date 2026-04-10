"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type EventoDB = {
  id: string;
  created_at?: string | null;
  titulo?: string | null;
  descripcion?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  tipo?: string | null;
  slug?: string | null;
  destacado?: boolean | null;
  aprobado?: boolean | null;
  reportado?: boolean | null;
};

function formatearFecha(fecha?: string | null) {
  if (!fecha) return "";
  try {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return fecha;
  }
}

function capitalizar(texto?: string | null) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function normalizarFecha(fecha?: string | null) {
  if (!fecha) return null;
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fechaDentroDelEvento(evento: EventoDB, fechaSeleccionada: string) {
  if (!fechaSeleccionada || !evento.fecha_inicio) return true;

  const fecha = normalizarFecha(fechaSeleccionada);
  const inicio = normalizarFecha(evento.fecha_inicio);
  const fin = normalizarFecha(evento.fecha_fin || evento.fecha_inicio);

  if (!fecha || !inicio || !fin) return false;

  return fecha >= inicio && fecha <= fin;
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<EventoDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  const cargarEventos = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("eventos")
      .select("*")
      .eq("aprobado", true)
      .neq("reportado", true)
      .order("destacado", { ascending: false })
      .order("fecha_inicio", { ascending: true });

    if (error) {
      console.error("Error cargando eventos:", error);
      setError("No se pudieron cargar los eventos.");
      setEventos([]);
    } else {
      setEventos((data || []) as EventoDB[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const ciudadesDisponibles = useMemo(() => {
    const unicas = Array.from(
      new Set(
        eventos
          .map((e) => (e.ciudad || "").trim())
          .filter(Boolean)
      )
    );
    return unicas.sort((a, b) => a.localeCompare(b, "es"));
  }, [eventos]);

  const tiposDisponibles = useMemo(() => {
    const unicos = Array.from(
      new Set(
        eventos
          .map((e) => (e.tipo || "").trim())
          .filter(Boolean)
      )
    );
    return unicos.sort((a, b) => a.localeCompare(b, "es"));
  }, [eventos]);

  const eventosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return eventos.filter((evento) => {
      const matchBusqueda =
        !q ||
        (evento.titulo || "").toLowerCase().includes(q) ||
        (evento.descripcion || "").toLowerCase().includes(q) ||
        (evento.ciudad || "").toLowerCase().includes(q) ||
        (evento.provincia || "").toLowerCase().includes(q) ||
        (evento.comunidad_autonoma || "").toLowerCase().includes(q);

      const matchFecha = fechaDentroDelEvento(evento, filtroFecha);
      const matchCiudad =
        !filtroCiudad || (evento.ciudad || "") === filtroCiudad;
      const matchTipo =
        !filtroTipo || (evento.tipo || "") === filtroTipo;

      return matchBusqueda && matchFecha && matchCiudad && matchTipo;
    });
  }, [eventos, busqueda, filtroFecha, filtroCiudad, filtroTipo]);

  const eventosDestacados = useMemo(
    () => eventosFiltrados.filter((e) => e.destacado),
    [eventosFiltrados]
  );

  const eventosNormales = useMemo(
    () => eventosFiltrados.filter((e) => !e.destacado),
    [eventosFiltrados]
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <div className="border-b border-orange-100 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-2">
          <a
            href="mailto:contacto@monumentosllenos.com?subject=Contacto%20desde%20eventos"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold transition hover:bg-white/25"
          >
            <span aria-hidden="true">✉️</span>
            <span>Contacto</span>
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Lugares Llenos"
              className="h-12 w-auto object-contain"
            />

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-500">
                Comunidad de lugares reales en España
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-orange-500">
                Eventos
              </h1>
            </div>
          </div>

          <nav className="hidden gap-4 text-sm font-medium text-slate-700 md:flex">
            <Link href="/" className="transition hover:text-orange-600">
              Inicio
            </Link>
            <Link href="/#lugares" className="transition hover:text-orange-600">
              Lugares
            </Link>
            <Link href="/eventos" className="transition hover:text-orange-600">
              Eventos
            </Link>
            <Link href="/#participa" className="transition hover:text-orange-600">
              Participa
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_30%)]" />

        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur">
            📅 Elige una fecha · 🎉 Descubre fiestas · 🗺️ Encuentra dónde puede haber más ambiente
          </div>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Fiestas y eventos por fecha en España
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Busca fiestas, ferias y eventos por fecha, ciudad o tipo. Así podrás
            descubrir qué zonas pueden tener más ambiente y más afluencia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <h3 className="text-2xl font-bold text-slate-900">
            Calendario de eventos
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Elige una fecha o filtra por ciudad y tipo para ver qué fiestas hay.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar evento o ciudad..."
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <select
              value={filtroCiudad}
              onChange={(e) => setFiltroCiudad(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Todas las ciudades</option>
              {ciudadesDisponibles.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Todos los tipos</option>
              {tiposDisponibles.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {capitalizar(tipo)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 font-medium">
              {eventosFiltrados.length} evento(s)
            </span>

            {filtroFecha ? (
              <button
                onClick={() => setFiltroFecha("")}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium transition hover:bg-slate-100"
              >
                Quitar fecha: {formatearFecha(filtroFecha)}
              </button>
            ) : null}

            {filtroCiudad ? (
              <button
                onClick={() => setFiltroCiudad("")}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium transition hover:bg-slate-100"
              >
                Quitar ciudad: {filtroCiudad}
              </button>
            ) : null}

            {filtroTipo ? (
              <button
                onClick={() => setFiltroTipo("")}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-medium transition hover:bg-slate-100"
              >
                Quitar tipo: {capitalizar(filtroTipo)}
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {loading ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-6 text-slate-600 shadow-sm">
            Cargando eventos...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            {error}
          </div>
        ) : eventosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-8 text-slate-600 shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              No hay eventos que coincidan con la búsqueda.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prueba con otra fecha, otra ciudad o un tipo distinto.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {eventosDestacados.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2">
                {eventosDestacados.map((evento) => (
                  <article
                    key={evento.id}
                    className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-[80%]">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                            {evento.ciudad}
                          </p>
                          <h4 className="mt-2 text-3xl font-bold leading-tight text-slate-900">
                            {evento.titulo}
                          </h4>
                        </div>

                        <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                          Destacado
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3 text-sm">
                        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                          <p className="text-slate-500">Fecha</p>
                          <p className="mt-1 font-semibold text-slate-900">
                            📅 {formatearFecha(evento.fecha_inicio)}
                            {evento.fecha_fin &&
                            evento.fecha_fin !== evento.fecha_inicio
                              ? ` — ${formatearFecha(evento.fecha_fin)}`
                              : ""}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                          <p className="text-slate-500">Tipo</p>
                          <p className="mt-1 font-semibold text-slate-900">
                            🎉 {capitalizar(evento.tipo)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-7 text-slate-600">
                        {evento.descripcion || "Evento local añadido a la guía."}
                      </p>

                      <div className="mt-6">
                        <Link
                          href="/#lugares"
                          className="inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md"
                        >
                          Ver lugares
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="grid gap-6">
              {eventosNormales.map((evento) => (
                <article
                  key={evento.id}
                  className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="max-w-[80%]">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                          {evento.ciudad}
                        </p>
                        <h4 className="mt-2 text-3xl font-bold leading-tight text-slate-900">
                          {evento.titulo}
                        </h4>
                      </div>

                      <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                        {capitalizar(evento.tipo)}
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Fecha</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          📅 {formatearFecha(evento.fecha_inicio)}
                          {evento.fecha_fin &&
                          evento.fecha_fin !== evento.fecha_inicio
                            ? ` — ${formatearFecha(evento.fecha_fin)}`
                            : ""}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Ciudad</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          🏙️ {evento.ciudad}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Provincia</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          📍 {evento.provincia || "No indicada"}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Comunidad</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          🗺️ {evento.comunidad_autonoma || "No indicada"}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                      {evento.descripcion || "Evento local añadido a la guía."}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}