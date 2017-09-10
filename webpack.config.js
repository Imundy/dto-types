var path = require('path');

module.exports = {
  entry: { 
    index: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    library: {
      root: "dto-types",
      amd: "dto-types",
      commonjs: "dto-types"
    },
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};