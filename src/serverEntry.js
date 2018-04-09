import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import createStore from './store';
import App, { routes } from './App';

function matchRoute(location) {
  return routes.find((route) => {
    const match = matchPath(location, route);
    return !!match && match.isExact;
  });
}

function fetchData(store, route, location) {
  if (!route) {
    return Promise.resolve();
  }
  const match = matchPath(location, route);
  return route.fetchData({ store, match });
}

function createApp({
  location,
}) {
  const store = createStore({
    isServer: true,
    initialState: {},
  });
  const context = {};

  const matchedRoute = matchRoute(location);

  return fetchData(store, matchedRoute, location)
    .then(() => {
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
        notFound: !matchedRoute,
      };
    });
}

export default createApp;

export { createApp };
