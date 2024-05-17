import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import notificationReducer from "./notificationRedux"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const combinedReducer = combineReducers({userReducer, notificationReducer})

  const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export let persistor = persistStore(store);