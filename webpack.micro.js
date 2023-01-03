const HtmlWebpackPlugin = require('html-webpack-plugin');
const prodConfig = require('./webpack.config');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DefinePlugin = require('webpack/lib/DefinePlugin');
const deps = require("./package.json").dependencies;

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
    hot: false,
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
    new ModuleFederationPlugin({
      name: "blog",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './bootstrap': './src/bootstrap',
        './articles': './src/generated/articles.json'
      },
      shared: {
        ...deps
      },
    }),
    new DefinePlugin({
      'process.env.HOST': JSON.stringify(HOST),
    }),
  ]
};
