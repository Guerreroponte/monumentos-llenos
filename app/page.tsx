"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";

const Mapa = dynamic(() => import("./Mapa"), {
  ssr: false,
}) as React.ComponentType<{
  monumentos: {
    id: string;
    nombre: string;
    ciudad: string;
    latitud?: number | null;
    longitud?: number | null;
  }[];
}>;

type MonumentoDB = {
  id: string;
  created_at?: string | null;
  nombre?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  rating?: number | null;
  precio?: string | null;
  imagen?: string | null;
  descripcion?: string | null;
  acepta_mascotas?: boolean | null;
  acceso_coche?: boolean | null;
  parking_cerca?: boolean | null;
  latitud?: number | null;
  longitud?: number | null;
  slug?: string | null;
  fuente?: string | null;
  es_seed?: boolean | null;
  reportado?: boolean | null;
};

type ResenaDB = {
  id: string;
  monumento_id?: string | null;
  usuario?: string | null;
  comentario?: string | null;
  foto?: string | null;
  created_at?: string | null;
  likes?: number | null;
  reportado?: boolean | null;
};

type MonumentoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  provincia?: string | null;
  comunidad_autonoma?: string | null;
  rating: number | null;
  precio: string;
  imagen?: string | null;
  descripcion?: string | null;
  created_at?: string | null;
  acepta_mascotas?: boolean | null;
  acceso_coche?: boolean | null;
  parking_cerca?: boolean | null;
  latitud?: number | null;
  longitud?: number | null;
  slug?: string | null;
  fuente?: string | null;
  es_seed?: boolean | null;
  reportado?: boolean | null;
  resenas: ResenaDB[];
};

async function resizeImageToDataUrl(file: File): Promise<string> {
  const fileDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = fileDataUrl;
  });

  const maxSize = 1200;
  let { width, height } = image;

  if (width > height && width > maxSize) {
    height = Math.round((height * maxSize) / width);
    width = maxSize;
  } else if (height >= width && height > maxSize) {
    width = Math.round((width * maxSize) / height);
    height = maxSize;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo procesar la imagen.");
  }

  ctx.drawImage(image, 0, 0, width, height);

  return canvas.toDataURL("image/jpeg", 0.8);
}

function getTextoLikes(likes?: number | null) {
  const total = likes || 0;

  if (total === 1) {
    return "A 1 persona le ha gustado este comentario";
  }

  return `A ${total} personas les ha gustado este comentario`;
}

