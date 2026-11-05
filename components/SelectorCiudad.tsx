"use client";

import { useId, useState } from "react";

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

export default function SelectorCiudad({ etiqueta, ciudades, valor, onChange }: {
  etiqueta: string;
  ciudades: string[];
  valor: string;
  onChange: (ciudad: string) => void;
}) {
  const id = useId();
  const [consulta, setConsulta] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [activa, setActiva] = useState(-1);
  const texto = normalizar(consulta);
  const coincidencias = ciudades.filter(ciudad => normalizar(ciudad).includes(texto))
    .sort((a, b) => Number(normalizar(b).startsWith(texto)) - Number(normalizar(a).startsWith(texto)) || a.localeCompare(b, "es"))
    .slice(0, 8);
  const opciones = texto ? [...coincidencias, ""] : ["", ...coincidencias];

  function elegir(ciudad: string) {
    onChange(ciudad);
    setAbierto(false);
    setActiva(-1);
  }

  return (
    <div className="relative min-w-0" onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) { setAbierto(false); setActiva(-1); }
    }}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-800">{etiqueta}</label>
      <input id={id} role="combobox" type="search" autoComplete="off" aria-autocomplete="list"
        aria-expanded={abierto} aria-controls={abierto ? `${id}-opciones` : undefined}
        aria-activedescendant={abierto && activa >= 0 ? `${id}-opcion-${activa}` : undefined}
        value={abierto ? consulta : valor} placeholder="Todas las ciudades"
        onFocus={() => { setConsulta(""); setAbierto(true); setActiva(-1); }}
        onClick={() => { if (!abierto) { setConsulta(""); setAbierto(true); setActiva(-1); } }}
        onChange={event => { setConsulta(event.target.value); setAbierto(true); setActiva(-1); }}
        onKeyDown={event => {
          if (event.key === "Escape") { event.preventDefault(); setAbierto(false); setActiva(-1); }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!abierto) setConsulta("");
            setAbierto(true);
            setActiva(index => event.key === "ArrowDown" ? (index + 1) % opciones.length : (index <= 0 ? opciones.length : index) - 1);
          }
          if (event.key === "Enter" && abierto) {
            event.preventDefault();
            const exacta = ciudades.find(ciudad => normalizar(ciudad) === texto);
            if (activa >= 0) elegir(opciones[activa]);
            else if (exacta) elegir(exacta);
            else if (!texto) elegir("");
            else if (coincidencias.length) elegir(coincidencias[0]);
          }
        }}
        className="min-h-11 w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-900 focus-visible:outline-2 focus-visible:outline-orange-600" />
      {abierto && (
        <ul id={`${id}-opciones`} role="listbox" aria-label={`Opciones de ${etiqueta.toLowerCase()}`}
          className="absolute left-0 right-0 z-[1001] mt-1 max-h-64 overflow-y-auto rounded-xl border border-orange-200 bg-white py-1 shadow-lg">
          {opciones.map((ciudad, index) => (
            <li key={ciudad} role="presentation">
              <button type="button" role="option" tabIndex={-1} id={`${id}-opcion-${index}`}
                aria-selected={activa === index}
                ref={element => { if (element && activa === index) element.scrollIntoView({ block: "nearest" }); }}
                onMouseDown={event => event.preventDefault()} onClick={() => elegir(ciudad)}
                className={`block min-h-11 w-full px-3 py-3 text-left text-sm font-normal text-slate-900 hover:bg-orange-50 ${activa === index ? "bg-orange-100" : ""}`}>
                {ciudad || "Todas las ciudades"}
              </button>
            </li>
          ))}
          {opciones.length === 1 && <li role="presentation" className="px-3 py-3 text-sm text-slate-600">No encontramos esa ciudad. Prueba otro nombre.</li>}
        </ul>
      )}
    </div>
  );
}
