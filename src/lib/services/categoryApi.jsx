import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helper";
import { BASE_URL } from "../utils/contant";
export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ['Category'],
  endpoints: (build) => ({
    GetAllCategory: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `/category/allCategory?${params}` }
      },
      providesTags: ['Category'],
      transformResponse: (response) => response.data
    }),
    CreateCategory: build.mutation({
      query: (credentials) => ({
        url: `/category/createCategory`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ['Category'], // This ensures the cache is invalidated

    }),
    UpdateCategory: build.mutation({
      query: ({ id, body }) => ({ url: `/category/updateCategory/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message

        }
      },
      invalidatesTags: ['Category'], // This ensures the cache is invalidated

    }),
    DeleteCategory: build.mutation({
      query: (id) => ({ url: `/category/deleteCategory/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      },
      invalidatesTags: ['Category'], // This ensures the cache is invalidated

    }),
   
  }),
});

export const {
 useCreateCategoryMutation,
 useGetAllCategoryQuery,
 useUpdateCategoryMutation,
 useDeleteCategoryMutation
} = categoryApi;
