import {
  SELECT_PAGE
} from '../actions/types';

const initialState = {
  selectedPage: 'Home'
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
