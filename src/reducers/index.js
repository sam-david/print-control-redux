import { combineReducers } from 'redux';
import printerReducer from './printerReducer';
import navReducer from './navReducer';

export default combineReducers({
  printers: printerReducer,
  nav: navReducer
});

