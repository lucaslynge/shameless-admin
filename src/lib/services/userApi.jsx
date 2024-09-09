"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('x-auth-token', token);
      }
      return headers;
    }

  }),
  endpoints: (build) => ({
    GetAllUsers: build.query({
      query: () => ({ url: `/user/allUsers` }),
      transformResponse: (response) => response.data
    }),
    CreateUser: build.mutation({
      query: (credentials) => ({ url: `/user/signUp/`, method: 'POST', body: credentials }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success
        }
      }
    }),
    UpdateeUser: build.mutation({
      query: ({ id, body }) => ({ url: `/user/updateUser/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success
        }
      }
    }),
    DeleteUser: build.mutation({
      query: (id) => ({ url: `/user/deleteUser/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success
        }
      }
    }),


  }),
});

export const { useGetAllUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateeUserMutation } = userApi;

// Usage example
