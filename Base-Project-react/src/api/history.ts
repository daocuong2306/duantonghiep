import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const historyApi = createApi({
    reducerPath: "history",
    tagTypes: ['history'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
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
        getHistoryBill: builder.query<any[], void>({
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