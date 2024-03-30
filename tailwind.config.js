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
    animation: {
      "opacity-pulse": "opacity-pulse .8s ease-in-out infinite alternate-reverse",
      "scroll-x-rtl": "scroll-x-rtl 12s linear infinite backwards",
    },
    keyframes: {
      "opacity-pulse": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
      "scroll-x-rtl": {
        "0%": { left: "100%" },
        "100%": { left: "-100%" },
      },
    },
  },
  plugins: [],
};
