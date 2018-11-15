//@flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Delete from '@material-ui/icons/Delete';

type Props = {
  classes: Object,
  id: number,
  title: string,
  body: string,
  category: string,
  isCreating: boolean,
  isEditing: boolean,
  isAlbum: boolean,
  cardAction: Function,
  toggleEdit: Function,
  handleSubmit: Function,
  handleDelete: Function,
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
type State = {
  title: string,
  body: string,
};
class SimpleCard extends React.Component<Props, State> {
  state = {
    title: this.props.title,
    body: this.props.body,
  };
  render() {
    const {
      classes,
      cardAction,
      id,
      category,
      isCreating,
      isEditing,
      toggleEdit,
      handleDelete,
      isAlbum,
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {category}
            </Typography>
            {!isAlbum ? (
              isCreating ? (
                <ButtonBase
                  size="small"
                  color="secondary"
                  onClick={this._handleSubmit}
                >
                  <Check />
                </ButtonBase>
              ) : (
                <div>
                  <ButtonBase
                    size="small"
                    color="secondary"
                    onClick={toggleEdit(id, this.state)}
                  >
                    {isEditing ? <Check /> : <Edit />}
                  </ButtonBase>
                  <ButtonBase
                    size="small"
                    color="primary"
                    onClick={handleDelete(id)}
                  >
                    <Delete />
                  </ButtonBase>
                </div>
              )
            ) : null}
          </div>

          <Typography variant="h5" component="h2">
            {isEditing ? (
              <TextField
                style={{width: 600}}
                type="text"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            ) : (
              this.state.title
            )}
          </Typography>
          <Typography component="p">
            {isEditing ? (
              <TextField
                style={{width: 600}}
                type="text"
                value={this.state.body}
                onChange={this.handleBodyChange}
              />
            ) : (
              this.state.body
            )}
          </Typography>
        </CardContent>
        <CardActions style={{display: 'flex'}}>{cardAction(id)}</CardActions>
      </Card>
    );
  }
  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  };
  handleBodyChange = (event) => {
    this.setState({body: event.target.value});
  };
  _handleSubmit = () => {
    this.setState({title: '', body: ''});
    this.props.handleSubmit(this.state)();
    alert('submitted, scroll to bottom to check !!');
  };
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
