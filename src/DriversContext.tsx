import React from 'react';
import { Driver } from './types';

type Context = {
  drivers: Driver[];
  selectedDriverNames: string[];
  onSelectDriver: (driverName: string) => void;
  onDeselectDriver: (driverName: string) => void;
}

export const DriversContext = React.createContext<Context>({
  drivers: [],
  selectedDriverNames: [],
  onSelectDriver: () => {},
  onDeselectDriver: () => {},
});