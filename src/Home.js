import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import SearchIcon from 'material-ui-icons/Search';
import List from './List';
import { loadMeetings } from './actions';


const styles = () => ({
  root: {
  },
  flex: {
  },
  search: {
    flex: 1,
  },
});


class Home extends Component {
  static fetchData({ store }) {
    return Promise.all([
	  2020,
      2019,
      2018,
      2017,
      2016,
      2015,
      2014,
    ].map(yr => store.dispatch(loadMeetings(yr))));
  }

  static propTypes = {
    classes: PropTypes.object,
    history: PropTypes.object,
    load: PropTypes.func.isRequired,
    meeting: PropTypes.object.isRequired,
  };

  static defaultProps = {
    classes: null,
    history: null,
  };

  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  componentDidMount() {
    const { load } = this.props;
    load(2020);
    load(2019);
    load(2018);
    load(2017);
    load(2016);
    load(2015);
    load(2014);
  }

  setSearchInput(search) {
    this.setState({ search });
  }

  render() {
    const { classes, history } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField
              id="search"
              placeholder="關鍵字"
              margin="normal"
              onChange={e => this.setSearchInput(e.target.value)}
              value={this.state.search}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.target.blur();
                  ev.preventDefault();
                  history.push(`/search/${this.state.search}`);
                }
              }}
              className={classes.search}
              color="contrast"
            />
            <IconButton
              aria-label="Search"
              onClick={
                (ev) => {
                  ev.preventDefault();
                  const keyword = this.state.search;
                  history.push(`/search/${keyword}`);
                }
              }
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List meeting={this.props.meeting} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meeting: state.meeting,
});

const mapDispatchToProps = dispatch => ({
  load: key => dispatch(loadMeetings(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
