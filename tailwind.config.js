/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;",
      },
      backgroundColor: {
        rateio: "#1E1E1E",
        cardbg: "#202024",
        yellow: {
          theme: "#F7DD43",
        },
        theme: {
          1: "#D2D7D9",
          2: "#848B8C",
          3: "#B8BEBF",
          4: "#F0F2F2",
          5: "#595959",
          6: "#363E40",
        },
      },
      borderColor: {
        yellow: {
          theme: "#F7DD43",
        },
        cardbg: "#202024",
        theme: {
          1: "#D2D7D9",
          2: "#848B8C",
          3: "#B8BEBF",
          4: "#F0F2F2",
          5: "#595959",
          6: "#363E40",
        },
      },
      textColor: {
        grey: {
          theme: "#C4C4CC",
        },
        theme: {
          1: "#D2D7D9",
          2: "#848B8C",
          3: "#B8BEBF",
          4: "#F0F2F2",
          5: "#595959",
        },
      },
      fontFamily: {
        abel: ["Abel", "sans-serif"],
      },
    },
  },
  plugins: [],
};
