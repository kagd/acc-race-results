export type Driver = {
  nameFirstLast: string;
  nameLastFirst: string;
  car: string;
  carNumber: number;
}

export type Race = {
  name: string;
  order: number;
}

export interface QualifyingResult{
  finishingPosition: number;
  carNumber: number;
  class: string;
  team: string;
  car: string;
  name: string;
  lapsCompleted: string;
  bestLap: string;
  gap: string;
}

export interface RaceResult {
  finishingPosition: number;
  carNumber: number;
  class: string;
  team: string;
  car: string;
  nameFirstLast: string;
  lapsCompleted: string;
  timeOrRetired: string;
  bestLap: string;
  consistency: string;
  lapsLed: number;
  pitStops: number;
  ballast: number;
}

export interface CombinedRaceResult extends RaceResult {
  nameLastFirst: string;
  qualifying: {
    finishingPosition: number;
    lapsCompleted: string;
    bestLap: string;
    gap: string;
  }
}