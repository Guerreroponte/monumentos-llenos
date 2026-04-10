// @ts-nocheck
"use client";

import { useMemo } from "react";
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

  const center = useMemo<[number, number]>(() => {
    if (monumentosConCoords.length === 0) {
      return [40.4168, -3.7038];
    }

    const latMedia =
      monumentosConCoords.reduce((acc, item) => acc + item.latitud, 0) /
      monumentosConCoords.length;

    const lngMedia =
      monumentosConCoords.reduce((acc, item) => acc + item.longitud, 0) /
      monumentosConCoords.length;

    return [latMedia, lngMedia];
  }, [monumentosConCoords]);

  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold">🗺️ Mapa de lugares</h3>

        <div className="rounded-full border border-orange-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
          {monumentosConCoords.length} con ubicación
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-lg shadow-orange-100">
        <MapContainer
          center={center}
          zoom={monumentosConCoords.length > 0 ? 6 : 5}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
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
    </div>
  );
}