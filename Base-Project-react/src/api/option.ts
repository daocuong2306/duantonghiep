import { IProduct } from '../interface/product';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const optionsApi = createApi({
    reducerPath: "options",
    tagTypes: ['Options'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
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
        getOptions: builder.query<IProduct[], void>({
            query: () => ({
                url: `/options`,
                method: "GET"
            }),
            providesTags: ['Options']
        }),
        addOption: builder.mutation({
            query: (options: IProduct) => ({
                url: `/options/add`,
                method: "POST",
                body: options
            }),
            invalidatesTags: ['Options']
        }),
        updateOption: builder.mutation({
            query: (options: any) => ({
                url: `/options/edit/${options.id}`,
                method: "POST",
                body: options.formData
            }),
            invalidatesTags: ['Options']
        }),
        removeOption: builder.mutation<void, number>({
            query: (id) => ({
                url: `/options/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Options']
        }),
        addOptionValue: builder.mutation({
            query: (OValues: IProduct) => ({
                url: `/optionvalues/add`,
                method: "POST",
                body: OValues
            }),
            invalidatesTags: ['Options']
        }),
    })
});

export const {
    useAddOptionMutation,
    useGetOptionsQuery,
    useRemoveOptionMutation,
    useUpdateOptionMutation,
    useAddOptionValueMutation
} = optionsApi;
export const optionsReducer = optionsApi.reducer;

export default optionsApi;