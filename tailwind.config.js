/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#eee',
        secondary: '#2d2d2d',
      },
      keyframes: {
        interval: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      margin: {
        sideBar: '250px',
      },
      width: {
        sideBar: '250px',
      },
      animation: {
        interval: 'interval 30s ease-in-out',
      },
    },
  },
  plugins: [],
};
