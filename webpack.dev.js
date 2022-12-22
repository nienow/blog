const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const prodConfig = require('./webpack.config');

const HOST = 'http://localhost:8081/';
module.exports = {
  ...prodConfig,
  mode: 'development',
  output: {
    publicPath: HOST,
    clean: true
  },
  optimization: {
    minimize: false
  },
  devServer: {
    port: 8081,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: "./public/index.html"
    }),
    new DefinePlugin({
      'process.env.HOST': JSON.stringify(HOST),
    }),
  ]
};
