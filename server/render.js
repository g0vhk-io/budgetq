/* eslint-disable global-require */
const assets = require('../dist/assets.json');
const { PRODUCTION } = require('../env');

const scripts = ['manifest', 'vendor', 'app'].reduce((arr, name) => {
  if (name in assets) {
    arr.push(assets[name].js);
  }
  return arr;
}, []);

const styles = [];
if ('css' in assets.app) {
  styles.push(assets.app.css);
}

// eslint-disable-next-line prefer-destructuring
let createApp = require('../lib/app').createApp;

if (!PRODUCTION) {
  const webpack = require('webpack');
  const serverConfig = require('../build/webpack.server.conf');
  const compiler = webpack(serverConfig);
  compiler.watch({
    ignored: /node_modules/,
    polling: true,
  }, (err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log(stats.toString('detailed'));
    }
  });

  const chokidar = require('chokidar');
  const watcher = chokidar.watch('./lib/app');
  const bundleCache = require.resolve('../lib/app');
  watcher.on('change', () => {
    delete require.cache[bundleCache];
    // eslint-disable-next-line prefer-destructuring
    createApp = require('../lib/app').createApp;
  });
}

module.exports = function (app) {
  app.get('*', (req, res) => {
    const { content, context, store } = createApp({ location: req.url });
    if (context.url) {
      res.redirect(302, context.url);
    } else {
      res.render('page', {
        scripts,
        styles,
        content,
        context,
        store: store.getState(),
      });
    }
    res.end();
  });
};
