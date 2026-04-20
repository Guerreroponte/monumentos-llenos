"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET = "imagenes";
const LUGARES_POR_PAGINA = 6;

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

type LugarFotoDB = {
  id: string;
  lugar_id?: string | null;
  imagen?: string | null;
  orden?: number | null;
  created_at?: string | null;
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
  fotosLugar: string[];
};

type EventoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  fecha_inicio?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  slug?: string | null;
};

type FotoSeleccionada = {
  file: File;
  preview: string;
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

function limpiarNombreArchivo(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function crearSlug(nombre: string, ciudad: string) {
  return `${nombre}-${ciudad}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
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
      ...monumento.fotosLugar,
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
  const [eventosHoy, setEventosHoy] = useState<EventoUI[]>([]);
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
  const [paginaActual, setPaginaActual] = useState(1);

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rating, setRating] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcionMonumento, setDescripcionMonumento] = useState("");
  const [fotosLugarSeleccionadas, setFotosLugarSeleccionadas] = useState<
    FotoSeleccionada[]
  >([]);
  const [subiendoFotosLugar, setSubiendoFotosLugar] = useState(false);

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

  const inputFotosLugarRef = useRef<HTMLInputElement | null>(null);
  const inputFotoResenaRef = useRef<HTMLInputElement | null>(null);

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
    let lugaresFotosData: LugarFotoDB[] = [];

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

      const { data: dataFotosLugar, error: errorFotosLugar } = await supabase
        .from("lugares_fotos")
        .select("id, lugar_id, imagen, orden, created_at")
        .in("lugar_id", ids)
        .order("orden", { ascending: true });

      if (errorFotosLugar) {
        console.error("Error cargando fotos de lugares:", errorFotosLugar);
      } else {
        lugaresFotosData = (dataFotosLugar || []) as LugarFotoDB[];
      }
    }

    const resenasPorMonumento = new Map<string, ResenaDB[]>();
    const fotosPorLugar = new Map<string, string[]>();

    for (const r of resenasData) {
      const monumentoId = r.monumento_id || "";
      if (!resenasPorMonumento.has(monumentoId)) {
        resenasPorMonumento.set(monumentoId, []);
      }
      resenasPorMonumento.get(monumentoId)!.push(r);
    }

    for (const foto of lugaresFotosData) {
      const lugarId = foto.lugar_id || "";
      const imagen = foto.imagen || "";

      if (!lugarId || !imagen) continue;

      if (!fotosPorLugar.has(lugarId)) {
        fotosPorLugar.set(lugarId, []);
      }

      fotosPorLugar.get(lugarId)!.push(imagen);
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
      fotosLugar: [...new Set(fotosPorLugar.get(m.id) || [])],
    }));

    setMonumentos(resultado);
    setCargando(false);
  };

  const cargarEventosHoy = async () => {
    const hoy = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("eventos")
      .select("id, nombre, ciudad, fecha_inicio, descripcion, tipo, slug, reportado")
      .eq("fecha_inicio", hoy)
      .eq("reportado", false)
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("Error cargando eventos de hoy:", error);
      return;
    }

    setEventosHoy((data || []) as EventoUI[]);
  };

  useEffect(() => {
    cargarDatos();
    cargarEventosHoy();
  }, []);

  useEffect(() => {
    if (!mensajeCopiado) return;

    const timeout = setTimeout(() => {
      setMensajeCopiado("");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [mensajeCopiado]);

  useEffect(() => {
    return () => {
      fotosLugarSeleccionadas.forEach((foto) => {
        URL.revokeObjectURL(foto.preview);
      });
    };
  }, [fotosLugarSeleccionadas]);

  useEffect(() => {
    setPaginaActual(1);
  }, [busquedaNombre, busquedaCiudad]);

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
      const fotosPrincipales = monumento.imagen ? 1 : 0;
      const fotosExtraLugar = monumento.fotosLugar.length;
      const fotosResenas = monumento.resenas.filter((r) => r.foto).length;
      return acc + fotosPrincipales + fotosExtraLugar + fotosResenas;
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

  const totalPaginas = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(monumentosFiltrados.length / LUGARES_POR_PAGINA)
    );
  }, [monumentosFiltrados.length]);

  const monumentosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * LUGARES_POR_PAGINA;
    const fin = inicio + LUGARES_POR_PAGINA;
    return monumentosFiltrados.slice(inicio, fin);
  }, [monumentosFiltrados, paginaActual]);

  const inicioConteo = monumentosFiltrados.length
    ? (paginaActual - 1) * LUGARES_POR_PAGINA + 1
    : 0;

  const finConteo = Math.min(
    paginaActual * LUGARES_POR_PAGINA,
    monumentosFiltrados.length
  );

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

  const compartirLugarWhatsApp = (
    slug: string | null | undefined,
    nombreLugar: string
  ) => {
    if (typeof window === "undefined" || !slug) return;

    const url = `${window.location.origin}/lugar/${slug}`;
    const texto = `Mira este lugar en Lugares Llenos 👇

${nombreLugar}
${url}`;
    const enlace = `https://wa.me/?text=${encodeURIComponent(texto)}`;

    window.open(enlace, "_blank");
  };

  const manejarFotosLugar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const imagenesValidas = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imagenesValidas.length !== files.length) {
      alert("Uno o varios archivos no eran imágenes válidas.");
    }

    const nuevasFotos: FotoSeleccionada[] = imagenesValidas.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFotosLugarSeleccionadas((prev) => [...prev, ...nuevasFotos]);

    if (inputFotosLugarRef.current) {
      inputFotosLugarRef.current.value = "";
    }
  };

  const quitarFotoLugar = (index: number) => {
    setFotosLugarSeleccionadas((prev) => {
      const copia = [...prev];
      const foto = copia[index];

      if (foto) {
        URL.revokeObjectURL(foto.preview);
      }

      copia.splice(index, 1);
      return copia;
    });
  };

  const subirFotosLugar = async (files: File[], nombreLugar: string) => {
    const urls: string[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const extensionOriginal = file.name.split(".").pop() || "jpg";
      const extension = extensionOriginal.toLowerCase();
      const baseNombre = limpiarNombreArchivo(nombreLugar || file.name || "lugar");
      const ruta = `lugares/${Date.now()}-${i + 1}-${baseNombre}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(ruta, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(ruta);
      urls.push(data.publicUrl);
    }

    return urls;
  };

  const limpiarFormularioLugar = () => {
    fotosLugarSeleccionadas.forEach((foto) => {
      URL.revokeObjectURL(foto.preview);
    });

    setNombre("");
    setCiudad("");
    setRating("");
    setPrecio("");
    setDescripcionMonumento("");
    setFotosLugarSeleccionadas([]);
    setAceptaMascotas("");
    setAccesoCoche("");
    setParkingCerca("");

    if (inputFotosLugarRef.current) {
      inputFotosLugarRef.current.value = "";
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
    setSubiendoFotosLugar(fotosLugarSeleccionadas.length > 0);

    try {
      const urlsFotos =
        fotosLugarSeleccionadas.length > 0
          ? await subirFotosLugar(
              fotosLugarSeleccionadas.map((f) => f.file),
              nombre.trim()
            )
          : [];

      const imagenPrincipal = urlsFotos[0] ?? null;
      const slugGenerado = crearSlug(nombre.trim(), ciudad.trim());

      const { data: monumentoInsertado, error } = await supabase
        .from("Monumentos")
        .insert([
          {
            nombre: nombre.trim(),
            ciudad: ciudad.trim(),
            slug: slugGenerado,
            rating: ratingNumero,
            precio: precio.trim(),
            imagen: imagenPrincipal,
            descripcion: descripcionMonumento.trim() || null,
            acepta_mascotas: convertirOpcionalABooleano(aceptaMascotas),
            acceso_coche: convertirOpcionalABooleano(accesoCoche),
            parking_cerca: convertirOpcionalABooleano(parkingCerca),
          },
        ])
        .select("id")
        .single();

      if (error || !monumentoInsertado) {
        console.error("Error al guardar lugar:", error);
        alert(`Error al guardar el lugar: ${error?.message || "Error desconocido"}`);
        setGuardandoMonumento(false);
        setSubiendoFotosLugar(false);
        return;
      }

      if (urlsFotos.length > 0) {
        const payloadFotos = urlsFotos.map((url, index) => ({
          lugar_id: monumentoInsertado.id,
          imagen: url,
          orden: index,
        }));

        const { error: errorFotos } = await supabase
          .from("lugares_fotos")
          .insert(payloadFotos);

        if (errorFotos) {
          console.error("Error guardando fotos extra del lugar:", errorFotos);
          alert("El lugar se guardó, pero hubo un problema con algunas fotos.");
        }
      }

      limpiarFormularioLugar();
      await cargarDatos();
      setPaginaActual(1);
    } catch (error: any) {
      console.error("Error subiendo fotos del lugar:", error);
      alert(
        `No se pudo guardar el lugar o subir sus fotos: ${
          error?.message || "Error desconocido"
        }`
      );
    }

    setGuardandoMonumento(false);
    setSubiendoFotosLugar(false);
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

    if (inputFotoResenaRef.current) {
      inputFotoResenaRef.current.value = "";
    }
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

  const renderPaginacion = monumentosFiltrados.length > LUGARES_POR_PAGINA;

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_30%)]" />

        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-semibold text-orange-600 shadow-sm backdrop-blur">
            🔥 Experiencias reales · 📸 Fotos sin filtros · 💬 Comentarios que ayudan
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Esto nadie te lo dice antes de ir:
            <span className="block text-orange-600">
              cómo están los sitios de verdad
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Hay lugares que parecen increíbles... hasta que vas y están a
            reventar. Aquí la gente cuenta la realidad: si hay colas, si merece
            la pena, si es mejor ir a otra hora o si directamente conviene
            evitarlo.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#lugares"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
            >
              Ver lugares reales
            </a>

            <Link
              href="/eventos"
              className="rounded-full border border-orange-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:text-orange-600"
            >
              Qué hacer hoy
            </Link>

            <a
              href="#participa"
              className="rounded-full border border-slate-200 bg-slate-900 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Contar mi experiencia
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Lugares analizados por la comunidad
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {monumentos.length}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Sitios compartidos con contexto real, no solo fotos bonitas.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Fotos reales sin filtros
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalFotos}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Imágenes de viajeros para ver el ambiente de verdad.
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Experiencias útiles contadas
            </p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalComentarios}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Comentarios que ayudan a decidir mejor antes de ir.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100 lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
                  Empieza por aquí
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Qué mirar primero si acabas de entrar
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Si quieres aprovechar la web rápido, empieza por los lugares
                  con experiencias reales, mira qué hacer hoy y entra en fichas
                  concretas para ver comentarios y fotos.
                </p>
              </div>

              <Link
                href="/eventos"
                className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
              >
                Ver eventos y planes
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <a
                href="#ultimos-aportes"
                className="rounded-3xl border border-orange-100 bg-orange-50/60 p-4 transition hover:border-orange-200 hover:bg-orange-100/70"
              >
                <p className="text-sm font-semibold text-orange-600">
                  01 · Último movimiento
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  Ver lo último que ha contado la gente
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Experiencias frescas, fotos y comentarios recientes.
                </p>
              </a>

              <a
                href="#lugares"
                className="rounded-3xl border border-orange-100 bg-orange-50/60 p-4 transition hover:border-orange-200 hover:bg-orange-100/70"
              >
                <p className="text-sm font-semibold text-orange-600">
                  02 · Lugares reales
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  Explorar sitios y ver su ficha completa
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Mira fotos, comentarios, acceso, parking y más.
                </p>
              </a>

              <Link
                href="/eventos"
                className="rounded-3xl border border-orange-100 bg-orange-50/60 p-4 transition hover:border-orange-200 hover:bg-orange-100/70"
              >
                <p className="text-sm font-semibold text-orange-600">
                  03 · Qué hacer hoy
                </p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  Planes pequeños, directos y cercanos
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Ideas rápidas para hoy con ambiente real y consejos útiles.
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-slate-900 p-6 text-white shadow-lg shadow-orange-100">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">
              Lo que pasa de verdad
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              No es el sitio.
              <span className="block text-orange-300">Es cuándo vas.</span>
            </h3>

            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-200">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold text-white">
                  ⚠️ Sitio bonito, mala hora
                </p>
                <p className="mt-1">
                  Un lugar puede merecer muchísimo la pena por la mañana y ser
                  un caos total por la tarde.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold text-white">
                  📸 Las fotos no siempre cuentan la verdad
                </p>
                <p className="mt-1">
                  Aquí interesan más las colas, el ambiente, el ruido y si
                  repetirías o no.
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <p className="font-semibold text-white">
                  💬 Cuanta más gente aporte, mejor decide todo el mundo
                </p>
                <p className="mt-1">
                  Una experiencia real puede ahorrar una mala visita a otra
                  persona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="buscador" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-lg shadow-orange-100">
          <h2 className="text-2xl font-bold text-slate-900">
            Buscar lugares y ciudades
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Filtra por nombre o ciudad para encontrar experiencias reales de la
            comunidad.
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

      {ultimosAportes.length > 0 && (
        <section
          id="ultimos-aportes"
          className="mx-auto max-w-6xl px-4 pb-12 sm:px-6"
        >
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Últimas experiencias contadas
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Lo último que ha compartido la comunidad para ayudar a otros a
                  decidir mejor.
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
                    {aporte.comentario ||
                      "Compartió su experiencia con la comunidad."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {eventosHoy.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
                  Hoy mismo
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Qué hacer hoy
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Planes rápidos y recientes para quien entra buscando algo ya.
                </p>
              </div>

              <Link
                href="/eventos"
                className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
              >
                Ver todos los eventos
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {eventosHoy.map((evento) => (
                <div
                  key={evento.id}
                  className="rounded-3xl border border-orange-100 bg-orange-50/40 p-5 transition hover:border-orange-200 hover:bg-orange-50"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Hoy
                    </span>

                    {evento.tipo && (
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                        {evento.tipo}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-tight text-slate-900">
                    {evento.nombre}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-500">
                    📍 {evento.ciudad}
                  </p>

                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
                    {evento.descripcion ||
                      "Plan publicado para hoy en la comunidad."}
                  </p>

                  <Link
                    href="/eventos"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
                  >
                    <span>Ver evento</span>
                    <span>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="lugares" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Lugares con experiencias reales
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fotos, comentarios y detalles útiles compartidos por la comunidad.
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
              Prueba con otra ciudad, otro nombre o sé la primera persona en
              compartir un lugar nuevo con la comunidad.
            </p>
            <a
              href="#participa"
              className="mt-5 inline-flex rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md"
            >
              Compartir un lugar
            </a>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
              <span>
                Mostrando <strong>{inicioConteo}</strong>–<strong>{finConteo}</strong> de{" "}
                <strong>{monumentosFiltrados.length}</strong> lugares
              </span>
              <span>
                Página <strong>{paginaActual}</strong> de <strong>{totalPaginas}</strong>
              </span>
            </div>

            <div className="grid gap-8">
              {monumentosPaginados.map((m) => {
                const fotosValidas = [
                  ...m.fotosLugar,
                  ...m.resenas.map((r) => r.foto).filter(Boolean),
                ].filter(Boolean) as string[];

                const fotosUnicas = [...new Set(fotosValidas)].slice(0, 4);
                const hrefLugar = m.slug ? `/lugar/${m.slug}` : "#";

                return (
                  <div
                    key={m.id}
                    className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100"
                  >
                    <div className="grid md:grid-cols-[1.08fr_1fr]">
                      <Link href={hrefLugar} className="relative block">
                        <LugarGaleriaRotativa monumento={m} />
                      </Link>

                      <div className="p-6 md:p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="max-w-[80%]">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                              {m.ciudad}
                            </p>
                            <Link href={hrefLugar} className="block">
                              <h3 className="mt-2 text-3xl font-bold leading-tight text-slate-900 transition hover:text-orange-600">
                                {m.nombre}
                              </h3>
                            </Link>
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
                          <Link
                            href={hrefLugar}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                          >
                            <span>🔎</span>
                            <span>Ver ficha completa</span>
                          </Link>

                          <button
                            onClick={() => compartirLugarWhatsApp(m.slug, m.nombre)}
                            disabled={!m.slug}
                            className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <span>📲</span>
                            <span>WhatsApp</span>
                          </button>

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

                        {fotosUnicas.length > 0 ? (
                          <div className="mt-6">
                            <p className="mb-3 text-sm font-semibold text-slate-700">
                              Fotos compartidas
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                              {fotosUnicas.map((foto, index) => (
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
                            <h4 className="text-xl font-bold text-slate-900">
                              Comentarios de visitantes
                            </h4>
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
                                  ref={inputFotoResenaRef}
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
                                Sé la primera persona en comentar y ayuda a otros a
                                saber si este sitio merece la pena.
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

            {renderPaginacion && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setPaginaActual((prev) => Math.max(1, prev - 1))}
                    disabled={paginaActual === 1}
                    className="rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                    (pagina) => (
                      <button
                        key={pagina}
                        onClick={() => setPaginaActual(pagina)}
                        className={`h-11 min-w-[44px] rounded-full px-4 text-sm font-bold transition ${
                          paginaActual === pagina
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                            : "border border-orange-200 bg-white text-slate-700 shadow-sm hover:border-orange-300 hover:text-orange-600"
                        }`}
                      >
                        {pagina}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setPaginaActual((prev) => Math.min(totalPaginas, prev + 1))
                    }
                    disabled={paginaActual === totalPaginas}
                    className="rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-[32px] border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Haz crecer la comunidad
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Comparte tus experiencias y ayuda a otros a viajar mejor
              </h2>
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

      <section id="participa" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900">
                Comparte un lugar con la comunidad
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sube un rincón que merezca la pena, añade fotos reales y deja
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
                Sube fotos reales del lugar
              </label>

              <input
                ref={inputFotosLugarRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={manejarFotosLugar}
                className="hidden"
                id="subir-fotos-lugar"
              />

              <label
                htmlFor="subir-fotos-lugar"
                className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/60 px-4 py-6 text-center transition hover:bg-orange-100/70"
              >
                <span className="text-sm font-bold text-orange-700">
                  Subir fotos
                </span>
                <span className="mt-1 text-xs text-orange-600">
                  Pulsa aquí para abrir cámara o galería
                </span>
                <span className="mt-2 text-xs text-slate-500">
                  Puedes seleccionar varias. La primera será la principal.
                </span>
              </label>

              {subiendoFotosLugar && (
                <p className="mt-2 text-sm text-slate-500">
                  Subiendo fotos del lugar...
                </p>
              )}

              {fotosLugarSeleccionadas.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Fotos seleccionadas ({fotosLugarSeleccionadas.length})
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {fotosLugarSeleccionadas.map((foto, index) => (
                      <div
                        key={`${foto.file.name}-${index}`}
                        className="overflow-hidden rounded-2xl border border-orange-100 bg-white"
                      >
                        <div className="relative">
                          <img
                            src={foto.preview}
                            alt={`Foto ${index + 1}`}
                            className="h-28 w-full object-cover"
                          />

                          {index === 0 && (
                            <span className="absolute left-2 top-2 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                              Principal
                            </span>
                          )}
                        </div>

                        <div className="p-2">
                          <button
                            type="button"
                            onClick={() => quitarFotoLugar(index)}
                            className="w-full rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                          >
                            Quitar foto
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fotosLugarSeleccionadas.length === 0 && !subiendoFotosLugar && (
                <p className="mt-2 text-sm text-slate-500">
                  Las fotos reales suelen hacer que más gente entre, mire y comente.
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
              {guardandoMonumento
                ? subiendoFotosLugar
                  ? "Subiendo fotos y guardando..."
                  : "Guardando..."
                : "Publicar lugar"}
            </button>

            <p className="text-sm text-slate-500">
              Tu aportación aparecerá junto al resto de lugares compartidos por la
              comunidad.
            </p>
          </div>
        </div>
      </section>

      <section id="mapa" className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900">Mapa de lugares</h2>
          <p className="mt-2 text-sm text-slate-600">
            Explora visualmente los sitios compartidos por la comunidad.
          </p>
        </div>

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