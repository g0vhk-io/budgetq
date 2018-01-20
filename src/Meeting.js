import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadBureauMeetings } from './actions';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';

class Meeting extends Component {
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

  renderMeeting(meeting) {
    return (
      <TableRow>
        <TableCell>{meeting.head}</TableCell>
        <TableCell>{meeting.member}</TableCell>
        <TableCell>{meeting.sub_head}</TableCell>
        <TableCell>{meeting.programme}</TableCell>
        <TableCell>{meeting.question}</TableCell>
      </TableRow>
    );   
  }

  render() {
    const { bureauMeeting } = this.props;
    const { year, bureau } = this.props.match.params;
    return (
      <div>
        <AppBar position="static" color="accent">
            <h5>
              &nbsp; <Link to="/">主頁</Link> &nbsp;/&nbsp;{year-1}&nbsp;至&nbsp;{year}&nbsp;年度&nbsp;&nbsp;
              {bureauMeeting.bureau}
            </h5>
        </AppBar>
        <Table>
         {bureauMeeting.meetings &&
          <TableHead>
            <TableRow>
              <TablePagination
                  colSpan={6}
                  count={bureauMeeting.total}
                  rowsPerPage={bureauMeeting.limit}
                  page={bureauMeeting.offset / bureauMeeting.limit}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage.bind(this)}
                  onChangeRowsPerPage={() => {}}
              />
            </TableRow>
          </TableHead>}

          <TableBody>
          {bureauMeeting.meetings && bureauMeeting.meetings.map((m) => { return this.renderMeeting(m);})}
          </TableBody>
        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
