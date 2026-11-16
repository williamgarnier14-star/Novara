/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060912',
          900: '#0B111F',
          800: '#111A2E',
        },
        blue: {
          glow: '#3B6CE0',
          soft: '#6E8FE8',
        },
        slate: {
          body: '#9AA5B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
