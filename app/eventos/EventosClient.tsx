"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { EventoUI } from "@/lib/eventos-data";
import { leerFiltrosEventos, normalizarColaborador } from "@/lib/eventos-filters";
import { diaMadrid, mananaMadrid, eventoEnFecha, calendarioEvento, compararAgenda, grupoTipo, coincideTipo, diasFinDeSemana } from "@/lib/agenda-ui";
import { seoListado } from "@/lib/listado-seo";

function formatFecha(fecha?: string | null) {
  if (!fecha) return "";
  const d = new Date(fecha.slice(0, 10) + "T12:00:00Z");
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleDateString("es-ES", {
    timeZone: "Europe/Madrid",
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

function esHoy(e: EventoUI) {
  return eventoEnFecha(e.fechaInicio, e.fechaFin, diaMadrid(), calendarioEvento(e.slug));
}

function esManana(e: EventoUI) {
  return eventoEnFecha(e.fechaInicio, e.fechaFin, mananaMadrid(), calendarioEvento(e.slug));
}

function textoFechaEvento(e: EventoUI) {
  if (e.fechaInicio && e.fechaFin) {
    const inicio = formatFecha(e.fechaInicio);
    const fin = formatFecha(e.fechaFin);

    if (inicio && fin && inicio !== fin) return `${inicio} - ${fin}${calendarioEvento(e.slug) ? "" : " · Consultar días y sesiones"}`;
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
  const [paginacion, setPaginacion] = useState({ clave: initialFilters.clave, pagina: initialFilters.pagina });
  const [colaboradorId, setColaboradorId] = useState(initialFilters.colaborador);
  const nombreColaborador = initialData.nombreColaborador;
  const [busqueda, setBusqueda] = useState(initialFilters.texto);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(initialFilters.fecha);
  const [periodo, setPeriodo] = useState(initialFilters.periodo);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState(initialFilters.ciudad);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(initialFilters.tipo);
  const [soloProximos, setSoloProximos] = useState(initialFilters.proximos);
  const [modoVista, setModoVista] = useState<"todos" | "grandes" | "locales">(initialFilters.vista);

  useEffect(() => {
    const colaboradorInicial = normalizarColaborador(new URLSearchParams(window.location.search).get("colaborador"));
    function restaurarUrl() {
      const params = new URLSearchParams(window.location.search);
      if (normalizarColaborador(params.get("colaborador")) !== colaboradorInicial) {
        window.location.reload();
        return;
      }
      const { texto, fecha, ciudad, tipo, proximos, vista, pagina, clave, periodo } = leerFiltrosEventos(params);
      restauracionUrl.current = JSON.stringify([clave, pagina]);
      setBusqueda(texto);
      setFechaSeleccionada(fecha);
      setPeriodo(periodo);
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

  const eventosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    const diasFinde = periodo === "fin-de-semana" ? diasFinDeSemana() : [];

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
          if (!eventoEnFecha(e.fechaInicio, e.fechaFin, fechaSeleccionada, calendarioEvento(e.slug))) return false;
        }

        if (periodo === "fin-de-semana" && !diasFinde.some((dia) =>
          eventoEnFecha(e.fechaInicio, e.fechaFin, dia, calendarioEvento(e.slug))
        )) return false;

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
    periodo,
    ciudadSeleccionada,
    tipoSeleccionado,
    soloProximos,
    modoVista,
  ]);

  const claveFiltros = JSON.stringify([
    busqueda, fechaSeleccionada, ciudadSeleccionada, tipoSeleccionado,
    soloProximos, modoVista, colaboradorId, periodo,
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
    if (!urlPreparada) return;
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
      guardar("periodo", periodo);
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
  }, [urlPreparada, claveFiltros, paginacion.pagina, paginaActual,
    busqueda, fechaSeleccionada, periodo, ciudadSeleccionada, tipoSeleccionado, soloProximos, modoVista]);

  function hrefPagina(pagina: number) {
    const params = new URLSearchParams();
    if (ciudadSeleccionada) params.set("ciudad", ciudadSeleccionada);
    if (tipoSeleccionado) params.set("tipo", tipoSeleccionado);
    if (busqueda) params.set("q", busqueda);
    if (fechaSeleccionada) params.set("fecha", fechaSeleccionada);
    if (periodo) params.set("periodo", periodo);
    if (colaboradorId) params.set("colaborador", colaboradorId);
    if (!soloProximos) params.set("proximos", "0");
    if (modoVista !== "todos") params.set("vista", modoVista);
    if (pagina > 1) params.set("pagina", String(pagina));
    const query = params.toString();
    return `/eventos${query ? `?${query}` : ""}#seccion-todos`;
  }

  useEffect(() => {
    if (!urlPreparada) return;
    const seo = seoListado("/eventos");
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (canonical) canonical.href = seo.canonical;
    if (robots) robots.content = `${seo.index ? "index" : "noindex"}, follow`;
  }, [urlPreparada, ciudadSeleccionada, tipoSeleccionado, busqueda,
    fechaSeleccionada, colaboradorId, soloProximos, modoVista, paginaActual]);

  function cambiarPagina(pagina: number) {
    setPaginacion({ clave: claveFiltros, pagina });
    scrollToSection("seccion-todos");
  }

  function resetearFiltros() {
    setBusqueda("");
    setFechaSeleccionada("");
    setPeriodo("");
    setCiudadSeleccionada("");
    setTipoSeleccionado("");
    setSoloProximos(true);
    setModoVista("todos");
  }

  function elegirDia(fecha: string) {
    setFechaSeleccionada(fecha);
    setPeriodo("");
    setSoloProximos(!fecha);
  }

  function elegirFinDeSemana() {
    setFechaSeleccionada("");
    setPeriodo("fin-de-semana");
    setSoloProximos(true);
  }

  const botonFecha = (activo: boolean) => `min-h-11 rounded-full border px-2 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${activo ? "border-[#ea580c] bg-[#ea580c] text-white" : "border-[#e2e8f0] bg-white text-[#475569] hover:bg-[#fff7ed]"}`;

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <section className="mx-auto max-w-7xl px-4 pb-5 pt-7 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 hidden text-xs font-bold uppercase tracking-widest sm:block text-[#c2410c]">Encuentra tu próximo plan</p>
            <h1 className="text-3xl font-extrabold leading-tight text-[#334155] md:text-4xl">
              {colaboradorId ? `Eventos de ${nombreColaborador || "este colaborador"}` : ciudadSeleccionada ? `Eventos en ${ciudadSeleccionada}` : "Eventos y planes en España"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">Elige dónde y cuándo. Compara horarios, lugares y precios.</p>
            {colaboradorId && <Link href="/colaboradores" className="mt-2 inline-block text-sm font-semibold text-[#c2410c]">← Volver a colaboradores</Link>}
          </div>
          <Link id="seccion-publicar" href="/participa" className="inline-flex min-h-11 items-center rounded-full bg-[#ea580c] px-5 py-2 text-sm font-bold text-white hover:bg-[#c2410c]">Publicar un plan</Link>
        </div>
      </section>

      <section aria-label="Filtros de eventos" className="mx-auto max-w-7xl px-4 pb-7 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-4 shadow-sm md:p-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold text-[#334155]">
              Ciudad
              <select value={ciudadSeleccionada} onChange={(e) => setCiudadSeleccionada(e.target.value)} className="min-h-11 w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 font-normal">
                <option value="">Todas las ciudades</option>
                {ciudadesDisponibles.map((ciudad) => <option key={ciudad} value={ciudad}>{ciudad}</option>)}
              </select>
            </label>
            <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold text-[#334155]">
              Elegir fecha
              <input type="date" value={fechaSeleccionada} onChange={(e) => elegirDia(e.target.value)} className="min-h-11 w-full min-w-0 rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 font-normal" />
            </label>
            <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold text-[#334155] col-span-2 lg:col-span-1">
              Buscar
              <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Evento, artista o lugar" className="min-h-11 w-full rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 font-normal" />
            </label>
          </div>
          <div aria-label="Fechas rápidas" className="mt-4 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap">
            <button aria-pressed={!fechaSeleccionada && !periodo && soloProximos} className={botonFecha(!fechaSeleccionada && !periodo && soloProximos)} onClick={() => {setFechaSeleccionada(""); setPeriodo(""); setSoloProximos(true);}}>Próximos</button>
            <button aria-pressed={fechaSeleccionada === diaMadrid()} className={botonFecha(fechaSeleccionada === diaMadrid())} onClick={() => elegirDia(diaMadrid())}>Hoy</button>
            <button aria-pressed={fechaSeleccionada === mananaMadrid()} className={botonFecha(fechaSeleccionada === mananaMadrid())} onClick={() => elegirDia(mananaMadrid())}>Mañana</button>
            <button aria-pressed={periodo === "fin-de-semana"} className={botonFecha(periodo === "fin-de-semana")} onClick={elegirFinDeSemana}>Este finde</button>
          </div>
          <details className="mt-4 border-t border-[#f1f5f9] pt-3" open={tipoSeleccionado !== "" || modoVista !== "todos" || (!soloProximos && !fechaSeleccionada && !periodo) || undefined}>
            <summary className="cursor-pointer py-1 text-sm font-semibold text-[#475569]">Más filtros</summary>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-[#334155]">Tipo de actividad
                <select value={tipoSeleccionado} onChange={(e) => setTipoSeleccionado(e.target.value)} className="min-h-11 rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 font-normal">
                  <option value="">Todos los tipos</option>
                  {tipoSeleccionado && !tipoSeleccionado.startsWith("grupo:") && <option value={tipoSeleccionado}>{tipoSeleccionado}</option>}
                  {tiposDisponibles.map((tipo) => <option key={tipo} value={`grupo:${tipo}`}>{tipo}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold text-[#334155]">Clase de plan
                <select value={modoVista} onChange={(e) => setModoVista(e.target.value as "todos" | "grandes" | "locales")} className="min-h-11 rounded-xl border border-[#cbd5e1] bg-white px-3 py-2 font-normal">
                  <option value="todos">Todos los planes</option><option value="grandes">Eventos grandes</option><option value="locales">Planes locales</option>
                </select>
              </label>
              <label className="flex min-h-11 items-center gap-2 text-sm text-[#475569]"><input type="checkbox" checked={soloProximos} onChange={(e) => setSoloProximos(e.target.checked)} />Mostrar solo próximos eventos</label>
            </div>
          </details>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p role="status" className="text-sm font-semibold text-[#475569]">{eventosFiltrados.length} {eventosFiltrados.length === 1 ? "evento" : "eventos"}{periodo === "fin-de-semana" ? " · Este finde" : ""}</p>
            <button onClick={resetearFiltros} className="min-h-11 px-2 text-sm font-semibold text-[#c2410c] underline underline-offset-4">Limpiar filtros</button>
          </div>
        </div>
      </section>
      {/* Conserva destinos de enlaces antiguos sin repetir los eventos. */}
      <div className="mx-auto max-w-7xl">
        {["seccion-ultimos", "seccion-grandes", "seccion-locales", "seccion-hoy", "seccion-manana"].map((id) => <span key={id} id={id} className="block scroll-mt-28" />)}
      </div>
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
            {fechaSeleccionada || periodo ? "Planes con sesión confirmada para las fechas elegidas." : "Ordenados por fecha; los planes de larga duración aparecen después."}
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
            <p className="mt-3 text-sm leading-6 text-[#64748b]">
              Prueba otra fecha{ciudadSeleccionada ? ` en ${ciudadSeleccionada}` : ""}. Conservaremos los demás filtros{colaboradorId ? " y el colaborador seleccionado" : ""}.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {fechaSeleccionada !== mananaMadrid() && (
                <button onClick={() => elegirDia(mananaMadrid())} className="min-h-11 rounded-full border border-orange-200 px-5 py-2 font-semibold text-orange-700 hover:bg-orange-50">Ver mañana</button>
              )}
              {periodo !== "fin-de-semana" && (
                <button onClick={elegirFinDeSemana} className="min-h-11 rounded-full border border-orange-200 px-5 py-2 font-semibold text-orange-700 hover:bg-orange-50">Ver este finde</button>
              )}
              {(fechaSeleccionada || periodo || !soloProximos) && (
                <button onClick={() => elegirDia("")} className="min-h-11 rounded-full border border-orange-200 px-5 py-2 font-semibold text-orange-700 hover:bg-orange-50">Ver próximas fechas</button>
              )}
            </div>
            {(busqueda || tipoSeleccionado || modoVista !== "todos") && (
              <div className="mt-5 border-t border-[#f1f5f9] pt-4">
                <p className="text-sm leading-6 text-[#64748b]">También puedes quitar la búsqueda y los filtros de actividad para ver los próximos planes{ciudadSeleccionada ? ` en ${ciudadSeleccionada}` : ""}{colaboradorId ? " de este colaborador" : ""}.</p>
                <button onClick={() => {
                  setBusqueda("");
                  setTipoSeleccionado("");
                  setModoVista("todos");
                  elegirDia("");
                }} className="mt-3 min-h-11 rounded-full bg-[#ea580c] px-5 py-2 font-semibold text-white hover:bg-[#c2410c]">Ampliar búsqueda{ciudadSeleccionada ? ` en ${ciudadSeleccionada}` : ""}</button>
              </div>
            )}
            <button onClick={resetearFiltros} className="mt-4 min-h-11 px-3 py-2 text-sm font-semibold text-orange-700 underline underline-offset-4">Limpiar filtros</button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {eventosPagina.map((evento) => (
              <Link
                key={evento.id}
                href={`/eventos/${evento.slug}?volver=${encodeURIComponent(hrefPagina(paginaActual))}`}
                className="group block overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={evento.imagen}
                  alt={evento.nombre}
                  loading="lazy"
                  className="h-44 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                      {evento.subtipo || evento.tipo}
                    </span>

                    <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                      {evento.ciudad}
                    </span>

                    {esHoy(evento) && (
                      <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#166534]">
                        Hoy
                      </span>
                    )}

                    {esManana(evento) && (
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
                    {textoHoraEvento(evento) ? ` · ${textoHoraEvento(evento)}` : ""}
                  </p>

                  {evento.ubicacionDetalle && (
                    <p className="mt-2 line-clamp-2 text-sm text-[#64748b]">
                      📍 {evento.ubicacionDetalle}
                    </p>
                  )}

                  <p className="mt-3 line-clamp-2 text-sm font-semibold text-[#334155]">
                    {evento.precio || "Consultar precio"}
                  </p>
                  {evento.comentariosCount > 0 && (
                    <p className="mt-2 text-xs text-[#64748b]">{textoComentarios(evento.comentariosCount)}</p>
                  )}

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

    </main>
  );
}
