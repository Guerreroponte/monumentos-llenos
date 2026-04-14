"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EventoPage() {
  const params = useParams();
  const id = params?.id as string;

  const [evento, setEvento] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const cargarEvento = async () => {
      const { data } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setEvento(data);
    };

    cargarEvento();
  }, [id]);

  const compartirWhatsApp = () => {
    const url = window.location.href;
    const texto = `Mira este plan: ${evento.nombre} (${evento.ciudad}) 👉 ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
  };

  if (!evento) {
    return (
      <main className="min-h-screen bg-[#fffaf3] px-4 py-8 text-[#1f2937]">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-[#64748b]">Cargando evento...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-8 text-[#1f2937]">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <Link
            href="/eventos"
            className="inline-flex rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
          >
            ← Volver a eventos
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-sm">
          <img
            src={evento.imagen}
            alt={evento.nombre}
            className="h-72 w-full object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              {evento.subtipo && (
                <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-bold text-[#ea580c]">
                  {evento.subtipo}
                </span>
              )}

              {evento.tipo && (
                <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                  {evento.tipo}
                </span>
              )}

              {evento.ciudad && (
                <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-bold text-[#475569]">
                  {evento.ciudad}
                </span>
              )}

              {evento.categoria_evento && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    evento.categoria_evento === "local"
                      ? "bg-[#ecfeff] text-[#155e75]"
                      : "bg-[#fef3c7] text-[#92400e]"
                  }`}
                >
                  {evento.categoria_evento === "local"
                    ? "Plan local"
                    : "Evento grande"}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-[#334155]">
              {evento.nombre}
            </h1>

            <div className="mt-3 space-y-2 text-sm text-[#64748b]">
              <p>
                📍 {evento.ciudad}
                {evento.ubicacion_detalle ? ` · ${evento.ubicacion_detalle}` : ""}
              </p>

              <p>
                📅 {evento.fecha_inicio || "Fecha por confirmar"}
                {evento.hora_inicio ? ` · 🕒 ${String(evento.hora_inicio).slice(0, 5)}` : ""}
              </p>
            </div>

            <p className="mt-5 text-base leading-7 text-[#475569]">
              {evento.descripcion}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
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

              {evento.dificil_bebida && (
                <span className="rounded-full bg-[#fee2e2] px-3 py-1 text-xs font-semibold text-[#991b1b]">
                  Difícil pedir bebida
                </span>
              )}

              {evento.parking && (
                <span className="rounded-full bg-[#ecfccb] px-3 py-1 text-xs font-semibold text-[#3f6212]">
                  Parking fácil
                </span>
              )}

              {evento.recomendable && (
                <span className="rounded-full bg-[#fef3c7] px-3 py-1 text-xs font-semibold text-[#92400e]">
                  Recomendado
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={compartirWhatsApp}
                className="inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Compartir por WhatsApp
              </button>

              {evento.enlace && (
                <a
                  href={evento.enlace}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full border border-[#fed7aa] px-5 py-3 text-sm font-semibold text-[#ea580c] transition hover:bg-[#fff7ed]"
                >
                  Ver enlace externo
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-[#fde7d7] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#334155]">
            ¿Cómo estaba este plan?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            En el siguiente paso metemos aquí los comentarios para que la gente pueda
            contar si estaba lleno, normal, tranquilo o si mereció la pena.
          </p>
        </div>
      </div>
    </main>
  );
}