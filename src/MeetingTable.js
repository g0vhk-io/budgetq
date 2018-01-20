import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';

class MeetingTable extends Component {
  renderMeeting(meeting) {
    return (
      <TableRow>
        <Link to={ "/reply/" + meeting.key }>
        <TableCell style={{ width: '5%' }}>{meeting.reply_serial_no} {meeting.member}</TableCell>
        <TableCell style={{ width: '95%'}}>{meeting.question}</TableCell>
        </Link>
      </TableRow>
    );   
  }

  render() {
    const { offset, meetings, total, limit, handleChangePage } = this.props;
    return (
      <Table>
       { meetings &&
        <TableHead>
          <TableRow>
            <TablePagination
                colSpan={6}
                rowsPerPageOptions={[]}
                count={ total }
                rowsPerPage={ limit }
                page={ offset / limit}
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
        </TableHead>}

        <TableBody>
        { meetings && meetings.map((m) => { return this.renderMeeting(m);})}
        </TableBody>
      </Table>
    );
  }
};

export default MeetingTable;
