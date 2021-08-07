const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: path.join(__dirname, 'src', 'index.js'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  plugins: [
    new HtmlWebpackPlugin(
      { template: path.join(__dirname, 'src', 'index.html') }
    )
  ],
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