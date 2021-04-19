var path = require('path');

module.exports = env => {
    return {
      entry: env.entry,
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'environment')
      },
      optimization: {
        minimize: false
      },
      mode: 'production'
    }
  }