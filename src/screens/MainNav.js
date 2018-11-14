//@flow
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/user/posts/:id" component={Posts} />
          <Route path="/albums" component={Users} />
        </div>
      </div>
    );
  };
  routes = [
    {name: 'Users', path: '/'},
    {name: 'Posts', path: '/posts'},
    {name: 'Albums', path: '/'},
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
    this.setState({
      render: !render,
    });
  };
}
export default MainNav;
