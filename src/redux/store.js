import { configureStore } from "@reduxjs/toolkit";
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
import {accountOpeningReducer} from "./reducers/test";

const rootReducer = combineReducers({
    accountOpening: accountOpeningReducer,
});

const persistConfig ={
    timeout: 0,
    key: "root",
    version: 1,
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);

export default store;