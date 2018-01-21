import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBureauMeetings } from './actions';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import MeetingTable from './MeetingTable';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Button from 'material-ui/Button';


import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';

class Meeting extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }


  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    const { loadBureauMeetings } = this.props;
    const { year, bureau } = this.props.match.params;
    loadBureauMeetings(year, bureau);
  }

  handleChangePage(event, page) {
    const { loadBureauMeetings } = this.props;
    const { year, bureau } = this.props.match.params;
    loadBureauMeetings(year, bureau, page);
  }

  render() {
    const { bureauMeeting } = this.props;
    const { year, bureau } = this.props.match.params;
    return (
      <div>
        <AppBar position="static" color="accent">
          <Toolbar>
              &nbsp;&nbsp;{year-1}&nbsp;至&nbsp;{year}&nbsp;年度&nbsp;&nbsp;
              {bureauMeeting.bureau}
          </Toolbar>
        </AppBar>
        {bureauMeeting.meetings &&
          <MeetingTable meetings={bureauMeeting.meetings} offset={bureauMeeting.offset} total={bureauMeeting.total} limit={bureauMeeting.limit} handleChangePage={this.handleChangePage}/>
        }
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return { bureauMeeting: state.bureauMeeting };
}

let mapDispatchToProps = (dispatch) => {
  return { loadBureauMeetings: (year, bureau, page) => dispatch(loadBureauMeetings(year, bureau, page))};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Meeting));
