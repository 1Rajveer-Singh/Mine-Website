/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'screen': '100vw',
      },
      maxWidth: {
        'none': 'none',
        'screen': '100vw',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}

