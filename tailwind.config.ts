import type { Config } from "tailwindcss";

// Theme ported verbatim from the original Ultra X Player design's tailwind.config.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE080",
          300: "#FFD040",
          400: "#F0C040",
          500: "#D4AF37",
          600: "#B8960F",
          700: "#8B6914",
          800: "#5E4A1A",
          900: "#3A2E15",
        },
        dark: {
          50: "#2A2A2A",
          100: "#1F1F1F",
          200: "#1A1A1A",
          300: "#151515",
          400: "#111111",
          500: "#0D0D0D",
          600: "#0A0A0A",
          700: "#070707",
          800: "#050505",
          900: "#020202",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
