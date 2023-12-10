import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: "product",
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/products`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("header");
            console.log("tonken", token);

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
        getProducts: builder.query<any[], any>({
            query: (key: any) => ({
                url: `/`,
                method: "GET",
                params: { id: key.id, keyword: key.keyword }
            }),
            providesTags: ['Product']
        }),
        getProductById: builder.query<any, any | string>({
            query: (id: any) => `show/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product: any) => ({
                url: `/add`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        
        updateProduct: builder.mutation({
            query: (product: any) => ({
                url: `/edit/${product.id}`,
                method: "POST",
                body: product.formData
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        })
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useRemoveProductMutation,
    useAddProductMutation
} = productApi;
export const productReducer = productApi.reducer;

export default productApi;