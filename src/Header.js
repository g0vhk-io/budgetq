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
            <h2 style={{maxWidth:'70%'}}>g0vhk<br/>財務委員會書面答覆搜尋器&nbsp;&nbsp;</h2>&nbsp;
            <div class="fb-like" data-href="https://www.facebook.com/g0vhk.io/" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="false"></div>
          </Toolbar>
        </AppBar>
        <AppBar position="static" color="default">
          <Toolbar>
            <TextField
              id="search"
              placeholder="關鍵字"
              margin="normal"
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

