import {
  CONNECT_TO_PRINTER,
  HOME_PRINTER,
  GET_FILES,
  JOG_PRINTHEAD,
  SET_TOOL_TEMP,
  SET_BED_TEMP,
  EXTRUDE_TOOL,
  CANCEL_JOB,
  PING_JOB_STATUS,
  PING_CONNECTION_STATUS,
  PING_PRINTER_STATUS
} from '../actions/types';

const initialState = {
  selectedPrinter: 'makergear',
  localTargetToolTemp: 215,
  localTargetBedTemp: 45,
  localTargetExtrudeAmount: 10,
  toolTemp: null,
  toolTempTarget: null,
  bedTemp: null,
  bedTempTarget: null,
  connectionStatus: null,
  printerStatus: null,
  printProgress: null,
  printTimeLeft: null,
  files: []
};

export default function(state = initialState, action) {
  console.log('printerReducer')
  switch(action.type) {
    case CONNECT_TO_PRINTER:
      return {
        ...state,
        connectionStatus: action.payload
      };
    case SET_BED_TEMP:
      return {
        ...state,
        bedTemp: action.payload
      };
    case PING_JOB_STATUS:
      return {
        ...state,
        printProgress: action.payload.progress.completion,
        printTimeLeft: action.payload.progress.printTimeLeft
      };
    default:
      return state;
  }
}