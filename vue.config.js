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
        '@': resolve('src'),
      }
    },
    devtool: 'source-map'
  },
  devServer: {
    // 配置代理
    proxy: {
      '/api': {
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api/getDiscList': ''
        },
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('referer', 'https://c.y.qq.com/');
          proxyReq.setHeader('host', 'c.y.qq.com');
        }
      }
    }
  },
  // 打包地址
  publicPath: process.env.NODE_ENV === 'production' ? '/music/' : '/'
}