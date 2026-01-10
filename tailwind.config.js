import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "SF Pro Text", "ui-sans-serif", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#2563EB",
          soft: "#EFF6FF",
          dark: "#020617"
        },
        accent: {
          peach: "#FB7185",
          gold: "#FACC15"
        }
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(37,99,235,0.5) 0, transparent 55%), radial-gradient(circle at bottom, rgba(248,250,252,0.1) 0, transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;