import { ITurbine } from 'app/index';

export function initialiseState(): ITurbine[] {
  const initialState: ITurbine[] = [];

  for (let index = 1; index <= 100; index++) {
    const turbine: ITurbine = {
      turbine: `T${index}`,
      warningAlarms: {
        level: 0,
        count: 0,
      },
      criticalAlarms: {
        level: 0,
        count: 0,
      },
    };

    initialState.push(turbine);
  }

  return initialState;
}

export function mergeTurbineData(turbines: ITurbine[]): ITurbine[] {
  const updatedTurbines: ITurbine[] = [];

  for (const turbine of turbines) {
    let existingTurbineEntry = updatedTurbines.find(
      (exsistingTurbine) => exsistingTurbine.turbine === turbine.turbine
    );

    if (existingTurbineEntry) {
      if (turbine.warningAlarms) {
        existingTurbineEntry.warningAlarms = turbine.warningAlarms;
      }

      if (turbine.criticalAlarms) {
        existingTurbineEntry.criticalAlarms = turbine.criticalAlarms;
      }
    } else {
      if (!turbine.warningAlarms) {
        turbine.warningAlarms = {
          level: 0,
          count: 0,
        };
      }

      if (!turbine.criticalAlarms) {
        turbine.criticalAlarms = {
          level: 0,
          count: 0,
        };
      }
      updatedTurbines.push(turbine);
    }
  }

  return updatedTurbines;
}
