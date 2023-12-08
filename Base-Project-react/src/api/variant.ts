import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const variantApi = createApi({
    reducerPath: "variant",
    tagTypes: ['variant'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/variants`,
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
        getValue: builder.mutation({
            query: (product: any) => ({
                url: `/getvalue`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['variant']
        }),
        addValue: builder.mutation({
            query: (product: any) => ({
                url: `/addvariant`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['variant']
        }),
        getValueId: builder.query({
            query: (id) => ({
                url: `listvariant`,
                params: { id },
            }),
            providesTags: ['variant']
        }),
        updateVariant: builder.mutation({
            query: (account: any) => ({
                url: `/updatevariant/${account.id}`,
                method: "POST",
                body: account.formData
            }),
            invalidatesTags: ['variant']
        }),
    })
});

export const {
    useGetValueMutation,
    useAddValueMutation,
    useGetValueIdQuery,
    useUpdateVariantMutation
} = variantApi;
export const variantReducer = variantApi.reducer;

export default variantApi;