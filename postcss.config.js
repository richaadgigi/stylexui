const path = require('path');

module.exports = {
  plugins: [
    require('postcss-url')({
      url: 'copy',
      basePath: path.resolve(__dirname, 'assets'),
      assetsPath: 'assets'
    })
  ]
}