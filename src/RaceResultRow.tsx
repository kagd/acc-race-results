import React from 'react';
import { CombinedRaceResult } from './types';

interface RaceResultRowProps {
  raceResult: CombinedRaceResult;
}

export function RaceResultRow(props: RaceResultRowProps) {
  const { raceResult } = props;
  const positionChange = raceResult.qualifying.finishingPosition - raceResult.finishingPosition;
  const posChange = positionChange > -1 ? `+${positionChange}` : positionChange.toString();
  return (
    <tr key={raceResult.nameFirstLast} title={raceResult.nameFirstLast}>
      <td>{raceResult.nameLastFirst}</td>
      <td>{raceResult.car} #{raceResult.carNumber}</td>
      <td>{raceResult.qualifying.finishingPosition}</td>
      <td>{raceResult.finishingPosition} ({posChange})</td>
      <td>{raceResult.bestLap}</td>
      <td>{raceResult.consistency}</td>
      <td>{raceResult.ballast || 'TBD'}</td>
      <td>{raceResult.lapsLed}</td>
    </tr>
  );
};