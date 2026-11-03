// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // <--- включает выгрузку в чистый HTML
  reactStrictMode: true,
  images: {
    unoptimized: true, // обязательно для статического экспорта (уже настроено)
  },
};

export default nextConfig;