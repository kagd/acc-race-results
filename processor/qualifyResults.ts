import * as fs from "fs";
import * as path from "path";
import * as csvParse from "csv/lib/sync";
import { camelize, resultsKeyMappings } from './utils';
import { QualifyingResult } from '../src/types';

const regexPattern = /Qualify result\s*'======================\s*([\s\S]+)Qualify laps/;

export function processSync(filename: string): QualifyingResult[] {
  const data = fs.readFileSync(
    path.join(__dirname, "rawData", `${filename}.csv`),
    "utf8"
  );

  const raceData = data.match(regexPattern)[1];
  const cleanedRaceData = raceData
    .replace(/["']+/g, "") // raw data has quotes and ticks which cause parsing errors
    .split("\n") // need to split each line because regex is tough otherwise
    .map((line) => line.replace(/,\s*/gi, ",").replace(/,$/, "")) // remove starting spaces
    .join(`\n`); // merge that shit all back together for CSV parsing

  // console.log(cleanedRaceData)

  const records: QualifyingResult[] = csvParse.parse(cleanedRaceData, {
    columns: header => header.map((column: string) => resultsKeyMappings[camelize(column)]),
    skip_empty_lines: true,
    cast: true,
  });

  // save file
  fs.writeFile(path.join(__dirname, 'parsedData', `${filename}-qualify.json`), JSON.stringify(records, null, 2), function(err) {
    if (err) {throw err};
  });

  return records;
}
