import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from './actions';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';


class Search extends Component {

   constructor(props) {
     super(props);
     this.searchWithParams = this.searchWithParams.bind(this);
   }

   searchWithParams(props=this.props) {
     const { keyword } = props.match.params;
     const { search } = props;
     search(keyword);
   }

   componentDidMount() {
     this.searchWithParams();
   }

   
   componentWillReceiveProps(nextProps) {
     console.log(nextProps);
     console.log('next');
     if (this.props.match.params.keyword !== nextProps.match.params.keyword) {
       this.searchWithParams(nextProps);
     }
   }

   handleChangePage(event, page) {
     const { search } = this.props;
     const { keyword } = this.props.match.params;
     search(keyword, page);
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
    const { keyword } = this.props.match.params;
    const { result } = this.props;
    console.log(result);
    return (
      <div>
        <AppBar position="static" color="accent">
          <h5>
            &nbsp; <Link to="/">主頁</Link> &nbsp;/&nbsp; 關鍵字 " { keyword } " 搜尋結果
          </h5>
        </AppBar>
        <Table>
         {result.meetings &&
          <TableHead>
            <TableRow>
              <TablePagination
                  colSpan={6}
                  count={result.total}
                  rowsPerPage={result.limit}
                  page={result.offset / result.limit}
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
          {result.meetings && result.meetings.map((m) => { return this.renderMeeting(m);})}
          </TableBody>
        </Table>

      </div>      
    );
  }

}

let mapStateToProps = (state) => {
  return { result: state.search };
}

let mapDispatchToProps = (dispatch) => {
  return { search: (keyword, page) => dispatch(search(keyword, page))};
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
