import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
import { setComments } from "../features/commentsSlice";
import { setAuthors } from "../features/authorsSlice";

export const authorsApi = createApi({
  reducerPath: "authorsApi",
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
  refetchOnFocus: false,
  refetchOnMountOrArgChange: false,
  tagTypes: ["Authors"],
  endpoints: (build) => ({
    // queries
    getAllAuthors: build.query({
      query: () => ({ url: `/authors/all` }),
      transformResponse: (response) => response,
      async onQueryStarted(filter, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setAuthors(data)); // Dispatch to update the slice with fetched comments
        } catch (error) {
          console.error("Error fetching authors:", error);
        }
      },
    }),
    // mutations
    deleteAuthor: build.mutation({
      query: (id) => ({ url: `/comments/delete/${id} `, method: "DELETE" }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    approveComment: build.mutation({
      query: (id) => ({ url: `/comments/approve/${id} `, method: "POST" }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    editComment: build.mutation({
      query: ({ id, body }) => ({
        url: `/comments/update/${id} `,
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
  }),
});

export const {
  useGetAllAuthorsQuery,
  // usedeleteAuthorMutation,
  useApproveCommentMutation,
  useEditCommentMutation,
} = authorsApi;
