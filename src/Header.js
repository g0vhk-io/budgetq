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
import HomeIcon from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';
import TiSocialFacebook from 'react-icons/lib/ti/social-facebook';
import TiSocialGithub from 'react-icons/lib/ti/social-github';

const styles = theme => ({
  tool: {
    padding: 0
  },
  social: {
    color: "#FFF",
    background: "#777",
    padding:  0
  },
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
            <h2 style={{maxWidth:'70%'}}><IconButton style={{color:'#FFF'}} onClick={() => {this.props.history.push('/');}}><HomeIcon /></IconButton>g0vhk<br/>開支預算問題書面答覆搜尋器&nbsp;&nbsp;</h2>&nbsp;
            <div class="fb-like" data-href="https://www.facebook.com/g0vhk.io/" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="false"></div>
          </Toolbar>
        </AppBar>
        <AppBar position="static" className={classes.social}>
          <Toolbar className={classes.tool}>
          <a target="_blank " href="https://www.facebook.com/g0vhk.io"><IconButton><TiSocialFacebook size={30} color="white"/></IconButton></a>
          <a target="_blank" href="https://github.com/g0vhk-io"><IconButton><TiSocialGithub style={{float:'left'}} size={30} color="white"/></IconButton></a>
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

