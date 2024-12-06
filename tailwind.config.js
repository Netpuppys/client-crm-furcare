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
        sfPro: ['SFProDisplay', 'sans-serif'],
      },
      animation: {
        alertShow: 'alertShow 0.5s ease',
        alertHide: 'alertHide 0.5s ease'
      },
      keyframes: {
        alertShow: {
          from: {
            bottom: "-4rem",
          }, to: {
            bottom: "0%"
          }
        },
        alertHide: {
          from: {
            bottom: "0%",
          }, to: {
            bottom: "-4rem",
          }
        },
      },
    },
  },
  plugins: [],
}