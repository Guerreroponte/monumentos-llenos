"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CategoriaEvento = "grande" | "local";

type EventoEditable = {
  id: string;
  nombre: string | null;
  ciudad: string | null;
  provincia: string | null;
  comunidad_autonoma: string | null;
  tipo: string | null;
  categoria_evento: CategoriaEvento | null;
  subtipo: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  ubicacion_detalle: string | null;
  descripcion: string | null;
  precio: string | null;
  ambiente: string | null;
  imagen: string | null;
  video_url: string | null;
  enlace: string | null;
  creado_por: string | null;
  colaborador_id: string | null;
  slug: string | null;
  dificil_bebida: boolean | null;
  parking: boolean | null;
  recomendable: boolean | null;
};

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

function limpiarHora(hora: string | null | undefined) {
  if (!hora) return "";
  return hora.slice(0, 5);
}

export default function EditarEventoPage() {
  const params = useParams();

  const token = useMemo(() => {
    const valor = params?.token;

    if (Array.isArray(valor)) {
      return valor[0] ?? "";
    }

    return typeof valor === "string" ? valor : "";
  }, [params]);

  const [eventoId, setEventoId] = useState("");

  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [comunidadAutonoma, setComunidadAutonoma] = useState("");
  const [categoriaEvento, setCategoriaEvento] =
    useState<CategoriaEvento>("local");
  const [subtipo, setSubtipo] = useState("Plan local");

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [variosDias, setVariosDias] = useState(false);

  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  const [ubicacionDetalle, setUbicacionDetalle] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ambiente, setAmbiente] = useState("");

  const [imagen, setImagen] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [enlace, setEnlace] = useState("");
  const [creadoPor, setCreadoPor] = useState("");
  const [colaboradorId, setColaboradorId] = useState("");

  const [dificilBebida, setDificilBebida] = useState(false);
  const [parking, setParking] = useState(false);
  const [recomendable, setRecomendable] = useState(true);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eventoEncontrado, setEventoEncontrado] = useState(true);

  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const subtipoOptions =
    categoriaEvento === "grande" ? SUBTIPOS_GRANDES : SUBTIPOS_LOCALES;

  useEffect(() => {
    if (!token) {
      setCargando(false);
      setEventoEncontrado(false);
      return;
    }

    let activo = true;

    async function cargarEvento() {
      setCargando(true);
      setMensajeError("");

      const { data, error } = await supabase.rpc(
        "obtener_evento_por_token",
        {
          p_edit_token: token,
        }
      );

      if (!activo) return;

      if (error) {
        console.error("Error cargando evento:", error);
        setEventoEncontrado(false);
        setMensajeError(
          "No se ha podido cargar el evento. Comprueba que el enlace sea correcto."
        );
        setCargando(false);
        return;
      }

      const resultado = Array.isArray(data) ? data[0] : data;

      if (!resultado) {
        setEventoEncontrado(false);
        setCargando(false);
        return;
      }

      const evento = resultado as EventoEditable;

      setEventoId(evento.id ?? "");
      setNombre(evento.nombre ?? "");
      setCiudad(evento.ciudad ?? "");
      setProvincia(evento.provincia ?? "");
      setComunidadAutonoma(evento.comunidad_autonoma ?? "");

      const categoria =
        evento.categoria_evento === "grande" ? "grande" : "local";

      setCategoriaEvento(categoria);
      setSubtipo(
        evento.subtipo ||
          evento.tipo ||
          (categoria === "grande" ? "Festival" : "Plan local")
      );

      setFechaInicio(evento.fecha_inicio ?? "");
      setFechaFin(evento.fecha_fin ?? "");
      setVariosDias(Boolean(evento.fecha_fin));

      setHoraInicio(limpiarHora(evento.hora_inicio));
      setHoraFin(limpiarHora(evento.hora_fin));

      setUbicacionDetalle(evento.ubicacion_detalle ?? "");
      setDescripcion(evento.descripcion ?? "");
      setPrecio(evento.precio ?? "");
      setAmbiente(evento.ambiente ?? "");

      setImagen(evento.imagen ?? "");
      setVideoUrl(evento.video_url ?? "");
      setEnlace(evento.enlace ?? "");
      setCreadoPor(evento.creado_por ?? "");
      setColaboradorId(evento.colaborador_id ?? "");

      setDificilBebida(Boolean(evento.dificil_bebida));
      setParking(Boolean(evento.parking));
      setRecomendable(evento.recomendable !== false);

      setEventoEncontrado(true);
      setCargando(false);
    }

    cargarEvento();

    return () => {
      activo = false;
    };
  }, [token]);

  async function guardarCambios(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    if (!nombre.trim() || !ciudad.trim() || !fechaInicio) {
      setMensajeError("Nombre, ciudad y fecha de inicio son obligatorios.");
      return;
    }

    if (variosDias && fechaFin && fechaFin < fechaInicio) {
      setMensajeError(
        "La fecha de fin no puede ser anterior a la fecha de inicio."
      );
      return;
    }

    if (!token || !eventoId) {
      setMensajeError("No se ha podido identificar el evento.");
      return;
    }

    setGuardando(true);

    try {
      const slug = generarSlugEvento({
        nombre: nombre.trim(),
        ciudad: ciudad.trim(),
        fechaInicio,
      });

      const { data, error } = await supabase.rpc(
        "editar_evento_por_token",
        {
          p_edit_token: token,
          p_nombre: nombre.trim(),
          p_ciudad: ciudad.trim(),
          p_provincia: provincia.trim() || null,
          p_comunidad_autonoma: comunidadAutonoma.trim() || null,
          p_tipo: subtipo,
          p_categoria_evento: categoriaEvento,
          p_subtipo: subtipo,
          p_fecha_inicio: fechaInicio,
          p_fecha_fin: variosDias && fechaFin ? fechaFin : null,
          p_hora_inicio: horaInicio || null,
          p_hora_fin: horaFin || null,
          p_ubicacion_detalle: ubicacionDetalle.trim() || null,
          p_descripcion: descripcion.trim() || null,
          p_precio: precio.trim() || null,
          p_ambiente: ambiente.trim() || null,
          p_imagen: imagen.trim() || null,
          p_video_url: videoUrl.trim() || null,
          p_enlace: enlace.trim() || null,
          p_creado_por: creadoPor.trim() || null,
          p_colaborador_id: colaboradorId || null,
          p_slug: slug,
          p_dificil_bebida: dificilBebida,
          p_parking: parking,
          p_recomendable: recomendable,
        }
      );

      if (error) throw error;

      if (data !== true) {
        throw new Error("El token de edición no es válido.");
      }

      setMensajeOk(
        "Cambios guardados correctamente. El evento ya está actualizado ✅"
      );
    } catch (error) {
      console.error("Error editando evento:", error);
      setMensajeError(
        "No hemos podido guardar los cambios. Prueba de nuevo en unos segundos."
      );
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-[#fffaf3] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#e5e7eb] bg-white p-8 shadow-sm">
          <p className="text-center text-lg font-bold text-[#475569]">
            Cargando evento...
          </p>
        </div>
      </main>
    );
  }

  if (!eventoEncontrado) {
    return (
      <main className="min-h-screen bg-[#fffaf3] px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#fecaca] bg-white p-8 text-center shadow-sm">
          <div className="text-5xl">🔒</div>

          <h1 className="mt-4 text-3xl font-extrabold text-[#334155]">
            Enlace de edición no válido
          </h1>

          <p className="mt-3 text-[#64748b]">
            Este enlace no corresponde a ningún evento o ya no es válido.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#f97316] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
          >
            Volver a Lugares Llenos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <section className="mx-auto max-w-4xl px-4 py-10 md:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f97316]">
              ✏️ Edición privada
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-[#334155] md:text-4xl">
              Editar evento
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#64748b]">
              Modifica los datos que necesites y pulsa guardar. Este enlace es
              privado: no lo compartas públicamente.
            </p>
          </div>

          <form onSubmit={guardarCambios} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Nombre del evento *
                </label>

                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Provincia
                </label>

                <input
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
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
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Categoría
                </label>

                <select
                  value={categoriaEvento}
                  onChange={(e) => {
                    const nuevaCategoria = e.target.value as CategoriaEvento;

                    setCategoriaEvento(nuevaCategoria);

                    setSubtipo(
                      nuevaCategoria === "grande"
                        ? "Festival"
                        : "Plan local"
                    );
                  }}
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                >
                  <option value="local">Plan local</option>
                  <option value="grande">Evento grande</option>
                </select>
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

            <div className="rounded-2xl border border-[#fde7d7] bg-[#fffaf3] p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Fecha de inicio *
                  </label>

                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => {
                      const nuevaFecha = e.target.value;
                      setFechaInicio(nuevaFecha);

                      if (fechaFin && nuevaFecha && fechaFin < nuevaFecha) {
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
                        setVariosDias(e.target.checked);

                        if (!e.target.checked) {
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
                    Hora de inicio
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
                    Hora de fin
                  </label>

                  <input
                    type="time"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                    className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#334155]">
                Lugar / ubicación
              </label>

              <input
                value={ubicacionDetalle}
                onChange={(e) => setUbicacionDetalle(e.target.value)}
                placeholder="Ej: Teatro Eslava, Plaza Mayor..."
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
                rows={5}
                className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Precio
                </label>

                <input
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej: Gratis / 15 €"
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
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#334155]">
                Enlace oficial / entradas
              </label>

              <input
                value={enlace}
                onChange={(e) => setEnlace(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  URL de imagen
                </label>

                <input
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  URL de vídeo
                </label>

                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#334155]">
                Publicado por
              </label>

              <input
                value={creadoPor}
                onChange={(e) => setCreadoPor(e.target.value)}
                className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
              />
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

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={guardando}
                className={`rounded-full bg-[#f97316] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c] ${
                  guardando ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>

              <Link
                href="/eventos"
                className="rounded-full border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-bold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Ver eventos
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}