//@flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  root: {
    flex: 1,
    width: '100%',
    maxWidth: 700,
  },
});
type Comment = {
  email: string,
  body: string,
};
type Props = {
  classes: Object,
  comments: Array<Comment>,
};
function Comments(props: Props) {
  const {classes, comments} = props;

  return (
    <div className={classes.root}>
      <List>
        {comments.map((comment) => {
          let {body, email} = comment;
          return (
            <div>
              <ListItem>
                <ListItemText primary={body} secondary={email} />
              </ListItem>
              <Divider component="li" />
            </div>
          );
        })}
      </List>
    </div>
  );
}

Comments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comments);
