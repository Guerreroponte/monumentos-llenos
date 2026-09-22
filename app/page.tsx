"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const STORAGE_BUCKET = "imagenes";
const LUGARES_POR_PAGINA = 6;

const SALAS_DESTACADAS_COLABORADORAS = [
  "Café La Palma",
  "Loco Club",
  "Harlem Jazz Club",
  "Cotton Club Bilbao",
  "Radio City",
  "Luz de Gas",
  "Marula Café",
  "Sala X",
  "Sala Clamores",
  "Intruso Bar",
  "Garaje Beat Club",
  "Milwaukee Puerto",
  "Tribeca Live",
  "Planta Baja",
  "Matisse Club",
  "Sala Even",
  "La Cueva del Jazz",
  "Sala Villanos",
  "Marearock",
  "Sala M100",
  "Independance Club",
  "La Cochera Cabaret",
  "Sala Galileo",
  "Alboroto Las Palmas",
  "Sala Repvblicca",
  "Moby Dick Club",
  "Jimmy Jazz",
  "Peter Rock Club",
  "Sala El Sol",
  "Círculo de Arte de Toledo",
  "Los Conciertos de la Muralla",
  "Teatro Eslava",
  "Rvbicón Bar",
  "Big Mama Ballroom",
  "Azkena Bilbo",
];

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

type ComentarioEventoUI = {
  id: string;
};

type EventoUI = {
  id: string;
  nombre: string;
  ciudad: string;
  fecha_inicio?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  imagen?: string | null;
  slug?: string | null;
  comentarios_eventos?: ComentarioEventoUI[];
};

type ComentarioEventoFotoUI = {
  id: string;
  texto?: string | null;
  foto?: string | null;
  created_at?: string | null;
  eventos?:
    | {
        nombre?: string | null;
        ciudad?: string | null;
        slug?: string | null;
        tipo?: string | null;
      }
    | {
        nombre?: string | null;
        ciudad?: string | null;
        slug?: string | null;
        tipo?: string | null;
      }[]
    | null;
};

type FotoRealUI = {
  id: string;
  origen: "evento" | "lugar";
  foto: string;
  texto: string;
  created_at?: string | null;
  nombre: string;
  ciudad: string;
  href: string;
  tipo?: string | null;
};

type HeroItemUI = {
  id: string;
  origen: "foto-lugar" | "foto-evento" | "evento-futuro";
  imagen: string;
  nombre: string;
  ciudad: string;
  href: string;
  tipo?: string | null;
  fecha_inicio?: string | null;
};

type FotoSeleccionada = {
  file: File;
  preview: string;
};

type SalaDestacadaUI = {
  nombre: string;
  logo?: string | null;
};

type PartnerExperienciaUI = {
  id: string;
  nombre: string;
  slug?: string | null;
  logo_url?: string | null;
  url: string;
  descripcion?: string | null;
  activo?: boolean | null;
  destacado?: boolean | null;
  orden?: number | null;
};

type MarcaColaboradoraUI = {
  id: string;
  nombre: string;
  slug: string;
  logo_url?: string | null;
  web_url?: string | null;
  descripcion?: string | null;
  descripcion_corta?: string | null;
  color?: string | null;
  activa?: boolean | null;
  destacada?: boolean | null;
  orden?: number | null;
};

function getEventoRelacionado(comentario: ComentarioEventoFotoUI) {
  if (Array.isArray(comentario.eventos)) {
    return comentario.eventos[0] || null;
  }

  return comentario.eventos || null;
}

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

