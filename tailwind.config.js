/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "accent-indigo": "#5856D6",
        "accent-blue": "#006DFA",
        "text-black" : "#121C2D",
        "error-red" : "#C72323",
        "light-gray" : "#8891AA",
      }, 
      fontFamily: {
        sfPro: ['SFProDisplay', 'sans-serif'], // Add fallback font if needed
      },
    },
  },
  plugins: [],
}