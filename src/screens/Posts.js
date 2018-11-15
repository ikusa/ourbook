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
        <h2>Posts</h2>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
          <div style={{margin: 10}}>
            <Card
              category="Posts"
              title={''}
              body={''}
              cardAction={this.cardAction}
              id={0}
              isCreating={true}
              isEditing={true}
              toggleEdit={this.toggleEditPost}
              handleDelete={this.handleDeletePost}
              handleSubmit={this.handleSubmit}
            />
          </div>
          {posts
            ? posts.map((post) => {
                return (
                  <div style={{margin: 10}} key={post.id}>
                    <Card
                      category="Posts"
                      title={post.title}
                      body={post.body}
                      cardAction={this.cardAction}
                      id={post.id}
                      isEditing={post.isEditing}
                      toggleEdit={this.toggleEditPost}
                      handleDelete={this.handleDeletePost}
                      handleSubmit={this.handleSubmit}
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
    let post = this.state.posts.find((post) => post.id === id);
    if (post) {
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
    }
  };
  toggleShowComment = (id: number) => {
    return async () => {
      let posts = [...this.state.posts];
      let post = posts.find((post) => post.id === id);
      if (post) {
        post.showComments = !post.showComments;
        if (post.showComments) {
          let commentsUrl = `https://jsonplaceholder.typicode.com/posts/${id +
            1}/comments`;
          let responses = await fetch(commentsUrl);
          let comments = await responses.json();
          post.comments = comments;
        }
        this.setState({
          posts,
        });
      }
    };
  };
  toggleEditPost = (id: number, postData: {title: string, body: string}) => {
    return async () => {
      let posts = [...this.state.posts];
      let post = posts.find((post) => post.id === id);
      if (post) {
        post.isEditing = !post.isEditing;
        if (!post.isEditing) {
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
          let postResponse = await responses.json();
          post = {...post, postResponse};
        }
        this.setState({
          posts,
        });
      }
    };
  };
  handleDeletePost = (id: number) => {
    return async () => {
      let posts = [...this.state.posts];
      let postsUrl = `https://jsonplaceholder.typicode.com/posts/1${id}`;
      await fetch(postsUrl, {
        method: 'DELETE',
      });
      posts = posts.filter((post) => {
        return post.id === id ? false : true;
      });

      this.setState({
        posts,
      });
    };
  };
  handleSubmit = (input: {title: string, body: string}) => {
    return async () => {
      let {title, body} = input;
      let responses = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      );
      let postResponse = await responses.json();
      console.log('posts response ', postResponse);
      this.setState({
        posts: [...this.state.posts, postResponse],
      });
    };
  };
}

export default Posts;
