import { CombinedRaceResult } from "./types";
import fastMemoize from 'fast-memoize';

export const fetchRaceResults = fastMemoize(async function(race: string): Promise<CombinedRaceResult[]> {
  return await (await (fetch(`/results/${race}.json`))).json();
});