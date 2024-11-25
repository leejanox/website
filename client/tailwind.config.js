/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sejong:"sejong",
      },     
      backgroundImage:{
        "blackBG":"url(images/blackBG.jpg)",
        "whiteBG":"url(images/whiteBG.jpg)",
        "introBG":"url(images/introBG.jpg)",
      },
      animation: {},
      keyframes:{},
      bordercolor:{},
      backgroundColor:{},
      fontSize:{
        "2xs":"10px"
      },
      screens:{},
      variants:{
        extend: {
          backgroundColor: ["disabled"],
          textColor: ["disabled"],
          opacity: ["disabled"],
          cursor: ["disabled"],
          borderColor: ["white"],
          ringColor: ["disabled"],
          ringWidth: ["disabled"],
          boxShadow: ["disabled"],
          scale: ["disabled"],
        },
      },
      colors:{

      },
   },
  },
  plugins: [
    plugin(({ addComponents }) => {
      const components = {
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".flex-row-center": {
          display: "flex",
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
        },
        ".flex-col-center": {
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
        },
        ".flex-row-between":{
          display: "flex",
          justifyContent:"between",
          alignItems:"center",
        },
        ".border-transparants": {
          boxSizing: "border-box",
          borderWidth: "1px",
          borderColor: "transparent",
        },
      };
      addComponents(components);
    }),
  ],
}

