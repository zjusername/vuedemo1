const { defineConfig } = require('@vue/cli-service');
const { default: axios } = require('axios');
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  devServer: {
      proxy: {
          '/calculator': {
              target: 'http://localhost:8080',
              changeOrigin: true,
              pathRewrite: {
                  '^/calculator': '/calculator'
              }
          }
      }
  }
};
