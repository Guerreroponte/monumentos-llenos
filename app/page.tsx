import HomeClient from "./HomeClient";
import { getHomeInitialData } from "@/lib/initial-data";

export const revalidate = 60;

export default async function HomePage() {
  return <HomeClient initialData={await getHomeInitialData()} />;
}
