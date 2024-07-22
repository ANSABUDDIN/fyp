import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./slice/authSlice";

// Combine all slices into a single rootReducer
const rootReducer = combineReducers({
  auth: authSlice,
});

// Define persistence configuration for all slices
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Whitelist slices to be persisted
};

// Wrap the rootReducer with the persistence configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted rootReducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the Redux persistor
export const persistor = persistStore(store);

// Define types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
