import {
  SELECT_PAGE
} from '../actions/types';

const initialState = {
  selectedPage: 'PrinterSelect'
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SELECT_PAGE:
      return {
        ...state,
        selectedPage: action.selectedPage
      };
    default:
      return state;
  }
}
