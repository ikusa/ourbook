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
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

type Navigation = {
  header: string,
  buttonName: string,
  path: string,
};

type Props = {
  classes: Object,
  rows: Array<Object>,
  navigationsButton: Array<Navigation>,
};

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
  let {classes, rows, navigationsButton} = props;
  let keys = Object.keys(rows[0]).map((key, index) => {
    if (typeof rows[0][key] === 'string') {
      return key;
    }
    return null;
  });

  let tableHeads = Object.keys(rows[0]).map((key, index) => {
    if (typeof rows[0][key] === 'string') {
      return <TableCell>{key}</TableCell>;
    }
    return null;
  });
  let navHeads = navigationsButton.map((navigation) => {
    return <TableCell>{navigation.header}</TableCell>;
  });
  let tableRows = rows.map((row) => {
    let rowCells = keys.map((key) => {
      if (key != null) {
        return (
          <TableCell component="th" scope="row">
            {row[key]}
          </TableCell>
        );
      }
      return null;
    });
    let navCells = navigationsButton.map((navigation) => {
      return (
        <TableCell component="th" scope="row">
          <NavLink
            style={{textDecoration: 'none'}}
            to={`${navigation.path}${row.id}`}
          >
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {navigation.buttonName}
            </Button>
          </NavLink>
        </TableCell>
      );
    });
    return <TableRow key={row.id}>{[...rowCells, ...navCells]}</TableRow>;
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{[...tableHeads, ...navHeads]}</TableRow>
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
