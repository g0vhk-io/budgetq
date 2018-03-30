module.exports = {
  devtool: 'source-map',
  output: {
    path: `${__dirname}/../dist`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
