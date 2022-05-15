const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0', // 允许外部ip访问
    https: false, // 启用https
    proxy: {
      '/api': {
        target: 'http://localhost:8082/',
        changeOrigin: true,
        // secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
})
