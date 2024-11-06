import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';
import userReducer from './Redux/userSlice.js';
import formReducer from './Redux/formSlice.js';
import counterReducer from './Redux/NotificationCount.js';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import settingsReducer from './Redux/settingSlice.js';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'counter']  
};

// Combine reducers
const reducer = combineReducers({
  user: userReducer, 
  sidebar: sidebarReducer,
  form: formReducer,
  counter: counterReducer, // Use 'counter' as the key here
  settings: settingsReducer,

});

// Apply persistence
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;
export const persistor = persistStore(store);
