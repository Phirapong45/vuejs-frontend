const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = {
  devServer: {
    port: 3000
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'services': path.resolve(__dirname, 'src/services'),
      }
    }
  }
};

