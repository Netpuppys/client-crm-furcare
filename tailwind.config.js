/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "accent-indigo": "#5856D6",
        "accent-blue": "#006DFA",
        "text-black" : "#121C2D",
      }
    },
  },
  plugins: [],
}