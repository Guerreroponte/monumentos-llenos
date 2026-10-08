// Shared by the agenda and city guides. Date-only comparisons use Madrid's day.
export function diaMadrid(ahora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(ahora);
}
export function largaDuracion(inicio?: string | null, fin?: string | null) {
  return !!inicio && !!fin && Date.parse(fin) - Date.parse(inicio) >= 30 * 86400000;
}
export function compararAgenda(a: { inicio?: string | null; fin?: string | null }, b: { inicio?: string | null; fin?: string | null }, hoy = diaMadrid()) {
  const grupo = (e: typeof a) => {
    if (!e.inicio) return 3;
    if ((e.fin || e.inicio) < hoy) return 2;
    return largaDuracion(e.inicio, e.fin) ? 1 : 0;
  };
  return grupo(a) - grupo(b) || (a.inicio && b.inicio ? (a.inicio < hoy ? hoy : a.inicio).localeCompare(b.inicio < hoy ? hoy : b.inicio) : 0) || (a.inicio || '').localeCompare(b.inicio || '');
}
export function fechaAgenda(inicio?: string | null, fin?: string | null, hoy = diaMadrid()) {
  const formato = (fecha: string) => new Date(fecha.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'long', year: 'numeric' });
  if (!inicio) return 'Fecha por confirmar';
  if (fin && fin !== inicio) return inicio < hoy && fin >= hoy ? `Hasta el ${formato(fin)}` : `${formato(inicio)} – ${formato(fin)}`;
  return formato(inicio);
}
const grupos = [
  ['Música y conciertos', /musica|concierto|jazz|flamenco|recital|tributo|rock|pop|rap|rumba|world music|jam session/],
  ['Humor y monólogos', /humor|comedia|monologo/],
  ['Teatro y espectáculos', /teatro|artes escenicas|espectaculo|circo|magia|danza/],
  ['Fiestas y festivales', /fiesta|festival/],
  ['Ferias y gastronomía', /feria|gastronom|mercado/],
  ['Tardeo y sesiones', /tardeo|sesion|clubbing|bar$/],
  ['Cultura y exposiciones', /cultura|exposicion|cine/],
  ['Naturaleza y parques', /parque|acuario/],
] as const;
export function grupoTipo(tipo: string) {
  const texto = tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return grupos.find(([, patron]) => patron.test(texto))?.[0] || tipo;
}
// Prefixed group values leave existing ?tipo=Concierto links with their exact meaning.
export function coincideTipo(tipo: string, filtro: string) {
  return !filtro || (filtro.startsWith('grupo:') ? grupoTipo(tipo) === filtro.slice(6) : tipo === filtro);
}
export function etiquetaEnlace(enlace: string) {
  try {
    const host = new URL(enlace).hostname.toLowerCase();
    return ['entradium.com', 'ticketmaster.es', 'ticketmaster.com', 'wegow.com', 'dice.fm', 'eventbrite.es', 'eventbrite.com'].some(d => host === d || host.endsWith('.' + d)) ? 'Ver entradas' : 'Consultar programación';
  } catch { return 'Consultar programación'; }
}

// Calendarios editoriales: no inferir sesiones a partir de un intervalo o de texto libre.
// Las reglas están acotadas a la edición revisada y a las fechas de la ficha.
export type CalendarioEvento =
  | { tipo: 'diario' }
  | { tipo: 'semanal'; dias: number[] }
  | { tipo: 'sesiones'; fechas: string[] };

const calendarios: Record<string, CalendarioEvento> = {
  // Fichas revisadas el 8-10-2026: cada jueves / los cinco sábados de octubre.
  'conciertos-factoria-cruzcampo-sevilla-2026-2027': { tipo: 'semanal', dias: [4] },
  'irun-zuzenean-zikloa-2026': {
    tipo: 'sesiones',
    fechas: ['2026-10-03', '2026-10-10', '2026-10-17', '2026-10-24', '2026-10-31'],
  },
};

export function calendarioEvento(slug?: string | null) {
  return slug && Object.hasOwn(calendarios, slug) ? calendarios[slug] : undefined;
}

export function eventoEnFecha(
  inicio: string | null | undefined,
  fin: string | null | undefined,
  dia: string,
  calendario?: CalendarioEvento,
) {
  if (!inicio || inicio > dia || (fin || inicio) < dia) return false;
  if (calendario?.tipo === 'sesiones') return calendario.fechas.includes(dia);
  if (calendario?.tipo === 'semanal') {
    return calendario.dias.includes(new Date(dia + 'T12:00:00Z').getUTCDay());
  }
  if (calendario?.tipo === 'diario') return true;
  // Un rango sin calendario solo acredita el periodo, no una sesión cada día.
  return (!fin || fin === inicio) && inicio === dia;
}

export function mananaMadrid(ahora = new Date()) {
  const dia = new Date(diaMadrid(ahora) + 'T12:00:00Z');
  dia.setUTCDate(dia.getUTCDate() + 1);
  return dia.toISOString().slice(0, 10);
}
