// Application configuration

export const config = {
  site: {
    name: 'CoreframeAI',
    description: 'Your AI Development Partner',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  features: {
    // Feature flags can be added here
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  },
} as const;

export default config;
