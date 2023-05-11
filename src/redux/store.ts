import { configureStore } from "@reduxjs/toolkit";
import { notationsApi } from "../features/notations-api/notationsApiSlice";

const store = configureStore({
  reducer: {
    [notationsApi.reducerPath]: notationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(notationsApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
