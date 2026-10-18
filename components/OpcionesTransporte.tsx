"use client";

import { useState } from "react";
import { destinoDesdeMaps, enlaceUber } from "@/lib/transporte";

type Props = { comoLlegar: string | null; nombreDestino: string };

export default function OpcionesTransporte({ comoLlegar, nombreDestino }: Props) {
  const [estado, setEstado] = useState("");
  const destino = destinoDesdeMaps(comoLlegar);
  if (!destino) return null;
  const textoDestino = nombreDestino.trim() || destino;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(textoDestino);
      setEstado("Destino copiado. Pégalo en la app que elijas.");
    } catch {
      setEstado("No se ha podido copiar. Selecciona el destino que aparece arriba y cópialo manualmente.");
    }
  }

  return (
    <details className="mt-4 rounded-2xl border border-orange-100 bg-orange-50/40 text-sm text-slate-700">
      <summary className="min-h-11 cursor-pointer rounded-2xl px-4 py-3 font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
        Ir en taxi o VTC
      </summary>
      <div className="space-y-3 px-4 pb-4">
        <p>Consulta disponibilidad y precio en el servicio que elijas. La reserva se confirma allí.</p>
        <p className="break-words"><span className="font-semibold">Destino: </span><span className="select-text">{textoDestino}</span></p>
        <button type="button" onClick={copiar} className="min-h-11 rounded-full border border-orange-200 bg-white px-4 py-2 font-semibold text-orange-700 hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
          Copiar destino
        </button>
        <div className="flex flex-wrap gap-2">
          {[
            ["Uber", enlaceUber(destino, textoDestino)],
            ["Cabify", "https://www.cabify.com/app"],
            ["FREENOW", "https://m.free-now.com/JGMc"],
          ].map(([nombre, href]) => (
            <a key={nombre} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${nombre} (se abre en otra pestaña)`} className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-white px-4 py-2 font-bold text-slate-800 transition hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
              {nombre} ↗
            </a>
          ))}
        </div>
        <p className="text-xs leading-5 text-slate-500">Si el destino no aparece, pégalo en la app. Comprueba la dirección y el punto de recogida antes de pedir el viaje. Puede ser necesario iniciar sesión o instalar la app.</p>
        <p role="status" aria-live="polite" className="text-xs text-slate-600">{estado}</p>
      </div>
    </details>
  );
}
