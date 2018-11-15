//@flow
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '../components/Card';
import Comments from '../components/Comments';

type Comment = {
  email: string,
  body: string,
};
type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
  showComments: boolean,
  comments: Array<Comment>,
};
type Props = {
  match: Object,
};
type State = {
  posts: Array<Post>,
};
class Posts extends Component<Props, State> {
  state = {
    posts: [],
  };
  async componentWillMount() {
    let id = this.props.match.params.id;
    let postsUrl = 'https://jsonplaceholder.typicode.com/posts';
    if (id) {
      postsUrl = `${postsUrl}?userId=${id}`;
    }
    let responses = await fetch(postsUrl);
    let posts = await responses.json();
    this.setState({posts: [...posts]});
  }
  render() {
    let {posts} = this.state;
    return (
      <div>
        <h2>INSERT_USER_NAME Posts</h2>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          {posts
            ? posts.map((post) => {
                return (
                  <div style={{margin: 10}}>
                    <Card
                      title={post.title}
                      body={post.body}
                      cardAction={this.cardAction}
                      id={post.id - 1}
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
    let post = this.state.posts[id];
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {post.showComments ? <Comments comments={post.comments} /> : null}
        <Button onClick={this.mutateShowComment(id)} size="small">
          {post.showComments ? <p>Hide Comment</p> : <p>Show Comment</p>}
        </Button>
      </div>
    );
  };
  mutateShowComment = (id: number) => {
    return async () => {
      let posts = [...this.state.posts];
      posts[id].showComments = !posts[id].showComments;
      if (posts[id].showComments) {
        let commentsUrl = `https://jsonplaceholder.typicode.com/posts/${id +
          1}/comments`;
        let responses = await fetch(commentsUrl);
        let comments = await responses.json();
        posts[id].comments = comments;
      }
      this.setState({
        posts,
      });
    };
  };
}

export default Posts;
