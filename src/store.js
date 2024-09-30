import { configureStore, combineReducers } from '@reduxjs/toolkit';
import sidebarReducer from './sidebarSlice';


import storage from "redux-persist/lib/storage";

import persistReducer from "redux-persist/es/persistReducer";
import userReducer from './Redux/userSlice.js';
import formReducer from './Redux/formSlice.js'
import { persistStore } from "redux-persist";

const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['user']
  }

  const reducer = combineReducers({
    
    user: userReducer, 
    sidebar: sidebarReducer,
    form: formReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  
});

export default store;
export const persistor = persistStore(store);