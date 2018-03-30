import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { loadBureauMeetings } from './actions';
import MeetingTable from './MeetingTable';

function TitleBar({ bureau, year }) {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        {`${year - 1} 至 ${year} 年度  ${bureau}`}
      </Toolbar>
    </AppBar>
  );
}

TitleBar.propTypes = {
  year: PropTypes.string,
  bureau: PropTypes.string,
};

TitleBar.defaultProps = {
  year: '',
  bureau: '',
};

class Meeting extends Component {
  static propTypes = {
    load: PropTypes.func,
    match: PropTypes.object,
    bureauMeeting: PropTypes.object,
  };

  static defaultProps = {
    load: null,
    match: null,
    bureauMeeting: null,
  };

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
        <TitleBar year={year} bureau={bureauMeeting.bureau} />
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

const mapDispatchToProps = dispatch => ({
  load: (year, bureau, page) => dispatch(loadBureauMeetings(year, bureau, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
