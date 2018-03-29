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
  console.log('Compile for SSR');
  const webpack = require('webpack');
  const bundleCache = require.resolve('../lib/app');
  const serverConfig = require('../build/webpack.server.conf');
  const compiler = webpack(serverConfig);
  compiler.watch({
    ignored: /node_modules/,
    polling: true,
  }, (err, stats) => {
    console.log('Webpack update SSR bundle');
    if (err) {
      console.error(err);
    } else {
      console.log(stats.toString('minimal'));
      delete require.cache[bundleCache];
      // eslint-disable-next-line prefer-destructuring
      createApp = require('../lib/app').createApp;
    }
  });
}

module.exports = function (app) {
  app.get('*', (req, res) => {
    createApp({ location: req.url })
      .then(({ content, context, store }) => {
        if (context && context.url) {
          res.redirect(302, context.url);
        } else {
          res.render('page', {
            scripts,
            styles,
            content,
            store: store.getState(),
          });
        }
        res.end();
      });
  });
};
