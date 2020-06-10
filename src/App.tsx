import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { DriverList } from './DriverList';
import styles from './app.module.css';
import { DriversContext } from './DriversContext';
import { Driver } from './types';
import { Season } from './Season';
import { Race } from './Race';

export function App() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriverNames, setSelectedDriverNames] = useState<string[]>([]);

  async function fetchDrivers() {
    const response = await fetch('./results/drivers.json');
    const result = await response.json();
    setDrivers(result);
  }

  function onSelectDriver(driverName: string){
    setSelectedDriverNames([...selectedDriverNames, driverName]);
  }

  function onDeselectDriver(driverName: string){
    const index = selectedDriverNames.indexOf(driverName);
    const newCarNumbers = [...selectedDriverNames];
    newCarNumbers.splice(index, 1);
    setSelectedDriverNames(newCarNumbers);
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
              <Link to="/season/races/suzuka">Suzuka</Link>
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
