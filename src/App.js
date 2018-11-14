//@flow
import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom';
import MainNav from './screens/MainNav';

class App extends Component<{}> {
  render() {
    return (
      <HashRouter>
        <MainNav />
      </HashRouter>
    );
  }
}

export default App;
