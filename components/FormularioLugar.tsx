"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { FotoSeleccionada } from "@/lib/home-data";

const STORAGE_BUCKET = "imagenes";

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

export default function FormularioLugar({ onPublicado }: { onPublicado?: () => Promise<void> }) {
  const [guardandoMonumento, setGuardandoMonumento] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const enviando = useRef(false);
  const inputFotosLugarRef = useRef<HTMLInputElement | null>(null);
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

  const convertirOpcionalABooleano = (valor: string): boolean | null => {
    if (valor === "si") return true;
    if (valor === "no") return false;
    return null;
  };

  const fotosActuales = useRef(fotosLugarSeleccionadas);
  fotosActuales.current = fotosLugarSeleccionadas;
  useEffect(() => () => {
    fotosActuales.current.forEach((foto) => URL.revokeObjectURL(foto.preview));
  }, []);

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
    if (enviando.current) return;
    setMensaje("");
    if (!nombre.trim() || !ciudad.trim() || !rating.trim() || !precio.trim()) {
      alert("Completa nombre, ciudad, valoración y acceso o precio.");
      return;
    }

    const ratingNumero = Number(rating);

    if (Number.isNaN(ratingNumero) || ratingNumero < 0 || ratingNumero > 5) {
      alert("La valoración debe ser un número entre 0 y 5.");
      return;
    }

    enviando.current = true;
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
          `Error al guardar el lugar: ${error instanceof Error ? error.message : "Error desconocido"}`
        );
        enviando.current = false;
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
      setMensaje("Lugar publicado. Gracias por compartirlo con la comunidad.");
      await onPublicado?.();
    } catch (error: unknown) {
      console.error("Error subiendo fotos del lugar:", error);
      alert(
        `No se pudo guardar el lugar o subir sus fotos: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }

    enviando.current = false;
    setGuardandoMonumento(false);
    setSubiendoFotosLugar(false);
  };

  return (
    <fieldset disabled={guardandoMonumento} className="min-w-0">
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-label="Nombre del lugar"
              placeholder="Nombre del lugar"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              aria-label="Ciudad"
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
              aria-label="Valoración de 0 a 5"
              placeholder="Valoración de 0 a 5"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <input
              type="text"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              aria-label="Precio o acceso"
              placeholder="Precio o acceso"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />

            <select
              aria-label="Acepta mascotas"
              value={aceptaMascotas}
              onChange={(e) => setAceptaMascotas(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Acepta mascotas — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <select
              aria-label="Parking cerca"
              value={parkingCerca}
              onChange={(e) => setParkingCerca(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none"
            >
              <option value="">Parking cerca — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <select
              aria-label="Acceso en coche"
              value={accesoCoche}
              onChange={(e) => setAccesoCoche(e.target.value)}
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 outline-none md:col-span-2"
            >
              <option value="">Acceso en coche — Prefiero no indicarlo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            <textarea
              aria-label="Descripción del lugar"
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
                          <img loading="lazy"
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
              type="button"
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
      {mensaje && <p role="status" className="mt-4 text-sm font-semibold text-green-800">{mensaje}</p>}
    </fieldset>
  );
}
