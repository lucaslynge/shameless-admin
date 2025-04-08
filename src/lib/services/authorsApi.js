import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
import { setDoctors } from "../features/doctorsSlice";
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
      query: () => ({ url: `/authors` }),
      transformResponse: (response) => ({
        response: response.data,
        status: response.success,
        message: response.message,
      }),
      async onQueryStarted(filter, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setAuthors(data.response));
        } catch (error) {
          console.error("Error fetching authors:", error);
        }
      },
    }),
    // mutations
    createAuthor: build.mutation({
      query: (body) => ({ url: `/authors`, method: "POST", body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    deleteAuthor: build.mutation({
      query: (id) => ({ url: `/authors/${id} `, method: "DELETE" }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    updateAuthor: build.mutation({
      query: ({ id, body }) => ({
        url: `/authors/${id} `,
        method: "PUT",
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
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApi;
