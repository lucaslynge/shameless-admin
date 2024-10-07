import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const contactApi = createApi({
  reducerPath: 'contactApi',
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
  tagTypes: ['Contact'],

  endpoints: (build) => ({
    GetAllContacts: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `contactUs/allData?${params}` }
      },
      providesTags: ['Contact'],
      transformResponse: (response) => response.data
    }),
    GetByIdContact: build.query({
      query: (id) => ({ url: `contactUs/contactById/${id}` }),
      transformResponse: (response) => response.data
    }),
  
 
    DeleteContact: build.mutation({
      query: (id) => ({ url: `/contactUs/contactDelete/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          success: response.success,
          message:response.message
        }
      },
      invalidatesTags: ['Contact'], // This ensures the cache is invalidated

    }),
    SendMessage: build.mutation({
        query: (credentials) => ({ url: `/contactUs/send`, method: 'POST',body:credentials }),
        transformResponse: (response) => response,
        invalidatesTags: ['Contact'], // This ensures the cache is invalidated

      }),
      UpdateMessage: build.mutation({
        query: ({id,body}) => ({ url: `/contactUs/contactUpdate/${id}`, method: 'PUT',body:body }),
        transformResponse: (response) => response,
        invalidatesTags: ['Contact'], // This ensures the cache is invalidated

      }),


  }),
});

export const { 
useGetAllContactsQuery,
useDeleteContactMutation,
useGetByIdContactQuery,
useSendMessageMutation,
useUpdateMessageMutation
} = contactApi;

