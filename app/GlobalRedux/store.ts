'use client';

import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './Features/searchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;