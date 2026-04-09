"use client";

import { useMemo, useState } from "react";

type Reseña = {
  usuario: string;
  comentario: string;
  observaciones: string;
  foto?: string;
};

type Monumento = {
  nombre: string;
  ciudad: string;
  rating: number;
  precio: string;
  mascotas: string;
  aparcamiento: string;
  imagen: string;
  imagenFallback: string;
  descripcion: string;
  reseñas: Reseña[];
};

const monumentosIniciales: Monumento[] = [
  {
    nombre: "Alhambra",
    ciudad: "Granada",
    rating: 4.8,
    precio: "Desde 19€",
    mascotas: "No mascotas",
    aparcamiento: "Sí aparcamiento cerca",
    imagen:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra%20-%20Granada.jpg",
    imagenFallback:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra%20Granada%20Spain.jpg",
    descripcion:
      "Un conjunto monumental único con palacios, jardines y vistas espectaculares.",
    reseñas: [
      {
        usuario: "Lucía",
        comentario:
          "Impresionante. Merece muchísimo la pena ir con tiempo para verlo bien.",
        observaciones: "Conviene reservar entrada con antelación.",
      },
      {
        usuario: "Carlos",
        comentario:
          "Muy bonito y muy cuidado. Las vistas al atardecer son increíbles.",
        observaciones: "Hay bastantes cuestas, mejor ir con calzado cómodo.",
      },
    ],
  },
  {
    nombre: "Sagrada Familia",
    ciudad: "Barcelona",
    rating: 4.9,
    precio: "Desde 26€",
    mascotas: "No mascotas",
    aparcamiento: "No aparcamiento cerca",
    imagen:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada%20familia.jpg",
    imagenFallback:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Sagrada%20Fam%C3%ADlia.jpg",
    descripcion:
      "Una basílica icónica con una arquitectura espectacular y una luz interior increíble.",
    reseñas: [
      {
        usuario: "Marina",
        comentario:
          "Por dentro es todavía más impresionante que por fuera. Una pasada.",
        observaciones: "Hay bastante gente casi siempre.",
      },
    ],
  },
  {
    nombre: "Acueducto de Segovia",
    ciudad: "Segovia",
    rating: 4.7,
    precio: "Gratis",
    mascotas: "Sí mascotas",
    aparcamiento: "Sí aparcamiento cerca",
    imagen:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Acueducto%20de%20Segovia%2001.jpg",
    imagenFallback:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Acueducto%20de%20Segovia%20-%2021.jpg",
    descripcion:
      "Uno de los monumentos romanos mejor conservados y más emblemáticos de España.",
    reseñas: [
      {
        usuario: "Javier",
        comentario: "Muy recomendable, sobre todo al atardecer.",
        observaciones: "Se visita rápido y luego puedes pasear por la ciudad.",
      },
    ],
  },
  {
    nombre: "Teatro Romano de Mérida",
    ciudad: "Mérida",
    rating: 4.6,
    precio: "Gratis o desde 12€",
    mascotas: "No mascotas",
    aparcamiento: "Sí aparcamiento cerca",
    imagen:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Teatro%20romano%20de%20M%C3%A9rida.%20Espa%C3%B1a.jpg",
    imagenFallback:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Merida-Teatro%20Romano.jpg",
    descripcion:
      "Un espacio histórico espectacular donde todavía se celebran eventos culturales.",
    reseñas: [
      {
        usuario: "Ana",
        comentario:
          "Precioso y con muchísima historia. Se siente muy especial estar allí.",
        observaciones: "Muy buena visita si te gusta la historia.",
      },
    ],
  },
];

function AvatarReseña({
  usuario,
  foto,
}: {
  usuario: string;
  foto?: string;
}) {
  const [errorFoto, setErrorFoto] = useState(false);

  const inicial = usuario.trim().charAt(0).toUpperCase() || "U";

  if (!foto || errorFoto) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-400 text-lg font-bold text-white shadow-sm">
        {inicial}
      </div>
    );
  }

  return (
    <img
      src={foto}
      alt={usuario}
      className="h-14 w-14 rounded-2xl object-cover"
      onError={() => setErrorFoto(true)}
    />
  );
}

