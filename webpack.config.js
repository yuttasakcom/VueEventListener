const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    app: './client/index.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve('client')
    }
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: resolve('client/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('client/assets'),
        to: 'assets',
        ignore: ['.*']
      }
    ]),
  ]
}