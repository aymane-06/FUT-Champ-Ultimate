/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ["Poppins"],
      },
      backgroundImage:{
        bodyBG: "url('/src/assets/img/frontpage_bg.png')",
        tyBG: "url('https://cdn.futbin.com/design/img/builder_imgs/23/pos_base.png')",
      }
    },
  },
  plugins: [],
}