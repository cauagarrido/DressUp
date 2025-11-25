/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD0E8',
          purple: '#E5D4FF',
          blue: '#D2E6FF',
          green: '#D1FFE6',
          yellow: '#FFF2C8',
          peach: '#FFDCC8',
          lavender: '#E4D9FF',
          mint: '#D1FFF0',
        },
        brand: {
          primary: '#7C3AED',
          secondary: '#EC4899',
          accent: '#0EA5E9',
          dark: '#2B1946',
          light: '#F6ECFF',
        },
        surface: {
          base: '#FFFFFF',
          muted: '#F9F5FF',
          highlight: '#FFF2FB',
        },
      }
    },
  },
  plugins: [],
}

