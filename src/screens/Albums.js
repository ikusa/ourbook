//@flow
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '../components/Card';
import ImgMediaCard from '../components/Photos';

type Photo = {
  albumId: string,
  id: string,
  title: string,
  url: string,
  thumbnailUrl: string,
};
type Album = {
  userId: number,
  id: number,
  title: string,
  showPhotos: boolean,
  photos: Array<Photo>,
};
type Props = {
  match: Object,
};
type State = {
  albums: Array<Album>,
};
class Albums extends Component<Props, State> {
  state = {
    albums: [],
  };
  async componentWillMount() {
    let id = this.props.match.params.id;
    let albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
    if (id) {
      albumsUrl = `${albumsUrl}?userId=${id}`;
    }
    let responses = await fetch(albumsUrl);
    let albums = await responses.json();
    this.setState({albums: [...albums]});
  }
  render() {
    let {albums} = this.state;
    return (
      <div>
        <h2>Albums</h2>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {albums
            ? albums.map((album) => {
                return (
                  <div style={{margin: 10}}>
                    <Card
                      category="Albums"
                      title={album.title}
                      cardAction={this.cardAction}
                      id={album.id - 1}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
  cardAction = (id: number) => {
    let album = this.state.albums[id];
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {album.showPhotos ? <ImgMediaCard photos={album.photos} /> : null}
        <Button onClick={this.mutateShowPhotos(id)} size="small">
          {album.showPhotos ? <p>Hide photos</p> : <p>Show photos</p>}
        </Button>
      </div>
    );
  };
  mutateShowPhotos = (id: number) => {
    return async () => {
      let albums = [...this.state.albums];
      albums[id].showPhotos = !albums[id].showPhotos;
      if (albums[id].showPhotos) {
        let photosUrl = `https://jsonplaceholder.typicode.com/albums/${id +
          1}/photos`;
        let responses = await fetch(photosUrl);
        let photos = await responses.json();
        albums[id].photos = photos;
      }
      this.setState({
        albums,
      });
    };
  };
}

export default Albums;
