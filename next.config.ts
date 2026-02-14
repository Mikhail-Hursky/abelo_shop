import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    additionalData: '@use "@/shared/styles/mixins" as *;',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
