/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#eee",
        secondary: "#2d2d2d",
        price: "#d01345",
      },
      keyframes: {
        interval: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },
      margin: {
        sideBar: "250px",
      },
      padding: {
        "custom-1": "32px",
        "custom-2": "64px",
      },
      width: {
        sideBar: "250px",
      },
      height: {
        "sub-header": "calc(100vh - 110px)",
      },
      animation: {
        interval: "interval 30s ease-in-out",
      },
    },
  },
  plugins: [],
};
