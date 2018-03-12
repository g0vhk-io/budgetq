import React from 'react';
import { withRouter, Route, Switch } from 'react-router';
import Home from './Home';
import Reply from './Reply';
import Header from './Header';
import Meeting from './Meeting';
import Search from './Search';
import GAListener from './GAListener';

const GoogleAnalytics = withRouter(GAListener);

export default function App() {
  return (
    <div>
      <Header />
      <GoogleAnalytics />
      <Switch>
        <Route exact path="/reply/:replyKey/" component={Reply} />
        <Route exact path="/meeting/:year/:bureau/" component={Meeting} />
        <Route exact path="/search/:keyword" component={Search} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
