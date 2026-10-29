"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { paradasSegovia } from "./ruta-segovia-datos";

const MapaRuta = dynamic(() => import("./MapaRutaSegovia"), {
  ssr: false,
  loading: () => <p className="flex h-80 items-center justify-center rounded-xl bg-white text-slate-600" role="status">Cargando mapa…</p>,
});


const recorrido = new URLSearchParams({ api: "1", origin: "Acueducto de Segovia, Plaza del Azoguejo, Segovia", destination: "Alcázar de Segovia, Segovia", waypoints: "Plaza Mayor, Segovia|Catedral de Segovia, Segovia", travelmode: "walking" });

export default function RutaSegoviaInteractiva() {
  const [visible, setVisible] = useState(false);
  const [seleccionada, setSeleccionada] = useState<number | null>(null);
  return <>
    <div className="mt-5 flex flex-wrap gap-3">
      <button type="button" aria-expanded={visible} aria-controls="mapa-ruta-segovia" onClick={() => { setVisible(!visible); setSeleccionada(null); }} className="rounded-full bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600">{visible ? "Ocultar mapa" : "Ver mapa de la ruta"}</button>
      <a href={`https://www.google.com/maps/dir/?${recorrido}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-orange-300 bg-white px-5 py-3 font-bold text-orange-700 hover:bg-orange-50">Seguir ruta en Google Maps ↗</a>
    </div>
    <div className={visible ? "mt-6 grid gap-5 lg:grid-cols-2" : "mt-6"}>
      <ol className={visible ? "space-y-3" : "grid gap-3 sm:grid-cols-2"} aria-label="Paradas de la ruta">
        {paradasSegovia.map((parada, i) => <li key={parada.nombre} className="flex gap-3 rounded-xl border border-orange-100 bg-white p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-bold text-white">{i + 1}</span>
          <div className="min-w-0"><h4 className="font-bold text-slate-900">{parada.nombre}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{parada.descripcion}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-orange-700"><button type="button" onClick={() => { setVisible(true); setSeleccionada(i); }} className="underline">Ver parada en el mapa</button>{parada.ficha && <Link href={parada.ficha} className="underline">Ver ficha</Link>}<a href={parada.enlace} target="_blank" rel="noopener noreferrer" className="underline">Información oficial ↗</a></div></div>
        </li>)}
      </ol>
      <div id="mapa-ruta-segovia" className={visible ? "order-first min-w-0 lg:order-last" : "hidden"}>
        {visible && <><button type="button" onClick={() => setSeleccionada(null)} className="mb-3 text-sm font-semibold text-orange-700 underline">Ver ruta completa</button><MapaRuta seleccionada={seleccionada} /><p className="mt-2 text-xs leading-5 text-slate-600">Los números indican el orden de visita. Abre Google Maps para consultar el trazado a pie, la distancia y la duración estimada.</p></>}
      </div>
    </div>
  </>;
}
