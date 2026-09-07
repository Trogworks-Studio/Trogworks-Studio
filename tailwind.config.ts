import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bog: {
          DEFAULT: "#0E1210",
          50: "#F1F4EE",
          100: "#DDE4D5",
          200: "#B7C4A7",
          300: "#8CA075",
          400: "#5F7549",
          500: "#3C4E2C",
          600: "#26331B",
          700: "#1A2314",
          800: "#12160F",
          900: "#0B0E09",
          950: "#060705",
        },
        ooze: {
          DEFAULT: "#7CB518",
          50: "#F1F9E0",
          100: "#E1F2C1",
          200: "#C4E687",
          300: "#A6D94D",
          400: "#8DC72E",
          500: "#7CB518",
          600: "#5F8B13",
          700: "#456410",
          800: "#2C400A",
          900: "#182305",
        },
        rune: {
          DEFAULT: "#8B5FBF",
          50: "#F2ECFA",
          100: "#E4D5F4",
          200: "#C9ABE9",
          300: "#AD82DE",
          400: "#9A6DCB",
          500: "#8B5FBF",
          600: "#6D4796",
          700: "#4F3370",
          800: "#33214A",
          900: "#1D1329",
        },
        bone: {
          DEFAULT: "#E8E4D3",
          100: "#FBFAF6",
          200: "#F3F0E6",
          300: "#E8E4D3",
          400: "#D6CFB2",
          500: "#BFB587",
        },
        ember: {
          DEFAULT: "#E0692A",
          50: "#FCEBE0",
          100: "#F8D2B8",
          200: "#F0A671",
          300: "#E88A4C",
          400: "#E0692A",
          500: "#B84F1C",
          600: "#8C3C15",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "carve": "inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(232,228,211,0.06)",
        "glow-ooze": "0 0 24px rgba(124,181,24,0.35)",
        "glow-rune": "0 0 24px rgba(139,95,191,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
