import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { companyApi } from '../features/company/companyAPI';
import { medicinApi } from '../features/medicin/medicinAPI';

export const store = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
    [medicinApi.reducerPath]: medicinApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyApi.middleware, medicinApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
