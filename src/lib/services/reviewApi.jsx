import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helper";
import { BASE_URL } from "../utils/contant";
export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    },
  }),
  tagTypes: ['Reviews'],
  refetchOnFocus:true,
  endpoints: (build) => ({
    GetAllReviews: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `review/allData?${params}` }
      },
      providesTags: ['Reviews'],
      transformResponse: (response) => response.data
    }),
    CreateReview: build.mutation({
      query: (credentials) => ({
        url: `/review/create`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ['Reviews'], // This ensures the cache is invalidated

      transformResponse: (response) => response,
    }),
    UpdateReview: build.mutation({
      query: ({ id, body }) => ({ url: `/review/update/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message

        }
      },
      invalidatesTags: ['Reviews'], // This ensures the cache is invalidated

    }),
    DeleteReview: build.mutation({
      query: (id) => ({ url: `/review/delete/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      },
      invalidatesTags: ['Reviews'], // This ensures the cache is invalidated

    }),
   
  }),
});

export const {
 useCreateReviewMutation,
 useGetAllReviewsQuery,
 useDeleteReviewMutation,
 useUpdateReviewMutation
} = reviewApi;
