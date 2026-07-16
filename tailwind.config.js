/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#123A8F",
          700: "#1B4DB3",
          500: "#2F7BEF",
        },
        accent: {
          500: "#FFB020",
          700: "#D68000",
        },
      },
    },
  },
  plugins: [],
};
