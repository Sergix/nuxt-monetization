const { resolve } = require('path')

module.exports = function (moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'monetization.js',
    options: moduleOptions
  })
}

module.exports.meta = require('../package.json')
