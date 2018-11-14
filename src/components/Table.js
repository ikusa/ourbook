//@flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

type Props = {classes: Object, rows: Array<Object>};
const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props: Props) {
  let {classes, rows} = props;
  let keys = Object.keys(rows[0]).map((key, index) => {
    if (typeof rows[0][key] === 'string') {
      return key;
    }
    return null;
  });
  let tableHeads = Object.keys(rows[0]).map((key, index) => {
    if (typeof rows[0][key] === 'string') {
      return <TableCell key={index}>{key}</TableCell>;
    }
    return null;
  });
  let tableRows = rows.map((row) => {
    let tableCells = keys.map((key) => {
      if (key != null) {
        return (
          <TableCell component="th" scope="row">
            {row[key]}
          </TableCell>
        );
      }
      return null;
    });
    return <TableRow key={row.id}>{tableCells}</TableRow>;
  });
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{tableHeads}</TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
