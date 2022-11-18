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
      },
      borderColor: {
        yellow: {
          theme: "#F7DD43",
        },
        cardbg: "#202024",
      },
      textColor: {
        grey: {
          theme: "#C4C4CC",
        },
      },
    },
  },
  plugins: [],
};
