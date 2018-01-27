import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
  TableCell,
  TableRow,
} from 'material-ui/Table';
import { loadMeetings } from './actions';


class List extends Component {
  static renderYear(year, meetings) {
    let i = 0;
    const chunks = [];
    const size = 4;
    for (i = 0; i < meetings.length; i += size) {
      chunks.push(meetings.slice(i, i + size));
    }

    const rows = chunks.map(c =>
      (
        <TableRow>
          { List.renderChunk(c) }
        </TableRow>
      ));

    return (
      <div>
        <AppBar position="static" color="secondary">
          <h5>&nbsp;{year - 1}&nbsp;至&nbsp;{year}&nbsp;年度</h5>
        </AppBar>
        <Table style={{ width: '100%', tableLayout: 'fixed' }}>
          {rows}
        </Table>
      </div>
    );
  }

  static renderChunk(c) {
    return c.map(m => (
      (
        <TableCell>
          <Link to={`/meeting/${m.year}/${m.bureau.bureau}`}>
            <Button color="secondary" fullWidth>
              { m.bureau.name_ch }
            </Button>
          </Link>
        </TableCell>
      )
    ));
  }

  componentDidMount() {
    const { load } = this.props;
    load(2017);
    load(2016);
    load(2015);
    load(2014);
  }

  render() {
    const { meeting } = this.props;
    const keys = Object.keys(meeting).sort().reverse();
    let elements = null;
    if (meeting) {
      elements = keys.map(k => List.renderYear(k, meeting[k]));
    }
    return (
      <div>
        {elements}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meeting: state.meeting,
});

const mapDispatchToProps = dispatch => ({
  load: key => dispatch(loadMeetings(key)),
});

List.defaultProps = {
  meeting: null,
  load: null,
};

List.propTypes = {
  meeting: PropTypes.object,
  load: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
