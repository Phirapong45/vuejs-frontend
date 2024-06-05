const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })



// module.exports = {
//   devServer: {
//     port: 3000
//   },
// }



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

