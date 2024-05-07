/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('./assets/login-bg.jpg')", 
      }
    },
  },
  plugins: [],
}

