"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

function crearSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminEventosPage() {
  const [clave, setClave] = useState("");
  const [ok, setOk] = useState(false);
  const [mensaje, setMensaje] = useState("");

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
    parking: "",
  });

  const CLAVE_ADMIN = "lugares2026";

  async function guardarEvento(e: React.FormEvent) {
    e.preventDefault();
    setMensaje("Guardando evento...");

    const slug = crearSlug(`${form.nombre}-${form.ciudad}-${form.fecha_inicio}`);

    const { error } = await supabase.from("eventos").insert({
      ...form,
      slug,
      fecha_fin: form.fecha_fin || form.fecha_inicio,
      recomendable: true,
      destacado: false,
      validado: true,
      reportado: false,
      creado_por: "Lugares Llenos",
    });

    if (error) {
      setMensaje("Error: " + error.message);
      return;
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
      parking: "",
    });
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

        <button className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold">
          Guardar evento
        </button>

        {mensaje && <p className="font-bold">{mensaje}</p>}
      </form>
    </main>
  );
}