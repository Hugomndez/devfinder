import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'avatars.githubusercontent.com' }],
  },
  logging: { fetches: { fullUrl: true, hmrRefreshes: true } },
};

export default nextConfig;
