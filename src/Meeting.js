import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { withRouter } from 'react-router';
import { loadBureauMeetings } from './actions';
import MeetingTable from './MeetingTable';


class Meeting extends Component {
  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    const { load } = this.props;
    const { year, bureau } = this.props.match.params;
    load(year, bureau);
  }

  handleChangePage(event, page) {
    const { load } = this.props;
    const { year, bureau } = this.props.match.params;
    load(year, bureau, page);
  }

  render() {
    const { bureauMeeting } = this.props;
    const { year } = this.props.match.params;
    return (
      <div>
        <AppBar position="static" color="accent">
          <Toolbar>
            {year - 1}&nbsp;至&nbsp;{year}&nbsp;年度&nbsp;&nbsp;
            {bureauMeeting.bureau}
          </Toolbar>
        </AppBar>
        { bureauMeeting.meetings &&
          <MeetingTable
            meetings={bureauMeeting.meetings}
            offset={bureauMeeting.offset}
            total={bureauMeeting.total}
            limit={bureauMeeting.limit}
            handleChangePage={this.handleChangePage}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({ bureauMeeting: state.bureauMeeting });

const mapDispatchToProps = dispatch => (
  {
    load: (year, bureau, page) => dispatch(loadBureauMeetings(year, bureau, page)),
  }
);

Meeting.defaultProps = {
  load: null,
  match: null,
  bureauMeeting: null,
};

Meeting.propTypes = {
  load: PropTypes.func,
  match: PropTypes.object,
  bureauMeeting: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Meeting));
