import React from 'react';

import './App.css';

import Turbines from 'Components/Turbines';
import { store } from 'app/store';
import { fetchTurbines } from 'Redux/turbineSlice';

store.dispatch(fetchTurbines());

const App = (): JSX.Element => {
  return (
    <div>
      <header>
        <h1 style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>{'Wind Turbines'}</h1>
      </header>
      <Turbines />
    </div>
  );
}

export default App;
