export const printerStats = (printer) => {
  let printers = {
    makergear: {
      xMax: 200,
      yMax: 250,
      zMax: 200
    },
    lulzbot: {
      xMax: 280,
      yMax: 280,
      zMax: 250
    },
    prusa: {
      xMax: 250,
      yMax: 210,
      zMax: 210
    },
    ender: {
      xMax: 220,
      yMax: 220,
      zMax: 300
    }
  }

  return printers[printer];
}
