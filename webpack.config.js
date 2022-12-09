const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
  // entry: {
  //   app: './src/index.tsx'
  // },
  target: 'web',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: '[name].js'
    publicPath: "http://localhost:8081/",
  },
  // optimization: {
  //   minimize: true,
  //   splitChunks: {
  //     // always create vendor.js
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'initial',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "react": "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime"
    },
  },
  devServer: {
    port: 8081,
    hot: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "blog",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './BlogIndex': './src/bootstrap',
      },
      shared: {
        ...deps,
        preact: {
          singleton: true,
          eager: false,
          requiredVersion: deps.preact
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
};
