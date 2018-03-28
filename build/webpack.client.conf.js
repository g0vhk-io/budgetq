const merge = require('webpack-merge');
const base = require('./webpack.base.conf');

module.exports = merge.smart(base, {
  entry: {
    app: ['./src/clientEntry.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
});
