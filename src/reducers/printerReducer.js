import {
  CONNECT_TO_PRINTER,
  HOME_PRINTER,
  GET_FILES,
  SET_TOOL_TEMP,
  SET_BED_TEMP,
  CANCEL_JOB,
  PING_JOB_STATUS,
  PING_CONNECTION_STATUS,
  PING_PRINTER_STATUS,
  SELECT_PRINTER
} from '../actions/types';

const initialState = {
  selectedPrinter: 'makergear',
  localTargetToolTemp: 210,
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
  switch(action.type) {
    case CONNECT_TO_PRINTER:
      return {
        ...state,
        connectionStatus: action.payload
      };
    case GET_FILES:
      return {
        ...state,
        files: action.files
      };
    case SET_BED_TEMP:
      return {
        ...state,
        bedTempTarget: action.temp
      };
    case SET_TOOL_TEMP:
      return {
        ...state,
        toolTempTarget: action.temp
      };
    case PING_JOB_STATUS:
      return {
        ...state,
        printProgress: action.payload.progress.completion,
        printTimeLeft: action.payload.progress.printTimeLeft
      };
    case PING_CONNECTION_STATUS:
      return {
        ...state,
        connectionStatus: action.connectionStatus
      };
    case PING_PRINTER_STATUS:
      return {
        ...state,
        toolTemp: action.payload.toolTemp,
        toolTempTarget: action.payload.toolTempTarget,
        bedTemp: action.payload.bedTemp,
        bedTempTarget: action.payload.bedTempTarget,
        printerStatus: action.payload.printerStatus,
        connectionStatus: action.payload.printerStatus
      };
    case SELECT_PRINTER:
      if (state.selectedPrinter != action.printer) {
        return {
          ...state,
          selectedPrinter: action.printer,
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
      } else {
        return {
          ...state,
          selectedPrinter: action.printer
        }
      }
    default:
      return state;
  }
}
