/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: '#F97316',
        'brand-dark': '#EA580C',
        bg: '#F8F7F4',
        surface: '#FFFFFF',
        border: '#EDE9E3',
        text: '#1C1107',
        muted: '#78716C',
      },
    },
  },
  plugins: [],
}
