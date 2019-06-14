'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',   //编译输出的二级目录
    assetsPublicPath: '/',   //编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {   // 需要 proxyTable 代理的接口（可跨域）
      // '/api': {
      //   target: 'http://192.168.10.104:8801/immune',  //杜灿
      //   target: 'http://192.168.10.111:8801/immune',  //吉吉
      //   target: 'http://192.168.10.107:8801/immune',   //向辉
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }
    },

    // Various Dev Server settings
    host: 'localhost', //请求地址
    port: 8080, // 运行测试页面的端口
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map', //提供的用来方便调试的配置，它有四种模式，可以查看webpack文档了解更多

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),   //访问文件入口页面，本地文件系统上的绝对路径

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),   //编译输出的静态资源路径，本地文件系统上的绝对路径
    assetsSubDirectory: 'static',  //编译输出的二级目录
    assetsPublicPath: '/',   //资源的根目录，可配置为资源服务器域名或 CDN 域名

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
