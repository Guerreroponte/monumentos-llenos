import { rutasAPie } from "./[ciudad]/rutas-a-pie";
import QueHacerClient from "./QueHacerClient";
import { getCiudadesInitialData, ciudadesRespaldo } from "@/lib/ciudades-data";

export const revalidate = 60;
export default async function Page() {
  const ciudadesConRuta = Array.from(rutasAPie.values(), ({ ciudad }) => ciudad);
  try {
    return <QueHacerClient ciudadesConRuta={ciudadesConRuta} ciudadesDisponibles={await getCiudadesInitialData()} />;
  } catch {
    return <QueHacerClient ciudadesConRuta={ciudadesConRuta} ciudadesDisponibles={ciudadesRespaldo} errorCiudades />;
  }
}
