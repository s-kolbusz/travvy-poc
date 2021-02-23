const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      primary: "#293E3E",
      secondary: "#F0B73A",
      light: "#F1FAEE",
    },
    extend: {},
  },
  purge: ['./src/**/*.tsx', './src/**/*.js'],
};
