import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import turbineSlice from 'Redux/turbineSlice';

export const store = configureStore({
  reducer: {
    turbines: turbineSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
