/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        'neon': '#00ffee',
      },
      textShadow: {
        neon: '0 0 10px #00ffee, 0 0 20px #00ffee',
      },
    },
  },
  plugins: [],
};
