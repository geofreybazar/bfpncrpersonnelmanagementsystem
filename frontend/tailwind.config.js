/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#f7f7f7",
        gold: "#FFD700",
        pink: "#f2e9e1",
        mocha: "#676767",
        turquoise: "#64b5c6",
      },
    },
  },
  plugins: [],
};
