import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Car{
    id: Number,
    make: String,
    model: String,
    year: Number,
    color: String,
    bodyType: String,
    seatCapacity: Number,
    fuelCapacity: Number,
    rentPrice: Number,
    description: String,
    location: String,
    ownerId: Number,
    available: Boolean,
    images?: Array<{ id: Number, url: String}> 
}

export const supacarsApi = createApi({
    reducerPath: 'supacarsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        getCars: builder.query<Car[], {searchText: string; type: string; seatCapacity: number}>({
            query: ({searchText, type, seatCapacity}) => `/cars/search?make=${searchText}&price=100&type=${type}&seatCapacity=${seatCapacity}`,
        }),
    })
})

export const { useGetCarsQuery } = supacarsApi;