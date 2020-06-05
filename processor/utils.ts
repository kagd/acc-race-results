export function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export const resultsKeyMappings = {
  bestLap: 'bestLap',
  class: 'class',
  consistency: 'consistency',
  driver: 'name',
  gap: 'gap',
  laps: 'lapsCompleted',
  led: 'lapsLed',
  no: 'carNumber',
  pits: 'pitStops',
  pos: 'finishingPosition',
  team: 'team',
  timeRetired: 'timeOrRetired',
  vehicle: 'car',
}