import { processSync as processRace } from './raceResults';
import { processSync as processQualifying } from './qualifyResults';
import * as fs from 'fs';
import * as path from 'path';
import { Driver, CombinedRaceResult } from '../src/types';

const races = [
  'round1-suzuka'
];

const drivers: Driver[] = [];

races.forEach(function(race){
  const qualifyingResults = processQualifying(race);
  const raceResults = processRace(race);

  const fullResults = qualifyingResults.reduce(function(memo, qualifyingResult){
    const raceResult = raceResults.find(raceResult => raceResult.carNumber === qualifyingResult.carNumber);
    const nameParts = raceResult.nameFirstLast.split(' ');
    const firstName = nameParts.shift();
    const lastName = nameParts.join(' ');
    console.log(lastName)
    const nameLastFirst = `${lastName}, ${firstName}`;
    const combinedResult: CombinedRaceResult = {
      ...raceResult,
      nameLastFirst,
      qualifying: {
        bestLap: qualifyingResult.bestLap,
        finishingPosition: qualifyingResult.finishingPosition,
        lapsCompleted: qualifyingResult.lapsCompleted,
        gap: qualifyingResult.gap,
      },
    };
    if(!drivers.find(driver => raceResult.nameFirstLast === driver.nameFirstLast)){
      drivers.push({
        nameFirstLast: raceResult.nameFirstLast,
        nameLastFirst,
        car: raceResult.car,
        carNumber: raceResult.carNumber,
      });
    }
    memo.push(combinedResult);
    return memo;
  }, [] as CombinedRaceResult[]);

  fs.writeFile(path.join(__dirname, '../', 'public', 'results', `${race}.json`), JSON.stringify(fullResults, null, 2), function(err) {
    if (err) {throw err};
  });
});
const sortedDrivers = drivers.sort(function(a, b) {
  return a.nameLastFirst > b.nameLastFirst ? 1 : -1;
});
fs.writeFile(path.join(__dirname, '../', 'public', 'results', 'drivers.json'), JSON.stringify(sortedDrivers, null, 2), function(err) {
  if (err) {throw err};
});