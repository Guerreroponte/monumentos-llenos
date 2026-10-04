export function leerBusquedaLugares(params: URLSearchParams) {
  const pagina = Number(params.get('paginaLugares') || '1');
  return { nombre: params.get('lugar') || '', ciudad: params.get('ciudad') || '', pagina: Number.isSafeInteger(pagina) && pagina > 0 ? pagina : 1 };
}
export function fechaResena(fecha?: string | null) {
  if (!fecha || Number.isNaN(Date.parse(fecha))) return 'Fecha no disponible';
  return new Date(fecha).toLocaleDateString('es-ES', { timeZone: 'Europe/Madrid', day: 'numeric', month: 'short', year: 'numeric' });
}
export function enlaceComoLlegar(lugar: {nombre?: string | null; ciudad?: string | null; latitud?: number | null; longitud?: number | null}) {
  const coords = typeof lugar.latitud === 'number' && Number.isFinite(lugar.latitud) && Math.abs(lugar.latitud) <= 90 && typeof lugar.longitud === 'number' && Number.isFinite(lugar.longitud) && Math.abs(lugar.longitud) <= 180;
  const destino = coords ? `${lugar.latitud},${lugar.longitud}` : [lugar.nombre, lugar.ciudad].filter(Boolean).join(', ');
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
}
export function agruparPuntos<T>(puntos: T[], proyectar: (p: T) => {x: number; y: number}, tamano = 48) {
  const grupos = new Map<string, T[]>();
  for (const punto of puntos) {
    const {x, y} = proyectar(punto);
    const clave = `${Math.floor(x / tamano)},${Math.floor(y / tamano)}`;
    const grupo = grupos.get(clave) || [];
    grupo.push(punto); grupos.set(clave, grupo);
  }
  return [...grupos.values()];
}
