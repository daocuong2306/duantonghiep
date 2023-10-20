import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const variantApi = createApi({
    reducerPath: "variant",
    tagTypes: ['variant'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/variants",
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
            query: (product: IUser) => ({
                url: `/getvalue`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['variant']
        }),
        addValue: builder.mutation({
            query: (product: IUser) => ({
                url: `/addvariant`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['variant']
        })
    })
});

export const {
    useGetValueMutation,
    useAddValueMutation
} = variantApi;
export const variantReducer = variantApi.reducer;

export default variantApi;