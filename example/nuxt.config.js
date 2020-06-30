const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    {
      handler: require('../'),
      options: {
        paymentPointer: '$ilp.uphold.com/8bJBkDmJDw4R',
        global: false
      }
    }
  ],
  server: {
    port: 8080
  }
}
