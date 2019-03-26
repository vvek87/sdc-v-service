var path = require('path');

module.exports = {
  entry: "./client/src/App.jsx",
  output: {
    path: path.resolve(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      ]
  }
}