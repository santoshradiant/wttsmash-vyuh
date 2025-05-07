import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['react-feature-wtt'],
};

export default nextConfig;
