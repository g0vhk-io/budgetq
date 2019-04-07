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
          const { reply } = store.getState();
          let title = '開支預算問題的';
          let ogImage = '/gov_bg.png';
          let keywords = ['g0vhk', '立法會', '財委會', '開放數據', '公務員事務局', '教育局', '勞工及福利局 (勞工)', '勞工及福利局 (福利及婦女事務)', '食物及衞生局 (衞生)', '食物及衞生局 (食物安全及環境衞生)', '商務及經濟發展局 (通訊及創意產業)', '商務及經濟發展局 (工商及旅遊業)', '民政事務局', '運輸及房屋局 (運輸)', '運輸及房屋局 (房屋)', '環境局', '申訴專員公署', '立法會秘書處', '廉政公署', '行政長官辦公室', '審計署', '行政署', '創新及科技局', '財經事務及庫務局 (公共財政)', '財經事務及庫務局', '政制及內地事務局', '律政司', '司法機構', '公務員事務局', '發展局(工務)', '發展局 (規劃地政)', '保安局'];
          let ogDescription = '';
          if (reply && reply.data) {
            const { data } = reply;
            title = `開支預算問題 - ${data.member}-${data.key} - ${data.question.substring(0, 20)} `;
            ogImage = `https://storage.googleapis.com/g0vhk/public/budgetq/${data.year}/${data.bureau}/${data.key}.png`;
            ogDescription = `${data.member}:${data.question.substring(0, 100)}`;
            keywords = keywords.concat(data.keywords);
            keywords = keywords.concat([data.member]);
          }
          const urlPath = req.url.split('/');
          if (urlPath.length > 2 && urlPath[1] === 'search') {
            title += ` 「${decodeURIComponent(urlPath[2])} 」結果`;
            keywords = keywords.concat([urlPath[2]]);
          }

          res.render('page', {
            scripts,
            styles,
            content,
            store: store.getState(),
            title,
            ogImage,
            keywords: keywords.join(','),
            ogDescription,
          });
        }
        res.end();
      });
  });
};
