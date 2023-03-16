import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAPI } from "./api";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage: localStorage, // choose storage engine
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    csmuser: userReducer,
    [userAPI.reducerPath]: userAPI.reducer
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

const persistor = persistStore(store);

export { store, persistor };