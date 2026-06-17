import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#E6F0FA",
          100: "#C2D9F0",
          200: "#8BB8E0",
          300: "#5497D0",
          400: "#2D7BC0",
          500: "#1A5FA0",
          600: "#144A7D",
          700: "#0E355A",
          800: "#0A2240",
          900: "#061528",
          950: "#030B15",
        },
        fuel: {
          hfo: "#6B7280",
          vlsfo: "#9CA3AF",
          lng: "#FACC15",
          biofuel: "#22C55E",
          methanol: "#3B82F6",
          ammonia: "#F97316",
        },
        cii: {
          A: "#22C55E",
          B: "#84CC16",
          C: "#FACC15",
          D: "#F97316",
          E: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "slide-in-right": "slideInRight 0.3s ease-out",
        "slide-out-right": "slideOutRight 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "count-up": "countUp 1.5s ease-out",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
