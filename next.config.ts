import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [{ source: "/remolques", destination: "/catalogo", permanent: true }];
  },
};

export default nextConfig;
