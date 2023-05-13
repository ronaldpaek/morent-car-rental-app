'use client';

import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './Features/searchSlice';
import { supacarsApi } from '@/services/supacars';

export const store = configureStore({
    reducer: {
        [supacarsApi.reducerPath]: supacarsApi.reducer,
        search: searchReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(supacarsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;