import React from 'react';
import { Route, Switch } from 'react-router';

import Layout from './Layout';

import Home from './Home';
import Reply from './Reply';
import Meeting from './Meeting';
import Search from './Search';
import NotFound from './NotFound';
import { loadBureauMeetings, loadMeetings, loadReply } from './actions';

export const routes = [
  {
    path: '/',
    component: Home,
    fetchData({ store }) {
      return Promise.all([
        2017,
        2016,
        2015,
        2014,
      ].map(yr => store.dispatch(loadMeetings(yr))));
    },
  },
  {
    path: '/reply/:replyKey',
    component: Reply,
    fetchData({ store, match }) {
      const { replyKey: param } = match.params;
      return store.dispatch(loadReply(param));
    },
  },
  {
    path: '/meeting/:year/:bureau',
    component: Meeting,
    fetchData({ store, match }) {
      const { year, bureau } = match.params;
      return store.dispatch(loadBureauMeetings(year, bureau));
    },
  },
  {
    path: '/search/:keyword',
    component: Search,
    fetchData() {
      return Promise.resolve();
    },
  },
];

export default function App() {
  return (
    <Switch>
      <Layout>
        {routes.map(route => (<Route
          key={route.path}
          exact
          path={route.path}
          component={route.component}
        />))}
        <Route component={NotFound} />
      </Layout>
    </Switch>
  );
}
