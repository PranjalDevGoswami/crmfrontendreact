
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/HS-blog-post-20-2048x1075.png')",
        
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
