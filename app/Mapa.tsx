// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import { agruparPuntos } from "@/lib/lugares-ui";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MonumentoMapa = {
  id: string;
  nombre: string;
  ciudad: string;
  slug?: string | null;
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

function Puntos({ monumentos }: { monumentos: MonumentoMapa[] }) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });
  const clave = monumentos.map(m => `${m.id}:${m.latitud}:${m.longitud}`).join("|");
  useEffect(() => {
    if (monumentos.length) map.fitBounds(monumentos.map(m => [m.latitud, m.longitud]), { padding: [35, 35], maxZoom: 14 });
  }, [clave, map]);
  const grupos = agruparPuntos(monumentos, m => map.project([m.latitud, m.longitud], zoom));
  return grupos.map(grupo => {
    const m = grupo[0];
    const icon = grupo.length === 1 ? monumentoIcon : L.divIcon({
      html: `<div style="width:40px;height:40px;border-radius:50%;background:#ea580c;color:white;border:3px solid white;display:flex;align-items:center;justify-content:center;font-weight:bold">${grupo.length}</div>`,
      className: "", iconSize: [40,40], iconAnchor: [20,20],
    });
    return <Marker key={grupo.map(p => p.id).join("-")} position={[m.latitud, m.longitud]} icon={icon} title={grupo.length === 1 ? m.nombre : `${grupo.length} lugares cercanos`}>
      <Popup><div className="max-h-64 min-w-[180px] overflow-y-auto">
        {grupo.length > 1 && <button className="mb-3 font-bold" onClick={() => map.fitBounds(grupo.map(p => [p.latitud,p.longitud]), {padding:[35,35], maxZoom:18})}>Ampliar {grupo.length} lugares</button>}
        {grupo.map(p => <div key={p.id} className="mb-3"><strong>{p.nombre}</strong><div>{p.ciudad}</div>{p.slug?.trim() && <Link href={`/lugar/${encodeURIComponent(p.slug.trim())}`} className="inline-block mt-2">Ver ficha →</Link>}</div>)}
      </div></Popup>
    </Marker>;
  });
}

export default function Mapa({
  monumentos,
}: {
  monumentos: MonumentoMapa[];
}) {
  const monumentosConCoords = monumentos.filter(
    (m) => typeof m.latitud === "number" && Number.isFinite(m.latitud) && Math.abs(m.latitud) <= 90 && typeof m.longitud === "number" && Number.isFinite(m.longitud) && Math.abs(m.longitud) <= 180
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

      {!monumentosConCoords.length && <p className="mb-4">No hay lugares con ubicación para esta búsqueda.</p>}
      <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-lg shadow-orange-100">
        <MapContainer
          center={center}
          zoom={monumentosConCoords.length > 0 ? 6 : 5}
          scrollWheelZoom={true}
          className="h-[500px] w-full"
        >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Puntos monumentos={monumentosConCoords} />
        </MapContainer>
      </div>
    </div>
  );
}