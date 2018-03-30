const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin, NamedModulesPlugin } = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const base = require('./webpack.client.conf');
const utils = require('./utils');

module.exports = merge(base, {
  entry: {
    app: ['./build/dev-client.js'],
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: true }),
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new NamedModulesPlugin(),
    new FriendlyErrorsPlugin(),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), 'dist'),
      prettyPrint: true,
    }),
  ],
});
