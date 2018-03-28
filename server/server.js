const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const serveStatic = require('serve-static');

const { PRODUCTION, PORT } = require('./env');

const app = express();

app.set('view engine', 'ejs');

app.use(helmet());
app.use(morgan(PRODUCTION ? 'combined' : 'dev'));
app.use(serveStatic('public'));

require('./assets')(app)
  .then(require('./render'))
  .then(() => app.listen(PORT, () => console.log('Listening')));


