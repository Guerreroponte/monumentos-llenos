"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type EventoDB = {
  id: string;
  created_at?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  tipo?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
  enlace?: string | null;
  destacado?: boolean | null;
};

type EventoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  provincia: string;
  comunidad: string;
  tipo: string;
  fechaInicio: string | null;
  fechaFin: string | null;
  descripcion: string;
  imagen: string;
  enlace: string;
  destacado: boolean;
  categoriaVisual: "grande" | "local";
};

const FALLBACKS_EVENTOS = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
];

const CIUDADES_TOP = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Málaga",
  "Bilbao",
  "A Coruña",
  "Vigo",
  "Zaragoza",
  "Alicante",
];

function normalizarTexto(valor?: string | null) {
  return (valor ?? "").trim();
}

function formatFecha(fecha?: string | null) {
  if (!fecha) return "";
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatFechaCorta(fecha?: string | null) {
  if (!fecha) return "";
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function esEventoProximo(fechaInicio?: string | null, fechaFin?: string | null) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const inicio = fechaInicio ? new Date(fechaInicio) : null;
  const fin = fechaFin ? new Date(fechaFin) : null;

  if (inicio && !Number.isNaN(inicio.getTime())) inicio.setHours(0, 0, 0, 0);
  if (fin && !Number.isNaN(fin.getTime())) fin.setHours(0, 0, 0, 0);

  if (fin) return fin >= hoy;
  if (inicio) return inicio >= hoy;

  return false;
}

function esHoy(fecha?: string | null) {
  if (!fecha) return false;

  const hoy = new Date();
  const d = new Date(fecha);

  if (Number.isNaN(d.getTime())) return false;

  hoy.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return hoy.getTime() === d.getTime();
}

function esManana(fecha?: string | null) {
  if (!fecha) return false;

  const manana = new Date();
  manana.setDate(manana.getDate() + 1);

  const d = new Date(fecha);

  if (Number.isNaN(d.getTime())) return false;

  manana.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);

  return manana.getTime() === d.getTime();
}

