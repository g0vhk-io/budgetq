import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store';
import App from './App';

function createApp({
  location,
}) {
  const store = createStore({
    isServer: true,
    initialState: {},
  });
  const context = {};

  const app = (
    <Provider store={store}>
      <StaticRouter
        location={location}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  );

  const content = ReactDOMServer.renderToString(app);
  return {
    content,
    context,
    store,
  };
}

export default createApp;

export { createApp };
