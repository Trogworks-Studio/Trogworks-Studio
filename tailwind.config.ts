import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07090A",
          900: "#0C0F0D",
          800: "#12181A",
          700: "#1A2226",
          600: "#243036",
          500: "#31424A",
        },
        bronze: {
          300: "#D9A15C",
          400: "#C6873E",
          500: "#A9702F",
          600: "#82581F",
          700: "#5E3E15",
        },
        vex: {
          300: "#B8F26A",
          400: "#9BE23C",
          500: "#7BC925",
          600: "#5DA019",
          700: "#3F6E10",
        },
        hex: {
          300: "#C9A3F2",
          400: "#AE79E8",
          500: "#8F52D6",
          600: "#6E39AD",
        },
        wound: {
          400: "#F0745A",
          500: "#DD4E33",
          600: "#B03A24",
        },
        parchment: {
          100: "#F5EFDD",
          200: "#E8DFC4",
          300: "#D4C69E",
          400: "#B2A47C",
          500: "#8C8065",
        },
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        hud: "0 0 0 1px rgba(201,161,92,0.35), 0 0 0 4px rgba(7,9,10,0.9), 0 8px 24px rgba(0,0,0,0.55)",
        "hud-active": "0 0 0 1px rgba(184,242,106,0.6), 0 0 0 4px rgba(7,9,10,0.9), 0 0 28px rgba(155,226,60,0.25)",
        "inset-bevel": "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-glow":
          "linear-gradient(rgba(155,226,60,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(155,226,60,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
