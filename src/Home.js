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
import { loadMeetings } from "./actions";


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
  static propTypes = {
      classes: PropTypes.object,
      history: PropTypes.object,
  };

  static defaultProps = {
      classes: null,
      history: null,
  };

  constructor(props) {
    super(props);
    this.state = { search: '' };
  }

  setSearchInput(search) {
    this.setState({ search })
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
        <List load={this.props.load} meeting={this.props.meeting} />
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
