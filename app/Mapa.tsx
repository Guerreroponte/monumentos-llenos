// @ts-nocheck
"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MonumentoMapa = {
  id: string;
  nombre: string;
  ciudad: string;
  latitud?: number | null;
  longitud?: number | null;
};

const monumentoIcon = L.divIcon({
  html: `
    <div style="
      width: 30px;
      height: 30px;
      border-radius: 9999px;
      background: #f97316;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
      border: 2px solid white;
    ">
      📍
    </div>
  `,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export default function Mapa({
  monumentos,
}: {
  monumentos: MonumentoMapa[];
}) {
  const monumentosConCoords = monumentos.filter(
    (m) => typeof m.latitud === "number" && typeof m.longitud === "number"
  );

  return (
    <div className="mt-12">
      <h3 className="mb-4 text-2xl font-bold">🗺️ Mapa de lugares</h3>

      <MapContainer
        center={[40.4168, -3.7038]}
        zoom={6}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-2xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {monumentosConCoords.map((m) => (
          <Marker
            key={m.id}
            position={[m.latitud, m.longitud]}
            icon={monumentoIcon}
          >
            <Popup>
              <strong>{m.nombre}</strong>
              <br />
              {m.ciudad}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}