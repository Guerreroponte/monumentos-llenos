import "server-only";
import { publicServer } from "./supabase-public-server";
export const ciudadesRespaldo = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Bilbao",
  "Málaga",
  "Zaragoza",
  "A Coruña",
  "Vigo",
  "Murcia",
  "Granada",
  "Santander",
  "Logroño",
  "Córdoba",
  "Toledo",
  "Burgos",
  "Lugo",
  "Ourense",
  "Pontevedra",
  "Santiago de Compostela",
];

type RegistroCiudad = {
  ciudad: string | null;
};

function slugCiudad(ciudad: string) {
  return ciudad
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function limpiarCiudad(ciudad: string) {
  return ciudad.replace(/\s+/g, " ").trim();
}

async function obtenerTodasLasCiudades(
  tabla: "eventos" | "Monumentos" | "colaboradores"
): Promise<string[]> {
  const tamanoPagina = 1000;
  let desde = 0;
  let ciudades: string[] = [];
  let quedanRegistros = true;

  while (quedanRegistros) {
    let consulta = publicServer
      .from(tabla)
      .select("ciudad")
      .not("ciudad", "is", null)
      .range(desde, desde + tamanoPagina - 1);

    if (tabla === "eventos") {
      consulta = consulta
        .eq("validado", true)
        .eq("reportado", false);
    }

    if (tabla === "Monumentos") {
      consulta = consulta.eq("reportado", false);
    }

    const { data, error } = await consulta;

    if (error) {
      throw new Error(
        `No se pudieron cargar las ciudades de ${tabla}: ${error.message}`
      );
    }

    const registros = (data || []) as RegistroCiudad[];

    const ciudadesPagina = registros
      .map((registro) => registro.ciudad)
      .filter((ciudad): ciudad is string => Boolean(ciudad?.trim()))
      .map(limpiarCiudad);

    ciudades = [...ciudades, ...ciudadesPagina];

    if (registros.length < tamanoPagina) {
      quedanRegistros = false;
    } else {
      desde += tamanoPagina;
    }
  }

  return ciudades;
}

function unirCiudadesSinDuplicados(ciudades: string[]) {
  const ciudadesUnicas = new Map<string, string>();

  ciudades.forEach((ciudad) => {
    const ciudadLimpia = limpiarCiudad(ciudad);
    const clave = slugCiudad(ciudadLimpia);

    if (!clave) return;

    if (!ciudadesUnicas.has(clave)) {
      ciudadesUnicas.set(clave, ciudadLimpia);
    }
  });

  return Array.from(ciudadesUnicas.values()).sort((a, b) =>
    a.localeCompare(b, "es", {
      sensitivity: "base",
    })
  );
}


export async function getCiudadesInitialData() {
  const ciudades = await Promise.all([
    obtenerTodasLasCiudades("eventos"), obtenerTodasLasCiudades("Monumentos"), obtenerTodasLasCiudades("colaboradores"),
  ]);
  const combinadas = unirCiudadesSinDuplicados(ciudades.flat());
  return combinadas.length ? combinadas : ciudadesRespaldo;
}
