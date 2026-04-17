"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CategoriaEvento = "grande" | "local";
type TipoParticipacion = "lugar" | "evento_grande" | "plan_local";

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
  const [tipoParticipacion, setTipoParticipacion] =
    useState<TipoParticipacion>("plan_local");

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

  function seleccionarTipo(tipo: TipoParticipacion) {
    setTipoParticipacion(tipo);
    setMensajeOk("");
    setMensajeError("");

    if (tipo === "evento_grande") {
      setCategoriaEvento("grande");
      setSubtipo("Festival");
    }

    if (tipo === "plan_local") {
      setCategoriaEvento("local");
      setSubtipo("Plan local");
    }
  }

  function manejarCambioFotos(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const nuevasFotos: FotoSeleccionada[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFotos((prev) => [...prev, ...nuevasFotos]);
  }

  function eliminarFoto(index: number) {
    setFotos((prev) => {
      const copia = [...prev];
      const foto = copia[index];
      if (foto?.preview) URL.revokeObjectURL(foto.preview);
      copia.splice(index, 1);
      return copia;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function subirFotos(files: File[]) {
    const urls: string[] = [];

    setSubiendoImagenes(true);

    try {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const extension = file.name.split(".").pop() || "jpg";
        const baseNombre = limpiarNombreArchivo(nombre || file.name || "evento");
        const ruta = `eventos/${Date.now()}-${i}-${baseNombre}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(ruta, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(ruta);
        urls.push(data.publicUrl);
      }

      return urls;
    } finally {
      setSubiendoImagenes(false);
    }
  }

  function resetearFormulario() {
    setNombre("");
    setCiudad("");
    setProvincia("");
    setComunidadAutonoma("");
    setFechaInicio(hoyMasDias(0));
    setFechaFin("");
    setHoraInicio("");
    setHoraFin("");
    setUbicacionDetalle("");
    setDescripcion("");
    setPrecio("");
    setAmbiente("");
    setEnlace("");
    setCreadoPor("");
    setFotos([]);
    setDificilBebida(false);
    setParking(false);
    setRecomendable(true);
    setDestacado(false);

    if (categoriaEvento === "grande") {
      setSubtipo("Festival");
    } else {
      setSubtipo("Plan local");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    if (tipoParticipacion === "lugar") {
      setMensajeError("Para añadir un lugar, usa la opción de lugar de abajo.");
      return;
    }

    if (!nombre.trim() || !ciudad.trim() || !fechaInicio) {
      setMensajeError("Faltan campos obligatorios: nombre, ciudad y fecha.");
      return;
    }

    setLoading(true);

    try {
      const urlsFotos =
        fotos.length > 0 ? await subirFotos(fotos.map((f) => f.file)) : [];

      const imagenPrincipal = urlsFotos[0] ?? null;

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
        descripcion: descripcion.trim(),
        precio: precio || null,
        ambiente: ambiente || null,
        imagen: imagenPrincipal,
        enlace: enlace || null,
        creado_por: creadoPor || null,
        slug: slugEvento,
        dificil_bebida: dificilBebida,
        parking,
        recomendable,
        destacado,
      };

      const { error } = await supabase.from("eventos").insert([payloadEvento]);

      if (error) throw error;

      setMensajeOk(
        categoriaEvento === "grande"
          ? "Evento grande creado correctamente"
          : "Plan local creado correctamente"
      );

      resetearFormulario();
    } catch (err) {
      console.error(err);
      setMensajeError("Error al guardar el evento");
    }

    setLoading(false);
  }

  const tituloFormulario =
    categoriaEvento === "grande" ? "Añadir evento grande" : "Añadir plan local";

  const descripcionFormulario =
    categoriaEvento === "grande"
      ? "Ferias, festivales, fiestas potentes o citas grandes que merecen tener su hueco en la web."
      : "Conciertos pequeños, monólogos, tardeos, directos o planes reales para hoy, mañana o este finde.";

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Participa en la comunidad
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Lugares y planes reales
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
          Elige qué quieres añadir
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-[#64748b] md:text-lg">
          Puedes subir un lugar, un evento grande o un plan local. Cuanto más
          real y útil sea lo que compartes, mejor para la gente que entre a la web.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          <button
            type="button"
            onClick={() => seleccionarTipo("lugar")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
              tipoParticipacion === "lugar"
                ? "border-[#f97316] bg-[#fff7ed]"
                : "border-[#e5e7eb] bg-white"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f97316]">
              📍 Lugar
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#334155]">
              Añadir lugar
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Monumento, rincón, sitio curioso o lugar que merece la pena visitar.
            </p>
          </button>

          <button
            type="button"
            onClick={() => seleccionarTipo("evento_grande")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
              tipoParticipacion === "evento_grande"
                ? "border-[#f97316] bg-[#fff7ed]"
                : "border-[#e5e7eb] bg-white"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f97316]">
              🎉 Evento grande
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#334155]">
              Feria, festival o fiesta
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Para cosas grandes que atraen a mucha gente y merecen salir destacadas.
            </p>
          </button>

          <button
            type="button"
            onClick={() => seleccionarTipo("plan_local")}
            className={`rounded-3xl border p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
              tipoParticipacion === "plan_local"
                ? "border-[#2563eb] bg-[#eff6ff]"
                : "border-[#e5e7eb] bg-white"
            }`}
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2563eb]">
              ⚡ Plan local
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#334155]">
              Qué hacer hoy
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Monólogo, concierto pequeño, bar con directo, tardeo o plan cercano.
            </p>
          </button>
        </div>
      </section>

      {tipoParticipacion === "lugar" && (
        <section className="mx-auto max-w-6xl px-4 pb-10 md:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#fde7d7] bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f97316]">
              Añadir lugar
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#334155]">
              Para subir un lugar, usa la sección principal de lugares
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b]">
              Ahora mismo este formulario está preparado para eventos y planes.
              Si quieres añadir un lugar, entra a la sección principal y súbelo
              desde allí para no romper el flujo que ya tienes montado.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex rounded-full bg-[#f97316] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
              >
                Ir a lugares
              </Link>

              <button
                type="button"
                onClick={() => seleccionarTipo("plan_local")}
                className="inline-flex rounded-full border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-bold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Mejor subir un plan local
              </button>
            </div>
          </div>
        </section>
      )}

      {tipoParticipacion !== "lugar" && (
        <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <p
                className={`text-sm font-bold uppercase tracking-[0.14em] ${
                  categoriaEvento === "grande"
                    ? "text-[#f97316]"
                    : "text-[#2563eb]"
                }`}
              >
                {categoriaEvento === "grande" ? "Evento grande" : "Plan local"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#334155]">
                {tituloFormulario}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#64748b]">
                {descripcionFormulario}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Nombre *
                  </label>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={
                      categoriaEvento === "grande"
                        ? "Ej: Feria de Abril de Sevilla"
                        : "Ej: Monólogo en Beer Station"
                    }
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Ciudad *
                  </label>
                  <input
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej: Madrid"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Provincia
                  </label>
                  <input
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    placeholder="Ej: Madrid"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Comunidad autónoma
                  </label>
                  <input
                    value={comunidadAutonoma}
                    onChange={(e) => setComunidadAutonoma(e.target.value)}
                    placeholder="Ej: Comunidad de Madrid"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Tipo / subtipo
                  </label>
                  <select
                    value={subtipo}
                    onChange={(e) => setSubtipo(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  >
                    {subtipoOptions.map((opcion) => (
                      <option key={opcion} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Fecha inicio *
                  </label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Fecha fin
                  </label>
                  <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Hora inicio
                  </label>
                  <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Hora fin
                  </label>
                  <input
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Ubicación / bar / sala / zona
                </label>
                <input
                  value={ubicacionDetalle}
                  onChange={(e) => setUbicacionDetalle(e.target.value)}
                  placeholder="Ej: Beer Station · Cuesta de Santo Domingo 22"
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Ej: Plan fácil si no sabes qué hacer hoy. Buen ambiente, mejor llegar pronto..."
                  rows={5}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Precio
                  </label>
                  <input
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej: Gratis / 10€ / consumición"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Ambiente
                  </label>
                  <input
                    value={ambiente}
                    onChange={(e) => setAmbiente(e.target.value)}
                    placeholder="Ej: Buen ambiente"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Enlace
                  </label>
                  <input
                    value={enlace}
                    onChange={(e) => setEnlace(e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Creado por
                  </label>
                  <input
                    value={creadoPor}
                    onChange={(e) => setCreadoPor(e.target.value)}
                    placeholder="Tu nombre o alias"
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Fotos
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={manejarCambioFotos}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm"
                />

                {fotos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {fotos.map((foto, index) => (
                      <div
                        key={`${foto.file.name}-${index}`}
                        className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white"
                      >
                        <img
                          src={foto.preview}
                          alt={`Preview ${index + 1}`}
                          className="h-36 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => eliminarFoto(index)}
                          className="w-full border-t border-[#e5e7eb] px-3 py-2 text-sm font-semibold text-[#dc2626] transition hover:bg-[#fef2f2]"
                        >
                          Quitar foto
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#fafaf9] px-4 py-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    checked={dificilBebida}
                    onChange={(e) => setDificilBebida(e.target.checked)}
                  />
                  Difícil pedir bebida
                </label>

                <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#fafaf9] px-4 py-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                  />
                  Parking fácil
                </label>

                <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#fafaf9] px-4 py-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    checked={recomendable}
                    onChange={(e) => setRecomendable(e.target.checked)}
                  />
                  Recomendable
                </label>

                <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#fafaf9] px-4 py-3 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    checked={destacado}
                    onChange={(e) => setDestacado(e.target.checked)}
                  />
                  Destacado
                </label>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || subiendoImagenes}
                  className={`inline-flex rounded-full px-6 py-3 text-sm font-bold text-white transition ${
                    categoriaEvento === "grande"
                      ? "bg-[#f97316] hover:bg-[#ea580c]"
                      : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                  } ${loading || subiendoImagenes ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  {loading
                    ? "Guardando..."
                    : subiendoImagenes
                    ? "Subiendo imágenes..."
                    : categoriaEvento === "grande"
                    ? "Publicar evento grande"
                    : "Publicar plan local"}
                </button>

                <button
                  type="button"
                  onClick={resetearFormulario}
                  className="inline-flex rounded-full border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-bold text-[#475569] transition hover:bg-[#f8fafc]"
                >
                  Limpiar formulario
                </button>
              </div>

              {mensajeOk && (
                <p className="rounded-2xl bg-[#ecfdf5] px-4 py-3 text-sm font-semibold text-[#166534]">
                  {mensajeOk}
                </p>
              )}

              {mensajeError && (
                <p className="rounded-2xl bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-[#b91c1c]">
                  {mensajeError}
                </p>
              )}
            </form>
          </div>
        </section>
      )}
    </main>
  );
}