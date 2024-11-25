import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),

  refetchOnFocus: true,
  tagTypes: ["Articles"],
  endpoints: (build) => ({
    GetAllArticle: build.query({
      query: (filter) => {
        const params = new URLSearchParams(filter).toString();
        return { url: `artical/reviewAllData?${params}` };
      },
      providesTags: ["Articles"],
      transformResponse: (response) => response.data,
    }),
    GetBySlugArticle: build.query({
      query: (slug) => {
        return { url: `artical/reviewById/${slug}` };
      },
      transformResponse: (response) => response.data,
    }),
    CreateArticle: build.mutation({
      query: (credentials) => ({
        url: `artical/createArtical`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          message: response.message,
          success: response.success,
        };
      },
      invalidatesTags: ["Articles"], // This ensures the cache is invalidated
    }),
    UploadArticleImage: build.mutation({
      query: (credentials) => ({
        url: `/artical/uploadImage`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Articles"], // This ensures the cache is invalidated
      transformResponse: (response) => {
        return {
          data: response.data,
          success: response.success,
        };
      },
    }),
    UpdateArticle: build.mutation({
      query: ({ id, body }) => ({
        url: `/artical/updateArticals/${id}`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response) => {
        return {
          response: response.data,
          success: response.success,
          message: response.message,
        };
      },
      invalidatesTags: ["Articles"], // This ensures the cache is invalidated
    }),
    DeleteArticle: build.mutation({
      query: (id) => ({
        url: `/artical/reviewDelete/${id} `,
        method: "DELETE",
      }),
      transformResponse: (response) => {
        return {
          response: response.data,
          success: response.success,
          message: response.message,
        };
      },
    }),
  }),
});

export const {
  useGetAllArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useGetBySlugArticleQuery,
  useLazyGetBySlugArticleQuery,
  useUploadArticleImageMutation,
} = articleApi;
