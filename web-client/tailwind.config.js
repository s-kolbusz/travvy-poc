const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  purge: ['./src/**/*.tsx', './src/**/*.js'],
};
