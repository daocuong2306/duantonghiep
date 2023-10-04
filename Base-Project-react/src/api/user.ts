import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: "user",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("header");
            headers.set("authorization", `Bearer ${token}`)
            // modify header theo từng request
            return headers;
        },
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getUser: builder.query<any, void>({
            query: (token:any) => ({
                url: `/api/auth/user`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['user'],
        }),
        register: builder.mutation({
            query: (product:IUser) => ({
                url: `/api/auth/register`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['user']
        }),
        login: builder.mutation({
            query: (product: IUserLogin) => ({
                url: `/api/auth/login`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['user']
        }),
        
    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    
} = userApi;
export const userReducer = userApi.reducer;

export default userApi;