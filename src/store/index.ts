import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import maintenancesReducer from '../slices/maintenancesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    maintenances: maintenancesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
