"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { EventoUI } from "@/lib/eventos-data";
import { leerFiltrosEventos } from "@/lib/eventos-filters";
import { diaMadrid, mananaMadrid, eventoEnFecha, compararAgenda, fechaAgenda, grupoTipo, coincideTipo, largaDuracion } from "@/lib/agenda-ui";
import { seoListado } from "@/lib/listado-seo";

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

function formatHora(hora?: string | null) {
  if (!hora) return "";
  return hora.slice(0, 5);
}

function esEventoProximo(fechaInicio?: string | null, fechaFin?: string | null) {
  return !!fechaInicio && (fechaFin || fechaInicio) >= diaMadrid();
}

function esHoy(inicio?: string | null, fin?: string | null) {
  return eventoEnFecha(inicio, fin, diaMadrid());
}

function esManana(inicio?: string | null, fin?: string | null) {
  return eventoEnFecha(inicio, fin, mananaMadrid());
}

function eventoGrandeScore(e: EventoUI) {
  let score = 0;

  if (e.destacado) score += 100;
  if (CIUDADES_TOP.includes(e.ciudad)) score += 25;

  const tipo = `${e.tipo} ${e.subtipo}`.toLowerCase();

  if (
    tipo.includes("festival") ||
    tipo.includes("feria") ||
    tipo.includes("fiesta") ||
    tipo.includes("mercado") ||
    tipo.includes("carnaval")
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

  if (esHoy(e.fechaInicio, e.fechaFin)) score += 60;
  else if (esManana(e.fechaInicio, e.fechaFin)) score += 40;
  else if (esEventoProximo(e.fechaInicio, e.fechaFin)) score += 20;

  if (CIUDADES_TOP.includes(e.ciudad)) score += 12;
  if (e.destacado) score += 15;
  if (e.recomendable) score += 10;

  const tipo = `${e.tipo} ${e.subtipo}`.toLowerCase();

  if (
    tipo.includes("concierto") ||
    tipo.includes("monólogo") ||
    tipo.includes("monologo") ||
    tipo.includes("tardeo") ||
    tipo.includes("directo") ||
    tipo.includes("bar") ||
    tipo.includes("sala")
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

function textoHoraEvento(e: EventoUI) {
  const inicio = formatHora(e.horaInicio);
  const fin = formatHora(e.horaFin);

  if (inicio && fin) return `${inicio} - ${fin}`;
  if (inicio) return inicio;
  return "";
}

function textoComentarios(count: number) {
  if (count === 0) return "Sin comentarios";
  if (count === 1) return "1 comentario";
  return `${count} comentarios`;
}

type Props = {
  initialData: { eventos: EventoUI[]; nombreColaborador: string };
  initialFilters: ReturnType<typeof leerFiltrosEventos>;
};

export default function EventosPage({ initialData, initialFilters }: Props) {
  const restauracionUrl = useRef<string | null>(null);
  const [urlPreparada, setUrlPreparada] = useState(false);
  const eventos = initialData.eventos;
  const loading = false;
  const [paginacion, setPaginacion] = useState({ clave: initialFilters.clave, pagina: initialFilters.pagina });
  const [colaboradorId, setColaboradorId] = useState(initialFilters.colaborador);
  const nombreColaborador = initialData.nombreColaborador;
  const [busqueda, setBusqueda] = useState(initialFilters.texto);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(initialFilters.fecha);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(initialFilters.ciudad);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(initialFilters.tipo);
  const [soloProximos, setSoloProximos] = useState(initialFilters.proximos);
  const [modoVista, setModoVista] = useState<"todos" | "grandes" | "locales">(initialFilters.vista);

  useEffect(() => {
    const colaboradorInicial = new URLSearchParams(window.location.search).get("colaborador")?.trim() || "";
    function restaurarUrl() {
      const params = new URLSearchParams(window.location.search);
      if ((params.get("colaborador")?.trim() || "") !== colaboradorInicial) {
        window.location.reload();
        return;
      }
      const texto = params.get("q") || "";
      const fechaParam = params.get("fecha") || "";
      const fecha = /^\d{4}-\d{2}-\d{2}$/.test(fechaParam) ? fechaParam : "";
      const ciudad = params.get("ciudad")?.trim() || "";
      const tipo = params.get("tipo")?.trim() || "";
      const proximos = params.get("proximos") !== "0";
      const vistaParam = params.get("vista");
      const vista = vistaParam === "grandes" || vistaParam === "locales" ? vistaParam : "todos";
      const paginaParam = Number(params.get("pagina") || "1");
      const pagina = Number.isSafeInteger(paginaParam) && paginaParam > 0 ? paginaParam : 1;
      const clave = JSON.stringify([texto, fecha, ciudad, tipo, proximos, vista, colaboradorInicial]);
      restauracionUrl.current = JSON.stringify([clave, pagina]);
      setBusqueda(texto);
      setFechaSeleccionada(fecha);
      setCiudadSeleccionada(ciudad);
      setTipoSeleccionado(tipo);
      setSoloProximos(proximos);
      setModoVista(vista);
      setColaboradorId(colaboradorInicial);
      setPaginacion({ clave, pagina });
      setUrlPreparada(true);
    }
    restaurarUrl();
    window.addEventListener("popstate", restaurarUrl);
    return () => window.removeEventListener("popstate", restaurarUrl);
  }, []);

  function scrollToSection(id: string) {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 80);
  }

  const ciudadesDisponibles = useMemo(() => {
    return [...new Set(eventos.map((e) => e.ciudad).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [eventos]);

  const tiposDisponibles = useMemo(() => {
    return [...new Set(eventos.map((e) => grupoTipo(e.tipo)).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [eventos]);

  const eventosProximos = useMemo(() => {
    return eventos
      .filter((e) =>
        esEventoProximo(e.fechaInicio, e.fechaFin) &&
        (!ciudadSeleccionada || e.ciudad === ciudadSeleccionada)
      )
      .sort((a, b) => {
        return compararAgenda({ inicio: a.fechaInicio, fin: a.fechaFin }, { inicio: b.fechaInicio, fin: b.fechaFin });
      });
  }, [eventos, ciudadSeleccionada]);

  const eventosGrandes = useMemo(() => {
    const base = ciudadSeleccionada || eventosProximos.length > 0 ? eventosProximos : eventos;

    return base
      .filter((e) => e.categoriaEvento === "grande")
      .sort((a, b) => eventoGrandeScore(b) - eventoGrandeScore(a));
  }, [eventos, eventosProximos, ciudadSeleccionada]);

  const planesLocales = useMemo(() => {
    const base = ciudadSeleccionada || eventosProximos.length > 0 ? eventosProximos : eventos;

    return base
      .filter((e) => e.categoriaEvento === "local")
      .sort((a, b) => planLocalScore(b) - planLocalScore(a));
  }, [eventos, eventosProximos, ciudadSeleccionada]);

  const heroEvento = useMemo(() => {
    if (eventosGrandes.length > 0) return eventosGrandes[0];
    if (planesLocales.length > 0) return planesLocales[0];
    return ciudadSeleccionada ? null : eventos[0] ?? null;
  }, [eventos, eventosGrandes, planesLocales, ciudadSeleccionada]);

  const eventosGrandesDestacados = useMemo(() => {
    return eventosGrandes.slice(0, 6);
  }, [eventosGrandes]);

  const ultimosEventosPublicados = useMemo(() => {
    return [...eventos]
      .sort((a, b) => {
        const fechaA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const fechaB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return fechaB - fechaA;
      })
      .slice(0, 6);
  }, [eventos]);

  const planesHoy = useMemo(() => {
    return planesLocales
      .filter((e) => esHoy(e.fechaInicio, e.fechaFin))
      .sort((a, b) => planLocalScore(b) - planLocalScore(a))
      .slice(0, 6);
  }, [planesLocales]);

  const planesManana = useMemo(() => {
    return planesLocales
      .filter((e) => esManana(e.fechaInicio, e.fechaFin))
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

        if (modoVista === "grandes" && e.categoriaEvento !== "grande") {
          return false;
        }

        if (modoVista === "locales" && e.categoriaEvento !== "local") {
          return false;
        }

        if (texto) {
          const bloque = [
            e.nombre,
            e.ciudad,
            e.provincia,
            e.comunidad,
            e.tipo,
            e.subtipo,
            e.descripcion,
            e.ubicacionDetalle,
            e.ambiente,
          ]
            .join(" ")
            .toLowerCase();

          if (!bloque.includes(texto)) return false;
        }

        if (fechaSeleccionada) {
          if (!eventoEnFecha(e.fechaInicio, e.fechaFin, fechaSeleccionada)) return false;
        }

        if (ciudadSeleccionada && e.ciudad !== ciudadSeleccionada) return false;
        if (!coincideTipo(e.tipo, tipoSeleccionado)) return false;

        return true;
      })
      .sort((a, b) => {
        return compararAgenda({ inicio: a.fechaInicio, fin: a.fechaFin }, { inicio: b.fechaInicio, fin: b.fechaFin });
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

  const claveFiltros = JSON.stringify([
    busqueda, fechaSeleccionada, ciudadSeleccionada, tipoSeleccionado,
    soloProximos, modoVista, colaboradorId,
  ]);
  if (paginacion.clave !== claveFiltros) {
    setPaginacion({ clave: claveFiltros, pagina: 1 });
  }
  const eventosPorPagina = 12;
  const totalPaginas = Math.max(1, Math.ceil(eventosFiltrados.length / eventosPorPagina));
  const paginaActual = Math.min(
    paginacion.clave === claveFiltros ? paginacion.pagina : 1,
    totalPaginas
  );
  const inicioPagina = (paginaActual - 1) * eventosPorPagina;
  const eventosPagina = eventosFiltrados.slice(inicioPagina, inicioPagina + eventosPorPagina);

  useEffect(() => {
    if (!urlPreparada || loading) return;
    const firma = JSON.stringify([claveFiltros, paginacion.pagina]);
    if (restauracionUrl.current !== null) {
      const restaurada = restauracionUrl.current === firma;
      restauracionUrl.current = null;
      if (restaurada) return;
    }
    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      const params = url.searchParams;
      const guardar = (nombre: string, valor: string) => {
        if (valor) params.set(nombre, valor);
        else params.delete(nombre);
      };
      guardar("q", busqueda);
      guardar("fecha", fechaSeleccionada);
      guardar("ciudad", ciudadSeleccionada);
      guardar("tipo", tipoSeleccionado);
      guardar("proximos", soloProximos ? "" : "0");
      guardar("vista", modoVista === "todos" ? "" : modoVista);
      guardar("pagina", paginaActual > 1 ? String(paginaActual) : "");
      if (url.href !== window.location.href) {
        window.history.pushState(null, "", url);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [urlPreparada, loading, claveFiltros, paginacion.pagina, paginaActual,
    busqueda, fechaSeleccionada, ciudadSeleccionada, tipoSeleccionado, soloProximos, modoVista]);

  function hrefPagina(pagina: number) {
    const params = new URLSearchParams();
    if (ciudadSeleccionada) params.set("ciudad", ciudadSeleccionada);
    if (tipoSeleccionado) params.set("tipo", tipoSeleccionado);
    if (busqueda) params.set("q", busqueda);
    if (fechaSeleccionada) params.set("fecha", fechaSeleccionada);
    if (colaboradorId) params.set("colaborador", colaboradorId);
    if (!soloProximos) params.set("proximos", "0");
    if (modoVista !== "todos") params.set("vista", modoVista);
    if (pagina > 1) params.set("pagina", String(pagina));
    const query = params.toString();
    return `/eventos${query ? `?${query}` : ""}#seccion-todos`;
  }

  useEffect(() => {
    if (!urlPreparada || loading) return;
    const seo = seoListado("/eventos");
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (canonical) canonical.href = seo.canonical;
    if (robots) robots.content = `${seo.index ? "index" : "noindex"}, follow`;
  }, [urlPreparada, loading, ciudadSeleccionada, tipoSeleccionado, busqueda,
    fechaSeleccionada, colaboradorId, soloProximos, modoVista, paginaActual]);

  function cambiarPagina(pagina: number) {
    setPaginacion({ clave: claveFiltros, pagina });
    scrollToSection("seccion-todos");
  }

  const hayFiltrosActivos =
    busqueda.trim() !== "" ||
    fechaSeleccionada !== "" ||
    ciudadSeleccionada !== "" ||
    tipoSeleccionado !== "" ||
    soloProximos ||
    modoVista !== "todos";

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
    setSoloProximos(true);
    setModoVista("todos");
  }

  function filtrarHoy() {
    const hoy = diaMadrid();
    setBusqueda("");
    setFechaSeleccionada(hoy);
    setTipoSeleccionado("");
    setSoloProximos(false);
    setModoVista("todos");
    scrollToSection("seccion-todos");
  }

  function filtrarManana() {
    const manana = mananaMadrid();
    setBusqueda("");
    setFechaSeleccionada(manana);
    setTipoSeleccionado("");
    setSoloProximos(false);
    setModoVista("todos");
    scrollToSection("seccion-todos");
  }

  function verProximos() {
    setBusqueda("");
    setFechaSeleccionada("");
    setTipoSeleccionado("");
    setSoloProximos(true);
    setModoVista("todos");
    scrollToSection("seccion-todos");
  }

  function verEventosGrandes() {
    setBusqueda("");
    setFechaSeleccionada("");
    setTipoSeleccionado("");
    setModoVista("grandes");
    setSoloProximos(true);
    scrollToSection("seccion-grandes");
  }

  function verPlanesLocales() {
    setBusqueda("");
    setFechaSeleccionada("");
    setTipoSeleccionado("");
    setModoVista("locales");
    setSoloProximos(true);
    scrollToSection("seccion-locales");
  }

  function irAPublicar() {
    scrollToSection("seccion-publicar");
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

        {colaboradorId && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#fed7aa] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97316]">
                Programación del colaborador
              </p>
              <p className="mt-1 text-base font-bold text-[#334155]">
                {nombreColaborador || "este colaborador"}
              </p>
            </div>

            <Link
              href="/colaboradores"
              className="inline-flex w-fit rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition hover:bg-[#fff7ed]"
            >
              ← Volver a colaboradores
            </Link>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
              {colaboradorId
                ? `Eventos de ${nombreColaborador || "este colaborador"}`
                : ciudadSeleccionada
                  ? `Eventos y planes en ${ciudadSeleccionada}`
                  : "Eventos grandes y planes reales para hoy en España"}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
              {colaboradorId
                ? `Consulta los eventos vinculados a ${
                    nombreColaborador || "este colaborador"
                  } y utiliza los filtros para encontrar el plan que buscas.`
                : "Descubre desde ferias, fiestas y festivales hasta planes pequeños tipo concierto en un bar, monólogo, tardeo o directo de última hora."}
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
                onClick={irAPublicar}
                className="rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
              >
                Contar un plan
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
              src={heroEvento?.imagen || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"}
              alt={heroEvento?.nombre || "Eventos en España"}
              className="h-[280px] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f97316]">
                {heroEvento?.categoriaEvento === "local"
                  ? "Plan local destacado"
                  : "Evento destacado"}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#334155]">
                {heroEvento?.nombre || (ciudadSeleccionada ? `No hay próximos eventos en ${ciudadSeleccionada}` : "Descubre los próximos eventos")}
              </h2>

              <p className="mt-2 text-sm text-[#64748b]">
                {heroEvento
                  ? `${heroEvento.ciudad} · ${
                      formatFecha(heroEvento.fechaInicio) || "Fecha por confirmar"
                    }`
                  : ciudadSeleccionada
                    ? "Prueba otra ciudad o consulta los eventos anteriores desmarcando Solo próximos."
                    : "Ferias, fiestas, festivales y planes con más ambiente."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="seccion-publicar"
        className="mx-auto max-w-7xl px-4 pb-8 md:px-6 lg:px-8"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-8 text-center shadow-sm">
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

          <div className="rounded-3xl bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-[#1e3a8a]">
              ¿Hay hoy un plan pequeño que merece la pena?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#1d4ed8]">
              Súbelo a la comunidad: concierto en directo, monólogo, tardeo o plan local de última hora.
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

        <div className="mt-5 rounded-3xl border border-[#fde7d7] bg-white p-5 text-center shadow-sm">
          <p className="text-sm font-semibold text-[#475569]">
            ¿Conoces un plan para hoy, mañana o este finde?
          </p>
          <p className="mt-1 text-sm text-[#64748b]">
            Súbelo en 1 minuto: un bar, un monólogo, un concierto pequeño o un tardeo ya ayuda a mucha gente.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f97316]">
            Cuanto más real y cercano, mejor
          </p>
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
              {tipoSeleccionado && !tipoSeleccionado.startsWith("grupo:") && <option value={tipoSeleccionado}>{tipoSeleccionado}</option>}
              {tiposDisponibles.map((tipo) => (
                <option key={tipo} value={`grupo:${tipo}`}>
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

      {hayFiltrosActivos ? (
      <section
        id="seccion-todos"
        className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#334155]">
            {colaboradorId
              ? `Eventos de ${nombreColaborador || "este colaborador"}`
              : "Todos los eventos y planes"}
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Primero los planes de hoy y próximos días; después, los de larga duración.
          </p>
        </div>

        {eventosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-10 text-center">
            <p className="text-lg font-semibold text-[#334155]">
              {colaboradorId
                ? `No hay eventos publicados para ${
                    nombreColaborador || "este colaborador"
                  } con los filtros seleccionados.`
                : "No hemos encontrado eventos con esos filtros."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {eventosPagina.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
                className="block overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.subtipo || evento.tipo}
                    </span>

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        evento.categoriaEvento === "local"
                          ? "bg-[#ecfeff] text-[#155e75]"
                          : "bg-[#fef3c7] text-[#92400e]"
                      }`}
                    >
                      {largaDuracion(evento.fechaInicio, evento.fechaFin) ? "Larga duración" : evento.categoriaEvento === "local"
                        ? "Plan local"
                        : "Evento grande"}
                    </span>

                    {esHoy(evento.fechaInicio, evento.fechaFin) && (
                      <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                        Hoy
                      </span>
                    )}

                    {esManana(evento.fechaInicio, evento.fechaFin) && (
                      <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                        Mañana
                      </span>
                    )}

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                      💬 {textoComentarios(evento.comentariosCount)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748b]">
                    {textoFechaEvento(evento)}
                    {textoHoraEvento(evento) ? ` · ${textoHoraEvento(evento)}` : ""}
                  </p>

                  {evento.ubicacionDetalle && (
                    <p className="mt-2 text-sm text-[#64748b]">
                      📍 {evento.ubicacionDetalle}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {evento.precio && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.precio}
                      </span>
                    )}

                    {evento.ambiente && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.ambiente}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="inline-flex rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition group-hover:bg-[#fff7ed]">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {eventosFiltrados.length > 0 && (
          <nav aria-label="Páginas de eventos" className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {paginaActual > 1 ? (
              <a href={hrefPagina(paginaActual - 1)} rel="prev"
                onClick={(event) => {
                  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  cambiarPagina(paginaActual - 1);
                }}
                className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold">
                ← Anterior
              </a>
            ) : <span aria-disabled="true" className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold opacity-40">← Anterior</span>}
            <p aria-live="polite" className="text-sm text-slate-600">
              Página {paginaActual} de {totalPaginas} · Mostrando {inicioPagina + 1}–{Math.min(inicioPagina + eventosPorPagina, eventosFiltrados.length)} de {eventosFiltrados.length}
            </p>
            {paginaActual < totalPaginas ? (
              <a href={hrefPagina(paginaActual + 1)} rel="next"
                onClick={(event) => {
                  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  cambiarPagina(paginaActual + 1);
                }}
                className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold">
                Siguiente →
              </a>
            ) : <span aria-disabled="true" className="rounded-full border border-orange-200 bg-white px-5 py-2 font-semibold opacity-40">Siguiente →</span>}
          </nav>
        )}
      </section>

      ) : (
      <section
        id="seccion-ultimos"
        className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-[#334155]">
            🆕 Últimos eventos publicados
          </h2>
          <p className="mt-1 text-sm text-[#64748b]">
            Descubre las últimas incorporaciones a Lugares Llenos.
          </p>
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
        ) : ultimosEventosPublicados.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white p-8 text-center">
            <p className="text-lg font-semibold text-[#334155]">
              Todavía no hay eventos publicados.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ultimosEventosPublicados.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
                className="group overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={evento.imagen}
                    alt={evento.nombre}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#f97316] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    Nuevo
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.subtipo || evento.tipo}
                    </span>
                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>
                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                      💬 {textoComentarios(evento.comentariosCount)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <p className="mt-2 text-sm text-[#64748b]">
                    📅 {textoFechaEvento(evento)}
                    {textoHoraEvento(evento) ? ` · 🕒 ${textoHoraEvento(evento)}` : ""}
                  </p>

                  {evento.ubicacionDetalle && (
                    <p className="mt-2 text-sm text-[#64748b]">
                      📍 {evento.ubicacionDetalle}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-5">
                    <span className="inline-flex rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition group-hover:bg-[#fff7ed]">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      )}

      <section
        id="seccion-grandes"
        className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#334155]">
              🔥 Eventos grandes que vienen pronto
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Ferias, festivales, fiestas y citas potentes para entrar con fuerza.
            </p>
          </div>

          <button
            onClick={() => {
              setModoVista("grandes");
              setSoloProximos(true);
              setFechaSeleccionada("");
              scrollToSection("seccion-todos");
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
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
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
                      {evento.subtipo || evento.tipo}
                    </span>

                    {evento.destacado && (
                      <span className="rounded-full bg-[#ea580c] px-3 py-1 text-xs font-bold text-white">
                        Top
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                      💬 {textoComentarios(evento.comentariosCount)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#64748b]">
                    <span>📍 {evento.ciudad}</span>
                    <span>📅 {textoFechaEvento(evento)}</span>
                    {textoHoraEvento(evento) && <span>🕒 {textoHoraEvento(evento)}</span>}
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {evento.ubicacionDetalle && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.ubicacionDetalle}
                      </span>
                    )}

                    {evento.precio && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.precio}
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="inline-flex rounded-full bg-[#f97316] px-4 py-2 text-sm font-semibold text-white">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section
        id="seccion-locales"
        className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#334155]">
              ⚡ Qué hacer hoy / planes pequeños
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Conciertos pequeños, monólogos, tardeos, directos y planes cercanos.
            </p>
          </div>

          <button
            onClick={() => {
              setModoVista("locales");
              setSoloProximos(true);
              setFechaSeleccionada("");
              scrollToSection("seccion-todos");
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
              Aquí aparecerán ideas tipo concierto en una sala, monólogo o tardeo de hoy.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {planesLocalesDestacados.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
                className="block overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.subtipo || evento.tipo}
                    </span>

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>

                    {esHoy(evento.fechaInicio, evento.fechaFin) && (
                      <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                        Hoy
                      </span>
                    )}

                    {esManana(evento.fechaInicio, evento.fechaFin) && (
                      <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                        Mañana
                      </span>
                    )}

                    {evento.recomendable && (
                      <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-bold text-[#92400e]">
                        Recomendado
                      </span>
                    )}

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                      💬 {textoComentarios(evento.comentariosCount)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#334155]">
                    {evento.nombre}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#64748b]">
                    <span>📅 {textoFechaEvento(evento)}</span>
                    {textoHoraEvento(evento) && <span>🕒 {textoHoraEvento(evento)}</span>}
                  </div>

                  {evento.ubicacionDetalle && (
                    <p className="mt-2 text-sm text-[#64748b]">
                      📍 {evento.ubicacionDetalle}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#475569]">
                    {evento.descripcion}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {evento.precio && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.precio}
                      </span>
                    )}

                    {evento.ambiente && (
                      <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                        {evento.ambiente}
                      </span>
                    )}

                    {evento.dificilBebida && (
                      <span className="rounded-full bg-[#fee2e2] px-3 py-1 text-xs font-semibold text-[#991b1b]">
                        Difícil pedir bebida
                      </span>
                    )}

                    {evento.parking && (
                      <span className="rounded-full bg-[#ecfccb] px-3 py-1 text-xs font-semibold text-[#3f6212]">
                        Parking fácil
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <span className="inline-flex rounded-full border border-[#fed7aa] px-4 py-2 text-sm font-semibold text-[#ea580c] transition group-hover:bg-[#fff7ed]">
                      Ver detalles
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

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
                      scrollToSection("seccion-todos");
                    }}
                    className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]"
                  >
                    Ver todos
                  </button>
                </div>

                <div className="space-y-4">
                  {bloque.eventos.map((evento) => (
                    <Link
                      key={evento.id}
                      href={`/eventos/${evento.slug}`}
                      className="flex gap-4 rounded-2xl border border-[#f1f5f9] p-3 transition hover:bg-[#fffaf5]"
                    >
                      <img
                        src={evento.imagen}
                        alt={evento.nombre}
                        className="h-24 w-28 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f97316]">
                            {evento.subtipo || evento.tipo}
                          </p>
                          <span className="rounded-full bg-[#f8fafc] px-2 py-1 text-[11px] font-semibold text-[#475569]">
                            💬 {textoComentarios(evento.comentariosCount)}
                          </span>
                        </div>

                        <h4 className="mt-1 truncate text-base font-bold text-[#334155]">
                          {evento.nombre}
                        </h4>

                        <p className="mt-1 text-sm text-[#64748b]">
                          {fechaAgenda(evento.fechaInicio, evento.fechaFin)}
                          {textoHoraEvento(evento) ? ` · ${textoHoraEvento(evento)}` : ""}
                        </p>

                        <p className="mt-2 line-clamp-2 text-sm text-[#475569]">
                          {evento.descripcion}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {planesHoy.length > 0 && (
        <section
          id="seccion-hoy"
          className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#334155]">
              🟢 Hoy mismo
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Para quien entra buscando plan rápido.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planesHoy.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
                className="block rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                    Hoy
                  </span>
                  <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                    {evento.subtipo || evento.tipo}
                  </span>
                  <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                    💬 {textoComentarios(evento.comentariosCount)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#334155]">{evento.nombre}</h3>

                <p className="mt-1 text-sm text-[#64748b]">
                  📍 {evento.ciudad}
                  {evento.ubicacionDetalle ? ` · ${evento.ubicacionDetalle}` : ""}
                </p>

                <p className="mt-1 text-sm text-[#64748b]">
                  📅 {textoFechaEvento(evento)}
                  {textoHoraEvento(evento) ? ` · 🕒 ${textoHoraEvento(evento)}` : ""}
                </p>

                <p className="mt-3 line-clamp-2 text-sm text-[#475569]">
                  {evento.descripcion}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {planesManana.length > 0 && (
        <section
          id="seccion-manana"
          className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8"
        >
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#334155]">
              🔵 Mañana
            </h2>
            <p className="mt-1 text-sm text-[#64748b]">
              Para quien quiere dejar algo mirado ya.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {planesManana.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}`}
                className="block rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#dbeafe] px-3 py-1 text-xs font-bold text-[#1d4ed8]">
                    Mañana
                  </span>
                  <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                    {evento.subtipo || evento.tipo}
                  </span>
                  <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#475569]">
                    💬 {textoComentarios(evento.comentariosCount)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#334155]">{evento.nombre}</h3>

                <p className="mt-1 text-sm text-[#64748b]">
                  📍 {evento.ciudad}
                  {evento.ubicacionDetalle ? ` · ${evento.ubicacionDetalle}` : ""}
                </p>

                <p className="mt-1 text-sm text-[#64748b]">
                  📅 {textoFechaEvento(evento)}
                  {textoHoraEvento(evento) ? ` · 🕒 ${textoHoraEvento(evento)}` : ""}
                </p>

                <p className="mt-3 line-clamp-2 text-sm text-[#475569]">
                  {evento.descripcion}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#fde7d7] bg-gradient-to-r from-[#fff7ed] to-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#334155]">
                💬 ¿Has estado en algún plan de hoy o de este finde?
              </p>
              <p className="mt-1 text-sm text-[#64748b]">
                Súbelo aunque sea rápido. Un sitio, una hora y una frase ya ayudan mucho.
              </p>
            </div>

            <Link
              href="/participa"
              className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
            >
              Contar un plan real
            </Link>
          </div>
        </div>
      </section>


    </main>
  );
}
