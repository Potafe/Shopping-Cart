/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    backgroundImage: ({ theme }) => ({
      "store-banner": "url('./src/assets/GTA.png')",
      "stars-gradient": `linear-gradient(90deg, ${theme(
        "colors.amber.200",
      )} var(--percent), ${theme("colors.gray.100")} var(--percent));`,
    }),
  },
  plugins: [],
};
