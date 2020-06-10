import React, { useContext, useState, useEffect } from 'react';
import { CanvasJSReact } from './CanvasJSChart';
import { ChartOptions, ChartDataSeriesOptions } from 'canvasjs';
import styles from './season.module.css';
import { DriversContext } from './DriversContext';
import { CombinedRaceResult } from './types';
import { RouteComponentProps } from 'react-router';
import { wins, podiums, topFive, topTwentyFive } from './utils';
import { races, raceNameMappings} from './races';
import { fetchRaceResults } from './service';

interface SeasonProps extends RouteComponentProps {}

const usedColors: string[] = [];

function getColor(): string {
  const newColor = Math.floor(Math.random()*16777215).toString(16);
  if(usedColors.indexOf(newColor) > -1){
    return getColor();
  }
  usedColors.push(newColor);
  return newColor;
}

function getOptions(data: ChartDataSeriesOptions[]): ChartOptions {
  const options: ChartOptions = {
    animationEnabled: true,
    backgroundColor: '#e3e3e3',
    theme: "light2",
    title:{
      text: ""
    },
    axisY: {
      reversed: true,
      includeZero: false,
      minimum: 1,
      prefix: 'P',
    },
    axisX: {
      interval: 1,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "center",
      dockInsidePlotArea: false,
      itemclick: function(e){
        console.log({e});
      }
    },
    toolTip: {
      shared: true
    },
    data: data
  };
  return options;
}

function formatData(selectedDriverName: string, allRaceResults: CombinedRaceResult[][]){
  const driverInfo: ChartDataSeriesOptions = {
    color: `#${getColor()}`,
    type: "line",
    showInLegend: true,
    name: selectedDriverName,
    markerSize: 5,
    dataPoints: []
  }
  allRaceResults.forEach(function(raceResult, idx){
    const result = raceResult.find(result => result.nameFirstLast === selectedDriverName);
    driverInfo.dataPoints.push({ x: idx + 1, y: result?.finishingPosition, label: raceNameMappings[races[idx]] })
  });

  return driverInfo;
}

export function Season(props: SeasonProps) {
  const context = useContext(DriversContext);
  const [options, setOptions] = useState<ChartOptions>();

  async function getRaces(){
    const allRaceResultsPromises: Promise<CombinedRaceResult[]>[] = races.map(fetchRaceResults);
    const allRaceResults = await Promise.all(allRaceResultsPromises);
    const driverCombinedResults = context.selectedDriverNames.map(function(driverName){
      return formatData(driverName, allRaceResults);
    });

    setOptions(getOptions(driverCombinedResults));
  }

  useEffect(function(){
    getRaces();
  }, [context.selectedDriverNames]);

  if(!context.selectedDriverNames.length) {
    return <div className={styles.container}>Select 1 or more drivers to see season stats</div>
  }
  if(!options) {
    return <div className={styles.container}>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <CanvasJSReact.CanvasJSChart options={options} />
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              <th>
                Win
              </th>
              <th>
                Podium
              </th>
              <th>
                Top 5
              </th>
              <th>
                Top 25
              </th>
            </tr>
          </thead>
          <tbody>
            {options.data.map((data) =>{
              return(
                <tr key={data.name} title={data.name}>
                  <td style={{backgroundColor: data.color}}>{data.name?.split(' ')[0][0]}{data.name?.split(' ')[1][0]}</td>
                  <td>{wins(data.dataPoints)}</td>
                  <td>{podiums(data.dataPoints)}</td>
                  <td>{topFive(data.dataPoints)}</td>
                  <td>{topTwentyFive(data.dataPoints)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};