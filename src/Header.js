import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { search } from './actions';

const styles = theme => ({
  root: {
  },
  flex: {
  },
  search: {
    flex: 1,
  }
});

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              <h4>&nbsp;&nbsp;&nbsp;財務委員會書面答覆搜尋器</h4>
            </Typography>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default">
          <Toolbar>
            &nbsp;&nbsp;&nbsp;
            <TextField
              id="search"
              label="關鍵字"
              type="search"
              margin="normal"
              onKeyPress={(ev) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === 'Enter') {
                // Do code here
                  console.log(this.props.history);
                  ev.preventDefault();
                  this.props.history.push('/search/' + ev.target.value);
                }
              }}
              className={classes.search}
              color="contrast"
            />

          </Toolbar>
        </AppBar>
      </div>
    );
  }
};


let mapStateToProps = (state) => {
}

let mapDispatchToProps = (dispatch) => {
  return { 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));

