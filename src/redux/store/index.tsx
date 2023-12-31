import { configureStore } from "@reduxjs/toolkit";
import { SettingsReducer } from "../features";

const store = configureStore({
  reducer: {
    settings: SettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
