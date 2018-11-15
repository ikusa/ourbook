//@flow
import React, {Component} from 'react';
import {HashRouter} from 'react-router-dom';
import MainNav from './screens/MainNav';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <MainNav />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
