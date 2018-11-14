//@flow
import React, {Component} from 'react';
import Table from '../components/Table';
type Props = {};
type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
};
type State = {users: Array<User>};
class Stuff extends Component<Props, State> {
  state = {
    users: [],
  };
  async componentWillMount() {
    let responses = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await responses.json();
    this.setState({users: [...users]});
  }
  render() {
    let {users} = this.state;
    let isEmpty = users.length === 0;
    let navigationsButton = [
      {
        header: 'Posts',
        buttonName: 'Posts',
        path: '/user/posts/',
      },
    ];
    return (
      !isEmpty && (
        <div>
          <h2>Users</h2>
          <Table rows={users} navigationsButton={navigationsButton} />
        </div>
      )
    );
  }
}

export default Stuff;
