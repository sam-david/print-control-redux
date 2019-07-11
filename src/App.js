import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import reduxStore from './redux-store';

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <div className="App">
          <h1>test</h1>
        </div>
      </Provider>
    );
  }
}

export default App;
