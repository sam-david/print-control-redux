import { SET_BED_TEMP, SET_TOOL_TEMP, PING_JOB_STATUS, PING_CONNECTION_STATUS, PING_PRINTER_STATUS,  SELECT_PRINTER, CONNECT_TO_PRINTER, GET_FILES } from './types';
import superagent from 'superagent';
import { NotificationManager} from 'react-notifications';

import { successConsoleLog, errorConsoleLog, pingConsoleLog, phatConsoleLog, eventConsoleLog } from '../utilities/consoleLog';

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

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const homeAxes = (printer, axes) => dispatch => {
  // Input: axes = ['x', 'y', 'z']
  console.log('homeAxes', printer, 'axes:', axes)
  // NotificationManager.info('Started Homing', axes.join(", "))
  let credentials = printerCredentials(printer);
  superagent
    .post(credentials.url + '/api/printer/printhead')
    .send({
      command: 'home',
      axes: axes
    })
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('homeAxes', err); }
      NotificationManager.success('Homing Sent', axes.join(", "))
      successConsoleLog('homeAxes', res);
    });
}

export const getFiles = (printer) => dispatch => {
  // Input: axes = ['x', 'y', 'z']
  console.log('getFiles', printer)
  let credentials = printerCredentials(printer);
  superagent
      .get(credentials.url + '/api/files')
      .set('X-Api-Key', credentials.apiKey)
      .end((err, res) => {
        if (err) { errorConsoleLog('getFiles', err); }
        let files = res.body.files;
        successConsoleLog('getFiles', files);
        dispatch({
          type: GET_FILES,
          files: files
        })
      });
}

export const jogPrinthead = (printer, axes, distance) => dispatch => {
  // Input: axes = 'x', distance = 12 (mm)
  let credentials = printerCredentials(printer);
  let requestBody = { command: 'jog' }
  requestBody[axes] = distance

  // NotificationManager.info('Jogging | ' + axes.toUpperCase() + ' | ' + distance + ' mm.')

  superagent
    .post(credentials.url + '/api/printer/printhead')
    .send(requestBody)
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('jogPrinthead', err); }
      NotificationManager.success('Jogging | ' + axes.toUpperCase() + ' | ' + distance + ' mm.')
      successConsoleLog('jogPrinthead', res);
    });
}

export const extrudeTool = (printer, amount) => dispatch => {
  // NotificationManager.info('Extruding | ' + amount + ' mm.')
  let credentials = printerCredentials(printer);
  let requestBody = {
      command: 'extrude',
      amount: parseInt(amount)
    }

  superagent
    .post(credentials.url + '/api/printer/tool')
    .send(requestBody)
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('extrudeTool', err); }
      NotificationManager.success('Extruding | ' + amount + ' mm.')
      successConsoleLog('extrudeTool', res);
    });
}

export const setToolTemp = (printer, temp) => dispatch => {
  // NotificationManager.info('Setting Tool Temp | ' + temp + "°C")
  let credentials = printerCredentials(printer);
  let requestBody = {
      command: 'target',
      targets: {
        tool0: parseInt(temp)
      }
    }

  superagent
    .post(credentials.url + '/api/printer/tool')
    .send(requestBody)
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('setToolTemp', err); }
      successConsoleLog('setToolTemp', res);
      NotificationManager.success('Setting Tool Temp | ' + temp + "°C")
      dispatch({
        type: SET_TOOL_TEMP,
        temp: temp
      })
    });
}

export const setBedTemp = (printer, temp) => dispatch => {
  let credentials = printerCredentials(printer);
  let requestBody = {
    command: 'target',
    target: temp
  }

  superagent
    .post(credentials.url + '/api/printer/bed')
    .send(requestBody)
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('setBedTemp', err); }
      successConsoleLog('setBedTemp', res);
      NotificationManager.success('Setting Bed Temp | ' + temp + "°C")
      dispatch({
        type: SET_BED_TEMP,
        temp: temp
      })
    });
}

export const connectToPrinter = (printer) => dispatch => {
  let credentials = printerCredentials(printer);
  superagent
    .post(credentials.url + '/api/connection')
    .send({ command: 'connect'})
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        errorConsoleLog('connectToPrinter', err);
      } else {
        successConsoleLog('connectToPrinter', res);
        NotificationManager.success('Connected To ' + printer.toUpperCase())
        dispatch({
          type: CONNECT_TO_PRINTER
        })
      }
    });
}

export const cancelPrintJob = (printer) => dispatch => {
  eventConsoleLog('cancel_job', printer)
  let credentials = printerCredentials(printer);

  superagent
    .post(credentials.url + '/api/job')
    .send({ command: 'cancel'})
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      phatConsoleLog('PRINT JOB CANCELLED!')
      NotificationManager.error("PRINT JOB CANCELLING");
      if (err) { errorConsoleLog('cancelPrintJob', err); }
    });
}

export const selectAndPrintFile = (printer, file) => dispatch => {
  let credentials = printerCredentials(printer);

  superagent
    .post(credentials.url + '/api/files/local/' + file.path)
    .send({ command: 'select', print: true})
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) { errorConsoleLog('selectAndPrintFile', err); }
      successConsoleLog('selectAndPrintFile', res);
      NotificationManager.success('Selected -' + file.name.substring(0,20))
    });
}

export const selectPrinter = (printer) => dispatch => {
  eventConsoleLog('select_printer', printer)
  NotificationManager.info('Selected Printer - ' + capitalize(printer));
  dispatch({
    type: SELECT_PRINTER,
    printer: printer
  })
}

export const pingJobStatus = (printer) => dispatch => {
  let credentials = printerCredentials(printer);
  superagent
    .get(credentials.url + '/api/job')
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        pingConsoleLog('pingJobStatus', res.body)
        dispatch({
          type: PING_JOB_STATUS,
          payload: res.body
        })
      }
    });
}

export const pingConnectionStatus = (printer) => dispatch => {
  // TODO: is this irrelevant with the pingPrinterStatus (printerstatus)?
  let credentials = printerCredentials(printer);
  superagent
    .get(credentials.url + '/api/connection')
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        console.error(err);
      } else {
        pingConsoleLog('pingConnectionStatus', res.body.current.state)
        dispatch({
          type: PING_CONNECTION_STATUS,
          connectionStatus: res.body.current.state
        })
      }
    });
}

export const pingPrinterStatus = (printer) => dispatch => {
  let credentials = printerCredentials(printer);
  superagent
    .get(credentials.url + '/api/printer')
    .set('X-Api-Key', credentials.apiKey)
    .end((err, res) => {
      if (err) {
        errorConsoleLog('pingPrinterStatus', err);
      } else {
        let payload = {
          toolTemp: res.body.temperature.tool0.actual,
          toolTempTarget: res.body.temperature.tool0.target,
          bedTemp: res.body.temperature.bed.actual,
          bedTempTarget: res.body.temperature.bed.target,
          printerStatus: res.body.state.text
        }

        pingConsoleLog('pingPrinterStatus', payload)
        dispatch({
          type: PING_PRINTER_STATUS,
          payload: payload
        })
      }
    });
}
