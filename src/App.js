import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';

import reduxStore from './redux-store';

import StatsBar from './StatsBar';
import PrinterSelect from './PrinterSelect';
import BorderWrapper from './BorderWrapper';

class App extends Component {
  render() {
    return (
      <Provider store={reduxStore}>
        <div className="App">
          <BorderWrapper>
            <StatsBar />
            <PrinterSelect />
          </BorderWrapper>
        </div>
      </Provider>
    );
  }
}

export default App;
