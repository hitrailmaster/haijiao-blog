

module.exports = {
    baseUrl: './',

  configureWebpack: config => {
    config.entry.mondernize = './src/js/modernizr-3.6.0.min.js',
      config.entry.plugins = './src/js/plugins.js'
  },

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9000,
    https: false,
    hotOnly: false,
    proxy: {
      "/*": {
        // target: "http://localhost:8080",
        // target: "http://121.199.58.221:8080",
        target: "http://121.199.58.221:8888",
        secure: false,
        ws: false
      },
    },
    before: app => {}
  },
}