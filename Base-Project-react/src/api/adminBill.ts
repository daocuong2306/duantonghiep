import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const adminBillApi = createApi({
    reducerPath: "bill",
    tagTypes: ['bill'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/bills",
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
            query: (key: any) => ({
                url: `/`,
                method: "GET",
            }),
            providesTags: ['bill']
        }),

        updateBillAdmin: builder.mutation({
            query: (product: any) => ({
                url: `/update/${product.id}`,
                method: "POST",
                body: product.count
            }),
            invalidatesTags: ['bill']
        }),

    })
});

export const {
    useGetBillAdminQuery,
} = adminBillApi;
export const adminBillReducer = adminBillApi.reducer;

export default adminBillApi;