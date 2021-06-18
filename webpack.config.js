var path = require('path');

const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = env => {
    return {
      entry: env.entry,
      output: {
        filename: env.out,
        path: path.resolve(__dirname, 'environment')
      },
      optimization: {
        minimize: false
      },
      stats: 'errors-only',
      mode: 'production',
      plugins: [
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /a\.js|node_modules/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // allow import cycles that include an asyncronous import,
          // e.g. via import(/* webpackMode: "weak" */ './file.js')
          allowAsyncCycles: false,
          // set the current working directory for displaying module paths
          cwd: process.cwd(),
        })
      ]
    }
  }