// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      appDir: false, // if you're not using the App Router yet
    },
  }
  
  module.exports = nextConfig
  