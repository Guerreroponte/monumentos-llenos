"use client";

import { useRef, useState } from "react";

export default function GaleriaLugar({ fotos, nombre }: { fotos: string[]; nombre: string }) {
  const [actual, setActual] = useState(0);
  const dialogo = useRef<HTMLDialogElement>(null);
  const cambiar = (paso: number) => setActual(i => (i + paso + fotos.length) % fotos.length);

  if (fotos.length === 0) return null;
  if (fotos.length === 1) return (
    <img src={fotos[0]} alt={nombre} className="h-[260px] w-full object-cover md:h-[420px]" />
  );

  return (
    <section aria-label={`Fotos de ${nombre}`}>
      <button type="button" onClick={() => dialogo.current?.showModal()}
        aria-label={`Ampliar foto ${actual + 1} de ${fotos.length} de ${nombre}`}
        className="relative block w-full cursor-zoom-in focus-visible:outline-4 focus-visible:outline-orange-500">
        <img src={fotos[actual]} alt={`${nombre}, foto ${actual + 1}`} className="h-[260px] w-full object-cover md:h-[420px]" />
        <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-sm font-semibold text-white">Ver fotos · {actual + 1}/{fotos.length}</span>
      </button>
      <div className="flex gap-3 overflow-x-auto p-4" aria-label="Elegir foto">
        {fotos.map((foto, i) => (
          <button key={foto} type="button" aria-label={`Ver foto ${i + 1} de ${fotos.length}`} aria-pressed={actual === i}
            onClick={() => setActual(i)}
            className={`shrink-0 overflow-hidden rounded-xl border-2 p-0.5 focus-visible:outline-2 focus-visible:outline-orange-600 ${actual === i ? "border-orange-500" : "border-transparent"}`}>
            <img src={foto} alt="" loading="lazy" className="h-16 w-24 rounded-lg object-cover" />
          </button>
        ))}
      </div>
      <dialog ref={dialogo} aria-label={`Galería de ${nombre}`}
        className="fixed inset-0 m-auto max-h-[95dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-2xl bg-slate-950 p-4 text-white backdrop:bg-black/80"
        onClick={e => { if (e.target === e.currentTarget) dialogo.current?.close(); }}
        onKeyDown={e => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            cambiar(e.key === "ArrowRight" ? 1 : -1);
          }
        }}>
        <div className="flex items-center justify-between gap-3 pb-3">
          <p aria-live="polite" className="text-sm">Foto {actual + 1} de {fotos.length} · {nombre}</p>
          <button type="button" onClick={() => dialogo.current?.close()} className="min-h-11 shrink-0 rounded-full border border-white/40 px-4">Cerrar ✕</button>
        </div>
        <img src={fotos[actual]} alt={`${nombre}, foto ${actual + 1}`} className="h-[60dvh] w-full object-contain" />
        <div className="flex justify-between gap-4 pt-4">
          <button type="button" onClick={() => cambiar(-1)} className="min-h-11 rounded-full border border-white/40 px-4">← Anterior</button>
          <button type="button" onClick={() => cambiar(1)} className="min-h-11 rounded-full border border-white/40 px-4">Siguiente →</button>
        </div>
      </dialog>
    </section>
  );
}
