import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';

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
              <h1>&nbsp;&nbsp;&nbsp;財務委員會書面答覆搜尋器</h1>
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
              className={classes.search}
              color="contrast"
            />

          </Toolbar>
        </AppBar>
      </div>
    );
  }
};


export default withStyles(styles)(Header);

