import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
// import persistReducer from "redux-persist/es/persistReducer";
import sidebarReducer from './toggleSidebar';
import SnackAlertReducer from './SnackAlertSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user']
}
const reducer = combineReducers({
    snackAlert: SnackAlertReducer,
    user: userReducer, 
    sidebar: sidebarReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;
export const persistor = persistStore(store);



