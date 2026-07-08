"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Comentario = {
  id: string;
  texto: string;
  autor?: string | null;
  created_at: string;
  foto?: string | null;
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
  fever_url_afiliado?: string | null;
  tipo?: string | null;
  subtipo?: string | null;
  categoria_evento?: string | null;
  precio?: string | null;
  ambiente?: string | null;
  dificil_bebida?: boolean | null;
  parking?: boolean | null;
  recomendable?: boolean | null;
};

const STORAGE_BUCKET = "imagenes";

const COMENTARIOS_RAPIDOS_EVENTO = [
  "🔥 Llenísimo, mejor ir pronto",
  "👌 Buen ambiente sin agobios",
  "😌 Tranquilo, perfecto para hoy",
  "😐 Normal, ni fu ni fa",
  "❌ No merece mucho la pena",
  "🎶 Buen rollo y ambiente",
];

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

function limpiarNombreArchivo(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function resizeImageToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const maxSize = 1200;
      let { width, height } = img;

      if (width > height && width > maxSize) {
        height = Math.round((height * maxSize) / width);
        width = maxSize;
      } else if (height > maxSize) {
        width = Math.round((width * maxSize) / height);
        height = maxSize;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("No se pudo procesar la imagen."));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("No se pudo comprimir la imagen."));
            return;
          }

          resolve(blob);
        },
        "image/jpeg",
        0.8
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen."));
    };

    img.src = url;
  });
}

