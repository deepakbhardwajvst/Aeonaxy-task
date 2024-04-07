/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'header': ["Pacifico", "cursive"],
      'inter': ["Inter", "sans-serif"],
      "montserrat": ["Montserrat", "sans-serif"],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'tablet': '930px',
      'laptop': '1088px'
    }
  },
  plugins: [],
}

