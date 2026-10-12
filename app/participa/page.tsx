import ParticipaClient from "./ParticipaClient";

export const revalidate = 60;
export default function Page() {
  return <ParticipaClient fechaInicial={new Date().toISOString().slice(0, 10)} />;
}
