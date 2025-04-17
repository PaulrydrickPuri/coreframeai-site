// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "js", "jsx"],
  
    // Tell Next.js that we're using `src/pages`
    experimental: {
      // No `appDir` anymore in Next 15
      // You don't need to explicitly set `appDir: false` anymore
    },
  }
  
  const path = require('path');

  module.exports = {
    webpack(config) {
      config.resolve.alias['@'] = path.resolve(__dirname, 'src');
      return config;
    },
  };