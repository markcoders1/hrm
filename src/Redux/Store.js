import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from './cartSlice';
import userReducer from './userSlice';
// import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'user']
}
const reducer = combineReducers({
    // cart: cartReducer,  // Addition of the cart reducer
    user: userReducer, // Addition of the user reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export default store;
export const persistor = persistStore(store);



