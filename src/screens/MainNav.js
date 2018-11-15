//@flow
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SideNav from '../components/SideNav';
import UsersContainer from '../container/UsersContainer';
import Posts from './Posts';
import Albums from './Albums';

class MainNav extends Component<{}> {
  routes = [
    {name: 'Users', path: '/'},
    {name: 'Posts', path: '/posts'},
    {name: 'Albums', path: '/albums'},
  ];
  render() {
    return (
      <div>
        <SideNav navContent={this.navContent} routes={this.routes} />
      </div>
    );
  }
  navContent = () => {
    return (
      <div>
        <div className="content">
          <Route exact path="/" component={UsersContainer} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/user/posts/:id" component={Posts} />
          <Route path="/albums" component={Albums} />
          <Route path="/user/albums/:id" component={Albums} />
        </div>
      </div>
    );
  };
}
export default MainNav;