function LugarGaleriaRotativa({
  monumento,
}: {
  monumento: MonumentoUI;
}) {
  const imagenes = useMemo(() => {
    const lista = [
      monumento.imagen,
      ...monumento.resenas.map((r) => r.foto || null),
    ].filter(Boolean) as string[];

    return [...new Set(lista)];
  }, [monumento]);

  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    setIndiceActual(0);
  }, [imagenes.length, monumento.id]);

  useEffect(() => {
    if (imagenes.length <= 1) return;

    const interval = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [imagenes.length]);

  if (imagenes.length > 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 md:h-full md:min-h-[420px] md:aspect-auto">
        <img
          src={imagenes[indiceActual]}
          alt={monumento.nombre}
          className="h-full w-full object-cover transition-opacity duration-700"
        />

        {imagenes.length > 1 && (
          <>
            <div className="absolute bottom-4 left-4 flex gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
              {imagenes.map((_, index) => (
                <span
                  key={`${monumento.id}-dot-${index}`}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index === indiceActual ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {indiceActual + 1} / {imagenes.length}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/3] w-full items-end bg-gradient-to-br from-orange-200 via-amber-100 to-rose-100 p-6 md:h-full md:min-h-[420px] md:aspect-auto">
      <div className="rounded-3xl bg-white/70 p-5 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          {monumento.ciudad}
        </p>
        <h4 className="mt-2 text-3xl font-bold text-slate-900">
          {monumento.nombre}
        </h4>
        <p className="mt-3 text-sm text-slate-600">
          Todavía no hay fotos. Sube la primera y ayuda a los demás a descubrir
          este sitio.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [monumentos, setMonumentos] = useState<MonumentoUI[]>([]);
  const [cargando, setCargando] = useState(true);
  const [guardandoMonumento, setGuardandoMonumento] = useState(false);
  const [guardandoResena, setGuardandoResena] = useState(false);
  const [resenaLikeLoadingId, setResenaLikeLoadingId] = useState<string | null>(
    null
  );
  const [resenaReportandoId, setResenaReportandoId] = useState<string | null>(
    null
  );
  const [lugarReportandoId, setLugarReportandoId] = useState<string | null>(
    null
  );

  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaCiudad, setBusquedaCiudad] = useState("");

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rating, setRating] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcionMonumento, setDescripcionMonumento] = useState("");
  const [imagenMonumentoArchivo, setImagenMonumentoArchivo] = useState("");
  const [procesandoFotoMonumento, setProcesandoFotoMonumento] =
    useState(false);

  const [aceptaMascotas, setAceptaMascotas] = useState("");
  const [accesoCoche, setAccesoCoche] = useState("");
  const [parkingCerca, setParkingCerca] = useState("");

  const [monumentoActivoResena, setMonumentoActivoResena] = useState<
    string | null
  >(null);
  const [usuarioResena, setUsuarioResena] = useState("");
  const [comentarioResena, setComentarioResena] = useState("");
  const [fotoResenaArchivo, setFotoResenaArchivo] = useState("");
  const [procesandoFotoResena, setProcesandoFotoResena] = useState(false);

  const [mensajeCopiado, setMensajeCopiado] = useState("");

  const convertirOpcionalABooleano = (valor: string): boolean | null => {
    if (valor === "si") return true;
    if (valor === "no") return false;
    return null;
  };

  const cargarDatos = async () => {
    setCargando(true);

    const { data: monumentosData, error: errorMonumentos } = await supabase
      .from("Monumentos")
      .select("*")
      .order("created_at", { ascending: false });

    if (errorMonumentos) {
      console.error("Error cargando lugares:", errorMonumentos);
      setCargando(false);
      return;
    }

    const monumentosBase = ((monumentosData || []) as MonumentoDB[]).filter(
      (m) => m.reportado !== true
    );

    const ids = monumentosBase.map((m) => m.id).filter(Boolean);

    let resenasData: ResenaDB[] = [];

    if (ids.length > 0) {
      const { data: dataResenas, error: errorResenas } = await supabase
        .from("resenas")
        .select(
          "id, monumento_id, usuario, comentario, foto, created_at, likes, reportado"
        )
        .in("monumento_id", ids)
        .order("created_at", { ascending: false });

      if (errorResenas) {
        console.error("Error cargando comentarios:", errorResenas);
      } else {
        resenasData = ((dataResenas || []) as ResenaDB[]).filter(
          (r) => r.reportado !== true
        );
      }
    }

    const resenasPorMonumento = new Map<string, ResenaDB[]>();

    for (const r of resenasData) {
      const monumentoId = r.monumento_id || "";
      if (!resenasPorMonumento.has(monumentoId)) {
        resenasPorMonumento.set(monumentoId, []);
      }
      resenasPorMonumento.get(monumentoId)!.push(r);
    }

    const resultado: MonumentoUI[] = monumentosBase.map((m) => ({
      id: m.id,
      nombre: m.nombre || "Lugar sin nombre",
      ciudad: m.ciudad || "Ciudad no especificada",
      provincia: m.provincia || null,
      comunidad_autonoma: m.comunidad_autonoma || null,
      rating: typeof m.rating === "number" ? m.rating : null,
      precio: m.precio || "No especificado",
      imagen: m.imagen || null,
      descripcion: m.descripcion || null,
      created_at: m.created_at || null,
      acepta_mascotas:
        typeof m.acepta_mascotas === "boolean" ? m.acepta_mascotas : null,
      acceso_coche:
        typeof m.acceso_coche === "boolean" ? m.acceso_coche : null,
      parking_cerca:
        typeof m.parking_cerca === "boolean" ? m.parking_cerca : null,
      latitud: typeof m.latitud === "number" ? m.latitud : null,
      longitud: typeof m.longitud === "number" ? m.longitud : null,
      slug: m.slug || null,
      fuente: m.fuente || null,
      es_seed: typeof m.es_seed === "boolean" ? m.es_seed : null,
      reportado: typeof m.reportado === "boolean" ? m.reportado : null,
      resenas: resenasPorMonumento.get(m.id) || [],
    }));

    setMonumentos(resultado);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (!mensajeCopiado) return;

    const timeout = setTimeout(() => {
      setMensajeCopiado("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [mensajeCopiado]);

  const monumentosFiltrados = useMemo(() => {
    return monumentos.filter((m) => {
      const coincideNombre = m.nombre
        .toLowerCase()
        .includes(busquedaNombre.toLowerCase());

      const coincideCiudad = m.ciudad
        .toLowerCase()
        .includes(busquedaCiudad.toLowerCase());

      return coincideNombre && coincideCiudad;
    });
  }, [monumentos, busquedaNombre, busquedaCiudad]);

  const totalComentarios = useMemo(() => {
    return monumentos.reduce(
      (acc, monumento) => acc + monumento.resenas.length,
      0
    );
  }, [monumentos]);

  const totalFotos = useMemo(() => {
    return monumentos.reduce((acc, monumento) => {
      const fotosLugar = monumento.imagen ? 1 : 0;
      const fotosResenas = monumento.resenas.filter((r) => r.foto).length;
      return acc + fotosLugar + fotosResenas;
    }, 0);
  }, [monumentos]);

  const ultimosAportes = useMemo(() => {
    const items = monumentos
      .flatMap((m) =>
        m.resenas.map((r) => ({
          id: r.id,
          usuario: r.usuario || "Visitante",
          comentario: r.comentario || "",
          foto: r.foto || null,
          created_at: r.created_at || null,
          lugar: m.nombre,
          ciudad: m.ciudad,
        }))
      )
      .sort((a, b) => {
        const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, 3);

    return items;
  }, [monumentos]);

  const copiarInvitacion = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";

    const texto = `Estoy usando esta web para ver experiencias reales de lugares y consejos útiles de otras personas.

Comparte la tuya aquí:
${url}`;

    try {
      await navigator.clipboard.writeText(texto);
      setMensajeCopiado("Enlace copiado para compartir");
    } catch (error) {
      console.error("No se pudo copiar el enlace:", error);
      setMensajeCopiado("No se pudo copiar el enlace");
    }
  };

  const añadirMonumento = async () => {
    if (!nombre.trim() || !ciudad.trim() || !rating.trim() || !precio.trim()) {
      alert("Completa nombre, ciudad, valoración y acceso o precio.");
      return;
    }

    const ratingNumero = Number(rating);

    if (Number.isNaN(ratingNumero) || ratingNumero < 0 || ratingNumero > 5) {
      alert("La valoración debe ser un número entre 0 y 5.");
      return;
    }

    setGuardandoMonumento(true);

    const { error } = await supabase.from("Monumentos").insert([
      {
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        rating: ratingNumero,
        precio: precio.trim(),
        imagen: imagenMonumentoArchivo || null,
        descripcion: descripcionMonumento.trim() || null,
        acepta_mascotas: convertirOpcionalABooleano(aceptaMascotas),
        acceso_coche: convertirOpcionalABooleano(accesoCoche),
        parking_cerca: convertirOpcionalABooleano(parkingCerca),
      },
    ]);

    if (error) {
      console.error("Error al guardar lugar:", error);
      alert(`Error al guardar el lugar: ${error.message}`);
    } else {
      setNombre("");
      setCiudad("");
      setRating("");
      setPrecio("");
      setDescripcionMonumento("");
      setImagenMonumentoArchivo("");
      setAceptaMascotas("");
      setAccesoCoche("");
      setParkingCerca("");
      await cargarDatos();
    }

    setGuardandoMonumento(false);
  };

  const manejarArchivoMonumento = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProcesandoFotoMonumento(true);
      const dataUrl = await resizeImageToDataUrl(file);
      setImagenMonumentoArchivo(dataUrl);
    } catch (error) {
      console.error("Error procesando foto del lugar:", error);
      alert("No se pudo procesar la foto del lugar.");
    } finally {
      setProcesandoFotoMonumento(false);
    }
  };

  const manejarArchivoResena = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setProcesandoFotoResena(true);
      const dataUrl = await resizeImageToDataUrl(file);
      setFotoResenaArchivo(dataUrl);
    } catch (error) {
      console.error("Error procesando foto del comentario:", error);
      alert("No se pudo procesar la foto.");
    } finally {
      setProcesandoFotoResena(false);
    }
  };

  const limpiarFormularioResena = () => {
    setUsuarioResena("");
    setComentarioResena("");
    setFotoResenaArchivo("");
    setMonumentoActivoResena(null);
  };

  const añadirResena = async (monumentoId: string) => {
    if (!comentarioResena.trim()) {
      alert("Escribe al menos un comentario.");
      return;
    }

    setGuardandoResena(true);

    const { error } = await supabase.from("resenas").insert([
      {
        monumento_id: monumentoId,
        usuario: usuarioResena.trim() || "Visitante",
        comentario: comentarioResena.trim(),
        foto: fotoResenaArchivo || null,
      },
    ]);

    if (error) {
      console.error("Error al guardar comentario:", error);
      alert(`Error al guardar el comentario: ${error.message}`);
    } else {
      limpiarFormularioResena();
      await cargarDatos();
    }

    setGuardandoResena(false);
  };

  const darLike = async (resenaId: string) => {
    try {
      setResenaLikeLoadingId(resenaId);

      const { data, error } = await supabase
        .from("resenas")
        .select("likes")
        .eq("id", resenaId)
        .single();

      if (error) {
        console.error("Error obteniendo likes:", error);
        return;
      }

      const nuevosLikes = (data?.likes || 0) + 1;

      const { error: updateError } = await supabase
        .from("resenas")
        .update({ likes: nuevosLikes })
        .eq("id", resenaId);

      if (updateError) {
        console.error("Error dando like:", updateError);
      } else {
        await cargarDatos();
      }
    } finally {
      setResenaLikeLoadingId(null);
    }
  };

  const reportarResena = async (resenaId: string) => {
    try {
      setResenaReportandoId(resenaId);

      const { error } = await supabase
        .from("resenas")
        .update({ reportado: true })
        .eq("id", resenaId);

      if (error) {
        console.error("Error reportando comentario:", error);
        alert("No se pudo reportar el comentario.");
      } else {
        alert("Comentario reportado correctamente.");
        await cargarDatos();
      }
    } finally {
      setResenaReportandoId(null);
    }
  };

  const reportarLugar = async (monumentoId: string) => {
    try {
      setLugarReportandoId(monumentoId);

      const { error } = await supabase
        .from("Monumentos")
        .update({ reportado: true })
        .eq("id", monumentoId);

      if (error) {
        console.error("Error reportando lugar:", error);
        alert("No se pudo reportar el lugar.");
      } else {
        alert("Lugar reportado correctamente.");
        await cargarDatos();
      }
    } finally {
      setLugarReportandoId(null);
    }
  };

  const renderEstadoOpcional = (
    titulo: string,
    valor: boolean | null | undefined,
    emoji: string
  ) => {
    let texto = "Prefirió no indicarlo";

    if (valor === true) texto = "Sí";
    if (valor === false) texto = "No";

    return (
      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
        <p className="text-slate-500">{titulo}</p>
        <p className="mt-1 font-semibold text-slate-900">
          {emoji} {texto}
        </p>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_30%)]" />

        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur">
            📸 Sube tu foto · 💬 Cuenta tu experiencia · ❤️ Ayuda a otros viajeros
          </div>

          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Descubre rincones reales y compártelos con la comunidad
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Aquí no mandan las fotos perfectas ni las guías impersonales.
            Mandan las experiencias reales: lugares compartidos por viajeros,
            fotos subidas por la comunidad y comentarios que ayudan de verdad.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#participa"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
            >
              Compartir un lugar
            </a>

            <a
              href="#lugares"
              className="rounded-full border border-orange-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
            >
              Ver aportes de la comunidad
            </a>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Lugares compartidos</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {monumentos.length}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Rincones descubiertos por la comunidad.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Fotos subidas</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalFotos}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Imágenes reales compartidas por viajeros.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Experiencias contadas</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalComentarios}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Comentarios que ayudan a otros a decidir mejor.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-[32px] border border-orange-100 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                Comunidad activa
              </p>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                ¿Has estado en un sitio especial? Súbelo y ayuda al siguiente viajero.
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
                Añade un lugar, sube una foto desde tu móvil o tu ordenador y
                cuenta tu experiencia real. Tu aportación puede ser justo lo que
                otra persona necesitaba para descubrir un rincón distinto.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#participa"
                className="rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
              >
                Añadir lugar
              </a>
              <a
                href="#lugares"
                className="rounded-full border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Ver comentarios reales
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-[32px] border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Haz crecer la comunidad
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Comparte tus experiencias y ayuda a otros a viajar mejor
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                Invita a otras personas a contar sus consejos, recomendaciones y
                experiencias reales. Cuantas más aportaciones haya, más útil será
                la web para todo el mundo.
              </p>
            </div>

            <div className="flex w-full max-w-md flex-col gap-3">
              <button
                onClick={copiarInvitacion}
                className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
              >
                Copiar enlace para invitar
              </button>

              <p className="text-sm text-slate-500">
                Comparte el enlace con alguien que pueda aportar una experiencia útil.
              </p>

              {mensajeCopiado && (
                <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
                  {mensajeCopiado}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {ultimosAportes.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Últimos aportes de la comunidad
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Lo último que han compartido otros viajeros.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {ultimosAportes.map((aporte) => (
                <div
                  key={aporte.id}
                  className="rounded-3xl border border-orange-100 bg-orange-50/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    {aporte.foto ? (
                      <img
                        src={aporte.foto}
                        alt={aporte.usuario}
                        className="h-14 w-14 rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 text-lg font-bold text-white">
                        {aporte.usuario.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-slate-900">{aporte.usuario}</p>
                      <p className="text-sm text-slate-500">
                        en {aporte.lugar}, {aporte.ciudad}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-700">
                    {aporte.comentario || "Compartió su experiencia con la comunidad."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="buscador" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-lg shadow-orange-100">
          <h3 className="text-2xl font-bold text-slate-900">Buscar lugares</h3>
          <p className="mt-2 text-sm text-slate-600">
            Filtra por nombre del lugar o por ciudad para descubrir aportes de
            la comunidad.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={busquedaNombre}
              onChange={(e) => setBusquedaNombre(e.target.value)}
              placeholder="Buscar lugar..."
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={busquedaCiudad}
              onChange={(e) => setBusquedaCiudad(e.target.value)}
              placeholder="Buscar ciudad..."
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>
      </section>

      <section id="participa" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-slate-900">
                Comparte un lugar con la comunidad
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sube un rincón que merezca la pena, añade una foto real y deja
                algo de contexto para ayudar a los demás. Los campos de mascotas,
                coche y parking siguen siendo opcionales.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Consejo:</span>{" "}
              los lugares con foto y descripción invitan mucho más a comentar.
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del lugar"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ciudad"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Valoración de 0 a 5"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Precio o acceso"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <select
              value={aceptaMascotas}
              onChange={(e) => setAceptaMascotas(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Acepta mascotas — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <select
              value={parkingCerca}
              onChange={(e) => setParkingCerca(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Parking cerca — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <select
              value={accesoCoche}
              onChange={(e) => setAccesoCoche(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none md:col-span-2"
            >
              <option value="">Acceso en coche — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <textarea
              value={descripcionMonumento}
              onChange={(e) => setDescripcionMonumento(e.target.value)}
              placeholder="Describe por qué merece la pena, qué te gustó o qué debería saber otra persona antes de ir"
              rows={4}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none md:col-span-2"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sube una foto real del lugar
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={manejarArchivoMonumento}
                className="block w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm outline-none"
              />

              {procesandoFotoMonumento && (
                <p className="mt-2 text-sm text-slate-500">
                  Procesando foto del lugar...
                </p>
              )}

              {imagenMonumentoArchivo && (
                <img
                  src={imagenMonumentoArchivo}
                  alt="Previsualización del lugar"
                  className="mt-3 h-32 rounded-2xl object-cover"
                />
              )}

              {!imagenMonumentoArchivo && !procesandoFotoMonumento && (
                <p className="mt-2 text-sm text-slate-500">
                  Una foto real suele hacer que más gente entre, mire y comente.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={añadirMonumento}
              disabled={guardandoMonumento}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {guardandoMonumento ? "Guardando..." : "Publicar lugar"}
            </button>

            <p className="text-sm text-slate-500">
              Tu aportación aparecerá junto al resto de lugares compartidos por la
              comunidad.
            </p>
          </div>
        </div>
      </section>

      <section id="mapa" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <Mapa
          monumentos={monumentos.map((m) => ({
            id: m.id,
            nombre: m.nombre,
            ciudad: m.ciudad,
            latitud: m.latitud,
            longitud: m.longitud,
          }))}
        />
      </section>

      <section id="lugares" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              Lugares descubiertos
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Lugares compartidos por la comunidad en tiempo real.
            </p>
          </div>

          <div className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            {monumentosFiltrados.length} lugar(es)
          </div>
        </div>

        {cargando ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-6 text-slate-600 shadow-sm">
            Cargando lugares...
          </div>
        ) : monumentosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-8 text-slate-600 shadow-sm">
            <p className="text-lg font-semibold text-slate-900">
              No hay lugares que coincidan con la búsqueda.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Prueba con otra ciudad, otro nombre o sé el primero en compartir un
              lugar nuevo con la comunidad.
            </p>
            <a
              href="#participa"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md"
            >
              Compartir un lugar
            </a>
          </div>
        ) : (
          <div className="grid gap-8">
            {monumentosFiltrados.map((m) => {
              const fotosValidas = m.resenas
                .map((r) => r.foto)
                .filter(Boolean)
                .slice(0, 4) as string[];

              return (
                <div
                  key={m.id}
                  className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100"
                >
                  <div className="grid md:grid-cols-[1.08fr_1fr]">
                    <div className="relative">
                      <LugarGaleriaRotativa monumento={m} />
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-[80%]">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                            {m.ciudad}
                          </p>
                          <h4 className="mt-2 text-3xl font-bold leading-tight text-slate-900">
                            {m.nombre}
                          </h4>
                        </div>

                        <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                          ⭐ {m.rating ?? "Sin nota"}
                        </div>
                      </div>

                      <p className="mt-5 text-base leading-7 text-slate-600">
                        {m.descripcion ||
                          "Lugar añadido por la comunidad. Aquí irán creciendo sus comentarios, fotos y experiencias reales."}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          onClick={() => reportarLugar(m.id)}
                          disabled={lugarReportandoId === m.id}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <span>⚠️</span>
                          <span>
                            {lugarReportandoId === m.id
                              ? "Reportando lugar..."
                              : "Reportar lugar"}
                          </span>
                        </button>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                          <p className="text-slate-500">Acceso o precio</p>
                          <p className="mt-1 font-semibold text-slate-900">
                            💶 {m.precio}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                          <p className="text-slate-500">Comentarios</p>
                          <p className="mt-1 font-semibold text-slate-900">
                            💬 {m.resenas.length}
                          </p>
                        </div>

                        {renderEstadoOpcional(
                          "Acepta mascotas",
                          m.acepta_mascotas,
                          "🐾"
                        )}

                        {renderEstadoOpcional(
                          "Parking cerca",
                          m.parking_cerca,
                          "🅿️"
                        )}

                        {renderEstadoOpcional(
                          "Acceso en coche",
                          m.acceso_coche,
                          "🚗"
                        )}
                      </div>

                      {fotosValidas.length > 0 ? (
                        <div className="mt-6">
                          <p className="mb-3 text-sm font-semibold text-slate-700">
                            Fotos compartidas
                          </p>
                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {fotosValidas.map((foto, index) => (
                              <div
                                key={`${m.id}-foto-${index}`}
                                className="group overflow-hidden rounded-2xl"
                              >
                                <img
                                  src={foto}
                                  alt={`Foto de ${m.nombre}`}
                                  className="h-24 w-full rounded-2xl object-cover transition duration-300 group-hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-6 rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-4 text-sm text-slate-600">
                          Todavía no hay fotos compartidas de este lugar. Sé la
                          primera persona en subir una.
                        </div>
                      )}

                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h5 className="text-xl font-bold text-slate-900">
                            Comentarios de visitantes
                          </h5>
                          <p className="mt-1 text-sm text-slate-500">
                            ¿Has estado aquí? Cuenta cómo fue tu experiencia.
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setMonumentoActivoResena(
                              monumentoActivoResena === m.id ? null : m.id
                            )
                          }
                          className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          {monumentoActivoResena === m.id
                            ? "Cerrar comentario"
                            : "Añadir comentario"}
                        </button>
                      </div>

                      {monumentoActivoResena === m.id && (
                        <div className="mt-5 rounded-3xl border border-orange-100 bg-orange-50/50 p-5">
                          <div className="mb-4 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                            Tu comentario puede ayudar a otra persona a decidir si
                            este lugar merece la pena.
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <input
                              type="text"
                              value={usuarioResena}
                              onChange={(e) => setUsuarioResena(e.target.value)}
                              placeholder="Tu nombre"
                              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
                            />

                            <div className="md:col-span-2">
                              <textarea
                                value={comentarioResena}
                                onChange={(e) => setComentarioResena(e.target.value)}
                                placeholder="Cuéntanos qué te gustó, cómo fue el ambiente, si había gente, si repetirías..."
                                rows={4}
                                className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="mb-2 block text-sm font-medium text-slate-700">
                                Sube una foto de tu experiencia
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={manejarArchivoResena}
                                className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
                              />
                              {procesandoFotoResena && (
                                <p className="mt-2 text-sm text-slate-500">
                                  Procesando foto...
                                </p>
                              )}
                              {fotoResenaArchivo && (
                                <img
                                  src={fotoResenaArchivo}
                                  alt="Previsualización"
                                  className="mt-3 h-28 rounded-2xl object-cover"
                                />
                              )}
                              {!fotoResenaArchivo && !procesandoFotoResena && (
                                <p className="mt-2 text-sm text-slate-500">
                                  Las fotos reales dan mucha más confianza a otros
                                  visitantes.
                                </p>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => añadirResena(m.id)}
                            disabled={guardandoResena}
                            className="mt-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {guardandoResena
                              ? "Guardando comentario..."
                              : "Publicar comentario"}
                          </button>
                        </div>
                      )}

                      <div className="mt-6 grid gap-4">
                        {m.resenas.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-4 text-sm text-slate-600">
                            <p className="font-semibold text-slate-900">
                              Todavía nadie ha contado su experiencia aquí.
                            </p>
                            <p className="mt-2">
                              Sé el primero en comentar y ayuda a otros a saber si
                              este sitio merece la pena.
                            </p>
                          </div>
                        ) : (
                          m.resenas.map((r) => (
                            <div
                              key={r.id}
                              className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition hover:shadow-md"
                            >
                              <div className="flex items-start gap-4">
                                {r.foto ? (
                                  <img
                                    src={r.foto}
                                    alt={r.usuario || "Visitante"}
                                    className="h-16 w-16 rounded-2xl object-cover"
                                  />
                                ) : (
                                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 text-lg font-bold text-white shadow-sm">
                                    {(r.usuario || "V").charAt(0).toUpperCase()}
                                  </div>
                                )}

                                <div className="flex-1">
                                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                      <p className="font-bold text-slate-900">
                                        {r.usuario || "Visitante"}
                                      </p>
                                    </div>

                                    <div className="flex flex-col items-start gap-2 sm:items-end">
                                      <button
                                        onClick={() => darLike(r.id)}
                                        disabled={resenaLikeLoadingId === r.id}
                                        className="inline-flex max-w-full items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-left text-sm font-semibold text-rose-600 transition hover:scale-[1.03] hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                                      >
                                        <span className="text-base">❤️</span>
                                        <span className="whitespace-normal">
                                          {resenaLikeLoadingId === r.id
                                            ? "Actualizando..."
                                            : getTextoLikes(r.likes)}
                                        </span>
                                      </button>

                                      <button
                                        onClick={() => reportarResena(r.id)}
                                        disabled={
                                          resenaReportandoId === r.id ||
                                          r.reportado === true
                                        }
                                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                                      >
                                        <span>⚠️</span>
                                        <span>
                                          {r.reportado
                                            ? "Comentario reportado"
                                            : resenaReportandoId === r.id
                                            ? "Reportando..."
                                            : "Reportar comentario"}
                                        </span>
                                      </button>
                                    </div>
                                  </div>

                                  <p className="mt-3 text-slate-600">
                                    {r.comentario || "Sin comentario"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {m.fuente && (
                        <p className="mt-4 text-xs text-slate-400">
                          Fuente: {m.fuente}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <a
        href="#participa"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-xl shadow-orange-300 transition hover:scale-[1.03] md:hidden"
      >
        <span>＋</span>
        <span>Compartir lugar</span>
      </a>
    </main>
  );
}