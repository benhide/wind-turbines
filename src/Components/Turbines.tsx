import React from 'react';
import { useSelector } from 'react-redux';

import { selectTurbines } from 'Redux/turbineSlice';
import { ITurbine } from 'app/index';

interface ITurbinesWithWarningsProps {
  turbines: ITurbine[];
}

interface IHeadingProps {
  heading: string;
}

const Turbines = (): JSX.Element => {
  const turbines = useSelector(selectTurbines);

  const turbinesWitAlarms: ITurbine[] = [];

  turbines.forEach((turbine) => {
    if (turbine.criticalAlarms?.level || turbine.warningAlarms?.level) {
      turbinesWitAlarms.push(turbine);
    }
  });

  return (
    <>
      <Heading heading={'----- TURBINES WITH ALARMS! -----'} />
      <DisplayTurbines turbines={turbinesWitAlarms} />
      <Heading heading={'---------- ALL TURBINES ---------'} />
      <DisplayTurbines turbines={turbines} />
    </>
  );
};

const Heading = (props: IHeadingProps): JSX.Element => {
  const { heading } = props;

  return (
    <h1
      style={{
        textAlign: 'center',
        padding: '5px',
        margin: '5px',
      }}
    >
      {heading}
    </h1>
  );
};

const DisplayTurbines = (props: ITurbinesWithWarningsProps): JSX.Element => {
  const { turbines } = props;

  return (
    <>
      {turbines.length > 0
        ? turbines.map((turbine) => {
            return (
              <div
                key={turbine.turbine}
                style={{
                  border: '1px solid black',
                  padding: '5px',
                  margin: '5px',
                }}
              >
                <h2>{`Turbine Name/ID: ${turbine.turbine}`}</h2>
                <h3>{'Warning Alarms:'}</h3>
                <h4>{`Alarm Level: ${turbine.warningAlarms?.level} - Alarm Count: ${turbine.warningAlarms?.count}`}</h4>
                <h3>{'Critical Alarms:'}</h3>
                <h4>{`Alarm Level: ${turbine.criticalAlarms?.level} - Alarm Count: ${turbine.criticalAlarms?.count}`}</h4>
              </div>
            );
          })
        : <h2>{'No Data to show'}</h2>}
    </>
  );
};

export default Turbines;
