
import { ICategory } from '../interface/category';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const homeApi = createApi({
    reducerPath: "home",
    tagTypes: ['Home'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/home",
        fetchFn: async (...args) => {
            await pause(500);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getData: builder.query<void, void>({
            query: () => `/`,
            providesTags: ['Home']
        })
    })
});

export const {
   useGetDataQuery
} = homeApi;
export const homeReducer = homeApi.reducer;

export default homeApi;