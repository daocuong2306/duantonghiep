import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartApi = createApi({
    reducerPath: "cart",
    tagTypes: ['cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/cart`,
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
        getCart: builder.query<any[], any>({
            query: (discounts) => ({
                url: `/`,
                method: "GET",
                params: { discount: discounts }
            }),
            providesTags: ['cart']
        }),
        addCart: builder.mutation({
            query: (product: any) => ({
                url: `/add`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['cart']
        }),
        updateCart: builder.mutation({
            query: (product: any) => ({
                url: `/update/${product.id}`,
                method: "POST",
                body: { quantity: product.count }
            }),
            invalidatesTags: ['cart']
        }),
        removeCart: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['cart']
        })

    })
});

export const {
    useAddCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
    useRemoveCartMutation
} = cartApi;
export const cartReducer = cartApi.reducer;

export default cartApi;