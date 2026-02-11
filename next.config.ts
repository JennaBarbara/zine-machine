import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <=== enables static exports
  basePath: '/zine-machine', 
  assetPrefix: '/zine-machine',
  images: { unoptimized: true } 
};

export default nextConfig;
