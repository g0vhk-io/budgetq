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
        <TableCell style={{width: '15%', padding: '0', paddingLeft: '1em'}}>
          {meeting.year} 年 <br/>{meeting.reply_serial_no} {meeting.member}<br/>
        </TableCell>
        <TableCell>
        
          <Link to={ "/reply/" + meeting.key } target="_blank">
            {meeting.question}
          </Link>
        </TableCell>
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
