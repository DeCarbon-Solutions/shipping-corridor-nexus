/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@deck.gl/core',
    '@deck.gl/react',
    '@deck.gl/layers',
    '@deck.gl/geo-layers',
  ],
  turbopack: {},
};

module.exports = nextConfig;
