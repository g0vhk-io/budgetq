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

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
