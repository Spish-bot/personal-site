import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        serif: ["Georgia", "Songti SC", "STSong", "Noto Serif CJK SC", "SimSun", "serif"]
      },
      colors: {
        paper: "#ffffff",
        ink: "#262724",
        muted: "#656860",
        soft: "#777b73",
        line: "#e3e5df",
        accent: "#8f3439"
      }
    }
  },
  plugins: []
};

export default config;
