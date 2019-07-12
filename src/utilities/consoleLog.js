
export const successConsoleLog = (functionName, message) => {
  console.log('%c ' + functionName + ': %c' + message, 'color: orange; font-weight: bold;', 'color: white; background: green;');
}

export const errorConsoleLog = (functionName, message) => {
  console.log('%c ' + functionName + ': %c' + message, 'color: orange; font-weight: bold;', 'color: white; font-weight: bold; background: red;');
}

export const pingConsoleLog = (functionName, message) => {
  if (typeof(message) == 'object') {
    console.log('%c ' + functionName + ': %c' + JSON.stringify(message), 'color: orange; font-weight: bold;', 'color: green;');
  } else {
    console.log('%c ' + functionName + ': %c' + message, 'color: orange; font-weight: bold;', 'color: green;');
  }
}

export const phatConsoleLog = (message) => {
  let styles = [
    'background: linear-gradient(#D33106, #571402)'
    , 'border: 1px solid #3E0E02'
    , 'color: white'
    , 'display: block'
    , 'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)'
    , 'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
    , 'line-height: 40px'
    , 'text-align: center'
    , 'font-weight: bold'
  ].join(';');

  console.log('%c ' + message, styles);
}
