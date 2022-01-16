const path = require('path')
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
    } else {
      return {
        resolve: {
          alias: {
            '@js': path.resolve(__dirname, './src/assets/js'),
            '@css': path.resolve(__dirname, './src/assets/css'),
            '@img': path.resolve(__dirname, './src/assets/images'),
            '@c': path.resolve(__dirname, './src/components')
          }
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/1ba29e6feba2d94be8672dfa90d50486/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

}
