import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#C93CF8",
              // DEFAULT: "#e637bf",
              // DEFAULT: "#ec058e",
              // DEFAULT: "#5603ad",
              // DEFAULT: "#826aed",
              // DEFAULT: "#6C63FF",
            },
          },
        },
        light: {
          colors: {
            primary: {
              // DEFAULT: "#00f56a",
              DEFAULT: "#00c4f5",
              // DEFAULT: "#00a3cc",
            },
          },
        },
      },
    }),
  ],
};
