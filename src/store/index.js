import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import quotesReducer from "./quotes";
import userReducer from "./users";
import * as modules from "../Services/modules";
import { api } from "../services/api";

const reducers = combineReducers({
  quotes: quotesReducer,
  appUser: userReducer,
  ...Object.values(modules).reduce(
    (acc, module) => ({
      ...acc,
      [module.reducerPath]: module.reducer,
    }),
    {}
  ),
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["quotes", "appUser"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 200 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 200,
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store)
