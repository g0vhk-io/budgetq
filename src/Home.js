import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from './List';


class Home extends Component {
  render() {
    return (
      <List/>
    );
  }
}

let mapStateToProps = (state) => {
  return { };
}

let mapDispatchToProps = (dispatch) => {
  return { };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
