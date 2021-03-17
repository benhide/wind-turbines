import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { AlarmType, ITurbine, ITurbineResponse } from 'app/index';
import { RootState } from 'app/store';
import { getRequest } from 'Api/client';
import { initialiseState, mergeTurbineData } from 'Redux/TurbineSliceHelper';

interface ITurbineState {
  turbines: ITurbine[];
}

const initialState: ITurbineState = {
  turbines: initialiseState(),
};

function normaliseTurbineData(
  turbines: ITurbine[],
  turbineResponse: ITurbineResponse[]
): ITurbine[] {
  const updatedTurbines: ITurbine[] = [];

  for (const turbine of turbineResponse) {
    const foundTurbine = turbines.find(
      (turbineFromRequest) => turbineFromRequest.turbine === turbine.turbine
    );

    let updatedTurbine: ITurbine = {
      turbine: turbine.turbine,
    };

    if (foundTurbine) {
      if (turbine.level === AlarmType.WarningAlarms) {
        updatedTurbine.warningAlarms = {
          level: turbine.level,
          count: turbine.count,
        };
      }

      if (turbine.level === AlarmType.CriticalAlarms) {
        updatedTurbine.criticalAlarms = {
          level: turbine.level,
          count: turbine.count,
        };
      }

      updatedTurbines.push(updatedTurbine);
    }
  }

  const mergedTurbineData = mergeTurbineData(updatedTurbines);

  for (const turbineData of mergedTurbineData) {
    const index = turbines.findIndex(
      (turbine) => turbine.turbine === turbineData.turbine
    );

    turbines[index] = turbineData;
  }

  return turbines;
}

export const fetchTurbines = createAsyncThunk(
  'turbines/fetchTurbines',
  async () => {
    return await getRequest();
  }
);

export const turbineSlice = createSlice({
  name: 'Turbines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTurbines.fulfilled, (state, action) => {
      const normalisedTurbineData = normaliseTurbineData(state.turbines, action.payload);
      state.turbines = normalisedTurbineData;
    });
  },
});

export const selectTurbines = (state: RootState): ITurbine[] =>
  state.turbines.turbines;

export default turbineSlice.reducer;
