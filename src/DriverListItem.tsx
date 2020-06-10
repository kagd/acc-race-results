import React, {useContext} from 'react';
import { Driver } from './types';
import {CheckMarkCircle} from './CheckMarkCircle';
import styles from './driverList.module.css';
import { DriversContext } from './DriversContext';

interface DriverListItemProps {
  driver: Driver;
}

export function DriverListItem(props: DriverListItemProps) {
  const {onSelectDriver, onDeselectDriver, selectedDriverNames} = useContext(DriversContext);
  const isSelected = selectedDriverNames.indexOf(props.driver.name) > -1;
  const className = `${ isSelected ? styles.selected : '' }`;

  function toggleSelected(){
    if(isSelected){
      return onDeselectDriver(props.driver.name)
    }
    return onSelectDriver(props.driver.name)
  }

  return (
    <li>
      <button type="button" className={className} onClick={toggleSelected}>
        <CheckMarkCircle />
        <strong>{props.driver.nameLastFirst} <span>#{props.driver.carNumber}</span></strong>
        <em>{props.driver.car}</em>
      </button>
    </li>
  );
};