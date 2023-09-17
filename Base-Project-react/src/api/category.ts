
import { ICategory } from '@/interface/category';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: "category",
    tagTypes: ['Category'],
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
        getCategories: builder.query<ICategory[], void>({
            query: () => `/categories`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, number | string>({
            query: (id) => `/categories/${id}`,
            providesTags: ['Category']
        }),
        addCategory: builder.mutation({
            query: (product: ICategory) => ({
                url: `/categories`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<ICategory, ICategory>({
            query: (product) => ({
                url: `/categories/${product.id}`,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ['Category']
        }),
        removeCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}`,
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