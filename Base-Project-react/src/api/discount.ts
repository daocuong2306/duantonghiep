import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const discountApi = createApi({
    reducerPath: "discount",
    tagTypes: ['discount'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/discounts",
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
            query: (key: any) => ({
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
        })
    })
});

export const {
    useGetDiscountQuery,
    useAddDiscountMutation
} = discountApi;
export const discountReducer = discountApi.reducer;

export default discountApi;