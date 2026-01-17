import { IUser, IUserLogin } from '../interface/user';
import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const detailApi = createApi({
    reducerPath: "detail",
    tagTypes: ['detail'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/detail",
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
        getDetail: builder.query<any, { id: number | string, selectP: string[] }>({
            query: (product) => {
                const queryString = product.selectP.map(item => `searchOptionValueId[]=${item}`).join('&');
                return {
                    url: `/getone/${product.id}?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: ['detail'],
        }),

    })
});

export const {
    useGetDetailQuery
} = detailApi;
export const detailReducer = detailApi.reducer;

export default detailApi;