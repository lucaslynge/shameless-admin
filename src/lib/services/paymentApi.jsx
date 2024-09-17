"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
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
  refetchOnFocus:true,
  
  endpoints: (build) => ({
    GetAllPayment: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `payment/allData?${params}` }
      },
      transformResponse: (response) => response.data
    }),
    CreatePayment: build.mutation({
      query: (credentials) => ({ url: `payment/paymentCreate`, method: 'POST', body: credentials }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      }
    }),
    UpdatePayment: build.mutation({
      query: ({ id, body }) => ({ url: `/payment/updateByAdminPayment/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message

        }
      }
    }),
    DeletePayment: build.mutation({
      query: (id) => ({ url: `/payment/paymentDelete/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      }
    }),


  }),
});

export const { 
 useGetAllPaymentQuery,
 useCreatePaymentMutation,
 useDeletePaymentMutation,
 useUpdatePaymentMutation
} = paymentApi;

