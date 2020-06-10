import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { fetchRaceResults } from './service';
import { CombinedRaceResult } from './types';
import { DriversContext } from './DriversContext';
import styles from './race.module.css';
import { RaceResultRow } from './RaceResultRow';

interface RaceProps extends RouteComponentProps<{race: string}> {}

export function Race(props: RaceProps) {
  const [raceResults, setRaceResults] = useState<CombinedRaceResult[]>([]);
  const context = useContext(DriversContext);

  async function fetchRaceAsync(race: string){
    setRaceResults(await fetchRaceResults(race));
  }

  useEffect(function() {
    fetchRaceAsync(props.match.params.race);
  }, [props.match.params.race]);

  if(!raceResults){
    return <div>Loading...</div>
  }

  if(!raceResults.length){
    return <div>No results have been recorded yet</div>
  }

  if(!context.selectedDriverNames.length) {
    return <div>Select 1 or more drivers to see race stats</div>
  }

  const selectedDriversRaceResults = context.selectedDriverNames.sort().map((driverName) => {
    const result = raceResults.find(result => result.nameFirstLast === driverName);
    return result as CombinedRaceResult;
  });

  return (
    <div>
      Compare best laps | Show amount of ballast applied | column sorting | Teams
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Driver</th>
            <th>Car</th>
            <th>
              Started
            </th>
            <th>
              Finished
            </th>
            <th>
              Best Lap
            </th>
            <th>
              Consistency
            </th>
            <th>Ballast</th>
            <th>Laps led</th>
          </tr>
        </thead>
        <tbody>
          {selectedDriversRaceResults.map((raceResult) =><RaceResultRow raceResult={raceResult} key={raceResult.nameFirstLast} />)}
        </tbody>
      </table>
    </div>
  );
};