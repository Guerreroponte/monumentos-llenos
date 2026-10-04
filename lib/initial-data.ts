import "server-only";
import { publicServer } from "./supabase-public-server";
import { cargarDatos, cargarTotalEventosPublicados, cargarEventosHoy,
  cargarEventosProximosHero, cargarComentariosEventosConFoto,
  cargarLogosSalasDestacadas, cargarPartnersExperiencias, cargarMarcasColaboradoras } from "./home-data";

async function getAgendaCities() {
  const cities = new Set<string>();
  let offset = 0;
  while (true) {
    const { data, error } = await publicServer.from("eventos").select("ciudad")
      .eq("reportado", false).order("id").range(offset, offset + 999);
    if (error) throw error;
    if (!data?.length) break;
    for (const row of data) if (row.ciudad?.trim()) cities.add(row.ciudad.trim());
    offset += data.length;
  }
  return [...cities];
}

export async function getHomeInitialData() {
  const [monumentos, totalEventosPublicados, eventosHoy, eventosProximosHero,
    comentariosEventosConFoto, salasDestacadasConLogo, partnersExperiencias,
    marcasColaboradoras, ciudadesDeLaAgenda] = await Promise.all([
      cargarDatos(publicServer), cargarTotalEventosPublicados(publicServer),
      cargarEventosHoy(publicServer), cargarEventosProximosHero(publicServer),
      cargarComentariosEventosConFoto(publicServer), cargarLogosSalasDestacadas(publicServer),
      cargarPartnersExperiencias(publicServer), cargarMarcasColaboradoras(publicServer), getAgendaCities(),
    ]);
  return { monumentos, totalEventosPublicados, eventosHoy, eventosProximosHero,
    comentariosEventosConFoto, salasDestacadasConLogo, partnersExperiencias,
    marcasColaboradoras, ciudadesDeLaAgenda };
}
export type HomeInitialData = Awaited<ReturnType<typeof getHomeInitialData>>;
