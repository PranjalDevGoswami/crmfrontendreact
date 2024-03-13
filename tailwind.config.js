const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [],
  theme: {
    
    extend: {},
  },
  plugins: [],
});


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/HS-blog-post-20-2048x1075.png')",
        
      },
    },
  },
  plugins: [],
}

