/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f4939f',
        'primary-dark': '#772e2d',
        'primary-light': '#FFD2DE',
        'bg-pink': '#f6c0d1',
        'bg-light': '#FEE9EB',
        'heart': '#FF7A95',
      },
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'fredoka': ['Fredoka', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
