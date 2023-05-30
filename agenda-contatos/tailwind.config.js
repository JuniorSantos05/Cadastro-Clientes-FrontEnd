/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx, sass}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
