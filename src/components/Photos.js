//@flow
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from './Dialog';

type Photo = {
  albumId: string,
  id: string,
  title: string,
  url: string,
  thumbnailUrl: string,
};
type Props = {
  photos: Array<Photo>,
  classes: Object,
};
const styles = {
  card: {
    width: 200,
    maxHeight: 400,
    margin: 20,
  },
  media: {
    objectFit: 'cover',
  },
};

function ImgMediaCard(props: Props) {
  const {classes, photos} = props;
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {photos.map((photo) => {
        return (
          <Card className={classes.card}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              className={classes.media}
              height="150"
              width="150"
              image="https://via.placeholder.com/150/92c952"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                style={{height: 70}}
                gutterBottom
                variant="p"
                component="p"
              >
                {photo.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Dialog />
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
