
import { ICategory } from '../interface/category';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const bannerApi = createApi({
    reducerPath: "banner",
    tagTypes: ['Banner'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/banner",
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
        getListBanner: builder.query<[{image:any,content:string}], void>({
            query: () => `/list`,
            providesTags: ['Banner']
        }),
        addBanner: builder.mutation({
            query: (banner: {image:any,content:string}) => ({
                url: `/add`,
                method: "POST",
                body:banner
            }),
            invalidatesTags: ['Banner']
        }),
        removeBanner: builder.mutation<void, number>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Banner']
        })
    })
});

export const {
   useAddBannerMutation,
   useGetListBannerQuery,
   useRemoveBannerMutation
} = bannerApi;
export const bannerReducer = bannerApi.reducer;

export default bannerApi;