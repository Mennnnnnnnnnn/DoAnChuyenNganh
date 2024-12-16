/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "radial-gradient(ellipse at top, rgba(16,185,129,0.3) 0%, rgba(10,80,60,0.2) 45%, rgba(0,0,0,0.1) 100%)",
      },
    },
  },
  plugins: [],
};