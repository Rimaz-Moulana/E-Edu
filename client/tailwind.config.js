/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
  module.exports={

    content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
  theme: {
    theme: {
      screens: {
        'sm': '360px',
        // => @media (min-width: 640px) { ... }
  
        'md': '568px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
    extend: {
      colors:{
        darkGreen: '#8EA174',
        backgroundGreen: '#E5EBD6',
        sidebarGreen : '#284625',
        buttonGreen : '#3C6849',
        filterGreen : '#DEE5C2',

      },

      margin:{
        '6.5':'50%',
        // '5.5':'50%',
        '4.5' : '47%',
        '0.5' : '5%'
      },

  
    },
  },

  plugins: [],

  
}
