import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';


ReactGA.initialize('UA-82689420-3');

class GAListener extends Component {
  static sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  componentDidMount() {
    const { history } = this.props;
    GAListener.sendPageView(history.location);
    history.listen(GAListener.sendPageView);
  }

  render() {
    return this.props.children;
  }
}

GAListener.propTypes = {
  history: PropTypes.object,
  children: PropTypes.array,
};


GAListener.defaultProps = {
  history: null,
  children: [],
};


export default GAListener;
