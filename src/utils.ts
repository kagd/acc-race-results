import { Driver, CombinedRaceResult } from "./types";
import { ChartDataPoint } from "canvasjs";

export function filterDrivers(collection: Driver[], value: string): Driver[] {
  const valueLower = value.toLowerCase();
  const filtered: Driver[] = collection.reduce(function(memo, driver){
    const textMatch = driver.name.toLowerCase().match(valueLower);
    const carNumberMatch = driver.carNumber.toString().match(value);
    const carMatch = driver.car.toLowerCase().match(valueLower);
    if(textMatch || carNumberMatch || carMatch){
      memo.push(driver);
    }
    return memo;
  }, [] as Driver[]);
  
  return filtered.sort(sortByLastName);
}

export function sortByLastName(a: Driver, b: Driver){
  return a.nameLastFirst.toLowerCase() > b.nameLastFirst.toLowerCase() ? 1 : -1;
}

export function sortByName(a: CombinedRaceResult, b: CombinedRaceResult){
  return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
}

export function wins(datapoints: ChartDataPoint[]): number {
  return datapoints.reduce(function(memo, datapoint){
    return datapoint.y === 1 ? memo + 1 : memo;
  }, 0);
};

export function podiums(datapoints: ChartDataPoint[]): number {
  return datapointsLessThanOrEqualTo(datapoints, 3);
};

export function topFive(datapoints: ChartDataPoint[]): number {
  return datapointsLessThanOrEqualTo(datapoints, 5);
};

export function topTwentyFive(datapoints: ChartDataPoint[]): number {
  return datapointsLessThanOrEqualTo(datapoints, 25);
};

function datapointsLessThanOrEqualTo(datapoints: ChartDataPoint[], number: number){
  return datapoints.reduce(function(memo, datapoint){
    if(!datapoint.y){
      return memo;
    }
    return datapoint.y <= number ? memo + 1 : memo;
  }, 0);
}