/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      screens: {
        small: {
          max: "1023px",
        },
        large: {
          min: "1024px",
        },
      },
      maxWidth: {
        108: "27rem",
      },
    },
  },
  plugins: [],
};
