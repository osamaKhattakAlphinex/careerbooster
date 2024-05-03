/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium", "@sparticuz/chromium-min", "puppeteer"],
    serverActions: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
