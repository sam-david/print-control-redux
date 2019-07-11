import { SET_BED_TEMP, SET_TOOL_TEMP, PING_JOB_STATUS, PING_CONNECTION_STATUS, PING_PRINTER_STATUS,  SELECT_PRINTER, CONNECT_TO_PRINTER } from './types';
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

export const connectToPrinter = (printer) => dispatch => {
  console.log('connectToPrinter', printer)
  let credentials = printerCredentials(printer);
  superagent
    .post(credentials.url + '/api/connection')
    .send({ command: 'connect'})
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      console.log("CONNECT RESPONSE", res);
      if (err) {
        console.error(err);
      } else {
        dispatch({
          type: CONNECT_TO_PRINTER
        })
      }
    });
}

export const selectPrinter = (printer) => dispatch => {
    console.log('selectPrinter', printer)
    dispatch({
      type: SELECT_PRINTER,
      printer: printer
    })
}

export const pingJobStatus = (printer) => dispatch => {
  console.log('pingJobStatus', printer)
  let credentials = printerCredentials(printer);
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

export const pingConnectionStatus = (printer) => dispatch => {
  // TODO: is this irrelevant with the pingPrinterStatus (printerstatus)?
  console.log('pingConnectionStatus', printer)
  let credentials = printerCredentials(printer);
  superagent
    .get(credentials.url + '/api/connection')
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        dispatch({
          type: PING_CONNECTION_STATUS,
          connectionStatus: res.body.current.state
        })
      }
    });
}

export const pingPrinterStatus = (printer) => dispatch => {
  console.log('pingPrinterStatus', printer)
  let credentials = printerCredentials(printer);
  superagent
    .get(credentials.url + '/api/printer')
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        let payload = {
          toolTemp: res.body.temperature.tool0.actual,
          toolTempTarget: res.body.temperature.tool0.target,
          bedTemp: res.body.temperature.bed.actual,
          bedTempTarget: res.body.temperature.bed.target,
          printerStatus: res.body.state.text
        }

        dispatch({
          type: PING_PRINTER_STATUS,
          payload: payload
        })
      }
    });
}
