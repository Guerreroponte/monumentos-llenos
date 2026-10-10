type UbicacionEvento = {
  ciudad?: string | null;
  ubicacion_detalle?: string | null;
  latitud?: number | null;
  longitud?: number | null;
};

const normalizar = (texto: string) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
const imprecisa = /\b(varios|varias|diversos|diversas|distintos|distintas|multiples|multisede|itinerante|online|virtual|por confirmar|por determinar|pendiente|consultar|sin confirmar|no especificad[oa])\b/;

export function enlaceComoLlegarEvento(evento: UbicacionEvento): string | null {
  const ubicacion = evento.ubicacion_detalle?.trim() || "";
  const ciudad = evento.ciudad?.trim() || "";
  // No señalar un único destino para un evento que anuncia varias sedes.
  if (imprecisa.test(normalizar(ubicacion)) || imprecisa.test(normalizar(ciudad))) return null;
  const { latitud, longitud } = evento;
  const coordenadas = typeof latitud === "number" && Number.isFinite(latitud) && Math.abs(latitud) <= 90
    && typeof longitud === "number" && Number.isFinite(longitud) && Math.abs(longitud) <= 180;
  if (!coordenadas && (!ciudad || !ubicacion || normalizar(ciudad) === normalizar(ubicacion)
    || /^(centro|centro urbano|toda la ciudad|toda la localidad|recinto|ubicacion|n\/?a|-|pendiente)$/i.test(normalizar(ubicacion)))) return null;
  const destino = coordenadas ? `${latitud},${longitud}` : `${ubicacion}, ${ciudad}`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
  return url.length <= 2048 ? url : null;
}
