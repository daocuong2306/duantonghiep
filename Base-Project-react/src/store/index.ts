import categoryApi, { categoryReducer } from '../api/category';
import productApi, { productReducer } from '../api/product';
import userApi, { userReducer } from '../api/user';
import { cloudinaryReducer } from '../cloudinary/cloudinarySlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    cloudinary: cloudinaryReducer,
    [productApi.reducerPath]: productReducer,
    [userApi.reducerPath]: userReducer,
    [categoryApi.reducerPath]: categoryReducer
})
const middleware = [productApi.middleware, userApi.middleware, categoryApi.middleware]

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(...middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default persistStore(store);
