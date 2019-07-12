import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import M from 'materialize-css';
import reduxStore from './redux-store';

import StatsBar from './StatsBar';
import NavBar from './NavBar';
import PageView from './PageView';
import BorderWrapper from './BorderWrapper';
import 'react-notifications/lib/notifications.css'; // TODO: needed?

class App extends Component {
  componentWillMount() {
    M.AutoInit();
  }

  render() {
    return (
      <Provider store={reduxStore}>
        <div className="App">
          <BorderWrapper>
            <StatsBar />
            <NavBar />
            <PageView />
          </BorderWrapper>
        </div>
      </Provider>
    );
  }
}

export default App;
