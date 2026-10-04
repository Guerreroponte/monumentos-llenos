import ParticipaClient, { type ColaboradorOpcion } from "./ParticipaClient";
import { publicServer } from "@/lib/supabase-public-server";

export const revalidate = 60;
export default async function Page() {
  const { data, error } = await publicServer.from("colaboradores")
    .select("id, nombre, categoria_colaborador").order("nombre", { ascending: true });
  return <ParticipaClient colaboradores={(data || []) as ColaboradorOpcion[]} fechaInicial={new Date().toISOString().slice(0, 10)} errorColaboradores={error ? "No se han podido cargar los colaboradores. Puedes publicar igualmente." : ""} />;
}
