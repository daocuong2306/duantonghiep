import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const billApi = createApi({
    reducerPath: "bill",
    tagTypes: ['bill'],
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
        getBill: builder.query<any[], void>({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
            providesTags: ['bill']
        }),
        addBill: builder.mutation({
            query: (product: any) => ({
                url: `/add`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['bill']
        }),
        updateBill: builder.mutation({
            query: (product: any) => ({
                url: `update/${product.id}`,
                method: "POST",
                body: product.count
            }),
            invalidatesTags: ['bill']
        }),
        cancelBill: builder.mutation({
            query: (product: any) => ({
                url: `/update_user/${product.id}`,
                method: "POST",
                body: product.count
            }),
            invalidatesTags: ['bill']
        }),
        removeBill: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['bill']
        })

    })
});

export const {
    useGetBillQuery,
    useAddBillMutation,
    useRemoveBillMutation,
    useCancelBillMutation,
    useUpdateBillMutation
} = billApi;
export const billReducer = billApi.reducer;

export default billApi;