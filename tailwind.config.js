/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        darkBg: "#060816",
        darkCard: "#0B1120",
        darkBorder: "#1B2440",

        primaryRed: "#8B0000",
        accentOrange: "#F96B00",
        secondaryBlue: "#02045D",

        lightBg: "#F5F7FB",
        lightCard: "#FFFFFF",
        lightBorder: "#D0D5DD",

        // ADD THESE
        lightText: "#111827",
        lightTextSoft: "#475467",

        darkText: "#FFFFFF",
        darkTextSoft: "#98A2B3",
      },
    },
  },

  plugins: [],
};