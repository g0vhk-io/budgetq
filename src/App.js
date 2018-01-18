import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import {connect} from 'react-redux';
import List from './List';


class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <List/>
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