export default function EventoPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const botonPublicarRef = useRef<HTMLButtonElement | null>(null);
  const inputFotoRef = useRef<HTMLInputElement | null>(null);

  const [evento, setEvento] = useState<Evento | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [textoComentario, setTextoComentario] = useState("");
  const [comentarioRapidoActivo, setComentarioRapidoActivo] = useState("");
  const [autorComentario, setAutorComentario] = useState("");
  const [fotoComentario, setFotoComentario] = useState<File | null>(null);
  const [previewFotoComentario, setPreviewFotoComentario] = useState("");
  const [enviandoComentario, setEnviandoComentario] = useState(false);
  const [errorComentario, setErrorComentario] = useState("");
  const [comentarioEnviado, setComentarioEnviado] = useState(false);
  const [mensajeCompartir, setMensajeCompartir] = useState("");

  const comentariosOrdenados = useMemo(() => {
    return [...comentarios].sort((a, b) => {
      const aTieneFoto = !!a.foto;
      const bTieneFoto = !!b.foto;

      if (aTieneFoto && !bTieneFoto) return -1;
      if (!aTieneFoto && bTieneFoto) return 1;

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
  }, [comentarios]);

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

  useEffect(() => {
    if (!fotoComentario) {
      setPreviewFotoComentario("");
      return;
    }

    const url = URL.createObjectURL(fotoComentario);
    setPreviewFotoComentario(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [fotoComentario]);

  useEffect(() => {
    if (!mensajeCompartir) return;

    const timeout = setTimeout(() => {
      setMensajeCompartir("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [mensajeCompartir]);

  const compartirWhatsApp = () => {
    if (!evento) return;

    const url = window.location.href;
    const texto = `Mira este plan: ${evento.nombre} (${evento.ciudad}) 👉 ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const compartirGeneral = async () => {
    if (!evento) return;

    const url = window.location.href;
    const titulo = evento.nombre || "Plan en Lugares Llenos";
    const texto = `Mira este plan en Lugares Llenos${
      evento.ciudad ? ` (${evento.ciudad})` : ""
    }`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: titulo,
          text: texto,
          url,
        });
        return;
      } catch (error: any) {
        if (error?.name === "AbortError") return;
      }
    }

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        document.hasFocus()
      ) {
        await navigator.clipboard.writeText(url);
        setMensajeCompartir("Enlace copiado para compartir");
      } else {
        setMensajeCompartir("Copia el enlace desde la barra del navegador");
      }
    } catch (error) {
      console.error("No se pudo compartir:", error);
      setMensajeCompartir("Copia el enlace desde la barra del navegador");
    }
  };

  const subirFotoComentario = async () => {
    if (!fotoComentario || !evento?.id) return null;

    const nombreLimpio = limpiarNombreArchivo(fotoComentario.name || "foto");
    const ruta = `comentarios-eventos/${evento.id}/${Date.now()}-${nombreLimpio}.jpg`;

    const blob = await resizeImageToBlob(fotoComentario);

    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(ruta, blob, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(ruta);

    return data.publicUrl;
  };

  const limpiarFormularioComentario = () => {
    setTextoComentario("");
    setComentarioRapidoActivo("");
    setAutorComentario("");
    setFotoComentario(null);
    setPreviewFotoComentario("");

    if (inputFotoRef.current) {
      inputFotoRef.current.value = "";
    }
  };

  const usarComentarioRapido = async (texto: string) => {
    if (!evento?.id || enviandoComentario || comentarioRapidoActivo) return;

    setComentarioRapidoActivo(texto);
    setErrorComentario("");
    setComentarioEnviado(false);

    const { data, error } = await supabase
      .from("comentarios_eventos")
      .insert([
        {
          evento_id: evento.id,
          texto,
          autor: null,
          foto: null,
        },
      ])
      .select()
      .single();

    if (error) {
      setErrorComentario("No se pudo enviar el comentario.");
      setComentarioRapidoActivo("");
      return;
    }

    if (data) {
      setComentarios((prev) => [data, ...prev]);
      limpiarFormularioComentario();
      setComentarioEnviado(true);

      setTimeout(() => {
        botonPublicarRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  };

  const enviarComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    const textoLimpio = textoComentario.trim();
    const autorLimpio = autorComentario.trim();

    setErrorComentario("");
    setComentarioEnviado(false);

    if (!textoLimpio) {
      setErrorComentario("Elige una opción rápida o escribe una frase.");
      return;
    }

    if (!evento?.id) {
      setErrorComentario("No se encontró el evento.");
      return;
    }

    setEnviandoComentario(true);

    try {
      let urlFoto: string | null = null;

      if (fotoComentario) {
        urlFoto = await subirFotoComentario();
      }

      const { data, error } = await supabase
        .from("comentarios_eventos")
        .insert([
          {
            evento_id: evento.id,
            texto: textoLimpio,
            autor: autorLimpio || null,
            foto: urlFoto,
          },
        ])
        .select()
        .single();

      if (error) {
        setErrorComentario("No se pudo enviar el comentario.");
        return;
      }

      if (data) {
        setComentarios((prev) => [data, ...prev]);
        limpiarFormularioComentario();
        setComentarioEnviado(true);
      }
    } catch {
      setErrorComentario("No se pudo subir la foto. Prueba con otra imagen.");
    } finally {
      setEnviandoComentario(false);
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
            src={
              evento.imagen ||
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"
            }
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
                {evento.ubicacion_detalle
                  ? ` · ${evento.ubicacion_detalle}`
                  : ""}
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

            {evento.fever_url_afiliado && (
              <section className="mt-7 rounded-3xl border border-[#fed7aa] bg-[#fff7ed] p-6 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ea580c]">
                      🎟️ Entradas recomendadas
                    </p>

                    <h2 className="mt-3 text-2xl font-extrabold text-[#0f172a]">
                      Completa tu plan
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#475569]">
                      Reserva tus entradas para este evento de forma rápida y segura con Fever.
                    </p>

                    <p className="mt-2 text-xs font-semibold text-[#94a3b8]">
                      Partner de experiencias de Lugares Llenos.
                    </p>
                  </div>

                  <a
                    href={evento.fever_url_afiliado}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#f97316] px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#ea580c] hover:shadow-lg"
                  >
                    Ver entradas →
                  </a>
                </div>
              </section>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={compartirWhatsApp}
                className="inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Compartir por WhatsApp
              </button>

              <button
                onClick={compartirGeneral}
                className="inline-flex rounded-full bg-[#0f172a] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
              >
                Compartir
              </button>

              {!evento.fever_url_afiliado && evento.enlace && (
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

            {mensajeCompartir && (
              <div className="mt-3 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#166534]">
                {mensajeCompartir}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-[#fde7d7] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#334155]">
            ¿Cómo estaba este plan de verdad?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#64748b]">
            ⚡ La gente está decidiendo ahora si ir. Tu comentario o foto puede ayudar mucho.
          </p>

          <form onSubmit={enviarComentario} className="mt-5 space-y-4">
            <div>
              <p className="text-sm font-bold text-[#334155]">
                Respuesta rápida
              </p>
              <p className="mt-1 text-sm text-[#64748b]">
                Pulsa una opción y se publica al momento. Una frase real ya ayuda.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {COMENTARIOS_RAPIDOS_EVENTO.map((texto) => (
                  <button
                    key={texto}
                    type="button"
                    disabled={!!comentarioRapidoActivo || enviandoComentario}
                    onClick={() => usarComentarioRapido(texto)}
                    className={`rounded-full border px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-70 ${
                      comentarioRapidoActivo === texto
                        ? "border-[#f97316] bg-[#f97316] text-white shadow-sm"
                        : "border-[#fed7aa] bg-[#fff7ed] text-[#9a3412] hover:bg-[#ffedd5]"
                    }`}
                  >
                    {comentarioRapidoActivo === texto ? "Enviando..." : texto}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={autorComentario}
              onChange={(e) => setAutorComentario(e.target.value)}
              placeholder="Tu nombre (opcional)"
              className="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            <textarea
              value={textoComentario}
              onChange={(e) => {
                setTextoComentario(e.target.value);
                setComentarioRapidoActivo("");
              }}
              placeholder="Ej: Fui ayer y estaba lleno pero buen ambiente"
              rows={4}
              className="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
            />

            <div className="rounded-2xl border border-dashed border-[#fed7aa] bg-[#fff7ed] p-4">
              <p className="text-sm font-bold text-[#334155]">
                📸 Añadir foto del ambiente (opcional)
              </p>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">
                Una foto ayuda mucho a ver si el plan estaba lleno, tranquilo o con buen ambiente.
              </p>

              <input
                ref={inputFotoRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFotoComentario(file);
                }}
                className="mt-3 w-full text-sm text-[#475569] file:mr-3 file:rounded-full file:border-0 file:bg-[#f97316] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              />

              {previewFotoComentario && (
                <div className="mt-4">
                  <img
                    src={previewFotoComentario}
                    alt="Vista previa de la foto"
                    className="max-h-80 w-full rounded-2xl object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setFotoComentario(null);
                      setPreviewFotoComentario("");
                      if (inputFotoRef.current) {
                        inputFotoRef.current.value = "";
                      }
                    }}
                    className="mt-3 rounded-full border border-[#fecaca] bg-white px-4 py-2 text-xs font-bold text-[#b91c1c] transition hover:bg-[#fef2f2]"
                  >
                    Quitar foto
                  </button>
                </div>
              )}
            </div>

            {errorComentario && (
              <p className="text-sm font-medium text-[#b91c1c]">
                {errorComentario}
              </p>
            )}

            {comentarioEnviado && (
              <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-4">
                <p className="text-sm font-semibold text-[#166534]">
                  Comentario enviado. Gracias por ayudar a decidir 🙌
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  👉 Compártelo para que más gente diga cómo estaba.
                </p>
              </div>
            )}

            <button
              ref={botonPublicarRef}
              type="submit"
              disabled={enviandoComentario}
              className="inline-flex rounded-full bg-[#f97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enviandoComentario ? "Enviando..." : "Contar cómo estaba"}
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#ea580c]">
                🔴 Comentarios recientes del plan
              </p>
              <h2 className="text-xl font-bold text-[#334155]">
                Comentarios reales
              </h2>
            </div>

            <span className="rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#ea580c]">
              {comentarios.length} comentario(s)
            </span>
          </div>

          {comentarios.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#fed7aa] bg-[#fff7ed] p-4">
              <p className="text-sm font-semibold text-[#334155]">
                Todavía nadie ha contado cómo estaba.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#64748b]">
                Sé el primero en decir si había ambiente, si estaba lleno o si merece la pena ir 👇
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comentariosOrdenados.map((comentario, index) => (
                <article
                  key={comentario.id}
                  className={`rounded-2xl border p-4 ${
                    comentario.foto
                      ? "border-[#fed7aa] bg-[#fff7ed]"
                      : "border-[#f1f5f9] bg-[#fffaf7]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-[#334155]">
                      {comentario.autor?.trim() || "Anónimo"}

                      {comentario.foto && (
                        <span className="ml-2 rounded-full bg-[#dbeafe] px-2 py-1 text-xs font-bold text-[#1d4ed8]">
                          📸 Con foto
                        </span>
                      )}

                      {index === 0 && (
                        <span className="ml-2 rounded-full bg-[#fee2e2] px-2 py-1 text-xs font-bold text-[#b91c1c]">
                          🔥 Destacado
                        </span>
                      )}

                      {comentarios.length === 1 && (
                        <span className="ml-2 rounded-full bg-[#ecfccb] px-2 py-1 text-xs font-bold text-[#3f6212]">
                          🥇 Primero
                        </span>
                      )}
                    </p>

                    <p className="text-xs text-[#64748b]">
                      {formatearFechaComentario(comentario.created_at)}
                    </p>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-[#475569]">
                    {comentario.texto}
                  </p>

                  {comentario.foto && (
                    <img
                      src={comentario.foto}
                      alt="Foto subida en el comentario"
                      className="mt-3 max-h-[520px] w-full rounded-2xl object-cover"
                    />
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
