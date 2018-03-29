const path = require('path');
const merge = require('webpack-merge');
const { DefinePlugin, optimize } = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const base = require('./webpack.client.conf');
const utils = require('./utils');

module.exports = merge.smart(base, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true,
    }),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  },
  plugins: [
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: path.join(process.cwd(), 'dist'),
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
      },
    }),
    // split vendor js into its own file
    new optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
  ],
});
