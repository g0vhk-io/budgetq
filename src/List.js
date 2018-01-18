import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loadMeetings } from './actions';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';


class List extends Component {
  componentDidMount() {
    const { loadMeetings } = this.props;
    loadMeetings(2017);
  }


  renderYear(year, meetings) {
    return (
      <div>
        <AppBar position="static" color="accent">
          <Typography type="title" color="inherit">
            <h2>&nbsp;{year-1}&nbsp;至&nbsp;{year}&nbsp;年度</h2>
          </Typography>
        </AppBar>
        {meetings.map((m) => { return (
           <Button raised color="secondary">
             {m.bureau.name_ch}
           </Button>);
         })}
      </div>);
  }

  render() {
    const { meeting } = this.props;
    console.log(meeting);
    console.log(Object.keys(meeting));
    if (meeting) {
      return (
        <div>
          <br/>
          {Object.keys(meeting).map((k) => { return this.renderYear(k, meeting[k]); })}         
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
