import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const statisticalApi = createApi({
    reducerPath: "statistical",
    tagTypes: ['statistical'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/statistical",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("header");
            headers.set("authorization", `Bearer ${token}`)
            // modify header theo từng request
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(500);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
      
        listStatistical: builder.query<any, void>({
            query: () => ({
                url: `/list`,
                method: "GET",
               
            }),
            providesTags: ['statistical'],
        })
    })
});

export const {
    useListStatisticalQuery
} = statisticalApi;
export const statisticalReducer = statisticalApi.reducer;

export default statisticalApi;