export const filamentToGrams = (mm, type = "PLA") => {
  let volumeConversionsByType = {
      "PLA": 1.24,
      "ABS": 1.04,
      "ASA": 1.07,
      "PETG": 1.27,
      "Nylon": 1.08,
      "Polycarbonate": 1.20,
      "HIPS": 1.07,
      "PVA": 1.19,
      "TPU/TPE": 1.20,
      "PMMA": 1.18,
      "CopperFill": 3.90
    }

  let filamentLength = mm;
  let diameter = 1.75;
  let radius = diameter / 2;
  let volume = (Math.PI * radius ** 2 * filamentLength) / 1000.0;
  return volume * volumeConversionsByType[type];
}
