const path = require('path');


module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // style-loader comes first and followed by css-loader
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
}