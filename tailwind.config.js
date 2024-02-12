
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/rm314-adj-02.jpg')"
      },
      // colors:{
      //   primary: '#bd1d1d',
      //   secondary: colors.yellow,
      //   neutral: colors.gray,
      // }
    },
  },
  plugins: [],
}
