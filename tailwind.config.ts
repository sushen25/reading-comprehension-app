import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        honey: {
          light: "#fef3c7",
          DEFAULT: "#f59e0b",
          dark: "#92400e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Georgia", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "highlight-fade": "highlightFade 1s ease-in-out forwards",
      },
      keyframes: {
        highlightFade: {
          "0%": { backgroundColor: "transparent" },
          "50%": { backgroundColor: "#fde68a" },
          "100%": { backgroundColor: "#fef3c7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
