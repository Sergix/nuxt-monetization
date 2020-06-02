const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    {
      handler: require('../'),
      options: {
        paymentPointer: '$wallet.example.com/alice',
        global: true
      }
    }
  ],
  server: {
    port: 8000
  }
}
