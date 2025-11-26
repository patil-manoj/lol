import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Overpass", "system-ui", "sans-serif"],
        serif: ["DM Serif Display", "Georgia", "serif"],
      },
      colors: {
        terra: {
          50: "#FFF8F0",
          100: "#FFEAD9",
          200: "#FFD4B3",
          300: "#F4B88C",
          400: "#E89B66",
          500: "#D97642",
          600: "#C25E3F",
          700: "#A34C33",
          800: "#7D3A28",
          900: "#58291D",
        },
        olive: {
          50: "#F5F7F3",
          100: "#E8ECE3",
          200: "#D4DCC8",
          300: "#B8C5A7",
          400: "#9BAA8B",
          500: "#6D7D62",
          600: "#56624A",
          700: "#434E3A",
          800: "#323B2B",
          900: "#23281E",
        },
        sand: {
          50: "#FFFAF5",
          100: "#FFF8F0",
          200: "#F4EBD9",
          300: "#E8D9BF",
          400: "#D9C4A1",
          500: "#C4AB87",
          600: "#A68D6C",
          700: "#8A7254",
          800: "#6B563F",
          900: "#4D3E2C",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wave: "wave 1.5s ease-in-out infinite",
        gradient: "gradient 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        glow: "glow 3s ease-in-out infinite",
        particle: "particle 15s linear infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.5)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)",
          },
        },
        particle: {
          "0%": {
            transform: "translateY(0) translateX(0) rotate(0deg)",
            opacity: "0",
          },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100vh) translateX(50px) rotate(360deg)",
            opacity: "0",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-terra": "linear-gradient(135deg, #D97642 0%, #C25E3F 100%)",
        "gradient-olive": "linear-gradient(135deg, #6D7D62 0%, #56624A 100%)",
        "gradient-warm": "linear-gradient(135deg, #F4EBD9 0%, #E8D9BF 100%)",
      },
      boxShadow: {
        premium:
          "0 10px 40px rgba(86, 98, 74, 0.15), 0 2px 8px rgba(86, 98, 74, 0.08)",
        "premium-lg":
          "0 20px 60px rgba(86, 98, 74, 0.2), 0 4px 16px rgba(86, 98, 74, 0.1)",
        glow: "0 0 20px rgba(217, 118, 66, 0.4), 0 0 40px rgba(194, 94, 63, 0.2)",
        "glow-lg":
          "0 0 30px rgba(217, 118, 66, 0.6), 0 0 60px rgba(194, 94, 63, 0.3)",
        organic:
          "0 8px 32px rgba(86, 98, 74, 0.12), 0 2px 8px rgba(86, 98, 74, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
