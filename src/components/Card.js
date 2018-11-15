//@flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type Props = {
  classes: Object,
  id: number,
  title: string,
  body: string,
  cardAction: Function,
};
const styles = {
  card: {
    width: 800,
    // height: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props: Props) {
  const {classes, title, body, cardAction, id} = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Post
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography component="p">{body}</Typography>
      </CardContent>
      <CardActions style={{display: 'flex'}}>{cardAction(id)}</CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
