import React from 'react';
import { HashRouter } from 'react-router-dom';
import { DriverList } from './DriverList';
import styles from './app.module.css';

export function App() {
  return (
    <HashRouter>
      <div className={styles.app}>
        <aside>
          <DriverList />
        </aside>
        <main>
          main
        </main>
      </div>
    </HashRouter>
  );
}
