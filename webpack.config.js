const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

require('dotenv').config();
const deps = require("./package.json").dependencies;
const HOST = process.env.HOST;
console.log('HOST: ' + HOST);

module.exports = {
  output: {
    filename: "[name].[contenthash].js",
    publicPath: HOST,
    clean: true
    // publicPath: "auto"
  },
  optimization: {
    minimize: false,
    // runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          "css-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.tsx', '.ts', '.js']
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
    new ModuleFederationPlugin({
      name: "blog",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './BlogIndex': './src/bootstrap'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps["react-dom"]
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: "./src/index.html"
    }),
    new DefinePlugin({
      'process.env.HOST': JSON.stringify(HOST),
    }),
  ],
};
