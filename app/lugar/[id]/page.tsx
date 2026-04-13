"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Lugar = {
  id: string;
  nombre?: string | null;
  ciudad?: string | null;
  descripcion?: string | null;
  imagen?: string | null;
};

export default function LugarPage() {
  const params = useParams();
  const id = params?.id as string;

  const [lugar, setLugar] = useState<Lugar | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarLugar = async () => {
      const { data, error } = await supabase
        .from("Monumentos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error cargando lugar:", error);
        setLugar(null);
      } else {
        setLugar(data);
      }

      setCargando(false);
    };

    cargarLugar();
  }, [id]);

  const compartirWhatsApp = () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const texto = `Mira qué sitio tan chulo he encontrado en Lugares Llenos 👇
${url}`;
    const enlace = `https://wa.me/?text=${encodeURIComponent(texto)}`;

    window.open(enlace, "_blank", "noopener,noreferrer");
  };

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
      </div>
    </main>
  );
}