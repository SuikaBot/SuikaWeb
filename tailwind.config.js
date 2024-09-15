import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#ECF4D6",
        color2: "#9AD0C2",
        "color2-hover": "#33A9AB",
        color3: "#2D9596",
        "color3-hover": "#26888a",
        color4: "#265073",
        warning: "#f1c40f",
        "warning-hover": "#d9b00c",
        danger: "#e74c3c",
        "danger-hover": "#c0392b",
        light: "#ecf0f1",
        "light-hover": "#bdc3c7",
      },
    },
  },
  plugins: [flowbite],
};
