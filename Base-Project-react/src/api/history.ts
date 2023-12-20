import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const historyApi = createApi({
    reducerPath: "history",
    tagTypes: ['history'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}`,
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
        getHistoryBill: builder.query<any, any>({
            query: (id: any) => ({
                url: `/history/${id}`,
                method: "GET",
            }),
            providesTags: ['history']
        })

    })
});

export const {

    useGetHistoryBillQuery
} = historyApi;
export const historyReducer = historyApi.reducer;

export default historyApi;