"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Lugar = {
  id: string;
  slug?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
};

type Resena = {
  id: string;
  monumento_id: string;
  usuario?: string | null;
  comentario?: string | null;
  foto?: string | null;
  created_at?: string | null;
  likes?: number | null;
  reportado?: boolean | null;
};

const COMENTARIOS_RAPIDOS = [
  "🔥 Muy lleno, mejor ir con tiempo",
  "👍 Buen ambiente sin agobios",
  "😌 Tranquilo, perfecto para desconectar",
  "👀 Merece la pena si estás por la zona",
  "⚠️ Está bien, pero no esperes mucho ambiente",
  "🌅 Mejor al atardecer",
];

export default function LugarPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [lugar, setLugar] = useState<Lugar | null>(null);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState("");
  const [comentario, setComentario] = useState("");
  const [comentarioRapidoActivo, setComentarioRapidoActivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const cargarLugar = async () => {
      const { data, error } = await supabase
        .from("Monumentos")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error cargando lugar:", error);
        setLugar(null);
        setCargando(false);
        return;
      }

      setLugar(data);
      setCargando(false);
    };

    cargarLugar();
  }, [slug]);

  useEffect(() => {
    if (!lugar?.id) return;

    const cargarResenas = async () => {
      const { data, error } = await supabase
        .from("resenas")
        .select("*")
        .eq("monumento_id", lugar.id)
        .or("reportado.is.null,reportado.eq.false")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando reseñas:", error);
        return;
      }

      setResenas(data || []);
    };

    cargarResenas();
  }, [lugar?.id]);

  const compartirWhatsApp = () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const texto = `Mira qué sitio tan chulo he encontrado en Lugares Llenos 👇
${url}`;
    const enlace = `https://wa.me/?text=${encodeURIComponent(texto)}`;

    window.open(enlace, "_blank", "noopener,noreferrer");
  };

  const usarComentarioRapido = (texto: string) => {
    setComentario(texto);
    setComentarioRapidoActivo(texto);
    setMensajeError("");
    setMensajeOk("");
  };

  const enviarComentario = async (e: React.FormEvent) => {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    if (!lugar?.id) {
      setMensajeError("No se encontró el lugar.");
      return;
    }

    if (!comentario.trim()) {
      setMensajeError("Elige una opción rápida o escribe una frase.");
      return;
    }

    setEnviando(true);

    const { data, error } = await supabase
      .from("resenas")
      .insert([
        {
          monumento_id: lugar.id,
          usuario: usuario.trim() || "Anónimo",
          comentario: comentario.trim(),
          foto: null,
          likes: 0,
          reportado: false,
        },
      ])
      .select()
      .single();

    setEnviando(false);

    if (error) {
      console.error("Error enviando comentario:", error);
      setMensajeError("No se pudo enviar el comentario. Prueba otra vez.");
      return;
    }

    if (data) {
      setResenas((prev) => [data, ...prev]);
      setUsuario("");
      setComentario("");
      setComentarioRapidoActivo("");
      setMensajeOk("Comentario añadido. Gracias por aportar algo real 🙌");
    }
  };

  function formatearFecha(fecha?: string | null) {
    if (!fecha) return "";

    const d = new Date(fecha);
    if (Number.isNaN(d.getTime())) return "";

    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              Cargando lugar...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!lugar) {
    return (
      <main className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-900">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
            <p className="text-xl font-bold text-slate-900">
              Lugar no encontrado
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Puede que el enlace no sea correcto o que este lugar ya no esté
              disponible.
            </p>

            <a
              href="/"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md"
            >
              Volver al inicio
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
        >
          ← Volver a Lugares Llenos
        </a>

        <div className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100">
          {lugar.imagen ? (
            <img
              src={lugar.imagen}
              alt={lugar.nombre || "Lugar"}
              className="h-[260px] w-full object-cover md:h-[420px]"
            />
          ) : (
            <div className="flex h-[260px] w-full items-end bg-gradient-to-br from-orange-200 via-amber-100 to-rose-100 p-6 md:h-[420px]">
              <div className="rounded-3xl bg-white/75 p-5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                  {lugar.ciudad || "Ciudad no especificada"}
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  {lugar.nombre || "Lugar sin nombre"}
                </h1>
                <p className="mt-3 text-sm text-slate-600">
                  Este lugar todavía no tiene imagen principal.
                </p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              {lugar.ciudad || "Ciudad no especificada"}
            </p>

            <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {lugar.nombre || "Lugar sin nombre"}
            </h1>

            <button
              onClick={compartirWhatsApp}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-green-600"
            >
              <span>📲</span>
              <span>Compartir por WhatsApp</span>
            </button>

            <div className="mt-8 rounded-3xl border border-orange-100 bg-orange-50/50 p-5">
              <h2 className="text-lg font-bold text-slate-900">
                Sobre este lugar
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {lugar.descripcion ||
                  "Este lugar todavía no tiene descripción disponible."}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Comentarios de visitantes
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                ¿Estaba lleno o se estaba a gusto? Cuéntalo en 1 frase.
              </p>
            </div>

            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600">
              💬 {resenas.length} comentario(s)
            </span>
          </div>

          <form
            onSubmit={enviarComentario}
            className="mt-6 rounded-3xl border border-orange-100 bg-[#fffaf3] p-5"
          >
            <p className="text-sm font-bold text-slate-900">
              Respuesta rápida
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Pulsa una opción o escribe algo propio. Una frase real ya ayuda.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {COMENTARIOS_RAPIDOS.map((texto) => (
                <button
                  key={texto}
                  type="button"
                  onClick={() => usarComentarioRapido(texto)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                    comentarioRapidoActivo === texto
                      ? "border-orange-400 bg-orange-500 text-white shadow-sm"
                      : "border-orange-100 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  {texto}
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Tu nombre o alias (opcional)"
                className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />

              <input
                value={comentario}
                onChange={(e) => {
                  setComentario(e.target.value);
                  setComentarioRapidoActivo("");
                }}
                placeholder="Ej: Fui al atardecer y había ambiente sin agobios"
                className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            {mensajeError && (
              <p className="mt-3 text-sm font-semibold text-red-600">
                {mensajeError}
              </p>
            )}

            {mensajeOk && (
              <p className="mt-3 text-sm font-semibold text-green-700">
                {mensajeOk}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="mt-4 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? "Enviando..." : "Publicar comentario"}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            {resenas.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50/50 p-5">
                <p className="text-sm font-semibold text-slate-800">
                  Nadie ha contado todavía cómo estaba.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Puedes ser la primera persona en decir si merece la pena, si
                  hay ambiente o si conviene ir a otra hora.
                </p>
              </div>
            ) : (
              resenas.map((resena) => (
                <article
                  key={resena.id}
                  className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {resena.foto ? (
                        <img
                          src={resena.foto}
                          alt={resena.usuario || "Usuario"}
                          className="h-12 w-12 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 text-lg font-black uppercase text-white">
                          {(resena.usuario || "A").slice(0, 1)}
                        </div>
                      )}

                      <div>
                        <p className="font-bold text-slate-900">
                          {resena.usuario || "Anónimo"}
                        </p>
                        {resena.created_at && (
                          <p className="text-xs text-slate-500">
                            {formatearFecha(resena.created_at)}
                          </p>
                        )}
                      </div>
                    </div>

                    <span className="rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600">
                      ❤️ A {resena.likes || 0} personas les ha gustado
                    </span>
                  </div>

                  <p className="mt-4 text-base leading-7 text-slate-700">
                    {resena.comentario || "Sin comentario."}
                  </p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}