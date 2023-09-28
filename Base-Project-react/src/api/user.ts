import { IUser } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: "user",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
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
            query: () => `/api/auth/user`,
            providesTags: ['user']
        }),
        register: builder.mutation({
            query: (product: {name:string, email:string, password:string, password_confirmation:string}) => ({
                url: `/api/auth/register`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['user']
        }),
        login: builder.mutation({
            query: (product: any) => ({
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