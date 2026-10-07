import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Las consultas (incluida ciudad) se conservan en el destino.
      { source: "/lugar", destination: "/#lugares", permanent: true },
      { source: "/buscar", destination: "/#buscador", permanent: true },
    ];
  },
};

export default nextConfig;
