import React, { Component } from 'react';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-82689420-3');

class GAListener extends Component {
  componentDidMount() {
    this.sendPageView(this.props.history.location);
    this.props.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default GAListener;
