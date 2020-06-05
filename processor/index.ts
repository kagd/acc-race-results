import { processSync as processRace } from './raceResults';
import { processSync as processQualifying } from './qualifyResults';
import * as fs from 'fs';
import * as path from 'path';
import { Driver, CombinedRaceResult } from '../src/types';

const races = [
  '200602-0VG-preseason'
];

const drivers: Driver[] = [];

races.forEach(function(race){
  const qualifyingResults = processQualifying(race);
  const raceResults = processRace(race);

  const fullResults = qualifyingResults.reduce(function(memo, qualifyingResult){
    const raceResult = raceResults.find(raceResult => raceResult.carNumber === qualifyingResult.carNumber);
    const combinedResult: CombinedRaceResult = {
      ...raceResult,
      qualifying: {
        bestLap: qualifyingResult.bestLap,
        finishingPosition: qualifyingResult.finishingPosition,
        lapsCompleted: qualifyingResult.lapsCompleted,
        gap: qualifyingResult.gap,
      },
    };
    if(!drivers.find(driver => raceResult.name === driver.name)){
      const nameParts = raceResult.name.split(' ');
      drivers.push({
        name: `${nameParts[0]} ${nameParts[1]}`,
        nameLastFirst: `${nameParts.pop()}, ${nameParts.join(' ')}`,
        car: raceResult.car,
        carNumber: raceResult.carNumber,
      });
    }
    memo[raceResult.name] = combinedResult;
    return memo;
  }, {} as {[key: string]: CombinedRaceResult});

  fs.writeFile(path.join(__dirname, '../', 'public', 'results', `${race}-combinedResult.json`), JSON.stringify(fullResults, null, 2), function(err) {
    if (err) {throw err};
  });
});

fs.writeFile(path.join(__dirname, '../', 'public', 'results', 'drivers.json'), JSON.stringify(drivers, null, 2), function(err) {
  if (err) {throw err};
});