const path = require('path')
const fs = require('fs')

function Rev (options) {
  this.options = options
}

Rev.prototype.apply = function (compiler) {
  const options = this.options

  compiler.plugin('done', function (stats) {
    const replacer = function (filePath, from, to) {
      const replace = function (match) {
        return to
      }

      const str = fs.readFileSync(filePath, 'utf8'),
            out = str.replace(new RegExp(from, 'g'), replace)

      fs.writeFileSync(filePath, out)
    }

    const manifestData = JSON.parse(fs.readFileSync(options.manifestPath, 'utf8'))

    for (let key in manifestData) {
      const value = manifestData[key]

      replacer(options.layoutPath, key, value)
    }
  })
}

module.exports = Rev