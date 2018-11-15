//@flow
import React, {Component} from 'react';
import Table from '../components/Table';
import type {User} from '../types/User';
type Props = {
  users: Array<User>,
  addUsers: Function,
};

type State = {users: Array<User>};
class Stuff extends Component<Props, State> {
  state = {
    users: [],
  };
  async componentWillMount() {
    let responses = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await responses.json();
    this.props.addUsers(users);
  }
  render() {
    let {users} = this.props;
    let isEmpty = users.length === 0;
    let navigationsButton = [
      {
        header: 'Posts',
        buttonName: 'Posts',
        path: '/user/posts/',
      },
      {
        header: 'Albums',
        buttonName: 'Albums',
        path: '/user/albums/',
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
