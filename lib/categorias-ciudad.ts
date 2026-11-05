import { coincideTipo, eventoVigente } from "./agenda-ui.ts";

export const tiposCategoriasCiudad = ["Concierto", "Teatro", "Monólogo", "Tardeo"];

export function contarCategoriasCiudad(eventos: { tipo?: string | null; fecha_inicio: string | null; fecha_fin: string | null }[], hoy: string) {
  return Object.fromEntries(tiposCategoriasCiudad.map(tipo => [tipo, eventos.filter(evento =>
    eventoVigente(evento.fecha_inicio, evento.fecha_fin, hoy) && coincideTipo(evento.tipo?.trim() || "Evento", tipo)
  ).length]));
}
