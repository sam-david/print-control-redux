import { SET_BED_TEMP, SET_TOOL_TEMP } from './types';

export const setBedTemp = (postData) => dispatch => {
    console.log('setting bed temp')
    fetch('http://10.0.1.4/api/printer/bed', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then(post => dispatch({
      type: SET_BED_TEMP,
      payload: postData
    }));
}
