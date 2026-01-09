import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        status: {
          active: "#10B981", // Emerald
          pending: "#F59E0B", // Amber
          closed: "#94A3B8", // Slate
          risk: "#F43F5E", // Rose
        },
        brand: {
          primary: "#6366F1", // Indigo-500
          secondary: "#4F46E5", // Indigo-600
          accent: "#8B5CF6", // Violet-500
          dark: "#1E1B4B", // Indigo-950
          bg: "#EEF2FF", // Indigo-50
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
