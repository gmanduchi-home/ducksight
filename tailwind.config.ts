import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette ricalibrata sul logo "Logo_img_tondo.png"
        // — crema sfondo, blu petrolio del corpo, marrone caldo del becco/iride
        cream: {
          DEFAULT: "#F4ECDA",
          50: "#FAF6EB",
          100: "#F4ECDA",
          200: "#E6DCC0",
        },
        teal: {
          DEFAULT: "#3E7585",
          dark: "#2E5965",
          light: "#5A8E9D",
        },
        beak: {
          DEFAULT: "#A65A30",
          dark: "#7E4222",
          light: "#C77F50",
        },
        outline: {
          DEFAULT: "#4A2814", // marrone scuro dei contorni del logo
        },
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#2E2E2E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Fraunces",
          "Iowan Old Style",
          "Baskerville",
          "Times New Roman",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
