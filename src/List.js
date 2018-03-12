import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
  TableCell,
  TableRow,
} from 'material-ui/Table';

class List extends Component {
  static renderYear(year, meetings) {
    const size = 4;
    const chunks = meetings.map((_, i) => meetings.slice(i, i + size));
    const rows = chunks.map((c, i) =>
      (
        <TableRow key={`${year}.${i}`}>
          { List.renderChunk(c) }
        </TableRow>
      ));

    return (
      <div key={year}>
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
        <TableCell key={m.bureau.name_ch}>
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

List.defaultProps = {
  meeting: null,
  load: null,
};

List.propTypes = {
  meeting: PropTypes.object,
  load: PropTypes.func,
};

export default List;
