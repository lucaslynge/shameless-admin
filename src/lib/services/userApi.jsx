import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],

  endpoints: (build) => ({
    GetAllUsers: build.query({
      query: (filter) => {
        const params = new URLSearchParams(filter).toString();
        return { url: `/user/allData?${params}` };
      },
      providesTags: ["User"], // This ensures the cache is invalidated

      transformResponse: (response) => response.data,
    }),
    CreateUser: build.mutation({
      query: (credentials) => ({
        url: `/user/userRegistration/`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
      invalidatesTags: ["User"], // This ensures the cache is invalidated
    }),
    LoginAdminUser: build.mutation({
      query: (credentials) => ({
        url: `/user/adminLogin`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return {
          data: response.data,
          token: response.token,
          success: response.success,
        };
      },
    }),
    UpdateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `/user/updateUser/${id}`,
        method: "PUT",
        body: body,
      }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
      invalidatesTags: ["User"], // This ensures the cache is invalidated
    }),
    DeleteUser: build.mutation({
      query: (id) => ({ url: `/user/userDelete/${id} `, method: "DELETE" }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
      invalidatesTags: ["User"], // This ensures the cache is invalidated
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useLoginAdminUserMutation,
  useUpdateUserMutation,
} = userApi;

// Usage example
