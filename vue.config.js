'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    // 路径配置
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      // 别名配置
      alias: {
        // @ is an alias to /src
        '@': resolve('src'),
      }
    },
  }
}