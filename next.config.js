/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // JWT_SECRET: process.env.JWT_SECRET,
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:3000"], //vercel에서 test하려면 url vercel로 바꿔야함 아마도
    },
  },
};

module.exports = nextConfig;
