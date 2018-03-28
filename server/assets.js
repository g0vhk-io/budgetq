/* eslint-disable global-require */
const serveStatic = require('serve-static');
const { PRODUCTION } = require('./env');

function serverDevAssets(app) {
  const webpack = require('webpack');

  const devConfig = require('../build/webpack.dev.conf');

  const compiler = webpack(devConfig);

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: devConfig.output.publicPath,
    quiet: true,
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {},
  });

  return new Promise((resolve) => {
    app.use(devMiddleware);
    app.use(hotMiddleware);
    devMiddleware.waitUntilValid(() => {
      resolve(app);
    });
  });
}

function serverProductionAssets(app) {
  return new Promise((resolve) => {
    app.use(serveStatic('dist'));
    resolve(app);
  });
}

module.exports = PRODUCTION ? serverProductionAssets : serverDevAssets;
