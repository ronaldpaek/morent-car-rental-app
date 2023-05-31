import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cloudinaryApi = createApi({
    reducerPath: 'cloudinaryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.cloudinary.com/v1_1/ddn1veduz/image/upload' }),
    endpoints: (builder) => ({
        getCars: builder.query<String[], {searchText: string; type: string; seatCapacity: number}>({
            query: ({searchText, type, seatCapacity}) => `/cars/search?make=${searchText}&price=100&type=${type}&seatCapacity=${seatCapacity}`,
        }),
    })
})

export const { useGetCarsQuery } = cloudinaryApi;