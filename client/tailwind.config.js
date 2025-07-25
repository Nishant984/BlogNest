/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'tablet': '770px',
        'tablet-md': '790px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}
