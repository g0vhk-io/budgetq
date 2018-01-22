import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from './List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';

const styles = theme => ({
  root: {
  },
  flex: {
  },
  search: {
    flex: 1,
  }
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.search = null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField
              id="search"
              placeholder="關鍵字"
              margin="normal"
              inputRef={input => this.search = input}
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                // Do code here
                  console.log(this.props.history);
                  ev.target.blur();
                  ev.preventDefault();
                  this.props.history.push('/search/' + ev.target.value);
                }
              }}
              className={classes.search}
              color="contrast"
            />
            <IconButton aria-label="Search" onClick={
              (ev) => {
                ev.preventDefault();
                console.log(this.refs);
                let keyword = this.search.value;
                this.props.history.push('/search/' + keyword);
              }
            }>
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>


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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
