/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#073D32", // Deep Forest Green
          dark: "#04241D",
          light: "#0C5446",
        },
        emerald: {
          brand: "#138A62", // Emerald Green
          light: "#1BB27F",
        },
        gold: {
          brand: "#F4B942", // Solar Gold
          light: "#FAD074",
          dark: "#D49822",
        },
        charcoal: "#182521",
        surface: "#F5F8F5",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
