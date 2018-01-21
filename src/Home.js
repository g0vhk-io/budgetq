import React, { Component } from 'react';
import {connect} from 'react-redux';
import List from './List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';


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
