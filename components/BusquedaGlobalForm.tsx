"use client";

import { useEffect, useRef, useState } from "react";
import { normalizarBusqueda } from "@/lib/busqueda";

type Sugerencia = { nombre: string; tipo: string; detalle: string; href: string };
export default function BusquedaGlobalForm({ consulta = "", id = "busqueda-global" }: { consulta?: string; id?: string }) {
  const [texto, setTexto] = useState(consulta);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(-1);
  const [respuesta, setRespuesta] = useState<{ q: string; items: Sugerencia[]; error: boolean } | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const valida = normalizarBusqueda(texto).length >= 2;
  const visible = abierto && valida;
  const actual = respuesta?.q === texto ? respuesta : null;
  const items = actual?.items || [];
  const listaId = `${id}-sugerencias`;
  const todos = `/buscar?${new URLSearchParams({ q: texto })}`;

  useEffect(() => {
    if (!abierto || !valida) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/buscar?${new URLSearchParams({ q: texto })}`, { signal: controller.signal });
        if (!res.ok) throw new Error("No disponible");
        const data = await res.json();
        if (!controller.signal.aborted) setRespuesta({ q: texto, items: data.sugerencias, error: data.parcial });
      } catch {
        if (!controller.signal.aborted) setRespuesta({ q: texto, items: [], error: true });
      }
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [texto, abierto, valida]);

  return <form ref={form} action="/buscar" method="get" role="search" aria-label="Buscar eventos, lugares y ciudades" onSubmit={() => setAbierto(false)}
    onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { setAbierto(false); setActivo(-1); } }}
    className="flex flex-col gap-3 sm:flex-row sm:items-end">
    <div className="relative min-w-0 flex-1">
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-slate-700">Evento, lugar o ciudad</label>
      <input id={id} name="q" type="search" value={texto} autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={visible} aria-controls={visible ? listaId : undefined} aria-activedescendant={visible && activo >= 0 ? `${listaId}-${activo}` : undefined}
        onChange={e => { setTexto(e.target.value); setActivo(-1); setAbierto(true); }} onFocus={() => setAbierto(true)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === "Escape") { setAbierto(false); setActivo(-1); }
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && valida) {
            e.preventDefault(); setAbierto(true);
            setActivo(prev => e.key === "ArrowDown" ? (prev + 1) % (items.length + 1) : (prev <= 0 ? items.length : prev - 1));
          }
          if (e.key === "Enter" && visible && activo >= 0) { e.preventDefault(); window.location.assign(items[activo]?.href || todos); }
        }}
        placeholder="Por ejemplo: Lorca, jazz o Palacio de Guevara" maxLength={100} required minLength={2} className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-2 focus:outline-orange-600" />
      {visible && <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-orange-200 bg-white text-slate-900 shadow-xl">
        <p role="status" className="px-4 pt-3 text-xs text-slate-600">{!actual ? "Buscando sugerencias…" : actual.error ? "Algunas sugerencias no están disponibles. Puedes usar Buscar." : items.length ? "Sugerencias según lo que escribes" : "Sin coincidencias. Prueba otra palabra."}</p>
        <ul id={listaId} role="listbox" aria-label="Sugerencias de búsqueda" className="py-2">
          {[...items, { nombre: `Ver todos los resultados para «${texto}»`, tipo: "Buscar", detalle: "", href: todos }].map((item, index) => <li key={item.href} id={`${listaId}-${index}`} role="option" aria-selected={activo === index}>
            <a href={item.href} tabIndex={-1} onMouseDown={e => e.preventDefault()} onMouseEnter={() => setActivo(index)} className={`block px-4 py-3 ${activo === index ? "bg-orange-50" : "hover:bg-orange-50"}`}>
              <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-orange-700">{item.tipo}</span>
              <span className="block break-words text-sm font-semibold">{item.nombre}</span>
              {item.detalle && <span className="block text-xs text-slate-600">{item.detalle}</span>}
            </a>
          </li>)}
        </ul>
      </div>}
    </div>
    <button type="submit" className="min-h-12 rounded-2xl bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">Buscar</button>
  </form>;
}