function getTextoComentariosEvento(total?: number) {
  if (!total || total === 0) {
    return "💬 Sin comentarios todavía";
  }

  if (total === 1) {
    return "💬 1 comentario";
  }

  return `💬 ${total} comentarios`;
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
  const [eventosProximosHero, setEventosProximosHero] = useState<EventoUI[]>([]);
  const [indiceHero, setIndiceHero] = useState(0);
  const [totalEventosPublicados, setTotalEventosPublicados] = useState(0);
  const [comentariosEventosConFoto, setComentariosEventosConFoto] = useState<
    ComentarioEventoFotoUI[]
  >([]);
  const [salasDestacadasConLogo, setSalasDestacadasConLogo] = useState<
    SalaDestacadaUI[]
  >(
    SALAS_DESTACADAS_COLABORADORAS.map((nombre) => ({
      nombre,
      logo: null,
    }))
  );
  const [partnersExperiencias, setPartnersExperiencias] = useState<
    PartnerExperienciaUI[]
  >([]);
  const [marcasColaboradoras, setMarcasColaboradoras] = useState<
    MarcaColaboradoraUI[]
  >([]);
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
  const [busquedaCiudad, setBusquedaciudad] = useState("");
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

  const cargarTotalEventosPublicados = async () => {
    const { count, error } = await supabase
      .from("eventos")
      .select("id", { count: "exact", head: true })
      .eq("reportado", false);

    if (error) {
      console.error("Error cargando total de eventos:", error);
      return;
    }

    setTotalEventosPublicados(count || 0);
  };

  const cargarEventosHoy = async () => {
    const hoy = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("eventos")
      .select(`
        id,
        nombre,
        ciudad,
        fecha_inicio,
        descripcion,
        tipo,
        imagen,
        slug,
        comentarios_eventos ( id )
      `)
      .eq("fecha_inicio", hoy)
      .eq("reportado", false)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error cargando eventos de hoy:", error);
      return;
    }

    setEventosHoy(((data || []) as EventoUI[]).map((evento) => ({
      ...evento,
      comentarios_eventos: evento.comentarios_eventos || [],
    })));
  };

  const cargarEventosProximosHero = async () => {
    const hoy = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("eventos")
      .select(`
        id,
        nombre,
        ciudad,
        fecha_inicio,
        tipo,
        imagen,
        slug
      `)
      .gte("fecha_inicio", hoy)
      .eq("reportado", false)
      .not("imagen", "is", null)
      .order("fecha_inicio", { ascending: true })
      .limit(12);

    if (error) {
      console.error("Error cargando próximos eventos del hero:", error);
      return;
    }

    setEventosProximosHero((data || []) as EventoUI[]);
  };

  const cargarComentariosEventosConFoto = async () => {
    const { data, error } = await supabase
      .from("comentarios_eventos")
      .select(`
        id,
        texto,
        foto,
        created_at,
        eventos (
          nombre,
          ciudad,
          slug,
          tipo
        )
      `)
      .not("foto", "is", null)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error cargando fotos de comentarios de eventos:", error);
      return;
    }

    setComentariosEventosConFoto((data || []) as ComentarioEventoFotoUI[]);
  };

  const cargarLogosSalasDestacadas = async () => {
    const { data, error } = await supabase
      .from("colaboradores")
      .select("nombre, logo, logo_url")
      .in("nombre", SALAS_DESTACADAS_COLABORADORAS);

    if (error) {
      console.error("Error cargando logos de salas colaboradoras:", error);
      return;
    }

    const logosPorNombre = new Map<string, string | null>();

    for (const colaborador of data || []) {
      const nombre = colaborador.nombre as string | null;
      const logo =
        (colaborador.logo_url as string | null) ||
        (colaborador.logo as string | null) ||
        null;

      if (nombre) {
        logosPorNombre.set(nombre, logo);
      }
    }

    setSalasDestacadasConLogo(
      SALAS_DESTACADAS_COLABORADORAS.map((nombre) => ({
        nombre,
        logo: logosPorNombre.get(nombre) || null,
      }))
    );
  };

  const cargarPartnersExperiencias = async () => {
    const { data, error } = await supabase
      .from("partners_experiencias")
      .select("id, nombre, slug, logo_url, url, descripcion, activo, destacado, orden")
      .eq("activo", true)
      .eq("destacado", true)
      .order("orden", { ascending: true });

    if (error) {
      console.error("Error cargando partners de experiencias:", error);
      return;
    }

    setPartnersExperiencias((data || []) as PartnerExperienciaUI[]);
  };

  const cargarMarcasColaboradoras = async () => {
    const { data, error } = await supabase
      .from("marcas_colaboradoras")
      .select(
        "id, nombre, slug, logo_url, web_url, descripcion, descripcion_corta, color, activa, destacada, orden"
      )
      .eq("activa", true)
      .eq("destacada", true)
      .order("orden", { ascending: true });

    if (error) {
      console.error("Error cargando marcas colaboradoras:", error);
      return;
    }

    setMarcasColaboradoras((data || []) as MarcaColaboradoraUI[]);
  };

  useEffect(() => {
    cargarDatos();
    cargarTotalEventosPublicados();
    cargarEventosHoy();
    cargarEventosProximosHero();
    cargarComentariosEventosConFoto();
    cargarLogosSalasDestacadas();
    cargarPartnersExperiencias();
    cargarMarcasColaboradoras();
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
    }, comentariosEventosConFoto.length);
  }, [monumentos, comentariosEventosConFoto.length]);

  const fotosReales = useMemo<FotoRealUI[]>(() => {
    const fotosEventos: FotoRealUI[] = comentariosEventosConFoto
      .filter((comentario) => Boolean(comentario.foto))
      .map((comentario) => {
        const eventoRelacionado = getEventoRelacionado(comentario);
        const href = eventoRelacionado?.slug
          ? `/eventos/${eventoRelacionado.slug}`
          : "/eventos";

        return {
          id: `evento-${comentario.id}`,
          origen: "evento",
          foto: comentario.foto as string,
          texto: comentario.texto || "Foto subida por la comunidad.",
          created_at: comentario.created_at || null,
          nombre: eventoRelacionado?.nombre || "Plan de la comunidad",
          ciudad: eventoRelacionado?.ciudad || "Ciudad por confirmar",
          href,
          tipo: eventoRelacionado?.tipo || "Evento",
        };
      });

    const fotosLugares: FotoRealUI[] = monumentos.flatMap((monumento) =>
      monumento.resenas
        .filter((resena) => Boolean(resena.foto))
        .map((resena) => ({
          id: `lugar-${resena.id}`,
          origen: "lugar" as const,
          foto: resena.foto as string,
          texto: resena.comentario || "Foto subida por la comunidad.",
          created_at: resena.created_at || null,
          nombre: monumento.nombre,
          ciudad: monumento.ciudad,
          href: monumento.slug ? `/lugar/${monumento.slug}` : "/lugares",
          tipo: "Lugar",
        }))
    );

    return [...fotosEventos, ...fotosLugares]
      .sort((a, b) => {
        const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, 6);
  }, [comentariosEventosConFoto, monumentos]);

  const heroItems = useMemo<HeroItemUI[]>(() => {
    const itemsFotos: HeroItemUI[] = fotosReales.map((item) => ({
      id: `foto-${item.id}`,
      origen: item.origen === "lugar" ? "foto-lugar" : "foto-evento",
      imagen: item.foto,
      nombre: item.nombre,
      ciudad: item.ciudad,
      href: item.href,
      tipo: item.tipo || null,
      fecha_inicio: null,
    }));

    const itemsEventos: HeroItemUI[] = eventosProximosHero
      .filter((evento) => Boolean(evento.imagen))
      .map((evento) => ({
        id: `proximo-${evento.id}`,
        origen: "evento-futuro" as const,
        imagen: evento.imagen as string,
        nombre: evento.nombre,
        ciudad: evento.ciudad,
        href: evento.slug ? `/eventos/${evento.slug}` : "/eventos",
        tipo: evento.tipo || "Evento",
        fecha_inicio: evento.fecha_inicio || null,
      }));

    // Intercalamos fotos reales con eventos próximos para que el hero
    // enseñe comunidad + agenda futura y no se quede solo en lugares.
    const mezclados: HeroItemUI[] = [];
    const total = Math.max(itemsFotos.length, itemsEventos.length);

    for (let i = 0; i < total; i += 1) {
      if (itemsFotos[i]) mezclados.push(itemsFotos[i]);
      if (itemsEventos[i]) mezclados.push(itemsEventos[i]);
    }

    return mezclados;
  }, [fotosReales, eventosProximosHero]);

  const heroItemsVisibles = useMemo(() => {
    if (heroItems.length === 0) return [];

    const cantidad = Math.min(3, heroItems.length);
    return Array.from({ length: cantidad }, (_, offset) =>
      heroItems[(indiceHero + offset) % heroItems.length]
    );
  }, [heroItems, indiceHero]);

  useEffect(() => {
    if (heroItems.length <= 3) return;

    const interval = window.setInterval(() => {
      setIndiceHero((prev) => (prev + 1) % heroItems.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [heroItems.length]);

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

  const lugaresMasComentados = useMemo(() => {
    return [...monumentos]
      .filter((m) => m.resenas.length > 0)
      .sort((a, b) => {
        if (b.resenas.length !== a.resenas.length) {
          return b.resenas.length - a.resenas.length;
        }

        const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, 3);
  }, [monumentos]);

  const lugaresAlternativos = useMemo(() => {
    const palabrasClave = [
      "jardin",
      "jardín",
      "parque",
      "mirador",
      "capricho",
      "oeste",
      "retiro",
      "campo",
      "rio",
      "río",
    ];

    const filtrados = monumentos.filter((m) => {
      const texto = `${m.nombre} ${m.descripcion || ""}`.toLowerCase();
      return palabrasClave.some((palabra) => texto.includes(palabra));
    });

    const base = filtrados.length > 0 ? filtrados : monumentos;

    return [...base]
      .sort((a, b) => {
        const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return fechaB - fechaA;
      })
      .slice(0, 3);
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
      const baseNombre = limpiarNombreArchivo(
        nombreLugar || file.name || "lugar"
      );
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
        alert(
          `Error al guardar el lugar: ${error?.message || "Error desconocido"}`
        );
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
    <main className="min-h-screen overflow-hidden bg-[#fffaf5] text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-orange-100/80 bg-gradient-to-b from-amber-50 via-orange-50/80 to-[#fffaf5]">
        <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-24 -z-10 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-12 sm:px-6 md:pb-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm backdrop-blur">
              <span>🔥 Planes reales</span>
              <span className="text-orange-300">•</span>
              <span>📸 Fotos de la comunidad</span>
              <span className="text-orange-300">•</span>
              <span>💬 Opiniones útiles</span>
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl">
              Qué hacer hoy y qué sitio
              <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                merece la pena de verdad.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Lugares Llenos junta planes, lugares, fotos y experiencias reales para
              ayudarte a decidir mejor: qué ambiente hay, cuándo ir y qué alternativa
              tienes cerca si el plan no convence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#hoy-mismo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span>🔥</span>
                <span>Ver qué hacer hoy</span>
              </a>

              <a
                href="#asi-estan-los-planes"
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3.5 font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700"
              >
                <span>👀</span>
                <span>Ver fotos reales</span>
              </a>

              <Link
                href="/participa"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <span>＋</span>
                <span>Compartir un plan</span>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 sm:text-sm">
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-2">📍 Toda España</span>
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-2">🧭 Ideas para hoy</span>
              <span className="rounded-full border border-orange-100 bg-white/80 px-3 py-2">🤝 Comunidad + colaboradores</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[42px] bg-gradient-to-br from-orange-200/50 via-amber-100/30 to-rose-100/50 blur-2xl" />

            {heroItemsVisibles.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {heroItemsVisibles.map((item, index) => {
                  const esEventoFuturo = item.origen === "evento-futuro";
                  const fechaEvento = item.fecha_inicio
                    ? new Date(`${item.fecha_inicio}T12:00:00`).toLocaleDateString(
                        "es-ES",
                        { day: "numeric", month: "short" }
                      )
                    : null;

                  return (
                    <Link
                      key={`hero-${index}-${item.id}`}
                      href={item.href}
                      className={`group relative overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-xl shadow-orange-100/70 transition hover:-translate-y-0.5 ${
                        index === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"
                      }`}
                    >
                      <img
                        src={item.imagen}
                        alt={
                          esEventoFuturo
                            ? `Cartel de ${item.nombre}`
                            : `Foto real de ${item.nombre}`
                        }
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent" />

                      <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold text-slate-800 shadow-sm backdrop-blur">
                          {esEventoFuturo ? "🗓️ Próximo plan" : "📸 Foto real"}
                        </span>
                        <span className="rounded-full bg-orange-500/95 px-3 py-1 text-[11px] font-extrabold text-white shadow-sm backdrop-blur">
                          {esEventoFuturo
                            ? `🎟️ ${item.tipo || "Evento"}`
                            : item.origen === "foto-lugar"
                            ? "📍 Lugar"
                            : "🎟️ Evento"}
                        </span>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <p className="line-clamp-1 text-sm font-black sm:text-lg">
                          {item.nombre}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-white/85 sm:text-sm">
                          <span>📍 {item.ciudad}</span>
                          {esEventoFuturo && fechaEvento && (
                            <span>· 📅 {fechaEvento}</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="flex min-h-[430px] items-end overflow-hidden rounded-[34px] border border-orange-100 bg-gradient-to-br from-orange-300 via-amber-200 to-rose-200 p-6 shadow-xl shadow-orange-100">
                <div className="max-w-md rounded-3xl bg-white/85 p-6 backdrop-blur">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-600">👀 Así se vive</p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950">Fotos reales y próximos planes.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Aquí irán rotando las últimas fotos de la comunidad y eventos futuros con cartel para descubrir qué hacer después.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MÉTRICAS COMPACTAS */}
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="grid overflow-hidden rounded-[30px] border border-orange-100 bg-white/95 shadow-lg shadow-orange-100/70 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-b border-orange-100 p-5 sm:border-r lg:border-b-0">
              <p className="text-3xl font-black tracking-tight text-slate-950">{cargando ? "…" : monumentos.length}</p>
              <p className="mt-1 text-sm font-bold text-slate-600">📍 Lugares compartidos</p>
            </div>
            <div className="border-b border-orange-100 p-5 lg:border-b-0 lg:border-r">
              <p className="text-3xl font-black tracking-tight text-slate-950">{totalEventosPublicados || "…"}</p>
              <p className="mt-1 text-sm font-bold text-slate-600">🎟️ Eventos publicados</p>
            </div>
            <div className="border-b border-orange-100 p-5 sm:border-b-0 sm:border-r">
              <p className="text-3xl font-black tracking-tight text-slate-950">{cargando ? "…" : totalFotos}</p>
              <p className="mt-1 text-sm font-bold text-slate-600">📸 Fotos en la plataforma</p>
            </div>
            <div className="p-5">
              <p className="text-3xl font-black tracking-tight text-slate-950">{cargando ? "…" : totalComentarios}</p>
              <p className="mt-1 text-sm font-bold text-slate-600">💬 Experiencias contadas</p>
            </div>
          </div>
        </div>

        {/* CONFIANZA RÁPIDA: SALAS COLABORADORAS */}
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
          <div className="overflow-hidden rounded-[30px] border border-orange-100 bg-white/90 shadow-sm shadow-orange-100/60">
            <div className="flex flex-col gap-4 border-b border-orange-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">🤝 Confían en Lugares Llenos</p>
                <p className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                  {SALAS_DESTACADAS_COLABORADORAS.length} salas ya comparten su programación con la comunidad
                </p>
              </div>
              <Link
                href="/colaboradores"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-black text-orange-700 transition hover:bg-orange-100"
              >
                Ver todas <span>→</span>
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {salasDestacadasConLogo.slice(0, 12).map((sala) => (
                <Link
                  key={`confianza-${sala.nombre}`}
                  href="/colaboradores"
                  className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700 hover:shadow-md"
                >
                  {sala.logo ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-100 bg-white p-1">
                      <img
                        src={sala.logo}
                        alt={`Logo ${sala.nombre}`}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-xs">🎵</span>
                  )}
                  <span className="whitespace-nowrap">{sala.nombre}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOTOS REALES: AHORA MUCHO MÁS ARRIBA */}
      <section id="asi-estan-los-planes" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">📸 Fotos reales</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">👀 Así están los planes ahora</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Imágenes subidas por la comunidad en lugares y eventos. Menos foto perfecta y más contexto real antes de decidir.
            </p>
          </div>
          <Link
            href="/buscar"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-sm font-bold text-orange-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50"
          >
            Explorar más <span>→</span>
          </Link>
        </div>

        {fotosReales.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {fotosReales.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={`group overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100 ${
                  index === 0 ? "md:col-span-2 xl:col-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${index === 0 ? "h-72 sm:h-80" : "h-56"}`}>
                  <img
                    src={item.foto}
                    alt={`Foto real de ${item.nombre}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold text-slate-800 shadow-sm backdrop-blur">📸 Foto real</span>
                    <span className="rounded-full bg-orange-500/90 px-3 py-1 text-xs font-extrabold text-white shadow-sm backdrop-blur">
                      {item.origen === "lugar" ? "📍 Lugar" : item.tipo || "🎟️ Evento"}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className={`${index === 0 ? "text-2xl sm:text-3xl" : "text-xl"} line-clamp-2 font-black leading-tight text-slate-950`}>
                    {item.nombre}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-slate-500">📍 {item.ciudad}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">“{item.texto}”</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-600">
                    <span>{item.origen === "lugar" ? "Ver lugar" : "Ver evento"}</span>
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[30px] border border-dashed border-orange-200 bg-orange-50/70 p-8 text-center">
            <p className="text-3xl">📷</p>
            <h3 className="mt-3 text-xl font-black text-slate-900">Todavía no hay fotos recientes para mostrar</h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">Entra en una ficha de lugar o evento y sube una foto para ayudar a la siguiente persona a decidir.</p>
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-bold text-orange-800">
          💡 Si estás en un lugar o evento, una foto actual puede ayudar más que diez descripciones.
        </div>
      </section>

      {/* QUÉ HACER HOY */}
      <section id="hoy-mismo" className="border-y border-orange-100 bg-white/70 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">🔥 Hoy mismo</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Qué hacer hoy sin darle demasiadas vueltas</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Planes rápidos para entrar, comparar y decidir en pocos segundos.</p>
            </div>
            <Link href="/eventos" className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
              Todos los eventos <span>→</span>
            </Link>
          </div>

          {eventosHoy.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {eventosHoy.map((evento) => {
                const hrefEvento = evento.slug ? `/eventos/${evento.slug}` : "/eventos";
                const totalComentariosEvento = evento.comentarios_eventos?.length || 0;

                return (
                  <Link
                    key={evento.id}
                    href={hrefEvento}
                    className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100"
                  >
                    {evento.imagen ? (
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img src={evento.imagen} alt={evento.nombre} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white shadow-sm">HOY</span>
                      </div>
                    ) : (
                      <div className="flex h-40 items-end bg-gradient-to-br from-orange-300 via-amber-200 to-rose-200 p-5">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-orange-700">🔥 HOY</span>
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {evento.tipo && <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-extrabold text-orange-700">{evento.tipo}</span>}
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">{getTextoComentariosEvento(totalComentariosEvento)}</span>
                      </div>
                      <h3 className="mt-4 line-clamp-2 text-xl font-black leading-tight text-slate-950">{evento.nombre}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-500">📍 {evento.ciudad}</p>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{evento.descripcion || "Plan publicado para hoy en la comunidad."}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-600">Ver evento <span className="transition group-hover:translate-x-1">→</span></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[30px] border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-7">
                <p className="text-3xl">🗓️</p>
                <h3 className="mt-3 text-2xl font-black text-slate-950">No hay planes de hoy destacados en este bloque</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">La agenda completa tiene muchos más eventos próximos. Entra y filtra por ciudad o fecha.</p>
              </div>
              <Link href="/eventos" className="flex min-h-[190px] flex-col justify-between rounded-[30px] bg-slate-950 p-7 text-white transition hover:-translate-y-1">
                <span className="text-4xl">🎟️</span>
                <div>
                  <p className="text-xl font-black">Abrir agenda completa</p>
                  <p className="mt-2 text-sm text-slate-300">Conciertos, festivales, ferias y más →</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CÓMO FUNCIONA / PROPUESTA DE VALOR */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-7 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">⚡ En menos de un minuto</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">Decidir un plan debería ser más fácil</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">Tres señales rápidas para saber si ese sitio o evento encaja contigo antes de salir de casa.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <a href="#asi-estan-los-planes" className="group rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">📸</div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-blue-600">01 · Mira</p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Ve cómo está ahora</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Fotos reales y recientes para entender ambiente, aforo o tipo de público.</p>
            <span className="mt-5 inline-flex text-sm font-black text-orange-600">Ver fotos <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
          </a>

          <a href="#comentado" className="group rounded-[30px] border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-2xl">💬</div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-rose-600">02 · Comprueba</p>
            <h3 className="mt-2 text-xl font-black text-slate-950">Lee experiencias reales</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Consejos sobre horarios, colas, ambiente y detalles que una ficha turística no suele contar.</p>
            <span className="mt-5 inline-flex text-sm font-black text-orange-600">Ver comunidad <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
          </a>

          <a href="#alternativas" className="group rounded-[30px] border border-orange-100 bg-slate-950 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">🧭</div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-orange-300">03 · Decide</p>
            <h3 className="mt-2 text-xl font-black">Ten siempre un plan B</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Si está demasiado lleno o no te convence, descubre rincones y alternativas cercanas.</p>
            <span className="mt-5 inline-flex text-sm font-black text-orange-300">Descubrir alternativas <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
          </a>
        </div>
      </section>

      {/* MÁS COMENTADOS */}
      {lugaresMasComentados.length > 0 && (
        <section id="comentado" className="bg-slate-950 py-12 text-white md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">💬 Lo más comentado</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Sitios donde la comunidad ya está dejando señales</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">Empieza por lugares con experiencias reales para tener más contexto antes de ir.</p>
              </div>
              <a href="#lugares" className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/15">Ver todos <span>→</span></a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {lugaresMasComentados.map((lugar) => {
                const hrefLugar = lugar.slug ? `/lugar/${lugar.slug}` : "#";
                const imagenCard = lugar.imagen || lugar.fotosLugar[0] || lugar.resenas.find((r) => r.foto)?.foto || null;
                return (
                  <Link key={lugar.id} href={hrefLugar} className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10">
                    {imagenCard ? (
                      <div className="relative h-52 overflow-hidden">
                        <img src={imagenCard} alt={lugar.nombre} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
                      </div>
                    ) : (
                      <div className="h-52 bg-gradient-to-br from-orange-500/40 via-amber-400/20 to-rose-500/30" />
                    )}
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-orange-400/15 px-3 py-1 text-xs font-black text-orange-200">💬 {lugar.resenas.length} comentario{lugar.resenas.length !== 1 ? "s" : ""}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-amber-200">⭐ {lugar.rating ?? "Sin nota"}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-black leading-tight">{lugar.nombre}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-400">📍 {lugar.ciudad}</p>
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-300">{lugar.descripcion || "Lugar compartido por la comunidad con experiencias reales."}</p>
                      <span className="mt-5 inline-flex text-sm font-black text-orange-300">Ver ficha <span className="ml-2 transition group-hover:translate-x-1">→</span></span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BUSCADOR */}
      <section id="buscador" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="relative overflow-hidden rounded-[34px] border border-orange-100 bg-gradient-to-br from-white via-orange-50 to-amber-50 p-6 shadow-xl shadow-orange-100/60 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-300/20 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">🔎 Encuentra tu siguiente sitio</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Buscar lugares y ciudades</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Filtra la comunidad por nombre o ciudad y salta directamente a lo que te interesa.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-white p-2 shadow-sm">
                <div className="flex items-center gap-3 px-3">
                  <span className="text-xl">📍</span>
                  <input type="text" value={busquedaNombre} onChange={(e) => setBusquedaNombre(e.target.value)} placeholder="Buscar lugar..." className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                </div>
              </div>
              <div className="rounded-2xl border border-orange-100 bg-white p-2 shadow-sm">
                <div className="flex items-center gap-3 px-3">
                  <span className="text-xl">🏙️</span>
                  <input type="text" value={busquedaCiudad} onChange={(e) => setBusquedaciudad(e.target.value)} placeholder="Buscar ciudad..." className="w-full bg-transparent py-3 outline-none placeholder:text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ÚLTIMAS EXPERIENCIAS */}
      {ultimosAportes.length > 0 && (
        <section id="ultimos-aportes" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">🗣️ La comunidad habla</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Últimas experiencias contadas</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {ultimosAportes.map((aporte) => (
              <div key={aporte.id} className="rounded-[28px] border border-orange-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  {aporte.foto ? (
                    <img src={aporte.foto} alt={aporte.usuario} className="h-14 w-14 rounded-2xl object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-lg font-black text-white">{aporte.usuario.charAt(0).toUpperCase()}</div>
                  )}
                  <div>
                    <p className="font-black text-slate-950">{aporte.usuario}</p>
                    <p className="text-sm font-medium text-slate-500">📍 {aporte.lugar}, {aporte.ciudad}</p>
                  </div>
                </div>
                <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-700">“{aporte.comentario || "Compartió su experiencia con la comunidad."}”</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ALTERNATIVAS */}
      {lugaresAlternativos.length > 0 && (
        <section id="alternativas" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:pb-16">
          <div className="rounded-[34px] border border-orange-100 bg-gradient-to-br from-emerald-50 via-white to-orange-50 p-6 sm:p-8">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-600">🧭 Plan B inteligente</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Rincones para ir con menos agobio</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">Parques, miradores y lugares que pueden ser mejor idea que el plan típico.</p>
              </div>
              <a href="#lugares" className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-bold text-emerald-700 shadow-sm">Ver más lugares →</a>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {lugaresAlternativos.map((lugar) => {
                const hrefLugar = lugar.slug ? `/lugar/${lugar.slug}` : "#";
                const imagenCard = lugar.imagen || lugar.fotosLugar[0] || lugar.resenas.find((r) => r.foto)?.foto || null;
                return (
                  <Link key={lugar.id} href={hrefLugar} className="group overflow-hidden rounded-[26px] border border-white bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    {imagenCard ? <img src={imagenCard} alt={lugar.nombre} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="h-48 bg-gradient-to-br from-emerald-200 via-amber-100 to-orange-200" />}
                    <div className="p-5">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">🌿 Alternativa</span>
                      <h3 className="mt-4 text-xl font-black text-slate-950">{lugar.nombre}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-500">📍 {lugar.ciudad}</p>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{lugar.descripcion || "Una alternativa compartida por la comunidad."}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COLABORADORES, MARCAS Y PARTNERS: MÁS COMPACTOS */}
      <section className="border-y border-orange-100 bg-white/80 py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">🤝 Ecosistema Lugares Llenos</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Espacios y marcas que ya están dentro</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Programación directa de salas, colaboraciones y partners para completar la experiencia.</p>
          </div>

          {marcasColaboradoras.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h3 className="text-lg font-black text-slate-950">✨ Marcas colaboradoras</h3>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {marcasColaboradoras.map((marca) => (
                  <Link key={marca.id} href={marca.slug ? `/marcas/${marca.slug}` : marca.web_url || "#"} className="flex min-w-[250px] shrink-0 items-center gap-4 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 transition hover:bg-orange-100">
                    {marca.logo_url ? <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-sm"><img src={marca.logo_url} alt={`Logo ${marca.nombre}`} className="h-full w-full object-contain" /></span> : <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl">🤝</span>}
                    <span><span className="block font-black text-slate-900">{marca.nombre}</span>{marca.descripcion_corta && <span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-500">{marca.descripcion_corta}</span>}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black text-slate-950">🎵 {SALAS_DESTACADAS_COLABORADORAS.length} salas colaboradoras</h3>
              <Link href="/colaboradores" className="text-sm font-black text-orange-600">Ver colaboradores →</Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {salasDestacadasConLogo.map((sala) => (
                <Link key={sala.nombre} href="/colaboradores" className="inline-flex shrink-0 items-center gap-3 rounded-full border border-orange-100 bg-white px-4 py-2.5 text-sm font-black text-slate-800 shadow-sm transition hover:border-orange-200 hover:text-orange-700">
                  {sala.logo ? <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-orange-100 bg-white p-1"><img src={sala.logo} alt={`Logo ${sala.nombre}`} className="h-full w-full object-contain" /></span> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">🎵</span>}
                  <span>{sala.nombre}</span>
                </Link>
              ))}
            </div>
          </div>

          {partnersExperiencias.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-black text-slate-950">🌍 Partners de experiencias</h3>
              <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {partnersExperiencias.map((partner) => (
                  <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer sponsored" className="flex min-w-[240px] shrink-0 items-center gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:bg-orange-50">
                    {partner.logo_url ? <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2"><img src={partner.logo_url} alt={`Logo ${partner.nombre}`} className="h-full w-full object-contain" /></span> : <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">🌍</span>}
                    <span><span className="block font-black text-slate-900">{partner.nombre}</span>{partner.descripcion && <span className="mt-1 block line-clamp-2 text-xs leading-5 text-slate-500">{partner.descripcion}</span>}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="lugares" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">📍 Explora lugares</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
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
                🚀 Haz crecer la comunidad
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
              <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">📸 Tu experiencia cuenta</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
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
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-500">🗺️ Explora visualmente</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Mapa de lugares</h2>
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

      <details className="group fixed bottom-5 right-4 z-50 sm:bottom-6 sm:right-6">
        <div className="absolute bottom-[calc(100%+0.8rem)] right-0 w-[min(290px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-orange-100 bg-white/95 p-2 shadow-2xl shadow-slate-900/20 backdrop-blur-xl">
          <div className="px-3 pb-2 pt-2">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              ✨ Añade algo a la comunidad
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              ¿Quieres contar un plan o compartir un lugar?
            </p>
          </div>

          <Link
            href="/participa"
            className="group/item flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-orange-50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-xl text-white shadow-sm">
              🎟️
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-slate-900 group-hover/item:text-orange-700">
                Compartir un plan
              </span>
              <span className="mt-0.5 block text-xs leading-4 text-slate-500">
                Evento, concierto, feria o cualquier plan interesante.
              </span>
            </span>
            <span className="text-orange-500">→</span>
          </Link>

          <a
            href="#participa"
            className="group/item mt-1 flex items-center gap-3 rounded-2xl px-3 py-3 transition hover:bg-orange-50"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white shadow-sm">
              📍
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-black text-slate-900 group-hover/item:text-orange-700">
                Compartir un lugar
              </span>
              <span className="mt-0.5 block text-xs leading-4 text-slate-500">
                Un rincón, monumento o sitio que merezca la pena.
              </span>
            </span>
            <span className="text-orange-500">→</span>
          </a>
        </div>

        <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/30 bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3.5 font-black text-white shadow-2xl shadow-orange-300/60 transition hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 [&::-webkit-details-marker]:hidden">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-lg leading-none transition-transform duration-200 group-open:rotate-45">
            ＋
          </span>
          <span className="whitespace-nowrap text-sm sm:text-base">Compartir un plan</span>
        </summary>
      </details>
    </main>
  );
}