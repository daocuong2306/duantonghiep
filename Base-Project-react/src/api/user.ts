import { IUser } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: "login",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
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
        getUser: builder.query<IUser, void>({
            query: () => `/users`,
            providesTags: ['user']
        }),
        getUserById: builder.query<IUser, number | string>({
            query: (id) => `/users/${id}`,
            providesTags: ['user']
        }),
        addUser: builder.mutation({
            query: (product: IUser) => ({
                url: `/users`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['user']
        }),
        updateUser: builder.mutation<IUser, IUser>({
            query: (product) => ({
                url: `/users/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['user']
        }),
        removeUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['user']
        })
    })
});

export const {
    useAddUserMutation,
    useGetUserByIdQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useRemoveUserMutation
} = userApi;
export const userReducer = userApi.reducer;

export default userApi;