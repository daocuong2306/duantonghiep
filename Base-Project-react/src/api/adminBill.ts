import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const adminBillApi = createApi({
    reducerPath: "billAdmin",
    tagTypes: ['billAdmin'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/bill`,
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
        getBillAdmin: builder.query<any[], void>({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
            providesTags: ['billAdmin']
        }),

        updateBillAdmin: builder.mutation({
            query: (product: any) => ({
                url: `/update/${product.id}`,
                method: "POST",
                body: product.count
            }),
            invalidatesTags: ['billAdmin']
        }),

    })
});

export const {
    useGetBillAdminQuery,
} = adminBillApi;
export const adminBillReducer = adminBillApi.reducer;

export default adminBillApi;