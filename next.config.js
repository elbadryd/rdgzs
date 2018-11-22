const withCSS = require('@zeit/next-css');
const withESLint = require('eslint-config-airbnb');

const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = withCSS({
  webpack: (config) => {
    config.node = { fs: 'empty' };
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
});
