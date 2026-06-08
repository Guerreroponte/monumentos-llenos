"use client";

import { ChangeEvent, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET = "imagenes";

function crearSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

export default function AdminEventosPage() {
  const [clave, setClave] = useState("");
  const [ok, setOk] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    nombre: "",
    ciudad: "Madrid",
    provincia: "Madrid",
    comunidad_autonoma: "Comunidad de Madrid",
    tipo: "Concierto pequeño",
    categoria_evento: "local",
    fecha_inicio: "",
    fecha_fin: "",
    hora_inicio: "",
    descripcion: "",
    imagen: "",
    precio: "",
    ubicacion_detalle: "",
    ambiente: "",
  });

  const CLAVE_ADMIN = "lugares2026";

  function manejarImagen(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagenFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function subirImagen(slug: string) {
    if (!imagenFile) return form.imagen || null;

    const extension = imagenFile.name.split(".").pop() || "jpg";
    const nombreLimpio = limpiarNombreArchivo(form.nombre || imagenFile.name || "evento");
    const ruta = `eventos/${Date.now()}-${slug}-${nombreLimpio}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(ruta, imagenFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(ruta);

    return data.publicUrl;
  }

  async function guardarEvento(e: React.FormEvent) {
    e.preventDefault();
    setMensaje("Guardando evento...");

    try {
      const slug = crearSlug(`${form.nombre}-${form.ciudad}-${form.fecha_inicio}`);
      const imagenUrl = await subirImagen(slug);

      const { data: eventoCreado, error } = await supabase
        .from("eventos")
        .insert({
          nombre: form.nombre,
          ciudad: form.ciudad,
          provincia: form.provincia,
          comunidad_autonoma: form.comunidad_autonoma,
          tipo: form.tipo,
          categoria_evento: form.categoria_evento,
          fecha_inicio: form.fecha_inicio,
          fecha_fin: form.fecha_fin || form.fecha_inicio,
          hora_inicio: form.hora_inicio || null,
          descripcion: form.descripcion,
          imagen: imagenUrl,
          precio: form.precio,
          ubicacion_detalle: form.ubicacion_detalle,
          ambiente: form.ambiente,
          dificil_bebida: false,
          parking: false,
          recomendable: true,
          destacado: false,
          validado: true,
          reportado: false,
          slug,
          creado_por: "Lugares Llenos",
        })
        .select("id")
        .single();

      if (error) throw error;

      if (imagenUrl && eventoCreado?.id) {
        const { error: fotoError } = await supabase.from("eventos_fotos").insert({
          evento_id: eventoCreado.id,
          imagen: imagenUrl,
          orden: 0,
        });

        if (fotoError) throw fotoError;
      }

      setMensaje("✅ Evento creado correctamente");

      setForm({
        nombre: "",
        ciudad: "Madrid",
        provincia: "Madrid",
        comunidad_autonoma: "Comunidad de Madrid",
        tipo: "Concierto pequeño",
        categoria_evento: "local",
        fecha_inicio: "",
        fecha_fin: "",
        hora_inicio: "",
        descripcion: "",
        imagen: "",
        precio: "",
        ubicacion_detalle: "",
        ambiente: "",
      });

      setImagenFile(null);
      setPreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al guardar el evento o subir la imagen.");
    }
  }

  if (!ok) {
    return (
      <main className="min-h-screen p-8 bg-orange-50">
        <div className="max-w-md mx-auto bg-white p-6 rounded-3xl shadow">
          <h1 className="text-3xl font-bold mb-4">Admin eventos</h1>

          <input
            type="password"
            placeholder="Clave"
            className="w-full border p-3 rounded-xl mb-4"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />

          <button
            onClick={() => setOk(clave === CLAVE_ADMIN)}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Entrar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-orange-50">
      <form
        onSubmit={guardarEvento}
        className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow space-y-4"
      >
        <h1 className="text-3xl font-bold">Crear evento rápido</h1>

        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label className="block font-bold mb-1">{key}</label>

            {key === "descripcion" ? (
              <textarea
                className="w-full border p-3 rounded-xl min-h-32"
                value={value}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ) : (
              <input
                className="w-full border p-3 rounded-xl"
                value={value}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            )}
          </div>
        ))}

        <div>
          <label className="block font-bold mb-1">Subir imagen</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="w-full border p-3 rounded-xl"
            onChange={manejarImagen}
          />

          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="mt-4 h-56 w-full rounded-2xl object-cover"
            />
          )}
        </div>

        <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold">
          Guardar evento
        </button>

        {mensaje && <p className="font-bold">{mensaje}</p>}
      </form>
    </main>
  );
}