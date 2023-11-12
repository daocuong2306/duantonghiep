import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cartApi = createApi({
    reducerPath: "cart",
    tagTypes: ['cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/cart",
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
        getCart: builder.query<any[], void>({
            query: (key: any) => ({
                url: `/`,
                method: "GET",
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
    })
});

export const {
    useAddCartMutation,
    useGetCartQuery
} = cartApi;
export const cartReducer = cartApi.reducer;

export default cartApi;