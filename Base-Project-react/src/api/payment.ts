import urlApi from '@/urlApi/api';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const paymentApi = createApi({
    reducerPath: "payment",
    tagTypes: ['payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${urlApi}/createPayment`,
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
        paymentOnline: builder.mutation({
            query: (product: any) => ({
                url: `/`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['payment']
        }),
    })
});

export const {
    usePaymentOnlineMutation
} = paymentApi;
export const paymentReducer = paymentApi.reducer;

export default paymentApi;