const shouldPurge = process.env.NODE_ENV !== 'local';

module.exports = {
  theme: {
    extend: {},
  },
  purge: {
    enabled: false,
    content: ['./src/**/*.tsx', './src/**/*.js'],
  },
};
