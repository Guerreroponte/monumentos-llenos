"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type CategoriaEvento = "grande" | "local";

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
  const [imagen, setImagen] = useState("");
  const [enlace, setEnlace] = useState("");
  const [creadoPor, setCreadoPor] = useState("");

  const [dificilBebida, setDificilBebida] = useState(false);
  const [parking, setParking] = useState(false);
  const [recomendable, setRecomendable] = useState(true);
  const [destacado, setDestacado] = useState(false);

  const [loading, setLoading] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const subtipoOptions = useMemo(() => {
    return categoriaEvento === "grande" ? SUBTIPOS_GRANDES : SUBTIPOS_LOCALES;
  }, [categoriaEvento]);

  function resetFormulario(nuevaCategoria: CategoriaEvento = categoriaEvento) {
    setNombre("");
    setCiudad("");
    setProvincia("");
    setComunidadAutonoma("");
    setSubtipo(nuevaCategoria === "grande" ? "Festival" : "Plan local");
    setFechaInicio(hoyMasDias(0));
    setFechaFin("");
    setHoraInicio("");
    setHoraFin("");
    setUbicacionDetalle("");
    setDescripcion("");
    setPrecio("");
    setAmbiente("");
    setImagen("");
    setEnlace("");
    setCreadoPor("");
    setDificilBebida(false);
    setParking(false);
    setRecomendable(true);
    setDestacado(false);
  }

  function cambiarCategoria(nuevaCategoria: CategoriaEvento) {
    setCategoriaEvento(nuevaCategoria);
    setSubtipo(nuevaCategoria === "grande" ? "Festival" : "Plan local");
    setMensajeOk("");
    setMensajeError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    if (!nombre.trim()) {
      setMensajeError("Pon un nombre al evento o plan.");
      return;
    }

    if (!ciudad.trim()) {
      setMensajeError("Indica la ciudad.");
      return;
    }

    if (!fechaInicio) {
      setMensajeError("Selecciona al menos una fecha de inicio.");
      return;
    }

    if (!descripcion.trim()) {
      setMensajeError("Añade una descripción breve y útil.");
      return;
    }

    setLoading(true);

    const tipoFinal =
      categoriaEvento === "grande" ? subtipo || "Evento grande" : subtipo || "Plan local";

    const payload = {
      nombre: nombre.trim(),
      ciudad: ciudad.trim(),
      provincia: provincia.trim() || null,
      comunidad_autonoma: comunidadAutonoma.trim() || null,
      tipo: tipoFinal,
      categoria_evento: categoriaEvento,
      subtipo: subtipo.trim() || null,
      fecha_inicio: fechaInicio || null,
      fecha_fin: fechaFin || null,
      hora_inicio: horaInicio || null,
      hora_fin: horaFin || null,
      ubicacion_detalle: ubicacionDetalle.trim() || null,
      descripcion: descripcion.trim(),
      precio: precio.trim() || null,
      ambiente: ambiente.trim() || null,
      imagen: imagen.trim() || null,
      enlace: enlace.trim() || null,
      creado_por: creadoPor.trim() || null,
      dificil_bebida: dificilBebida,
      parking,
      recomendable,
      destacado,
      validado: true,
      reportado: false,
    };

    const { error } = await supabase.from("eventos").insert([payload]);

    if (error) {
      console.error("Error insertando evento:", error);
      setMensajeError("No se ha podido guardar. Revisa los campos e inténtalo otra vez.");
      setLoading(false);
      return;
    }

    setMensajeOk(
      categoriaEvento === "grande"
        ? "Evento grande enviado correctamente."
        : "Plan local enviado correctamente."
    );

    resetFormulario();
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1f2937]">
      <header className="sticky top-0 z-50 border-b border-[#f3e8dd] bg-[#fffaf3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#f97316]">
              Lugares Llenos
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Inicio
            </Link>
            <Link
              href="/lugares"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Lugares
            </Link>
            <Link
              href="/mapa"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Mapa
            </Link>
            <Link
              href="/eventos"
              className="text-sm font-semibold text-[#64748b] transition hover:text-[#f97316]"
            >
              Eventos
            </Link>
            <Link
              href="/participa"
              className="rounded-full bg-[#f97316] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ea580c]"
            >
              Participa
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#f97316]">
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Comunidad de lugares reales en España
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Participa
          </span>
          <span className="rounded-full bg-[#fff0e6] px-3 py-1">
            Sube planes reales
          </span>
        </div>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-[#334155] md:text-5xl">
          Añade un evento grande o un plan local
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748b] md:text-lg">
          La idea es que la gente comparta cosas útiles de verdad: desde una feria o
          festival hasta un concierto pequeño, un tardeo o un monólogo para hoy.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97316]">
                Elige qué vas a subir
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => cambiarCategoria("grande")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    categoriaEvento === "grande"
                      ? "border-[#fb923c] bg-[#fff7ed]"
                      : "border-[#e5e7eb] bg-white hover:bg-[#fffaf5]"
                  }`}
                >
                  <p className="text-sm font-bold text-[#334155]">🔥 Evento grande</p>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">
                    Festival, feria, fiesta, mercado potente o evento importante.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => cambiarCategoria("local")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    categoriaEvento === "local"
                      ? "border-[#60a5fa] bg-[#eff6ff]"
                      : "border-[#e5e7eb] bg-white hover:bg-[#f8fbff]"
                  }`}
                >
                  <p className="text-sm font-bold text-[#334155]">⚡ Plan local / qué hacer hoy</p>
                  <p className="mt-1 text-sm leading-6 text-[#64748b]">
                    Concierto pequeño, monólogo, tardeo, bar con directo o plan cercano.
                  </p>
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#334155]">Consejo</h2>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">
                Cuanto más real y directo sea el texto, mejor. Por ejemplo:
              </p>

              <div className="mt-4 rounded-2xl bg-[#fff7ed] p-4 text-sm text-[#7c2d12]">
                “Hoy hay concierto en directo en sala X, ambiente joven, se llena
                bastante y aparcar por la zona no es fácil.”
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-6">
              <h3 className="text-xl font-bold text-[#9a3412]">
                Lo útil manda
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#7c2d12]">
                Aquí importa más contar cómo es realmente el sitio o el plan que escribir algo perfecto.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f97316]">
                  Formulario
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#334155]">
                  {categoriaEvento === "grande"
                    ? "Subir evento grande"
                    : "Subir plan local"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => resetFormulario()}
                className="rounded-full border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
              >
                Limpiar
              </button>
            </div>

            {mensajeOk && (
              <div className="mb-5 rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm font-semibold text-[#166534]">
                {mensajeOk}
              </div>
            )}

            {mensajeError && (
              <div className="mb-5 rounded-2xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm font-semibold text-[#b91c1c]">
                {mensajeError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder={
                      categoriaEvento === "grande"
                        ? "Ej. Feria de Abril"
                        : "Ej. Monólogo en Sala X"
                    }
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Tipo / subtipo
                  </label>
                  <select
                    value={subtipo}
                    onChange={(e) => setSubtipo(e.target.value)}
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  >
                    {subtipoOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej. Madrid"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Provincia
                  </label>
                  <input
                    type="text"
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Comunidad autónoma
                  </label>
                  <input
                    type="text"
                    value={comunidadAutonoma}
                    onChange={(e) => setComunidadAutonoma(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Fecha inicio
                  </label>
                  <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
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
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Hora inicio
                  </label>
                  <input
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
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
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Ubicación detallada
                </label>
                <input
                  type="text"
                  value={ubicacionDetalle}
                  onChange={(e) => setUbicacionDetalle(e.target.value)}
                  placeholder="Ej. Sala X, Plaza Mayor, recinto ferial..."
                  className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Descripción útil
                </label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows={5}
                  placeholder="Cuenta algo real: ambiente, si merece la pena, si se llena, si es fácil aparcar, si es buen plan para hoy..."
                  className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Precio
                  </label>
                  <input
                    type="text"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    placeholder="Ej. Gratis / 10€ / Desde 15€"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Ambiente
                  </label>
                  <input
                    type="text"
                    value={ambiente}
                    onChange={(e) => setAmbiente(e.target.value)}
                    placeholder="Ej. Muy lleno, tranquilo, ambiente joven..."
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Imagen (URL)
                  </label>
                  <input
                    type="text"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#334155]">
                    Enlace externo
                  </label>
                  <input
                    type="text"
                    value={enlace}
                    onChange={(e) => setEnlace(e.target.value)}
                    placeholder="Opcional"
                    className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Tu nombre o alias
                </label>
                <input
                  type="text"
                  value={creadoPor}
                  onChange={(e) => setCreadoPor(e.target.value)}
                  placeholder="Opcional"
                  className="w-full rounded-2xl border border-[#e2e8f0] px-4 py-3 text-sm outline-none transition focus:border-[#fb923c]"
                />
              </div>

              <div className="grid gap-3 rounded-3xl bg-[#f8fafc] p-4 md:grid-cols-2">
                <label className="inline-flex items-center gap-3 text-sm font-medium text-[#334155]">
                  <input
                    type="checkbox"
                    checked={dificilBebida}
                    onChange={(e) => setDificilBebida(e.target.checked)}
                  />
                  Difícil pedir bebida
                </label>

                <label className="inline-flex items-center gap-3 text-sm font-medium text-[#334155]">
                  <input
                    type="checkbox"
                    checked={parking}
                    onChange={(e) => setParking(e.target.checked)}
                  />
                  Hay parking o se aparca fácil
                </label>

                <label className="inline-flex items-center gap-3 text-sm font-medium text-[#334155]">
                  <input
                    type="checkbox"
                    checked={recomendable}
                    onChange={(e) => setRecomendable(e.target.checked)}
                  />
                  Lo recomiendo
                </label>

                <label className="inline-flex items-center gap-3 text-sm font-medium text-[#334155]">
                  <input
                    type="checkbox"
                    checked={destacado}
                    onChange={(e) => setDestacado(e.target.checked)}
                  />
                  Marcar como destacado
                </label>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex rounded-full bg-[#f97316] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading
                    ? "Guardando..."
                    : categoriaEvento === "grande"
                    ? "Publicar evento grande"
                    : "Publicar plan local"}
                </button>

                <Link
                  href="/eventos"
                  className="inline-flex rounded-full border border-[#fed7aa] px-6 py-3 text-sm font-bold text-[#ea580c] transition hover:bg-[#fff7ed]"
                >
                  Ver eventos
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}