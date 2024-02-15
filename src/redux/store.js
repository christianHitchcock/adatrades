import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "./storage";
import { authReducer } from "./reducers/test"; // Import authReducer directly

// Define expiration time
const expirationTimeInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours

// Check if data is expired
const isDataExpired = (timestamp) => {
    const now = new Date().getTime();
    return now - timestamp > expirationTimeInMilliseconds;
};

// Persist configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["auth"], // Specify the reducers you want to persist
    serialize: false, // To handle manual serialization
    expire: { // Define expiration settings
        default: expirationTimeInMilliseconds, // Set a default expiration time
    },
};

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

// Function to clear persisted data
export const clearPersistedData = () => {
    persistor.purge(); // Clear all persisted data
};

export default store;
