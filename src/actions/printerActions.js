import { SET_BED_TEMP, SET_TOOL_TEMP, PING_JOB_STATUS } from './types';
import superagent from 'superagent';

function printerCredentials(printer) {
  if (printer == 'makergear') {
    return {
      url: 'http://10.0.1.12',
      apiKey: '25C8431CFE07466D81CF9FA8831D0D40'
    }
  } else if (printer == 'lulzbot') {
    return {
      url: 'http://10.0.1.4',
      apiKey: '25BF160035354521978E60B57E7F18C6'
    }
  } else if (printer == 'ender') {
    return {
      url: 'http://10.0.1.36',
      apiKey: 'BE943CE2F30D43F6A87C16EFE3340A7C'
    }
  }
}

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


export const pingJobStatus = () => dispatch => {
    console.log('setting bed temp')
    let credentials = printerCredentials('makergear');
    superagent
      .get(credentials.url + '/api/job')
      .set('X-Api-Key', credentials.apiKey)
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          dispatch({
            type: PING_JOB_STATUS,
            payload: res.body
          })
        }
      });
}
