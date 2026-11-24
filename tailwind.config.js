/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Fraunces", "Georgia", "serif"],
        hand: ["Caveat", "cursive"],
      },
      colors: {
        cream: "#FAF6EF",
        paper: "#FFFDF9",
        ink: "#1F2A24",
        muted: "#6B6F68",
        line: "#E8E1D4",
        sage: { DEFAULT: "#2F6B4F", light: "#E3EEE6", dark: "#234F3B" },
        sun: "#F6D365",
        coral: "#E07A5F",
      },
    },
  },
  plugins: [],
};
