
import { ICategory } from '../interface/category';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: "category",
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/categories",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("access_token");
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
        getCategories: builder.query<ICategory[], void>({
            query: () => `/`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, number | string>({
            query: (id) => `/${id}`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (category: any) => ({
                url: `/add`,
                method: "POST",
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<any, any>({
            query: (category: any) => ({
                url: `/edit/${category.id}`,
                method: "POST",
                body: category.formData
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useRemoveCategoryMutation,
    useAddCategoryMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;

export default categoryApi;