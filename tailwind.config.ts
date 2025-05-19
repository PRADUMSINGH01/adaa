import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E07A5F",
        secondary: "#D57A7A",
        accent: "#8A9B6E",
        neutral: "#F5F0E6",
        dark: "#4A4A48",
        light: "#F8F5F2",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
