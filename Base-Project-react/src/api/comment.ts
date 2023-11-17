

import { pause } from '../utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const commentApi = createApi({
    reducerPath: "comment",
    tagTypes: ['Comment'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/comment",
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
        addComment: builder.mutation({
            query: (comment: any) => ({
                url: `/add`,
                method: "POST",
                params: comment
            }),
            invalidatesTags: ['Comment']
        }),
        
    })
});

export const {
   useAddCommentMutation
} = commentApi;
export const commentReducer = commentApi.reducer;

export default commentApi;