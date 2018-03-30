const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const base = require('./webpack.base.conf');

module.exports = merge.smart(base, {
  target: 'node',
  output: {
    path: `${__dirname}/../lib`,
    publicPath: '/',
    libraryTarget: 'commonjs2',
    filename: '[name].js',
  },
  entry: {
    app: './src/serverEntry.js',
  },
  externals: nodeExternals({
    whitelist: /\.css$/,
  }),
});
