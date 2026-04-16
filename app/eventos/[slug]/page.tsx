"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Comentario = {
  id: string;
  texto: string;
  autor?: string | null;
  created_at: string;
};

type Evento = {
  id: string;
  slug?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  ubicacion_detalle?: string | null;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  hora_inicio?: string | null;
  hora_fin?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
  enlace?: string | null;
  tipo?: string | null;
  subtipo?: string | null;
  categoria_evento?: string | null;
  precio?: string | null;
  ambiente?: string | null;
  dificil_bebida?: boolean | null;
  parking?: boolean | null;
  recomendable?: boolean | null;
};

function formatearFecha(fecha?: string | null) {
  if (!fecha) return "Fecha por confirmar";

  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return "Fecha por confirmar";

  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatearHora(hora?: string | null) {
  if (!hora) return "";
  return String(hora).slice(0, 5);
}

function textoFechaEvento(evento: Evento) {
  const inicio = formatearFecha(evento.fecha_inicio);
  const fin = formatearFecha(evento.fecha_fin);

  if (
    evento.fecha_inicio &&
    evento.fecha_fin &&
    evento.fecha_inicio !== evento.fecha_fin
  ) {
    return `${inicio} - ${fin}`;
  }

  return inicio;
}

export default function EventoPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [evento, setEvento] = useState<Evento | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [textoComentario, setTextoComentario] = useState("");
  const [autorComentario, setAutorComentario] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [errorComentario, setErrorComentario] = useState("");
  const [comentarioEnviado, setComentarioEnviado] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const cargarEvento = async () => {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) {
        setEvento(data);
      } else {
        setEvento(null);
      }
    };

    cargarEvento();
  }, [slug]);

  useEffect(() => {
    if (!evento?.id) return;

    const cargarComentarios = async () => {
      const { data, error } = await supabase
        .from("comentarios_eventos")
        .select("*")
        .eq("evento_id", evento.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setComentarios(data);
      }
    };

    cargarComentarios();
  }, [evento?.id]);

  const compartirWhatsApp = () => {
    if (!evento) return;

    const url = window.location.href;
    const texto = `Mira este plan: ${evento.nombre} (${evento.ciudad}) 👉 ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const enviarComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    const textoLimpio = textoComentario.trim();
    const autorLimpio = autorComentario.trim();

    setErrorComentario("");
    setComentarioEnviado(false);

    if (!textoLimpio) {
      setErrorComentario("Escribe un comentario antes de enviarlo.");
      return;
    }

    if (!evento?.id) {
      setErrorComentario("No se encontró el evento.");
      return;
    }

    setEnviandoComentario(true);

    const { data, error } = await supabase
      .from("comentarios_eventos")
      .insert([
        {
          evento_id: evento.id,
          texto: textoLimpio,
          autor: autorLimpio || null,
        },
      ])
      .select()
      .single();

    setEnviandoComentario(false);

    if (error) {
      setErrorComentario("No se pudo enviar el comentario.");
      return;
    }

    if (data) {
      setComentarios((prev) => [data, ...prev]);
      setTextoComentario("");
      setAutorComentario("");
      setComentarioEnviado(true);
    }
  };

  function formatearFechaComentario(fecha: string) {
    const d = new Date(fecha);
    if (Number.isNaN(d.getTime())) return "";

    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

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
            src={evento.imagen || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"}
            alt={evento.nombre || "Evento"}
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
              {evento.nombre || "Evento"}
            </h1>

            <div className="mt-3 space-y-2 text-sm text-[#64748b]">
              <p>
                📍 {evento.ciudad || "Ciudad por confirmar"}
                {evento.ubicacion_detalle ? ` · ${evento.ubicacion_detalle}` : ""}
              </p>

              <p>
                📅 {textoFechaEvento(evento)}
                {evento.hora_inicio
                  ? ` · 🕒 ${formatearHora(evento.hora_inicio)}`
                  : ""}
                {evento.hora_fin
                  ? ` - ${formatearHora(evento.hora_fin)}`
                  : ""}
              </p>
            </div>

            <p className="mt-5 text-base leading-7 text-[#475569]">
              {evento.descripcion || "Sin descripción disponible."}
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
            Cuéntalo en una frase rápida. Ayuda más una experiencia real que una descripción perfecta.
          </p>

          <form onSubmit={enviarComentario} className="mt-5 space-y-4">
            <input
              type="text"
              value={autorComentario}
              onChange={(e) => setAutorComentario(e.target.value)}
              placeholder="Tu nombre (opcional)"
              className="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            <textarea
              value={textoComentario}
              onChange={(e) => setTextoComentario(e.target.value)}
              placeholder="Ejemplo: Fui ayer y estaba hasta arriba, mejor ir pronto."
              rows={4}
              className="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            {errorComentario && (
              <p className="text-sm font-medium text-[#b91c1c]">
                {errorComentario}
              </p>
            )}

            {comentarioEnviado && (
              <p className="text-sm font-medium text-[#166534]">
                Comentario enviado.
              </p>
            )}

            <button
              type="submit"
              disabled={enviandoComentario}
              className="inline-flex rounded-full bg-[#f97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enviandoComentario ? "Enviando..." : "Enviar comentario"}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[#334155]">
              Comentarios reales
            </h2>
            <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#ea580c]">
              {comentarios.length} comentario(s)
            </span>
          </div>

          {comentarios.length === 0 ? (
            <p className="text-sm leading-6 text-[#64748b]">
              Todavía no hay comentarios. Sé el primero en contar cómo estaba este plan.
            </p>
          ) : (
            <div className="space-y-4">
              {comentarios.map((comentario) => (
                <article
                  key={comentario.id}
                  className="rounded-2xl border border-[#f1f5f9] bg-[#fffaf7] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#334155]">
                      {comentario.autor?.trim() || "Anónimo"}
                    </p>
                    <p className="text-xs text-[#64748b]">
                      {formatearFechaComentario(comentario.created_at)}
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    {comentario.texto}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}