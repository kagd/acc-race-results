import React, { useEffect, useState } from 'react';
import styles from './driverList.module.css';
import { DriverListItem } from './DriverListItem';
import { Driver } from './types';

export function DriverList() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);

  async function fetchDrivers() {
    const response = await fetch('./results/drivers.json');
    const result = await response.json();
    setDrivers(result);
    filterDrivers(result, '');
  }

  useEffect(function(){
    fetchDrivers();
  }, []);
  
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    filterDrivers(Object.values(drivers), e.target.value);
  }

  function filterDrivers(collection: Driver[], value: string){
    const filtered: Driver[] = collection.reduce(function(memo, driver){
      const textMatch = driver.name.toLowerCase().match(value.toLowerCase());
      const carNumberMatch = driver.carNumber.toString().match(value);
      const carMatch = driver.car.toLowerCase().match(value.toLowerCase());
      if(textMatch || carNumberMatch || carMatch){
        memo.push(driver);
      }
      return memo;
    }, [] as Driver[]);
    setFilteredDrivers(filtered.sort(function(a, b){
      return a.nameLastFirst.toLowerCase() > b.nameLastFirst.toLowerCase() ? 1 : -1;
    }));
  }

  return (
    <div>
      <form className={styles.form}>
        <input type="text" onChange={onChange} autoFocus placeholder="Filter" />
      </form>
      <ul className={styles.driverList}>
        {filteredDrivers.map((driver) => <DriverListItem driver={driver} />)}
      </ul>
    </div>
  );
};