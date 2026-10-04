import QueHacerClient from "./QueHacerClient";
import { getCiudadesInitialData, ciudadesRespaldo } from "@/lib/ciudades-data";

export const revalidate = 60;
export default async function Page() {
  try {
    return <QueHacerClient ciudadesDisponibles={await getCiudadesInitialData()} />;
  } catch {
    return <QueHacerClient ciudadesDisponibles={ciudadesRespaldo} errorCiudades />;
  }
}
