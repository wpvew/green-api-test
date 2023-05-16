import { configureStore } from '@reduxjs/toolkit';
import greenApiReducer from './slice/greenApiSlice';

const store = configureStore({
  reducer: {
    greenApiReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
