const colors = require("@tailwindcss/postcss7-compat/colors");

module.exports = {
  mode: "aot",
  purge: ["./src/components/*.js", "./src/pages/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        amber: colors.amber,
        emerald: colors.emerald,
        teal: colors.teal,
        cyan: colors.cyan,
        indigo: colors.indigo,
        fuchsia: colors.fuchsia,
      },
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
};
