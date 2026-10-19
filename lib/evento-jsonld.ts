const BASE = "https://www.monumentosllenos.com";
type DatosEvento = {
  nombre?: string | null; ciudad?: string | null; ubicacion_detalle?: string | null;
  fecha_inicio?: string | null; fecha_fin?: string | null;
  hora_inicio?: string | null; hora_fin?: string | null;
  descripcion?: string | null; imagen?: string | null;
};

function fecha(valor?: string | null) {
  if (!valor || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) return null;
  const date = new Date(`${valor}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === valor ? valor : null;
}
function fechaHora(dia: string, hora?: string | null) {
  // Hora local del recinto: no asumir Madrid para eventos en Canarias.
  return hora && /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(hora)
    ? `${dia}T${hora}` : dia;
}

export function eventoJsonLd(evento: DatosEvento, slug: string) {
  const name = evento.nombre?.trim();
  const city = evento.ciudad?.trim();
  const venue = evento.ubicacion_detalle?.trim();
  const start = fecha(evento.fecha_inicio);
  if (!name || !city || !venue || venue.toLocaleLowerCase("es") === city.toLocaleLowerCase("es") || !start) return null;
  const end = fecha(evento.fecha_fin);
  const startDate = fechaHora(start, evento.hora_inicio);
  const endDate = end && end >= start ? fechaHora(end, evento.hora_fin) : null;
  let image: string | undefined;
  try {
    if (evento.imagen?.trim()) {
      const url = new URL(evento.imagen, BASE);
      if (["https:", "http:"].includes(url.protocol)) image = url.href;
    }
  } catch { /* La imagen es opcional. */ }
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    url: `${BASE}/eventos/${encodeURIComponent(slug)}`,
    startDate,
    ...(endDate && (end !== start || endDate >= startDate) ? { endDate } : {}),
    location: {
      "@type": "Place",
      name: venue,
      // Conservar la ubicación publicada, sin inventar calle o código postal.
      address: `${venue}, ${city}`,
    },
    ...(evento.descripcion?.trim() ? { description: evento.descripcion.trim() } : {}),
    ...(image ? { image: [image] } : {}),
  };
}

export function serializarJsonLd(value: NonNullable<ReturnType<typeof eventoJsonLd>>) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
