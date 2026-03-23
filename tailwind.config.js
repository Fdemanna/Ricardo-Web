/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FDF5E6',
        'chocolate': '#3E2723',
        'chocolate-light': '#5D4037',
        'glacier': '#E0F2F1',
        'glacier-dark': '#B2DFDB',
      },
      borderRadius: {
        'custom': '20px',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'title': ['"Playfair Display"', 'serif'],
        'body': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
