import { cargarBusqueda, type FichaBusqueda } from "@/lib/busqueda-data";
import { buscarCoincidencias, normalizarBusqueda, textoConsulta } from "@/lib/busqueda";
import { claveCiudad, nombreCiudad } from "@/lib/ciudad-identidad";

export async function GET(request: Request) {
  const q = textoConsulta(new URL(request.url).searchParams.get("q") || "");
  if (normalizarBusqueda(q).length < 2) return Response.json({ sugerencias: [], parcial: false });
  const datos = await cargarBusqueda();
  const consulta = nombreCiudad(q);
  const campos = (e: FichaBusqueda) => [e.nombre || "", nombreCiudad(e.ciudad), e.tipo || "", e.subtipo || "", e.ubicacion_detalle || ""];
  const ciudades = datos.ciudades.status === "fulfilled" ? buscarCoincidencias(datos.ciudades.value, consulta, c => [c]).slice(0, 3).map(c => ({ nombre: c, tipo: "Ciudad", detalle: "Agenda y lugares", href: `/que-hacer/${claveCiudad(c)}` })) : [];
  const fichas = (resultado: typeof datos.eventos, tipo: string, ruta: string) => resultado.status === "fulfilled" ? buscarCoincidencias(resultado.value, consulta, campos).slice(0, 3).map(e => ({ nombre: e.nombre!, tipo, detalle: nombreCiudad(e.ciudad), href: `/${ruta}/${encodeURIComponent(e.slug || e.id)}` })) : [];
  return Response.json({ sugerencias: [...ciudades, ...fichas(datos.eventos, "Evento", "eventos"), ...fichas(datos.lugares, "Lugar", "lugar")], parcial: [datos.ciudades, datos.eventos, datos.lugares].some(r => r.status === "rejected") });
}
