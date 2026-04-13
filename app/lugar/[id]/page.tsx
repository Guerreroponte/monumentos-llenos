"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Lugar = {
  id: string;
  nombre?: string;
  ciudad?: string;
  descripcion?: string;
  imagen?: string;
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
      } else {
        setLugar(data);
      }

      setCargando(false);
    };

    cargarLugar();
  }, [id]);

  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando lugar...</p>
      </main>
    );
  }

  if (!lugar) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Lugar no encontrado</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {lugar.imagen && (
          <img
            src={lugar.imagen}
            alt={lugar.nombre}
            className="w-full rounded-2xl mb-6 object-cover"
          />
        )}

        <h1 className="text-3xl font-bold">
          {lugar.nombre || "Lugar sin nombre"}
        </h1>

        <p className="text-gray-500 mt-2">
          📍 {lugar.ciudad || "Ciudad no especificada"}
        </p>

        <p className="mt-6 text-gray-700">
          {lugar.descripcion || "Sin descripción"}
        </p>
      </div>
    </main>
  );
}