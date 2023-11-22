import optionsApi, { optionsReducer } from '@/api/option';
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
import variantApi, { variantReducer } from '@/api/variant';
import bannerApi, { bannerReducer } from '@/api/banner';

import homeApi, { homeReducer } from '@/api/home';
import detailApi, { detailReducer } from '@/api/detail';
import cartApi, { cartReducer } from '@/api/cart';
import paymentApi, { paymentReducer } from '@/api/payment';
import commentApi, { commentReducer } from '@/api/comment';
import billApi, { billReducer } from '@/api/bill';
import statisticalApi, { statisticalReducer } from '@/api/statistics';
import adminBillApi, { adminBillReducer } from '@/api/adminBill';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const rootReducer = combineReducers({
    cloudinary: cloudinaryReducer,
    [productApi.reducerPath]: productReducer,
    [userApi.reducerPath]: userReducer,
    [categoryApi.reducerPath]: categoryReducer,
    [optionsApi.reducerPath]: optionsReducer,
    [variantApi.reducerPath]: variantReducer,
    [bannerApi.reducerPath]: bannerReducer,
    [homeApi.reducerPath]: homeReducer,
    [detailApi.reducerPath]: detailReducer,
    [cartApi.reducerPath]: cartReducer,
    [paymentApi.reducerPath]: paymentReducer,
    [commentApi.reducerPath]:commentReducer,
    [billApi.reducerPath]:billReducer,
    [statisticalApi.reducerPath]: statisticalReducer,
    [adminBillApi.reducerPath]:adminBillReducer
})
const middleware = [productApi.middleware, userApi.middleware, categoryApi.middleware, optionsApi.middleware, variantApi.middleware, bannerApi.middleware, homeApi.middleware, detailApi.middleware, cartApi.middleware, detailApi.middleware, paymentApi.middleware,commentApi.middleware , billApi.middleware , statisticalApi.middleware,adminBillApi.middleware]

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
