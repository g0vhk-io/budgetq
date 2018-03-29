import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store';
import App, { routes } from './App';

function createApp({
  location,
}) {
  const store = createStore({
    isServer: true,
    initialState: {},
  });
  const context = {};

  const fetches = routes.map((route) => {
    const match = matchPath(location, route);
    if (match) {
      return route.fetchData({ store, match });
    }
    return Promise.resolve();
  });
  const instance = <App />;

  return Promise.all(fetches)
    .then(() => {
      const app = (
        <Provider store={store}>
          <StaticRouter
            location={location}
            context={context}
          >
            {instance}
          </StaticRouter>
        </Provider>
      );

      const content = ReactDOMServer.renderToString(app);
      return {
        content,
        context,
        store,
      };
    });
}

export default createApp;

export { createApp };
