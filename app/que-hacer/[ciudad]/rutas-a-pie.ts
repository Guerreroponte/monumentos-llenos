import RutaZafra from "./RutaZafra";
import RutaOlivenza from "./RutaOlivenza";
import RutaTrujillo from "./RutaTrujillo";
import RutaSegovia from "./RutaSegovia";
import RutaCordoba from "./RutaCordoba";
import RutaPontevedra from "./RutaPontevedra";
import RutaLasPalmas from "./RutaLasPalmas";
import RutaSalamanca from "./RutaSalamanca";
import RutaToledo from "./RutaToledo";
import RutaBurgos from "./RutaBurgos";
import RutaJerez from "./RutaJerez";
import RutaPlasencia from "./RutaPlasencia";
import RutaCiudadReal from "./RutaCiudadReal";
import RutaPonferrada from "./RutaPonferrada";
import RutaBaeza from "./RutaBaeza";
import RutaAviles from "./RutaAviles";
import RutaAlgeciras from "./RutaAlgeciras";
import RutaAracena from "./RutaAracena";
import RutaCazorla from "./RutaCazorla";
import RutaCardona from "./RutaCardona";
import RutaAlcoy from "./RutaAlcoy";

export const rutasAPie = new Map([
  ["zafra", { ciudad: "Zafra", Componente: RutaZafra }],
  ["olivenza", { ciudad: "Olivenza", Componente: RutaOlivenza }],
  ["trujillo", { ciudad: "Trujillo", Componente: RutaTrujillo }],
  ["segovia", { ciudad: "Segovia", Componente: RutaSegovia }],
  ["cordoba", { ciudad: "Córdoba", Componente: RutaCordoba }],
  ["pontevedra", { ciudad: "Pontevedra", Componente: RutaPontevedra }],
  ["las-palmas-de-gran-canaria", { ciudad: "Las Palmas de Gran Canaria", Componente: RutaLasPalmas }],
  ["salamanca", { ciudad: "Salamanca", Componente: RutaSalamanca }],
  ["toledo", { ciudad: "Toledo", Componente: RutaToledo }],
  ["burgos", { ciudad: "Burgos", Componente: RutaBurgos }],
  ["jerez-de-la-frontera", { ciudad: "Jerez de la Frontera", Componente: RutaJerez }],
  ["plasencia", { ciudad: "Plasencia", Componente: RutaPlasencia }],
  ["ciudad-real", { ciudad: "Ciudad Real", Componente: RutaCiudadReal }],
  ["ponferrada", { ciudad: "Ponferrada", Componente: RutaPonferrada }],
  ["baeza", { ciudad: "Baeza", Componente: RutaBaeza }],
  ["aviles", { ciudad: "Avilés", Componente: RutaAviles }],
  ["algeciras", { ciudad: "Algeciras", Componente: RutaAlgeciras }],
  ["aracena", { ciudad: "Aracena", Componente: RutaAracena }],
  ["cazorla", { ciudad: "Cazorla", Componente: RutaCazorla }],
  ["cardona", { ciudad: "Cardona", Componente: RutaCardona }],
  ["alcoy", { ciudad: "Alcoy", Componente: RutaAlcoy }],
]);
