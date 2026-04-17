"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CategoriaEvento = "grande" | "local";

type FotoSeleccionada = {
  file: File;
  preview: string;
};

const STORAGE_BUCKET = "imagenes";

const SUBTIPOS_GRANDES = [
  "Festival",
  "Feria",
  "Fiesta",
  "Concierto grande",
  "Mercado medieval",
  "Carnaval",
  "Evento grande",
];

const SUBTIPOS_LOCALES = [
  "Plan local",
  "Qué hacer hoy",
  "Concierto pequeño",
  "Monólogo",
  "Tardeo",
  "Directo",
  "Bar",
  "Sala",
];

function hoyMasDias(dias: number) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().slice(0, 10);
}

function limpiarNombreArchivo(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

// 🔥 NUEVO: GENERADOR DE SLUG
function generarSlugEvento(params: {
  nombre: string;
  ciudad: string;
  fechaInicio?: string;
}) {
  const base = `${params.nombre} ${params.ciudad} ${params.fechaInicio ?? ""}`;

  return base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export default function ParticipaPage() {
  const [categoriaEvento, setCategoriaEvento] =
    useState<CategoriaEvento>("local");

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [subtipo, setSubtipo] = useState("Plan local");
  const [fechaInicio, setFechaInicio] = useState(hoyMasDias(0));
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [ubicacionDetalle, setUbicacionDetalle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [enlace, setEnlace] = useState("");
  const [creadoPor, setCreadoPor] = useState("");

  const [fotos, setFotos] = useState<FotoSeleccionada[]>([]);
  const [subiendoImagenes, setSubiendoImagenes] = useState(false);

  const [dificilBebida, setDificilBebida] = useState(false);
  const [parking, setParking] = useState(false);
  const [recomendable, setRecomendable] = useState(true);
  const [destacado, setDestacado] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const subtipoOptions = useMemo(() => {
    return categoriaEvento === "grande" ? SUBTIPOS_GRANDES : SUBTIPOS_LOCALES;
  }, [categoriaEvento]);

  async function subirFotos(files: File[]) {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const extension = file.name.split(".").pop() || "jpg";
      const baseNombre = limpiarNombreArchivo(nombre || file.name || "evento");

      const ruta = `eventos/${Date.now()}-${i}-${baseNombre}.${extension}`;

      await supabase.storage.from(STORAGE_BUCKET).upload(ruta, file);

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(ruta);
      urls.push(data.publicUrl);
    }

    return urls;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    if (!nombre.trim() || !ciudad.trim() || !fechaInicio) {
      setMensajeError("Faltan campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      const urlsFotos =
        fotos.length > 0
          ? await subirFotos(fotos.map((f) => f.file))
          : [];

      const imagenPrincipal = urlsFotos[0] ?? null;

      // 🔥 GENERAMOS SLUG
      const slugEvento = generarSlugEvento({
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        fechaInicio,
      });

      const payloadEvento = {
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        provincia: provincia || null,
        comunidad_autonoma: comunidadAutonoma || null,
        tipo: subtipo,
        categoria_evento: categoriaEvento,
        subtipo,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin || null,
        hora_inicio: horaInicio || null,
        hora_fin: horaFin || null,
        ubicacion_detalle: ubicacionDetalle || null,
        descripcion,
        precio: precio || null,
        ambiente: ambiente || null,
        imagen: imagenPrincipal,
        enlace: enlace || null,
        creado_por: creadoPor || null,
        slug: slugEvento, // 🔥 AQUÍ ESTÁ LA CLAVE
        dificil_bebida: dificilBebida,
        parking,
        recomendable,
        destacado,
      };

      const { error } = await supabase.from("eventos").insert([payloadEvento]);

      if (error) throw error;

      setMensajeOk("Evento creado correctamente");
      setNombre("");
      setCiudad("");
      setDescripcion("");
      setFotos([]);
    } catch (err) {
      console.error(err);
      setMensajeError("Error al guardar evento");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] p-6">
      <h1 className="text-3xl font-bold mb-6">Subir evento</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full border p-2 rounded"
        />

        <input
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Ciudad"
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Guardando..." : "Publicar"}
        </button>
      </form>

      {mensajeOk && <p className="text-green-600 mt-4">{mensajeOk}</p>}
      {mensajeError && <p className="text-red-600 mt-4">{mensajeError}</p>}
    </main>
  );
}