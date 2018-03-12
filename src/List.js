import React from 'react';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table, {
  TableCell,
  TableRow,
  TableBody,
} from 'material-ui/Table';

function renderChunks(chunks) {
  return chunks.map(m => (
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

function Year({ year, meetings }) {
  const size = 4;
  const chunks = meetings.map((_, i) => meetings.slice(i, i + size));
  const rows = chunks.map((c, i) =>
    (
      // eslint-disable-next-line react/no-array-index-key
      <TableRow key={`${year}.${i}`}>
        {renderChunks(c)}
      </TableRow>
    ));

  return (
    <div key={year}>
      <AppBar position="static" color="secondary">
        <h5>&nbsp;{year - 1}&nbsp;至&nbsp;{year}&nbsp;年度</h5>
      </AppBar>
      <Table style={{ width: '100%', tableLayout: 'fixed' }}>
        <TableBody>{rows}</TableBody>
      </Table>
    </div>
  );
}

Year.propTypes = {
  year: PropTypes.string.isRequired,
  meetings: PropTypes.array.isRequired,
};

function List({ meeting }) {
  const keys = Object.keys(meeting).sort().reverse();
  return <div>{keys.map(k => <Year key={k} year={k} meetings={meeting[k]} />)}</div>;
}

List.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default List;