function getFallbackImagen(id: string) {
  const index =
    Math.abs(
      id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % FALLBACKS_EVENTOS.length;

  return FALLBACKS_EVENTOS[index];
}

function tipoNormalizado(tipo?: string | null) {
  return (tipo ?? "").trim().toLowerCase();
}

function esPlanLocalPorTipo(tipo?: string | null) {
  const t = tipoNormalizado(tipo);

  return (
    t.includes("plan local") ||
    t.includes("qué hacer hoy") ||
    t.includes("que hacer hoy") ||
    t.includes("hoy") ||
    t.includes("mañana") ||
    t.includes("manana") ||
    t.includes("monólogo") ||
    t.includes("monologo") ||
    t.includes("tardeo") ||
    t.includes("bar") ||
    t.includes("sala") ||
    t.includes("directo") ||
    t.includes("vermú") ||
    t.includes("vermu") ||
    t.includes("local") ||
    t.includes("pequeño") ||
    t.includes("pequeno") ||
    t.includes("microevento")
  );
}

function esEventoGrandePorTipo(tipo?: string | null) {
  const t = tipoNormalizado(tipo);

  return (
    t.includes("festival") ||
    t.includes("feria") ||
    t.includes("fiesta") ||
    t.includes("romería") ||
    t.includes("romeria") ||
    t.includes("mercado medieval") ||
    t.includes("carnaval") ||
    t.includes("semana santa") ||
    t.includes("concierto grande") ||
    t.includes("evento grande")
  );
}

function detectarCategoriaVisual(e: EventoDB): "grande" | "local" {
  const tipo = e.tipo ?? "";

  if (esPlanLocalPorTipo(tipo)) return "local";
  if (esEventoGrandePorTipo(tipo)) return "grande";

  if (e.destacado) return "grande";

  return "grande";
}

function eventoScore(e: EventoUI) {
  let score = 0;

  if (e.destacado) score += 100;
  if (CIUDADES_TOP.includes(e.ciudad)) score += 25;

  const tipo = e.tipo.toLowerCase();

  if (
    tipo.includes("festival") ||
    tipo.includes("feria") ||
    tipo.includes("fiesta") ||
    tipo.includes("concierto")
  ) {
    score += 20;
  }

  if (e.fechaInicio) {
    const ahora = new Date();
    const fecha = new Date(e.fechaInicio);

    const diffDias = Math.floor(
      (fecha.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDias >= 0 && diffDias <= 7) score += 30;
    else if (diffDias <= 30) score += 20;
    else if (diffDias <= 90) score += 10;
  }

  return score;
}

function planLocalScore(e: EventoUI) {
  let score = 0;

  if (esHoy(e.fechaInicio)) score += 50;
  else if (esManana(e.fechaInicio)) score += 35;
  else if (esEventoProximo(e.fechaInicio, e.fechaFin)) score += 20;

  if (CIUDADES_TOP.includes(e.ciudad)) score += 12;
  if (e.destacado) score += 10;

  const tipo = e.tipo.toLowerCase();

  if (
    tipo.includes("concierto") ||
    tipo.includes("monólogo") ||
    tipo.includes("monologo") ||
    tipo.includes("tardeo") ||
    tipo.includes("directo")
  ) {
    score += 12;
  }

  return score;
}

function textoFechaEvento(e: EventoUI) {
  if (e.fechaInicio && e.fechaFin) {
    const inicio = formatFecha(e.fechaInicio);
    const fin = formatFecha(e.fechaFin);

    if (inicio && fin && inicio !== fin) return `${inicio} - ${fin}`;
    if (inicio) return inicio;
  }

  return e.fechaInicio ? formatFecha(e.fechaInicio) : "Fecha por confirmar";
}

export default function EventosPage() {
  const [eventos, setEventos] = useState<EventoUI[]>([]);
  const [loading, setLoading] = useState(true);

  const [busqueda, setBusqueda] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [soloProximos, setSoloProximos] = useState(false);
  const [modoVista, setModoVista] = useState<"todos" | "grandes" | "locales">(
    "todos"
  );

  useEffect(() => {
    let activo = true;

    async function cargarEventos() {
      setLoading(true);

      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .order("fecha_inicio", { ascending: true });

      if (!activo) return;

      if (error) {
        console.error("Error cargando eventos:", error);
        setEventos([]);
        setLoading(false);
        return;
      }

      const eventosMapeados: EventoUI[] = ((data as EventoDB[] | null) ?? []).map(
        (e) => ({
          id: e.id,
          nombre: normalizarTexto(e.nombre) || "Evento sin nombre",
          ciudad: normalizarTexto(e.ciudad) || "Ciudad por confirmar",
          provincia: normalizarTexto(e.provincia),
          comunidad: normalizarTexto(e.comunidad_autonoma),
          tipo: normalizarTexto(e.tipo) || "Evento",
          fechaInicio: e.fecha_inicio ?? null,
          fechaFin: e.fecha_fin ?? null,
          descripcion:
            normalizarTexto(e.descripcion) ||
            "Consulta este evento y descubre más detalles sobre el ambiente de la zona.",
          imagen: normalizarTexto(e.imagen) || getFallbackImagen(e.id),
          enlace: normalizarTexto(e.enlace),
          destacado: Boolean(e.destacado),
          categoriaVisual: detectarCategoriaVisual(e),
        })
      );

      setEventos(eventosMapeados);
      setLoading(false);
    }

    cargarEventos();

    return () => {
      activo = false;
    };
  }, []);

  const ciudadesDisponibles = useMemo(() => {
    return [...new Set(eventos.map((e) => e.ciudad).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [eventos]);

  const tiposDisponibles = useMemo(() => {
    return [...new Set(eventos.map((e) => e.tipo).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [eventos]);

  const eventosProximos = useMemo(() => {
    return eventos
      .filter((e) => esEventoProximo(e.fechaInicio, e.fechaFin))
      .sort((a, b) => {
        const aTime = a.fechaInicio ? new Date(a.fechaInicio).getTime() : Infinity;
        const bTime = b.fechaInicio ? new Date(b.fechaInicio).getTime() : Infinity;
        return aTime - bTime;
      });
  }, [eventos]);

  const eventosGrandes = useMemo(() => {
    const base = eventosProximos.length > 0 ? eventosProximos : eventos;

    return base
      .filter((e) => e.categoriaVisual === "grande")
      .sort((a, b) => eventoScore(b) - eventoScore(a));
  }, [eventos, eventosProximos]);

  const planesLocales = useMemo(() => {
    const base = eventosProximos.length > 0 ? eventosProximos : eventos;

    return base
      .filter((e) => e.categoriaVisual === "local")
      .sort((a, b) => planLocalScore(b) - planLocalScore(a));
  }, [eventos, eventosProximos]);

  const heroEvento = useMemo(() => {
    if (eventosGrandes.length > 0) return eventosGrandes[0];
    if (eventosProximos.length > 0) return eventosProximos[0];
    return eventos[0] ?? null;
  }, [eventos, eventosGrandes, eventosProximos]);

  const eventosGrandesDestacados = useMemo(() => {
    return eventosGrandes.slice(0, 6);
  }, [eventosGrandes]);

  const planesHoy = useMemo(() => {
    return planesLocales
      .filter((e) => esHoy(e.fechaInicio))
      .sort((a, b) => planLocalScore(b) - planLocalScore(a))
      .slice(0, 6);
  }, [planesLocales]);

  const planesManana = useMemo(() => {
    return planesLocales
      .filter((e) => esManana(e.fechaInicio))
      .sort((a, b) => planLocalScore(b) - planLocalScore(a))
      .slice(0, 6);
  }, [planesLocales]);

  const planesLocalesDestacados = useMemo(() => {
    const base = planesHoy.length > 0 ? planesHoy : planesLocales;
    return base.slice(0, 6);
  }, [planesHoy, planesLocales]);

  const eventosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return eventos
      .filter((e) => {
        if (soloProximos && !esEventoProximo(e.fechaInicio, e.fechaFin)) {
          return false;
        }

        if (modoVista === "grandes" && e.categoriaVisual !== "grande") {
          return false;
        }

        if (modoVista === "locales" && e.categoriaVisual !== "local") {
          return false;
        }

        if (texto) {
          const bloque = [
            e.nombre,
            e.ciudad,
            e.provincia,
            e.comunidad,
            e.tipo,
            e.descripcion,
          ]
            .join(" ")
            .toLowerCase();

          if (!bloque.includes(texto)) return false;
        }

        if (fechaSeleccionada) {
          const fechaEvento = e.fechaInicio ? e.fechaInicio.slice(0, 10) : "";
          if (fechaEvento !== fechaSeleccionada) return false;
        }

        if (ciudadSeleccionada && e.ciudad !== ciudadSeleccionada) return false;
        if (tipoSeleccionado && e.tipo !== tipoSeleccionado) return false;

        return true;
      })
      .sort((a, b) => {
        const aTime = a.fechaInicio ? new Date(a.fechaInicio).getTime() : Infinity;
        const bTime = b.fechaInicio ? new Date(b.fechaInicio).getTime() : Infinity;
        return aTime - bTime;
      });
  }, [
    eventos,
    busqueda,
    fechaSeleccionada,
    ciudadSeleccionada,
    tipoSeleccionado,
    soloProximos,
    modoVista,
  ]);

  const bloquesPorCiudad = useMemo(() => {
    const base = eventosProximos.length > 0 ? eventosProximos : eventos;

    const ciudadesPrioritarias = [...new Set(base.map((e) => e.ciudad))]
      .filter((c) => CIUDADES_TOP.includes(c))
      .sort((a, b) => CIUDADES_TOP.indexOf(a) - CIUDADES_TOP.indexOf(b))
      .slice(0, 4);

    return ciudadesPrioritarias
      .map((ciudad) => ({
        ciudad,
        eventos: base.filter((e) => e.ciudad === ciudad).slice(0, 3),
      }))
      .filter((bloque) => bloque.eventos.length > 0);
  }, [eventos, eventosProximos]);

  function resetearFiltros() {
    setBusqueda("");
    setFechaSeleccionada("");
    setCiudadSeleccionada("");
    setTipoSeleccionado("");
    setSoloProximos(false);
    setModoVista("todos");
  }

  function filtrarHoy() {
    const hoy = new Date().toISOString().slice(0, 10);
    setFechaSeleccionada(hoy);
    setSoloProximos(false);
    setModoVista("locales");
  }

  function filtrarManana() {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    setFechaSeleccionada(manana.toISOString().slice(0, 10));
    setSoloProximos(false);
    setModoVista("locales");
  }

  function verProximos() {
    setFechaSeleccionada("");
    setSoloProximos(true);
  }

  function verEventosGrandes() {
    setFechaSeleccionada("");
    setModoVista("grandes");
    setSoloProximos(true);
  }

  function verPlanesLocales() {
    setFechaSeleccionada("");
    setModoVista("locales");
    setSoloProximos(true);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-8 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Comunidad de lugares reales en España
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Eventos grandes
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Qué hacer hoy
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
              Eventos grandes y planes reales para hoy en España
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
              Descubre desde ferias, fiestas y festivales hasta planes pequeños
              tipo concierto en un bar, monólogo, tardeo o directo de última hora.
              La idea es que aquí se vea qué merece la pena de verdad.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={verProximos}
                className="rounded-full border border-[#fed7aa] bg-white px-4 py-2 text-sm font-semibold text-[#ea580c] transition hover:bg-[#fff7ed]"
              >
                Próximos eventos
              </button>

              <button
                onClick={verEventosGrandes}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Eventos grandes
              </button>

              <button
                onClick={verPlanesLocales}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Qué hacer hoy
              </button>

              <button
                onClick={filtrarHoy}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Hoy
              </button>

              <button
                onClick={filtrarManana}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Mañana
              </button>

              <button
                onClick={resetearFiltros}
                className="rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Resetear filtros
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#fde7d7] bg-white shadow-sm">
            <img
              src={heroEvento?.imagen || FALLBACKS_EVENTOS[0]}
              alt={heroEvento?.nombre || "Eventos en España"}
              className="h-[280px] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f97316]">
                {heroEvento?.categoriaVisual === "local"
                  ? "Plan local destacado"
                  : "Evento destacado"}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#334155]">
                {heroEvento?.nombre || "Descubre los próximos eventos"}
              </h2>

              <p className="mt-2 text-sm text-[#64748b]">
                {heroEvento
                  ? `${heroEvento.ciudad} · ${
                      formatFecha(heroEvento.fechaInicio) || "Fecha por confirmar"
                    }`
                  : "Ferias, fiestas, festivales y planes con más ambiente."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#334155]">
              Calendario y filtros
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Busca por texto, fecha, ciudad, tipo o por clase de plan.
            </p>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={() => setModoVista("todos")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                modoVista === "todos"
                  ? "bg-[#f97316] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              Todos
            </button>

            <button
              onClick={() => setModoVista("grandes")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                modoVista === "grandes"
                  ? "bg-[#f97316] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              Eventos grandes
            </button>

            <button
              onClick={() => setModoVista("locales")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                modoVista === "locales"
                  ? "bg-[#f97316] text-white"
                  : "border border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#f8fafc]"
              }`}
            >
              Planes locales
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar evento, ciudad o plan..."
              className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            <input
              type="date"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
              className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            <select
              value={ciudadSeleccionada}
              onChange={(e) => setCiudadSeleccionada(e.target.value)}
              className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            >
              <option value="">Todas las ciudades</option>
              {ciudadesDisponibles.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>

            <select
              value={tipoSeleccionado}
              onChange={(e) => setTipoSeleccionado(e.target.value)}
              className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            >
              <option value="">Todos los tipos</option>
              {tiposDisponibles.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-[#475569]">
              <input
                type="checkbox"
                checked={soloProximos}
                onChange={(e) => setSoloProximos(e.target.checked)}
              />
              Mostrar solo próximos eventos
            </label>

            <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#ea580c]">
              {eventosFiltrados.length} evento(s)
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#334155]">
              🔥 Eventos grandes que vienen pronto
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Ferias, festivales, fiestas y citas potentes para que la página entre con fuerza.
            </p>
          </div>

          <button
            onClick={() => {
              setModoVista("grandes");
              setSoloProximos(true);
              setFechaSeleccionada("");
            }}
            className="rounded-full bg-[#fff7ed] px-4 py-2 text-sm font-bold text-[#ea580c]"
          >
            Ver solo eventos grandes
          </button>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white"
              >
                <div className="h-48 animate-pulse bg-[#f1f5f9]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#f1f5f9]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#f1f5f9]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#f1f5f9]" />
                </div>
              </div>
            ))}
          </div>
        ) : eventosGrandesDestacados.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#fdba74] bg-[#fff7ed] p-8 text-center">
            <p className="text-lg font-semibold text-[#9a3412]">
              Todavía no hay eventos grandes cargados.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {eventosGrandesDestacados.map((evento) => (
              <article
                key={evento.id}
                className="group overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={evento.imagen}
                    alt={evento.nombre}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.tipo}
                    </span>

                    {evento.destacado && (
                      <span className="rounded-full bg-[#ea580c] px-3 py-1 text-xs font-bold text-white">
                        Top
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#64748b]">
                    <span>📍 {evento.ciudad}</span>
                    <span>📅 {textoFechaEvento(evento)}</span>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-5">
                    {evento.enlace ? (
                      <a
                        href={evento.enlace}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
                      >
                        Ver evento
                      </a>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#fff7ed] px-4 py-2 text-sm font-semibold text-[#ea580c]">
                        Próximamente más info
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#334155]">
              ⚡ Qué hacer hoy / planes pequeños
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Conciertos pequeños, monólogos, tardeos, directos y planes cercanos que la gente pueda subir.
            </p>
          </div>

          <button
            onClick={() => {
              setModoVista("locales");
              setSoloProximos(true);
              setFechaSeleccionada("");
            }}
            className="rounded-full bg-[#fff7ed] px-4 py-2 text-sm font-bold text-[#ea580c]"
          >
            Ver solo planes locales
          </button>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white"
              >
                <div className="h-40 animate-pulse bg-[#f1f5f9]" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#f1f5f9]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#f1f5f9]" />
                </div>
              </div>
            ))}
          </div>
        ) : planesLocalesDestacados.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center">
            <p className="text-lg font-semibold text-[#334155]">
              Todavía no hay planes locales cargados.
            </p>
            <p className="mt-2 text-sm text-[#64748b]">
              Aquí aparecerán ideas tipo “hoy concierto en tal sala”, “mañana monólogo” o “tardeo en tal bar”.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {planesLocalesDestacados.map((evento) => (
              <article
                key={evento.id}
                className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.tipo}
                    </span>

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>

                    {esHoy(evento.fechaInicio) && (
                      <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                        Hoy
                      </span>
                    )}

                    {esManana(evento.fechaInicio) && (
                      <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                        Mañana
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748b]">
                    {textoFechaEvento(evento)}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-5">
                    {evento.enlace ? (
                      <a
                        href={evento.enlace}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition hover:bg-[#fff7ed]"
                      >
                        Ver plan
                      </a>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#64748b]">
                        Sin enlace externo
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {planesHoy.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#334155]">
              🟠 Hoy mismo
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Para los que entran buscando plan rápido.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planesHoy.map((evento) => (
              <div
                key={evento.id}
                className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                    Hoy
                  </span>
                  <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                    {evento.tipo}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#334155]">{evento.nombre}</h3>
                <p className="mt-1 text-sm text-[#64748b]">
                  📍 {evento.ciudad} · 📅 {textoFechaEvento(evento)}
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-[#475569]">
                  {evento.descripcion}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {bloquesPorCiudad.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#334155]">
              📍 Próximos eventos por ciudad
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Para destacar ciudades fuertes sin tener que buscarlas.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {bloquesPorCiudad.map((bloque) => (
              <div
                key={bloque.ciudad}
                className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h3 className="text-xl font-bold text-[#334155]">
                    {bloque.ciudad}
                  </h3>

                  <button
                    onClick={() => {
                      setCiudadSeleccionada(bloque.ciudad);
                      setFechaSeleccionada("");
                      setSoloProximos(false);
                    }}
                    className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]"
                  >
                    Ver todos
                  </button>
                </div>

                <div className="space-y-4">
                  {bloque.eventos.map((evento) => (
                    <div
                      key={evento.id}
                      className="flex gap-4 rounded-2xl border border-[#f1f5f9] p-3"
                    >
                      <img
                        src={evento.imagen}
                        alt={evento.nombre}
                        className="h-24 w-28 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f97316]">
                          {evento.tipo}
                        </p>

                        <h4 className="mt-1 truncate text-base font-bold text-[#334155]">
                          {evento.nombre}
                        </h4>

                        <p className="mt-1 text-sm text-[#64748b]">
                          {evento.fechaInicio
                            ? formatFechaCorta(evento.fechaInicio)
                            : "Fecha por confirmar"}
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm text-[#475569]">
                          {evento.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#334155]">
            Todos los eventos y planes
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Resultado en tiempo real según los filtros.
          </p>
        </div>

        {eventosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-10 text-center">
            <p className="text-lg font-semibold text-[#334155]">
              No hemos encontrado eventos con esos filtros.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {eventosFiltrados.map((evento) => (
              <article
                key={evento.id}
                className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.tipo}
                    </span>

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        evento.categoriaVisual === "local"
                          ? "bg-[#ecfeff] text-[#155e75]"
                          : "bg-[#fef3c7] text-[#92400e]"
                      }`}
                    >
                      {evento.categoriaVisual === "local"
                        ? "Plan local"
                        : "Evento grande"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748b]">
                    {textoFechaEvento(evento)}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-5">
                    {evento.enlace ? (
                      <a
                        href={evento.enlace}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition hover:bg-[#fff7ed]"
                      >
                        Más información
                      </a>
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-[#64748b]">
                        Sin enlace externo
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-8 text-center">
            <h3 className="text-2xl font-bold text-[#9a3412]">
              ¿Conoces una feria, festival o fiesta potente?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#7c2d12]">
              Añádelo para que más gente sepa cuándo merece la pena ir a esa ciudad.
            </p>

            <div className="mt-5">
              <Link
                href="/participa"
                className="inline-flex rounded-full bg-[#f97316] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
              >
                Añadir evento grande
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] p-8 text-center">
            <h3 className="text-2xl font-bold text-[#1e3a8a]">
              ¿Hay hoy un plan pequeño que merece la pena?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#1d4ed8]">
              Súbelo a la comunidad: concierto en directo, monólogo, tardeo, sesión especial o plan local de última hora.
            </p>

            <div className="mt-5">
              <Link
                href="/participa"
                className="inline-flex rounded-full bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
              >
                Añadir plan local
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
