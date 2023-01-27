/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EB5756",
        white: "#FFFFFF",
        black: "#00000",
        "light-blue": "#178fac",
      },
      aspectRatio: {
        "5/2": "5 / 2",
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
