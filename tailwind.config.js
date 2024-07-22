/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },

    extend: {
      fontFamily: {
        minion: ["Minion Pro", "serif"],
      },
      colors: {
        redmain: {
          50: "#fff0f1",
          100: "#ffdde0",
          200: "#ffc0c5",
          300: "#ff949c",
          400: "#ff5764",
          500: "#ff2333",
          main: "#ff0013",
          700: "#d70010",
          800: "#b10310",
          900: "#920a14",
          950: "#500006",
        },
        bluemain: {
          50: "#e5f5ff",
          100: "#cfedff",
          200: "#a9dcff",
          300: "#75c0ff",
          400: "#3f94ff",
          500: "#1466ff",
          600: "#0051ff",
          700: "#0052ff",
          800: "#0049e3",
          main: "#002d9e",
          950: "#001a66",
        },
        blueblack: {
          50: "#e4eeff",
          100: "#cfdfff",
          200: "#a8c2ff",
          300: "#7499ff",
          400: "#3e5cff",
          500: "#1322ff",
          600: "#000aff",
          700: "#000aff",
          800: "#0009e4",
          900: "#0001b0",
          main: "#010028",
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
