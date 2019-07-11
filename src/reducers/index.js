import { combineReducers } from 'redux';
import printerReducer from './printerReducer';

export default combineReducers({
  printers: printerReducer
});

