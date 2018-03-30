import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './store';
import createHistory from './history';

/* globals window */

const store = createStore({
  // eslint-disable-next-line no-underscore-dangle
  initialState: window.__INITIAL_STATE__,
  isServer: false,
});

const history = createHistory();

/* globals window */
/* eslint-disable */
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
gtag('js', new Date());
/* eslint-enable */

history.listen((location) => {
  gtag('config', 'UA-82689420-3', { page_path: location });
});

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
