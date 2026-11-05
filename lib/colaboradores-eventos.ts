import { compararAgenda, eventoVigente } from "./agenda-ui.ts";

export type EventoColaborador = {
  id: string;
  colaborador_id: string | null;
  nombre: string;
  slug: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  hora_inicio: string | null;
};

export function proximosPorColaborador(eventos: EventoColaborador[], hoy: string) {
  const resultado = new Map<string, EventoColaborador[]>();
  const ordenados = eventos.filter(evento => evento.colaborador_id && evento.slug &&
    eventoVigente(evento.fecha_inicio, evento.fecha_fin, hoy)).sort((a, b) =>
    compararAgenda({ inicio: a.fecha_inicio, fin: a.fecha_fin }, { inicio: b.fecha_inicio, fin: b.fecha_fin }, hoy) ||
    (a.hora_inicio || "99:99").localeCompare(b.hora_inicio || "99:99") || a.id.localeCompare(b.id));
  for (const evento of ordenados) {
    const id = evento.colaborador_id!;
    const grupo = resultado.get(id) || [];
    if (grupo.length < 2 && !grupo.some(item => item.id === evento.id)) {
      grupo.push(evento);
      resultado.set(id, grupo);
    }
  }
  return resultado;
}
