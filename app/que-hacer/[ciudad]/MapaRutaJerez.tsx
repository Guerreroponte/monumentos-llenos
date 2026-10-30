"use client";

import { useEffect, useRef, useState } from "react";
// @ts-expect-error El proyecto utiliza Leaflet sin declaraciones de tipos.
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { paradasJerez } from "./ruta-jerez-datos";

export default function MapaRutaJerez({ seleccionada, revision }: { seleccionada: number | null; revision: number }) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [mapa, setMapa] = useState<ReturnType<typeof L.map> | null>(null);
  const marcadores = useRef<ReturnType<typeof L.marker>[]>([]);
  useEffect(() => {
    if (!contenedor.current) return;
    const instancia = L.map(contenedor.current, { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19,
    }).addTo(instancia);
    marcadores.current = paradasJerez.map((parada, i) => {
      const texto = document.createElement("strong");
      texto.textContent = `${i + 1}. ${parada.nombre}`;
      return L.marker(parada.coordenadas, { title: `${i + 1}. ${parada.nombre}`, alt: parada.nombre, icon: L.divIcon({ className: "", html: `<span style="display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:2px solid white;border-radius:50%;background:#ea580c;color:white;font-weight:700;box-shadow:0 2px 6px #0005">${i + 1}</span>`, iconSize: [32,32], iconAnchor: [16,16] }) }).addTo(instancia).bindPopup(texto);
    });
    instancia.fitBounds(paradasJerez.map(p => p.coordenadas), { paddingTopLeft: [20,80], paddingBottomRight: [20,24] });
    const observador = new ResizeObserver(() => {
      instancia.invalidateSize();
      instancia.fitBounds(paradasJerez.map(p => p.coordenadas), { paddingTopLeft: [20,80], paddingBottomRight: [20,24] });
    });
    observador.observe(contenedor.current);
    setMapa(instancia);
    return () => { observador.disconnect(); instancia.remove(); marcadores.current = []; };
  }, []);
  useEffect(() => {
    if (mapa && seleccionada === null) {
      mapa.closePopup();
      mapa.fitBounds(paradasJerez.map(p => p.coordenadas), { paddingTopLeft: [20,80], paddingBottomRight: [20,24] });
    } else if (mapa && seleccionada !== null) {
      mapa.setView(paradasJerez[seleccionada].coordenadas, 17);
      marcadores.current[seleccionada]?.openPopup();
    }
  }, [mapa, seleccionada, revision]);
  return <div ref={contenedor} role="region" aria-label="Mapa de las cinco paradas del paseo por Jerez" className="relative z-0 h-80 w-full rounded-xl border border-orange-200 sm:h-96" />;
}
