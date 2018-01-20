import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from './actions';
import MeetingTable from './MeetingTable';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import ArrowBack from 'material-ui-icons/ArrowBack';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';


class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.searchWithParams = this.searchWithParams.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
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
  
  render() {
    const { keyword } = this.props.match.params;
    const { result } = this.props;
    console.log(this.props.history.back);
    return (
      <div>
        <AppBar position="static" color="accent">
          <Toolbar>
            &nbsp;&nbsp;<Button raised onClick={() => {this.props.history.goBack()}} color="accent"><ArrowBack/></Button>
            &nbsp; 關鍵字 " { keyword } " 搜尋結果
          </Toolbar>
        </AppBar>
         {result.meetings &&
          <MeetingTable meetings={result.meetings} offset={result.offset} total={result.total} limit={result.limit} handleChangePage={this.handleChangePage}/>}
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
