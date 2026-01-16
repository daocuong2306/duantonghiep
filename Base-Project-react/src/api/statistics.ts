import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const statisticalApi = createApi({
    reducerPath: "statistical",
    tagTypes: ['statistical'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/statistical`,
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

        listStatistical: builder.query<any, any>({
            query: (date: any) => ({
                url: `/list`,
                method: "GET",
                params: { month: date }
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