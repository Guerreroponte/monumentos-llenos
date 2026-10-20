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
function horaValida(hora?: string | null): hora is string {
  return !!hora && /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(hora);
}
function fechaHora(dia: string, hora?: string | null) {
  // Hora local del recinto: no asumir Madrid para eventos en Canarias.
  return horaValida(hora)
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
  // Una fecha fin conocida sigue siendo útil aunque no se conozca la hora.
  // Sin fecha fin, la ficha representa una sola jornada: usar su hora fin
  // solo si ambas horas son válidas y el orden no exige suponer otro día.
  const inicioHora = horaValida(evento.hora_inicio) ? evento.hora_inicio.slice(0, 5) : null;
  const finHora = horaValida(evento.hora_fin) ? evento.hora_fin.slice(0, 5) : null;
  let endDate: string | null = null;
  if (end && end >= start) {
    endDate = end === start && inicioHora && finHora && finHora < inicioHora
      ? null : fechaHora(end, evento.hora_fin);
  } else if (!evento.fecha_fin && inicioHora && finHora && finHora > inicioHora) {
    endDate = fechaHora(start, evento.hora_fin);
  }
  // EventScheduled es el valor predeterminado documentado por Google.
  // No afirmarlo expresamente si el contenido advierte de un cambio de estado;
  // tampoco adivinar si se trata de una cancelación, aplazamiento o nueva fecha.
  const cambioEstado = /cancelad[oa]s?|suspendid[oa]s?|aplazad[oa]s?|pospuest[oa]s?|reprogramad[oa]s?|cambio de fecha|nueva fecha/i
    .test(`${name} ${evento.descripcion || ""}`);
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
    ...(!cambioEstado ? { eventStatus: "https://schema.org/EventScheduled" } : {}),
    ...(endDate ? { endDate } : {}),
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
