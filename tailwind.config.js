/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xss': '365px',    // Extra small screens
        'xs': '480px',     // Extra small screens
        '2xl': '1536px',   // Already included, but you can modify
        '3xl': '1920px',   // Custom screen for very large displays
        '4k': '2560px',    // Custom screen for 4K displays
      },
    },
  },
  plugins: [],
}
