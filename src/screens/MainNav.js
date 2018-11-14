//@flow
import React, {Component} from 'react';
import {Route, NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SideNav from '../components/SideNav';
import Users from './Users';
import Posts from './Posts';

type State = {
  render: boolean,
};
class MainNav extends Component<*, State> {
  state = {
    render: false,
  };
  navContent = () => {
    return (
      <div>
        <div className="content">
          <Route exact path="/" component={Users} />
          <Route path="/posts" component={Posts} />
          <Route path="/albums" component={Users} />
        </div>
      </div>
    );
  };
  routes = [
    {name: 'Users', path: '/'},
    {name: 'posts', path: '/posts'},
    {name: 'albums', path: '/'},
  ];
  render() {
    return (
      <div>
        <SideNav navContent={this.navContent} routes={this.routes} />
      </div>
    );
  }

  _handleOnclick = () => {
    let {render} = this.state;
    console.log('asdasd');
    this.setState({
      render: !render,
    });
  };
}
export default MainNav;
