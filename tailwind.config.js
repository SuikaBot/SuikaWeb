
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        "color1": "#ECF4D6",
        "color2": "#9AD0C2",
        "color2-hover": "#33A9AB",
        "color3": "#2D9596",
        "color4": "#265073",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
    require('preline/plugin')
  ]
}

