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
  isEditing: boolean,
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
    posts.map((post) => {
      return {...post, isEditing: false};
    });
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
                      category="Posts"
                      title={post.title}
                      body={post.body}
                      cardAction={this.cardAction}
                      id={post.id - 1}
                      isEditing={post.isEditing}
                      toggleEdit={this.toggleEditPost}
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
        <Button onClick={this.toggleShowComment(id)} size="small">
          {post.showComments ? <p>Hide Comment</p> : <p>Show Comment</p>}
        </Button>
      </div>
    );
  };
  toggleShowComment = (id: number) => {
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
  toggleEditPost = (id: number, postData: {title: string, body: string}) => {
    return async () => {
      let posts = [...this.state.posts];
      posts[id].isEditing = !posts[id].isEditing;
      if (!posts[id].isEditing) {
        let postsUrl = `https://jsonplaceholder.typicode.com/posts/1${id}`;
        let responses = await fetch(postsUrl, {
          method: 'PUT',
          body: JSON.stringify({
            id,
            title: postData.title,
            body: postData.body,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        let post = await responses.json();
        posts[id] = {...posts[id], post};
      }
      this.setState({
        posts,
      });
    };
  };
}

export default Posts;
