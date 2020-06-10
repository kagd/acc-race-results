import React, { useState, useContext, useEffect } from 'react';
import styles from './driverList.module.css';
import { DriverListItem } from './DriverListItem';
import { Driver } from './types';
import { DriversContext } from './DriversContext';
import { filterDrivers } from './utils';

export function DriverList() {
  const [search, setSearch] = useState<string>('');
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const {drivers} = useContext(DriversContext);

  useEffect(function(){
    setFilteredDrivers(filterDrivers(drivers, search));
  }, [drivers, search, setFilteredDrivers]);
  
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <form className={styles.form}>
        <input type="text" onChange={onChange} autoFocus placeholder="Filter" />
      </form>
      <ul className={styles.driverList}>
        {filteredDrivers.map((driver) => 
          <DriverListItem driver={driver} key={driver.name} />
        )}
      </ul>
    </div>
  );
};