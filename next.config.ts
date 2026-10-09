import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Fichas unificadas: conservar los enlaces compartidos e indexados.
      { source: "/eventos/sobrezero-madrid-2026-10-10-671167ed", destination: "/eventos/sobrezero-teatro-eslava-madrid-2026-10-10", permanent: true },
      { source: "/lugar/cerro-del-tio-pio-madrid-mirador-con-vistas-reales-cuando-ir-y-evitar-gente-madrid", destination: "/lugar/cerro-del-tio-pio-madrid-vallecas", permanent: true },
      // Las consultas (incluida ciudad) se conservan en el destino.
      { source: "/lugar", destination: "/#lugares", permanent: true },
      { source: "/buscar", destination: "/#buscador", permanent: true },
    ];
  },
};

export default nextConfig;
