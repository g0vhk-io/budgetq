import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import HomeIcon from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';
import TiSocialFacebook from 'react-icons/lib/ti/social-facebook';
import TiSocialGithub from 'react-icons/lib/ti/social-github';
import TiSocialTwitter from 'react-icons/lib/ti/social-twitter';
import { withRouter } from 'react-router';

const styles = () => ({
  tool: {
    padding: 0,
  },
  social: {
    color: '#FFF',
    background: '#777',
    padding: 0,
  },
  root: {
  },
  flex: {
  },
  search: {
    flex: 1,
  },
});

const Header = ({ classes, history }) => (
  <div>
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <h2 style={{ maxWidth: '70%' }}>
          <IconButton
            style={{ color: '#FFF' }}
            onClick={() => { history.push('/'); }}
          >
            <HomeIcon />
          </IconButton>
            g0vhk
          <br />
            開支預算問題書面答覆搜尋器&nbsp;&nbsp;
        </h2>
          &nbsp;
        <div
          className="fb-like"
          data-href="https://www.facebook.com/g0vhk.io/"
          data-layout="button"
          data-action="like"
          data-size="large"
          data-show-faces="false"
          data-share="false"
        />
      </Toolbar>
    </AppBar>
    <AppBar position="static" className={classes.social}>
      <Toolbar className={classes.tool}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/g0vhk.io"
        >
          <IconButton>
            <TiSocialFacebook size={30} color="white" />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/g0vhk-io"
        >
          <IconButton>
            <TiSocialGithub size={30} color="white" />
          </IconButton>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/g0vhk_io"
        >
          <IconButton>
            <TiSocialTwitter size={30} color="white" />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  </div>
);


Header.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object.isRequired,
};


Header.defaultProps = {
  history: null,
};

export default withRouter(withStyles(styles)(Header));

