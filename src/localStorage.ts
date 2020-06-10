
const selectedDriversKey = 'selectedDrivers';
export function getSelectedDriverNames(): string[] {
  const names = localStorage.getItem(selectedDriversKey);
  if(!names){
    return [];
  }
  return names.split(',');
}

export function setSelectedDriverNames(names: string[]) {
  localStorage.setItem(selectedDriversKey, names.join(','));
}