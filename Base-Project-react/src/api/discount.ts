import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const discountApi = createApi({
    reducerPath: "discount",
    tagTypes: ['discount'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/discounts`,
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
        getDiscount: builder.query<any[], void>({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
            providesTags: ['discount']
        }),
        addDiscount: builder.mutation({
            query: (product: any) => ({
                url: `/add`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['discount']
        }),
        removeDiscount: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['discount']
        })
    })
});

export const {
    useGetDiscountQuery,
    useAddDiscountMutation,
    useRemoveDiscountMutation
} = discountApi;
export const discountReducer = discountApi.reducer;

export default discountApi;