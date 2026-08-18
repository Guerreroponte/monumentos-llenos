"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CategoriaEvento = "grande" | "local";
type TipoParticipacion = "lugar" | "evento_grande" | "plan_local";

type FotoSeleccionada = {
  file: File;
  preview: string;
};

type ColaboradorOpcion = {
  id: string;
  nombre: string;
  categoria_colaborador: string | null;
};

const STORAGE_BUCKET = "imagenes";
const VIDEO_STORAGE_BUCKET = "videos";
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024;
const VIDEO_MIME_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

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
  const [subtipo, setSubtipo] = useState("Qué hacer hoy");
  const [fechaInicio, setFechaInicio] = useState(hoyMasDias(0));
  const [fechaFin, setFechaFin] = useState("");
  const [variosDias, setVariosDias] = useState(false);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [ubicacionDetalle, setUbicacionDetalle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [enlace, setEnlace] = useState("");
  const [creadoPor, setCreadoPor] = useState("");

  const [colaboradores, setColaboradores] = useState<ColaboradorOpcion[]>([]);
  const [colaboradorId, setColaboradorId] = useState("");
  const [cargandoColaboradores, setCargandoColaboradores] = useState(true);
  const [errorColaboradores, setErrorColaboradores] = useState("");

  const [fotos, setFotos] = useState<FotoSeleccionada[]>([]);
  const [subiendoImagenes, setSubiendoImagenes] = useState(false);

  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [subiendoVideo, setSubiendoVideo] = useState(false);

  const [dificilBebida, setDificilBebida] = useState(false);
  const [parking, setParking] = useState(false);
  const [recomendable, setRecomendable] = useState(true);
  const [mostrarAvanzado, setMostrarAvanzado] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [enlaceEdicion, setEnlaceEdicion] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const subtipoOptions = useMemo(() => {
    return categoriaEvento === "grande" ? SUBTIPOS_GRANDES : SUBTIPOS_LOCALES;
  }, [categoriaEvento]);

  const colaboradorSeleccionado = useMemo(
    () =>
      colaboradores.find((colaborador) => colaborador.id === colaboradorId) ??
      null,
    [colaboradores, colaboradorId],
  );

  const colaboradoresAgrupados = useMemo(() => {
    const grupos = {
      salas: [] as ColaboradorOpcion[],
      festivales: [] as ColaboradorOpcion[],
      promotoras: [] as ColaboradorOpcion[],
      medios: [] as ColaboradorOpcion[],
      proyectos: [] as ColaboradorOpcion[],
      instituciones: [] as ColaboradorOpcion[],
      otros: [] as ColaboradorOpcion[],
    };

    colaboradores.forEach((colaborador) => {
      switch (colaborador.categoria_colaborador?.toLowerCase()) {
        case "sala":
          grupos.salas.push(colaborador);
          break;
        case "festival":
          grupos.festivales.push(colaborador);
          break;
        case "promotora":
          grupos.promotoras.push(colaborador);
          break;
        case "medio":
          grupos.medios.push(colaborador);
          break;
        case "proyecto":
          grupos.proyectos.push(colaborador);
          break;
        case "institucion":
          grupos.instituciones.push(colaborador);
          break;
        default:
          grupos.otros.push(colaborador);
      }
    });

    return grupos;
  }, [colaboradores]);

  useEffect(() => {
    let activo = true;

    async function cargarColaboradores() {
      setCargandoColaboradores(true);
      setErrorColaboradores("");

      const { data, error } = await supabase
        .from("colaboradores")
        .select("id, nombre, categoria_colaborador")
        .order("nombre", { ascending: true });

      if (!activo) return;

      if (error) {
        console.error("Error al cargar colaboradores:", error);
        setColaboradores([]);
        setErrorColaboradores(
          "No se han podido cargar los colaboradores. Puedes publicar igualmente.",
        );
      } else {
        setColaboradores((data || []) as ColaboradorOpcion[]);
      }

      setCargandoColaboradores(false);
    }

    cargarColaboradores();

    return () => {
      activo = false;
    };
  }, []);

  function seleccionarTipo(tipo: TipoParticipacion) {
    setTipoParticipacion(tipo);
    setMensajeOk("");
    setMensajeError("");
    setEnlaceEdicion("");

    if (tipo === "evento_grande") {
      setCategoriaEvento("grande");
      setSubtipo("Festival");
    }

    if (tipo === "plan_local") {
      setCategoriaEvento("local");
      setSubtipo("Qué hacer hoy");
    }
  }

  function irAlFormulario() {
    setTipoParticipacion("plan_local");
    setCategoriaEvento("local");
    setSubtipo("Qué hacer hoy");

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
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

  function manejarCambioVideo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setMensajeError("");

    if (!file) return;

    if (!VIDEO_MIME_TYPES.includes(file.type)) {
      setMensajeError("El vídeo debe ser MP4, WebM o MOV.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setMensajeError("El vídeo no puede superar los 50 MB.");
      e.target.value = "";
      return;
    }

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  }

  function eliminarVideo() {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }

    setVideo(null);
    setVideoPreview("");

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  }

  async function subirVideo(file: File) {
    setSubiendoVideo(true);

    try {
      const extension = file.name.split(".").pop() || "mp4";
      const baseNombre = limpiarNombreArchivo(nombre || file.name || "evento");
      const ruta = `eventos/${Date.now()}-${baseNombre}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(VIDEO_STORAGE_BUCKET)
        .upload(ruta, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from(VIDEO_STORAGE_BUCKET)
        .getPublicUrl(ruta);

      return data.publicUrl;
    } finally {
      setSubiendoVideo(false);
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
    setVariosDias(false);
    setHoraInicio("");
    setHoraFin("");
    setUbicacionDetalle("");
    setDescripcion("");
    setPrecio("");
    setAmbiente("");
    setEnlace("");
    setCreadoPor("");
    setColaboradorId("");

    fotos.forEach((foto) => {
      if (foto.preview) URL.revokeObjectURL(foto.preview);
    });
    setFotos([]);

    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideo(null);
    setVideoPreview("");

    setDificilBebida(false);
    setParking(false);
    setRecomendable(true);
    setMostrarAvanzado(false);
    setEnlaceEdicion("");

    if (categoriaEvento === "grande") {
      setSubtipo("Festival");
    } else {
      setSubtipo("Qué hacer hoy");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");
    setEnlaceEdicion("");

    if (tipoParticipacion === "lugar") {
      setMensajeError("Para añadir un lugar, usa la opción de lugar de abajo.");
      return;
    }

    if (!nombre.trim() || !ciudad.trim() || !fechaInicio) {
      setMensajeError("Solo faltan nombre del plan, ciudad y fecha.");
      return;
    }

    setLoading(true);

    try {
      const urlsFotos =
        fotos.length > 0 ? await subirFotos(fotos.map((f) => f.file)) : [];

      const imagenPrincipal = urlsFotos[0] ?? null;
      const videoUrl = video ? await subirVideo(video) : null;

      const slugEvento = generarSlugEvento({
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        fechaInicio,
      });

      const descripcionFinal =
        descripcion.trim() ||
        "Plan compartido por la comunidad. Si alguien ha estado hoy, que diga cómo está el ambiente.";

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
        descripcion: descripcionFinal,
        precio: precio || null,
        ambiente: ambiente || null,
        imagen: imagenPrincipal,
        video_url: videoUrl,
        enlace: enlace || null,
        creado_por:
          creadoPor.trim() || colaboradorSeleccionado?.nombre || null,
        colaborador_id: colaboradorId || null,
        slug: slugEvento,
        dificil_bebida: dificilBebida,
        parking,
        recomendable,
      };

      const { data: eventoCreado, error } = await supabase.rpc(
        "crear_evento_con_token",
        {
          p_nombre: payloadEvento.nombre,
          p_ciudad: payloadEvento.ciudad,
          p_provincia: payloadEvento.provincia,
          p_comunidad_autonoma: payloadEvento.comunidad_autonoma,
          p_tipo: payloadEvento.tipo,
          p_categoria_evento: payloadEvento.categoria_evento,
          p_subtipo: payloadEvento.subtipo,
          p_fecha_inicio: payloadEvento.fecha_inicio,
          p_fecha_fin: payloadEvento.fecha_fin,
          p_hora_inicio: payloadEvento.hora_inicio,
          p_hora_fin: payloadEvento.hora_fin,
          p_ubicacion_detalle: payloadEvento.ubicacion_detalle,
          p_descripcion: payloadEvento.descripcion,
          p_precio: payloadEvento.precio,
          p_ambiente: payloadEvento.ambiente,
          p_imagen: payloadEvento.imagen,
          p_video_url: payloadEvento.video_url,
          p_enlace: payloadEvento.enlace,
          p_creado_por: payloadEvento.creado_por,
          p_colaborador_id: payloadEvento.colaborador_id,
          p_slug: payloadEvento.slug,
          p_dificil_bebida: payloadEvento.dificil_bebida,
          p_parking: payloadEvento.parking,
          p_recomendable: payloadEvento.recomendable,
        }
      );

      if (error) throw error;

      const resultado = Array.isArray(eventoCreado)
        ? eventoCreado[0]
        : eventoCreado;

      if (!resultado?.evento_id || !resultado?.edit_token) {
        throw new Error("No se pudo recuperar el enlace de edición.");
      }

      const urlEdicion = `${window.location.origin}/editar-evento/${resultado.edit_token}`;

      resetearFormulario();
      setEnlaceEdicion(urlEdicion);

      setMensajeOk(
        categoriaEvento === "grande"
          ? "Evento publicado. Gracias por aportar algo útil a la comunidad 🙌"
          : "Plan publicado. Ya ayuda a otra persona a decidir qué hacer 🙌"
      );
    } catch (err) {
      console.error(err);
      setMensajeError("Error al guardar. Prueba otra vez en unos segundos.");
    }

    setLoading(false);
  }

  const tituloFormulario =
    categoriaEvento === "grande"
      ? "Añadir evento grande"
      : "Sube un plan en 30 segundos";

  const descripcionFormulario =
    categoriaEvento === "grande"
      ? "Ferias, festivales, fiestas potentes o citas grandes que merecen tener su hueco en la web."
      : "No hace falta escribir una reseña perfecta. Pon el plan, la ciudad y algo útil: si hay ambiente, si merece la pena o si conviene ir a otra hora.";

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Participa en la comunidad
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Tardas menos de 1 minuto
          </span>
        </div>

        <h1 className="text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
          ¿Has visto un plan que merece la pena hoy?
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-[#64748b] md:text-lg">
          Súbelo rápido para que otra persona sepa qué hacer hoy. No hace falta
          que sea perfecto: una foto, una frase o una recomendación real ya ayuda.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={irAlFormulario}
            className="inline-flex rounded-full bg-[#2563eb] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1d4ed8] hover:shadow-md"
          >
            Subir plan ahora
          </button>

          <p className="text-sm font-semibold text-[#64748b]">
            👉 Ya hay gente subiendo planes hoy. Añade el tuyo.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[#fde7d7] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-bold text-[#334155]">1. Pon el plan</p>
            <p className="mt-1 text-sm text-[#64748b]">
              Ej: cañas, paseo, concierto pequeño, tardeo...
            </p>
          </div>

          <div className="rounded-2xl border border-[#fde7d7] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-bold text-[#334155]">2. Di dónde es</p>
            <p className="mt-1 text-sm text-[#64748b]">
              Ciudad + zona o local si lo sabes.
            </p>
          </div>

          <div className="rounded-2xl border border-[#fde7d7] bg-white px-4 py-4 shadow-sm">
            <p className="text-sm font-bold text-[#334155]">
              3. Ayuda a decidir
            </p>
            <p className="mt-1 text-sm text-[#64748b]">
              ¿Hay ambiente? ¿Merece la pena? ¿Está lleno?
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
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
              ⚡ Lo más rápido
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[#334155]">
              Subir plan para hoy
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#64748b]">
              Algo para hoy, mañana o esta semana: paseo, bar, concierto pequeño,
              tardeo o plan sencillo.
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
              Para eventos grandes que atraen gente y merecen aparecer en la web.
            </p>
          </button>

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
              Rincón, monumento, parque o sitio curioso que merezca la pena.
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
              Para subir un lugar, usa la sección principal
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748b]">
              Este formulario está optimizado para planes y eventos. Si quieres
              añadir un lugar, entra a la sección principal y súbelo desde allí.
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
                Mejor subir un plan rápido
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
                {categoriaEvento === "grande" ? "Evento grande" : "Plan rápido"}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#334155]">
                {tituloFormulario}
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#64748b]">
                {descripcionFormulario}
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-3xl border border-[#fde7d7] bg-[#fffaf3] p-4 md:p-5">
                <p className="text-sm font-bold text-[#334155]">
                  Campos básicos
                </p>
                <p className="mt-1 text-sm text-[#64748b]">
                  Con esto ya puedes publicar. Lo demás es opcional.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      ¿Qué plan es? *
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder={
                        categoriaEvento === "grande"
                          ? "Ej: Feria de Abril de Sevilla"
                          : "Ej: Cañas por La Latina / Paseo por Muelle Uno"
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
                      placeholder="Ej: Madrid, Málaga, Bilbao..."
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      Fecha de inicio *
                    </label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => {
                        const nuevaFechaInicio = e.target.value;
                        setFechaInicio(nuevaFechaInicio);

                        if (
                          variosDias &&
                          fechaFin &&
                          nuevaFechaInicio &&
                          fechaFin < nuevaFechaInicio
                        ) {
                          setFechaFin("");
                        }
                      }}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      ¿Dura varios días?
                    </label>

                    <label className="flex min-h-[46px] items-center gap-3 rounded-xl border border-[#e2e8f0] bg-white px-4 py-3">
                      <input
                        type="checkbox"
                        checked={variosDias}
                        onChange={(e) => {
                          const activo = e.target.checked;
                          setVariosDias(activo);

                          if (!activo) {
                            setFechaFin("");
                          }
                        }}
                      />

                      <span className="text-sm font-semibold text-[#475569]">
                        Sí, tiene varios días
                      </span>
                    </label>
                  </div>

                  {variosDias && (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#334155]">
                        Fecha de fin
                      </label>
                      <input
                        type="date"
                        min={fechaInicio}
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      Hora aproximada
                    </label>
                    <input
                      type="time"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                    />
                  </div>

                  <div className={variosDias ? "md:col-span-2" : ""}>
                    <label className="mb-2 block text-sm font-semibold text-[#334155]">
                      Zona o sitio concreto
                    </label>
                    <input
                      value={ubicacionDetalle}
                      onChange={(e) => setUbicacionDetalle(e.target.value)}
                      placeholder="Ej: Plaza Nueva, Portixol, Cava Baja..."
                      className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Cuenta algo útil
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Ej: Suele haber ambiente entre semana, mejor ir sobre las 20:00. No es fiesta, pero se está a gusto."
                    rows={4}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                  <p className="mt-2 text-xs text-[#94a3b8]">
                    Consejo: cuenta si hay ambiente, si está lleno, si merece la pena o si hay alternativa cerca.
                  </p>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Publicado por
                  </label>

                  <select
                    value={colaboradorId}
                    onChange={(e) => setColaboradorId(e.target.value)}
                    disabled={cargandoColaboradores}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c] disabled:cursor-not-allowed disabled:bg-[#f8fafc] disabled:text-[#94a3b8]"
                  >
                    <option value="">
                      {cargandoColaboradores
                        ? "Cargando colaboradores..."
                        : "Comunidad / sin colaborador"}
                    </option>

                    {colaboradoresAgrupados.salas.length > 0 && (
                      <optgroup label="🎵 Salas">
                        {colaboradoresAgrupados.salas.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.festivales.length > 0 && (
                      <optgroup label="🎪 Festivales y ciclos">
                        {colaboradoresAgrupados.festivales.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.promotoras.length > 0 && (
                      <optgroup label="🎟️ Promotoras">
                        {colaboradoresAgrupados.promotoras.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.medios.length > 0 && (
                      <optgroup label="📰 Medios">
                        {colaboradoresAgrupados.medios.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.proyectos.length > 0 && (
                      <optgroup label="🤝 Proyectos">
                        {colaboradoresAgrupados.proyectos.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.instituciones.length > 0 && (
                      <optgroup label="🏛️ Instituciones">
                        {colaboradoresAgrupados.instituciones.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}

                    {colaboradoresAgrupados.otros.length > 0 && (
                      <optgroup label="Otros colaboradores">
                        {colaboradoresAgrupados.otros.map((colaborador) => (
                          <option key={colaborador.id} value={colaborador.id}>
                            {colaborador.nombre}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>

                  <p className="mt-2 text-xs text-[#94a3b8]">
                    Selecciona un colaborador solo cuando el evento lo publique en
                    nombre de esa sala, medio, festival o proyecto.
                  </p>

                  {errorColaboradores && (
                    <p className="mt-2 text-xs font-semibold text-[#b45309]">
                      {errorColaboradores}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Foto opcional
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={manejarCambioFotos}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm"
                />

                <p className="mt-2 text-xs text-[#94a3b8]">
                  Una foto real ayuda muchísimo, pero no es obligatorio.
                </p>

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

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Vídeo opcional
                </label>

                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/quicktime"
                  onChange={manejarCambioVideo}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm"
                />

                <p className="mt-2 text-xs text-[#94a3b8]">
                  Puedes subir un vídeo MP4, WebM o MOV de hasta 50 MB. Solo se
                  admite un vídeo por evento.
                </p>

                {videoPreview && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
                    <video
                      src={videoPreview}
                      controls
                      preload="metadata"
                      className="max-h-[420px] w-full bg-black object-contain"
                    >
                      Tu navegador no puede reproducir este vídeo.
                    </video>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e7eb] px-4 py-3">
                      <p className="min-w-0 flex-1 truncate text-sm font-semibold text-[#475569]">
                        {video?.name}
                      </p>

                      <button
                        type="button"
                        onClick={eliminarVideo}
                        className="rounded-full border border-[#fecaca] bg-white px-4 py-2 text-sm font-semibold text-[#dc2626] transition hover:bg-[#fef2f2]"
                      >
                        Quitar vídeo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMostrarAvanzado((prev) => !prev)}
                className="rounded-full border border-[#e2e8f0] bg-white px-5 py-3 text-sm font-bold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                {mostrarAvanzado
                  ? "Ocultar detalles opcionales"
                  : "Añadir más detalles opcionales"}
              </button>

              {mostrarAvanzado && (
                <div className="space-y-5 rounded-3xl border border-[#e5e7eb] bg-[#fafaf9] p-4 md:p-5">
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

                  <div className="grid gap-4 md:grid-cols-2">
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
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#334155]">
                        Ambiente
                      </label>
                      <input
                        value={ambiente}
                        onChange={(e) => setAmbiente(e.target.value)}
                        placeholder="Ej: Tranquilo / medio lleno / bastante ambiente"
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
                        Tu nombre o alias
                      </label>
                      <input
                        value={creadoPor}
                        onChange={(e) => setCreadoPor(e.target.value)}
                        placeholder="Ej: Diego / Anónimo"
                        className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#475569]">
                      <input
                        type="checkbox"
                        checked={dificilBebida}
                        onChange={(e) => setDificilBebida(e.target.checked)}
                      />
                      Difícil pedir bebida
                    </label>

                    <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#475569]">
                      <input
                        type="checkbox"
                        checked={parking}
                        onChange={(e) => setParking(e.target.checked)}
                      />
                      Parking fácil
                    </label>

                    <label className="inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-[#475569]">
                      <input
                        type="checkbox"
                        checked={recomendable}
                        onChange={(e) => setRecomendable(e.target.checked)}
                      />
                      Recomendable
                    </label>

                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || subiendoImagenes || subiendoVideo}
                  className={`inline-flex rounded-full px-6 py-3 text-sm font-bold text-white transition ${
                    categoriaEvento === "grande"
                      ? "bg-[#f97316] hover:bg-[#ea580c]"
                      : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                  } ${
                    loading || subiendoImagenes || subiendoVideo
                      ? "cursor-not-allowed opacity-70"
                      : ""
                  }`}
                >
                  {loading
                    ? "Publicando..."
                    : subiendoImagenes
                    ? "Subiendo foto..."
                    : subiendoVideo
                    ? "Subiendo vídeo..."
                    : categoriaEvento === "grande"
                    ? "Publicar evento"
                    : "Publicar plan rápido"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetearFormulario();
                    setMensajeOk("");
                    setMensajeError("");
                  }}
                  className="inline-flex rounded-full border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-bold text-[#475569] transition hover:bg-[#f8fafc]"
                >
                  Limpiar
                </button>
              </div>

              {mensajeOk && (
                <p className="rounded-2xl bg-[#ecfdf5] px-4 py-3 text-sm font-semibold text-[#166534]">
                  {mensajeOk}
                </p>
              )}

              {enlaceEdicion && (
                <div className="rounded-2xl border border-[#bfdbfe] bg-[#eff6ff] p-4">
                  <p className="text-sm font-bold text-[#1e3a8a]">
                    ✏️ Guarda tu enlace privado de edición
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#475569]">
                    Con este enlace podrás volver más adelante y corregir los datos de
                    este evento. No lo compartas públicamente.
                  </p>

                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      readOnly
                      value={enlaceEdicion}
                      className="min-w-0 flex-1 rounded-xl border border-[#bfdbfe] bg-white px-4 py-3 text-sm text-[#334155] outline-none"
                    />

                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(enlaceEdicion);
                        } catch (error) {
                          console.error("No se pudo copiar el enlace:", error);
                        }
                      }}
                      className="rounded-xl bg-[#2563eb] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8]"
                    >
                      Copiar enlace
                    </button>
                  </div>
                </div>
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