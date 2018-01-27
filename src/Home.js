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
  constructor(props) {
    super(props);
    this.search = null;
    this.setSearchInput = this.setSearchInput.bind(this);
  }

  setSearchInput(target) {
    this.search = target;
  }

  render() {
    const { classes, history } = this.props;
    const { setSearchInput } = this;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField
              id="search"
              placeholder="關鍵字"
              margin="normal"
              inputRef={input => setSearchInput(input)}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.target.blur();
                  ev.preventDefault();
                  history.push(`/search/${ev.target.value}`);
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
                  const keyword = this.search.value;
                  history.push(`/search/${keyword}`);
                }
              }
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List />
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

Home.defaultProps = {
  classes: null,
  history: null,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
