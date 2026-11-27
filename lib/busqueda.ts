export function normalizarBusqueda(valor: string) {
  return valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
export function textoConsulta(valor?: string | string[]) {
  return (typeof valor === "string" ? valor : "").trim().replace(/\s+/g, " ").slice(0, 100);
}
export function buscarCoincidencias<T>(items: T[], consulta: string, campos: (item: T) => string[]) {
  const q = normalizarBusqueda(consulta);
  if (q.length < 2) return [];
  const palabras = q.split(" ");
  return items.map((item, orden) => {
    const valores = campos(item).map(normalizarBusqueda);
    const terminos = valores.join(" ").split(" ");
    const coincide = palabras.every(palabra => terminos.some(termino => termino.startsWith(palabra)));
    const prioridad = valores[0] === q ? 0 : valores[0]?.startsWith(q) ? 1 : 2;
    return { item, orden, coincide, prioridad };
  }).filter(x => x.coincide).sort((a, b) => a.prioridad - b.prioridad || a.orden - b.orden).map(x => x.item);
}
export function paginaBusqueda<T>(items: T[], valor?: string | string[], tamano = 8) {
  const paginas = Math.max(1, Math.ceil(items.length / tamano));
  const numero = typeof valor === "string" && /^\d{1,6}$/.test(valor) ? Number(valor) : 1;
  const pagina = Math.max(1, Math.min(numero, paginas));
  return { items: items.slice((pagina - 1) * tamano, pagina * tamano), pagina, paginas, total: items.length };
}
