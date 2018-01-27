import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';

class MeetingTable extends Component {
  static renderMeeting(meeting) {
    return (
      <TableRow>
        <TableCell style={{ width: '15%', padding: '0', paddingLeft: '1em' }}>
          { meeting.year } 年 <br /> { meeting.reply_serial_no } { meeting.member } <br />
        </TableCell>
        <TableCell>
          <Link to={`/reply/${meeting.key}`} target="_blank">
            {meeting.question}
          </Link>
        </TableCell>
      </TableRow>
    );
  }

  render() {
    const {
      offset, meetings, total, limit, handleChangePage,
    } = this.props;
    return (
      <Table>
        { meetings &&
        <TableHead>
          <TableRow>
            <TablePagination
              colSpan={6}
              rowsPerPageOptions={[]}
              count={total}
              rowsPerPage={limit}
              page={offset / limit}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={() => {}}
            />
          </TableRow>
        </TableHead> }
        <TableBody>
          { meetings && meetings.map(m => MeetingTable.renderMeeting(m)) }
        </TableBody>
      </Table>
    );
  }
}

MeetingTable.propTypes = {
  handleChangePage: PropTypes.func,
  limit: PropTypes.number,
  total: PropTypes.number,
  offset: PropTypes.number,
  meetings: PropTypes.array,
};


MeetingTable.defaultProps = {
  handleChangePage: null,
  limit: 0,
  total: 0,
  offset: 0,
  meetings: [],
};


export default MeetingTable;
