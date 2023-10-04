/** @type {import('next').NextConfig} */
const nextConfig = {
  externals: { canvas: {} },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
