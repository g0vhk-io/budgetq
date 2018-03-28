import React from 'react';
import { Route, Switch } from 'react-router';

import Layout from './Layout';

import Home from './Home';
import Reply from './Reply';
import Meeting from './Meeting';
import Search from './Search';

export default function App() {
  return (
    <Switch>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/reply/:replyKey" component={Reply} />
        <Route exact path="/meeting/:year/:bureau" component={Meeting} />
        <Route exact path="/search/:keyword" component={Search} />
      </Layout>
    </Switch>
  );
}
