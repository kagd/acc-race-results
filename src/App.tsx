import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { DriverList } from './DriverList';
import styles from './app.module.css';
import { DriversContext } from './DriversContext';
import { Driver } from './types';
import { Season } from './Season';
import { Race } from './Race';
import { races, raceNameMappings } from './races';
import { setSelectedDriverNames as setSelectedDriverNamesLS, getSelectedDriverNames } from './localStorage';

export function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverNames, setSelectedDriverNames] = useState<string[]>([]);

  async function fetchDrivers() {
    const response = await fetch('./results/drivers.json');
    const result = await response.json();
    setDrivers(result);
    setSelectedDriverNames(getSelectedDriverNames());
  }

  function onSelectDriver(driverName: string){
    const names = [...selectedDriverNames, driverName];
    setSelectedDriverNames(names);
    setSelectedDriverNamesLS(names);
  }

  function onDeselectDriver(driverName: string){
    const index = selectedDriverNames.indexOf(driverName);
    const newDriverNames = [...selectedDriverNames];
    newDriverNames.splice(index, 1);
    setSelectedDriverNames(newDriverNames);
    setSelectedDriverNamesLS(newDriverNames);
  }

  useEffect(function(){
    fetchDrivers();
  }, []);

  const contextValue = {
    drivers,
    selectedDriverNames,
    onSelectDriver,
    onDeselectDriver
  }

  return (
    <HashRouter>
      <DriversContext.Provider value={contextValue}>
        <div className={styles.app}>
          <aside>
            <DriverList />
          </aside>
          <main>
            <nav>
              <Link to="/season/3">Season Stats</Link>
              {races.map(race => <Link to={`/season/races/${race}`}>{raceNameMappings[race]}</Link>)}
            </nav>
            <section className={styles.mainContent}>
              <Switch>
                <Route path="/season/3" exact component={Season} />
                <Route path="/season/races/:race" component={Race} />
                <Redirect to="/season/3" />
              </Switch>
            </section>
          </main>
        </div>
      </DriversContext.Provider>
    </HashRouter>
  );
}
