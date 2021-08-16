const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = "production";

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: ["@babel/polyfill", path.join(__dirname, 'src', 'index.js')],
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
    filename: 'bundle.js'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public'), 'node_modules']
  },
  devServer: {
    stats: "minimal",
    compress: true, //Enable gzip
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false,
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
    new HtmlWebpackPlugin(
      {
        template: path.join(__dirname, 'public', 'index.html'),
        favicon: path.join(__dirname, 'public', 'sun.ico'),
        minify: {
          // see https://github.com/kangax/html-minifier#options-quick-reference
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }
    )
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [() => [require("cssnano")]],
              },
              sourceMap: true,
            },

          }
        ]
      }
    ],
  }
}