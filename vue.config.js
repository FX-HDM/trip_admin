const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/service_9001': {
        target: 'http://localhost:9001/',
        changeOrigin: true,
        pathRewrite: {
          '^/service_9001': ''
        }
      },
      '/service_9002': {
        target: 'http://localhost:9002/',
        changeOrigin: true,
        pathRewrite: {
          '^/service_9002': ''
        }
      },
      '/service_9004':{
        target: 'http://localhost:9004/',
        changeOrigin: true,
        pathRewrite: {
          '^/service_9004': ''
        }
      }
    }
  }
})

