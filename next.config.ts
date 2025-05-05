/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // можно ограничить до нужных доменов
      },
    ],
  },
};

module.exports = nextConfig;
