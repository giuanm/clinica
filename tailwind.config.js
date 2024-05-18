/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}", // Asegúrate de incluir la ruta correcta para tus archivos React
  ],
  theme: {
    fontFamily: {
      default: ["Poppins", "sans-serif"],
      display: ["Krona One", "sans-serif"],
    },
    extend: {
      colors: {
        "primary": "#010851",
        "secondary": "#9A7AF1",
        "tartary": "#707070",
        "pink": "#EE9AE5",
        "white": "#FFFFFF",
        "black": "#000000",
        "card": "#29335c",
      },
      boxShadow: {
        "3xl":'0 10px 50px 0px rgba(0,0,0,0.15)',
      },
      
    },
    container: {
      center: true, // serves as margin-inline: auto;
      padding: {
        DEFAULT: "1rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
}

