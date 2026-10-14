// Clasificación conservadora: no inferir gratuidad ni público a partir de la descripción.
function normalizar(valor: string) {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
}

export function coincidePlan(evento: { precio: string; ambiente: string; tipo: string; subtipo: string }, plan: string) {
  if (plan === "gratis") {
    // Solo etiquetas completas. «Gratis menores de 3 años» y precios mixtos quedan fuera.
    return /^(?:(?:entrada|acceso)\s+(?:gratis|gratuit[oa]|libre)|gratis|gratuit[oa]|0(?:[.,]0{1,2})?\s*(?:€|eur|euros)?)(?:\s*[,;·-]?\s*(?:con reserva(?: previa)?|hasta completar aforo))?[.!]?$/.test(normalizar(evento.precio));
  }
  if (plan === "familia") {
    return [evento.ambiente, evento.tipo, evento.subtipo].flatMap((valor) => valor.split(/[,;/·]|\s+y\s+/)).some((valor) =>
      /^(?:familiar|familias|en familia|infantil|infantiles|publico familiar|para familias|para ninos|teatro infantil|teatro familiar|taller infantil|talleres infantiles|concierto familiar|espectaculo infantil|espectaculo familiar|evento familiar|musical infantil|musical familiar)$/.test(normalizar(valor))
    );
  }
  return true;
}

export const ACCESOS_RAPIDOS = [
  { nombre: "Conciertos", icono: "musica", filtro: ["tipo", "grupo:Música y conciertos"] },
  { nombre: "Planes gratis", icono: "entrada", filtro: ["plan", "gratis"] },
  { nombre: "En familia", icono: "familia", filtro: ["plan", "familia"] },
  { nombre: "Este fin de semana", icono: "calendario", filtro: ["periodo", "fin-de-semana"] },
  { nombre: "Teatro", icono: "teatro", filtro: ["tipo", "Teatro"] },
  { nombre: "Festivales", icono: "festival", filtro: ["tipo", "Festival"] },
] as const;

export function enlacePlan(filtro: readonly [string, string], ciudad = "") {
  const params = new URLSearchParams([Array.from(filtro)]);
  if (ciudad.trim()) params.set("ciudad", ciudad.trim());
  return `/eventos?${params.toString()}`;
}
