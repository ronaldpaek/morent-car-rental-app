'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface SearchState {
    titleQuery: string
    bodyTypeQuery: string
    seatingCapacityQuery: number
    maxPriceQuery: number
    locationQuery: string
    pickUpTimeQuery: number
    dropOffTimeQuery: number
}

const initialState: SearchState = {
    titleQuery: '',
    bodyTypeQuery: '',
    seatingCapacityQuery: 0,
    maxPriceQuery: 0,
    locationQuery: '',
    pickUpTimeQuery: 0,
    dropOffTimeQuery: 0
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchCar: (state, action) => {
            state.titleQuery = action.payload.title;
            state.bodyTypeQuery = action.payload.bodyType;
            state.seatingCapacityQuery = action.payload.seatingCapacity;
            state.maxPriceQuery = action.payload.maxPrice;
            state.locationQuery = action.payload.location;
            state.pickUpTimeQuery = action.payload.pickUpTime;
            state.dropOffTimeQuery = action.payload.dropOffTime;
        }
    }
})

export const { searchCar } = searchSlice.actions;

export default searchSlice.reducer;

export const searchCarSelector = (state) => state.search;