function ImagenMonumento({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [fuenteActual, setFuenteActual] = useState(src);
  const [falloPrincipal, setFalloPrincipal] = useState(false);

  return (
    <img
      src={fuenteActual}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => {
        if (!falloPrincipal) {
          setFuenteActual(fallback);
          setFalloPrincipal(true);
        }
      }}
    />
  );
}

export default function Home() {
  const [lista, setLista] = useState<Monumento[]>(monumentosIniciales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [busquedaNombre, setBusquedaNombre] = useState("");
  const [busquedaCiudad, setBusquedaCiudad] = useState("");

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rating, setRating] = useState("");
  const [precio, setPrecio] = useState("");
  const [mascotas, setMascotas] = useState("Sí mascotas");
  const [aparcamiento, setAparcamiento] = useState("Sí aparcamiento cerca");
  const [imagen, setImagen] = useState("");
  const [imagenFallback, setImagenFallback] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [reseñaAbierta, setReseñaAbierta] = useState<string | null>(null);
  const [usuarioReseña, setUsuarioReseña] = useState("");
  const [comentarioReseña, setComentarioReseña] = useState("");
  const [observacionesReseña, setObservacionesReseña] = useState("");
  const [fotoReseña, setFotoReseña] = useState("");

  const monumentosFiltrados = useMemo(() => {
    return lista.filter((m) => {
      const coincideNombre = m.nombre
        .toLowerCase()
        .includes(busquedaNombre.toLowerCase());

      const coincideCiudad = m.ciudad
        .toLowerCase()
        .includes(busquedaCiudad.toLowerCase());

      return coincideNombre && coincideCiudad;
    });
  }, [lista, busquedaNombre, busquedaCiudad]);

  const añadirMonumento = () => {
    if (!nombre.trim() || !ciudad.trim() || !rating.trim() || !precio.trim()) {
      alert("Por favor, completa nombre, ciudad, valoración y precio.");
      return;
    }

    const ratingNumero = Number(rating);

    if (Number.isNaN(ratingNumero) || ratingNumero < 0 || ratingNumero > 5) {
      alert("La valoración debe ser un número entre 0 y 5.");
      return;
    }

    const nuevaImagen =
      imagen.trim() ||
      "https://commons.wikimedia.org/wiki/Special:FilePath/Alhambra%20-%20Granada.jpg";

    const nuevaImagenFallback =
      imagenFallback.trim() ||
      nuevaImagen;

    const nuevo: Monumento = {
      nombre: nombre.trim(),
      ciudad: ciudad.trim(),
      rating: ratingNumero,
      precio: precio.trim(),
      mascotas,
      aparcamiento,
      imagen: nuevaImagen,
      imagenFallback: nuevaImagenFallback,
      descripcion:
        descripcion.trim() ||
        "Un lugar muy interesante para descubrir y compartir con la comunidad.",
      reseñas: [],
    };

    setLista([nuevo, ...lista]);

    setNombre("");
    setCiudad("");
    setRating("");
    setPrecio("");
    setMascotas("Sí mascotas");
    setAparcamiento("Sí aparcamiento cerca");
    setImagen("");
    setImagenFallback("");
    setDescripcion("");
    setMostrarFormulario(false);
  };

  const añadirReseña = (nombreMonumento: string) => {
    if (!usuarioReseña.trim() || !comentarioReseña.trim()) {
      alert("Por favor, escribe tu nombre y tu comentario.");
      return;
    }

    const nuevaReseña: Reseña = {
      usuario: usuarioReseña.trim(),
      comentario: comentarioReseña.trim(),
      observaciones: observacionesReseña.trim() || "Sin observaciones añadidas.",
      foto: fotoReseña.trim() || undefined,
    };

    setLista((prev) =>
      prev.map((m) =>
        m.nombre === nombreMonumento
          ? { ...m, reseñas: [nuevaReseña, ...m.reseñas] }
          : m
      )
    );

    setUsuarioReseña("");
    setComentarioReseña("");
    setObservacionesReseña("");
    setFotoReseña("");
    setReseñaAbierta(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-orange-500">
              Marca española de monumentos
            </p>
            <h1 className="mt-1 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
              Monumentos Llenos
            </h1>
            <p className="text-sm text-slate-600">
              Descubre, valora y comparte monumentos de España
            </p>
          </div>

          <nav className="flex gap-4 text-sm font-medium text-slate-700">
            <a href="#" className="transition hover:text-orange-600">
              Inicio
            </a>
            <a href="#monumentos" className="transition hover:text-orange-600">
              Monumentos
            </a>
            <a href="#buscador" className="transition hover:text-orange-600">
              Buscar
            </a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_30%)]" />

        <div className="max-w-4xl">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-7xl">
            Descubre monumentos increíbles de forma fácil, clara y bonita
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
            Consulta precios, valoraciones, acceso con mascotas, aparcamiento y
            opiniones de visitantes. Explora lugares, comparte reseñas y añade
            nuevas fotos e impresiones.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#monumentos"
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
            >
              Explorar monumentos
            </a>

            <button
              onClick={() => setMostrarFormulario((prev) => !prev)}
              className="rounded-full border border-orange-200 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
            >
              {mostrarFormulario ? "Cerrar formulario" : "Añadir monumento"}
            </button>
          </div>
        </div>
      </section>

      <section id="buscador" className="mx-auto max-w-6xl px-6 pb-12">
        <div className="rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-lg shadow-orange-100">
          <h3 className="text-2xl font-bold text-slate-900">
            Buscar monumentos
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Filtra por nombre del monumento o por ciudad.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={busquedaNombre}
              onChange={(e) => setBusquedaNombre(e.target.value)}
              placeholder="Buscar monumento..."
              className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={busquedaCiudad}
              onChange={(e) => setBusquedaCiudad(e.target.value)}
              placeholder="Buscar ciudad..."
              className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>
      </section>

      {mostrarFormulario && (
        <section className="mx-auto max-w-6xl px-6 pb-12">
          <div className="rounded-3xl border border-orange-100 bg-white/95 p-6 shadow-lg shadow-orange-100">
            <h3 className="text-2xl font-bold text-slate-900">
              Añadir nuevo monumento
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Puedes añadir nombre, ciudad, imagen principal, imagen de respaldo
              y una pequeña descripción.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del monumento"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                placeholder="Ciudad"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Valoración de 0 a 5"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <input
                type="text"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Precio"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

              <select
                value={mascotas}
                onChange={(e) => setMascotas(e.target.value)}
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              >
                <option value="Sí mascotas">Sí mascotas</option>
                <option value="No mascotas">No mascotas</option>
              </select>

              <select
                value={aparcamiento}
                onChange={(e) => setAparcamiento(e.target.value)}
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              >
                <option value="Sí aparcamiento cerca">
                  Sí aparcamiento cerca
                </option>
                <option value="No aparcamiento cerca">
                  No aparcamiento cerca
                </option>
              </select>

              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                placeholder="URL imagen principal (Wikimedia)"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 md:col-span-2"
              />

              <input
                type="text"
                value={imagenFallback}
                onChange={(e) => setImagenFallback(e.target.value)}
                placeholder="URL imagen alternativa del mismo monumento"
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 md:col-span-2"
              />

              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción del monumento"
                rows={4}
                className="w-full rounded-2xl border border-orange-100 px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 md:col-span-2"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={añadirMonumento}
                className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-200 transition hover:scale-[1.02]"
              >
                Guardar monumento
              </button>

              <button
                onClick={() => setMostrarFormulario(false)}
                className="rounded-full border border-orange-200 bg-white px-6 py-3.5 font-semibold text-slate-800 transition hover:bg-orange-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      )}

      <section id="monumentos" className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-3xl font-bold text-slate-900">
              Monumentos destacados
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Explora lugares recomendados por la comunidad.
            </p>
          </div>

          <div className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            {monumentosFiltrados.length} resultado(s)
          </div>
        </div>

        {monumentosFiltrados.length === 0 ? (
          <div className="rounded-3xl border border-orange-100 bg-white p-6 text-slate-600 shadow-sm">
            No se han encontrado monumentos con esa búsqueda.
          </div>
        ) : (
          <div className="grid gap-8">
            {monumentosFiltrados.map((m, index) => (
              <div
                key={`${m.nombre}-${index}`}
                className="overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-lg shadow-orange-100"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative min-h-[280px]">
                    <ImagenMonumento
                      src={m.imagen}
                      fallback={m.imagenFallback}
                      alt={m.nombre}
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                          {m.ciudad}
                        </p>
                        <h4 className="mt-2 text-3xl font-bold text-slate-900">
                          {m.nombre}
                        </h4>
                      </div>

                      <div className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                        ⭐ {m.rating}
                      </div>
                    </div>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {m.descripcion}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Precio</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          💶 {m.precio}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Mascotas</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          🐶 {m.mascotas}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-orange-50 px-4 py-3 text-sm">
                        <p className="text-slate-500">Aparcamiento</p>
                        <p className="mt-1 font-semibold text-slate-900">
                          🚗 {m.aparcamiento}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <h5 className="text-xl font-bold text-slate-900">
                        Reseñas de visitantes
                      </h5>

                      <button
                        onClick={() =>
                          setReseñaAbierta(
                            reseñaAbierta === m.nombre ? null : m.nombre
                          )
                        }
                        className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        {reseñaAbierta === m.nombre
                          ? "Cerrar reseña"
                          : "Añadir reseña"}
                      </button>
                    </div>

                    {reseñaAbierta === m.nombre && (
                      <div className="mt-5 rounded-3xl border border-orange-100 bg-orange-50/50 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                          <input
                            type="text"
                            value={usuarioReseña}
                            onChange={(e) => setUsuarioReseña(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
                          />

                          <input
                            type="text"
                            value={fotoReseña}
                            onChange={(e) => setFotoReseña(e.target.value)}
                            placeholder="URL de tu foto (opcional)"
                            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
                          />

                          <textarea
                            value={comentarioReseña}
                            onChange={(e) =>
                              setComentarioReseña(e.target.value)
                            }
                            placeholder="¿Qué te ha parecido el monumento?"
                            rows={4}
                            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none md:col-span-2"
                          />

                          <textarea
                            value={observacionesReseña}
                            onChange={(e) =>
                              setObservacionesReseña(e.target.value)
                            }
                            placeholder="Observaciones útiles para otros visitantes"
                            rows={3}
                            className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none md:col-span-2"
                          />
                        </div>

                        <button
                          onClick={() => añadirReseña(m.nombre)}
                          className="mt-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-3 font-semibold text-white shadow-md"
                        >
                          Publicar reseña
                        </button>
                      </div>
                    )}

                    <div className="mt-6 grid gap-4">
                      {m.reseñas.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-orange-200 p-4 text-sm text-slate-500">
                          Todavía no hay reseñas para este monumento.
                        </div>
                      ) : (
                        m.reseñas.map((r, reseñaIndex) => (
                          <div
                            key={`${m.nombre}-reseña-${reseñaIndex}`}
                            className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm"
                          >
                            <div className="flex items-start gap-4">
                              <AvatarReseña usuario={r.usuario} foto={r.foto} />

                              <div className="flex-1">
                                <p className="font-bold text-slate-900">
                                  {r.usuario}
                                </p>
                                <p className="mt-1 text-slate-600">
                                  {r.comentario}
                                </p>
                                <p className="mt-3 rounded-2xl bg-orange-50 px-3 py-2 text-sm text-slate-600">
                                  <span className="font-semibold text-slate-800">
                                    Observaciones:
                                  </span>{" "}
                                  {r.observaciones}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}