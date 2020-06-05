import React from 'react';
import { Link } from 'react-router-dom';
import { Driver } from './types';

interface DriverListItemProps {
  driver: Driver;
}

export function DriverListItem(props: DriverListItemProps) {
  return (
    <li>
      <Link to={`driver/${props.driver.carNumber}`}>
        <strong>{props.driver.nameLastFirst}  <span>#{props.driver.carNumber}</span></strong>
        <em>{props.driver.car}</em>
      </Link>
    </li>
  );
};