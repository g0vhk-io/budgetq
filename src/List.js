import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadMeetings } from './actions';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom'
import Table, {
TableBody,
TableCell,
TableFooter,
TableHead,
TablePagination,
TableRow,
} from 'material-ui/Table';



class List extends Component {
  componentDidMount() {
    const { loadMeetings } = this.props;
    loadMeetings(2017);
    loadMeetings(2016);
    loadMeetings(2015);
    loadMeetings(2014);
  }

  renderChunk(c) {
    return c.map((m) => {
      return(
        <TableCell style={{width: '25%', padding:'0'}}>
          <Link to={"/meeting/" + m.year + "/" + m.bureau.bureau + "/"}>
            <Button color="secondary" fullWidth={true}>
            {m.bureau.name_ch}
            </Button>
          </Link>
        </TableCell>

      );
    });
  }

  renderYear(year, meetings) {
    var i,j,chunks=[],size = 4;
    for (i=0,j=meetings.length; i<j; i+=size) {
      chunks.push(meetings.slice(i,i+size));
    }

    return (
      <div>
        <AppBar position="static" color="secondary">
          <h5>&nbsp;{year-1}&nbsp;至&nbsp;{year}&nbsp;年度</h5>
        </AppBar>
        <Table style={{width: '100%', tableLayout: 'fixed'}}>
        {chunks.map((c) => { let m = c[0]; return (
          <TableRow>
          {this.renderChunk(c)}
          </TableRow>
          );
         })}
        </Table>
      </div>);
  }

  render() {
    const { meeting } = this.props;
    console.log(meeting);
    console.log(Object.keys(meeting));
    if (meeting) {
      return (
        <div>
          {Object.keys(meeting).sort().reverse().map((k) => { return this.renderYear(k, meeting[k]); })}         
        </div>);
    }
    return (<div></div>);
  }
}

let mapStateToProps = (state) => {
  console.log(state.meeting[2017]);
  return {meeting: state.meeting};
}

let mapDispatchToProps = (dispatch) => {
  return { 
     loadMeetings: (key) => dispatch(loadMeetings(key))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
