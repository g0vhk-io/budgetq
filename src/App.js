import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Reply from './Reply';
import Header from './Header';
import Meeting from './Meeting';
import { createBrowserHistory } from 'history';
import Search from './Search';
import GAListener from './GAListener';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <Header history={history}/>
        <br/>
        <GAListener history={history}>
          <Router history={history}>
            <Switch>
              <Route exact path='/reply/:replyKey/' component={Reply}/>
              <Route exact path='/meeting/:year/:bureau/' component={Meeting}/>
              <Route exact path='/search/:keyword' component={Search}/>
              <Route path='/' component={Home}/>
            </Switch>
          </Router>
        </GAListener>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { };
}

let mapDispatchToProps = (dispatch) => {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
