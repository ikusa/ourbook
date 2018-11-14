//@flow
import React, {Component} from 'react';
import Card from '../components/Card';
type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
};

type Props = {
  match: Object,
};
type State = {
  posts: Array<Post>,
};
class Home extends Component<Props, State> {
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
                    <Card title={post.title} body={post.body} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default Home;
