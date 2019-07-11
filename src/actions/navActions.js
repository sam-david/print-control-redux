import { SELECT_PAGE } from './types';

export const selectPage = (page) => dispatch => {
    console.log('selectPage', page)
    dispatch({
      type: SELECT_PAGE,
      selectedPage: page
    })
}
