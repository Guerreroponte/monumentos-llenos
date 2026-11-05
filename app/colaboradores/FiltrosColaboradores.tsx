"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Opcion = { id: string; nombre: string; ciudad: string | null };

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .trim().replace(/\s+/g, " ").toLowerCase();
}

export default function FiltrosColaboradores({
  opciones, ciudades, nombreInicial, ciudadInicial, total,
}: {
  opciones: Opcion[];
  ciudades: string[];
  nombreInicial: string;
  ciudadInicial: string;
  total: number;
}) {
  const router = useRouter();
  const [nombre, setNombre] = useState(nombreInicial);
  const [ciudad, setCiudad] = useState(ciudadInicial);
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState(-1);
  const texto = normalizar(nombre);
  const sugerencias = texto ? opciones
    .filter(opcion => (!ciudad || normalizar(opcion.ciudad || "") === normalizar(ciudad)) &&
      normalizar(opcion.nombre).includes(texto))
    .sort((a, b) => Number(normalizar(b.nombre).startsWith(texto)) -
      Number(normalizar(a.nombre).startsWith(texto)) || a.nombre.localeCompare(b.nombre, "es"))
    .slice(0, 8) : [];
  const visible = abierto && sugerencias.length > 0;

  function seleccionar(opcion: Opcion) {
    setNombre(opcion.nombre);
    setAbierto(false);
    setActiva(-1);
    const params = new URLSearchParams({ nombre: opcion.nombre, ciudad });
    router.push(`/colaboradores?${params}`);
  }

  return (
    <form action="/colaboradores" method="get" className="mt-8 flex flex-wrap items-end gap-4 rounded-3xl border border-orange-100 bg-white p-5">
      <div className="relative min-w-0 w-full sm:w-auto sm:flex-1"
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setAbierto(false);
        }}>
        <label htmlFor="nombre-colaboradores" className="mb-2 block text-sm font-semibold">Buscar por nombre</label>
        <input id="nombre-colaboradores" name="nombre" type="search"
          value={nombre} autoComplete="off" role="combobox" aria-autocomplete="list"
          aria-expanded={visible} aria-controls="sugerencias-colaboradores"
          aria-activedescendant={visible && activa >= 0 ? `sugerencia-colaborador-${activa}` : undefined}
          placeholder="Ej. La Palma, Loco Club…"
          onChange={event => { setNombre(event.target.value); setAbierto(true); setActiva(-1); }}
          onFocus={() => setAbierto(true)}
          onKeyDown={event => {
            if (event.key === "Escape") { setAbierto(false); setActiva(-1); }
            if ((event.key === "ArrowDown" || event.key === "ArrowUp") && sugerencias.length) {
              event.preventDefault();
              setAbierto(true);
              setActiva(index => event.key === "ArrowDown"
                ? (index + 1) % sugerencias.length
                : (index <= 0 ? sugerencias.length : index) - 1);
            }
            if (event.key === "Enter" && visible && activa >= 0) {
              event.preventDefault();
              seleccionar(sugerencias[activa]);
            }
          }}
          className="min-h-11 w-full rounded-xl border border-orange-200 bg-white px-4 py-3" />
        {visible && (
          <ul id="sugerencias-colaboradores" role="listbox" aria-label="Nombres de colaboradores"
            className="absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-y-auto rounded-xl border border-orange-200 bg-white py-1 shadow-lg">
            {sugerencias.map((opcion, index) => (
              <li key={opcion.id} role="presentation">
                <button type="button" role="option" tabIndex={-1}
                  id={`sugerencia-colaborador-${index}`} aria-selected={activa === index}
                  ref={element => { if (element && activa === index) element.scrollIntoView({ block: "nearest" }); }}
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => seleccionar(opcion)}
                  className={`block min-h-11 w-full px-4 py-3 text-left hover:bg-orange-50 ${activa === index ? "bg-orange-100" : ""}`}>
                  <span className="block font-semibold">{opcion.nombre}</span>
                  {opcion.ciudad && <span className="block text-xs text-slate-500">{opcion.ciudad}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="min-w-0 w-full sm:w-auto">
        <label htmlFor="ciudad-colaboradores" className="mb-2 block text-sm font-semibold">Filtrar por ciudad</label>
        <select id="ciudad-colaboradores" name="ciudad" value={ciudad}
          onChange={event => { setCiudad(event.target.value); setActiva(-1); setAbierto(false); }}
          className="min-h-11 w-full rounded-xl border border-orange-200 bg-white px-4 py-3">
          <option value="">Todas las ciudades</option>
          {ciudadInicial && !ciudades.includes(ciudadInicial) && <option value={ciudadInicial}>{ciudadInicial}</option>}
          {ciudades.map(opcion => <option key={opcion} value={opcion}>{opcion}</option>)}
        </select>
      </div>
      <button type="submit" className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white">Buscar colaboradores</button>
      {(ciudadInicial || nombreInicial) && <Link href="/colaboradores" className="px-3 py-3 font-semibold text-orange-700">Limpiar filtros</Link>}
      <p role="status" className="py-3 text-sm text-slate-600">
        {total} {total === 1 ? "colaborador" : "colaboradores"}
        {nombreInicial && ` para «${nombreInicial}»`}{ciudadInicial && ` en ${ciudadInicial}`}
      </p>
    </form>
  );
}
