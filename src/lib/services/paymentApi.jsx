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
  tagTypes: ['Payment'],

  endpoints: (build) => ({
    GetAllPayment: build.query({
      query: (filter) => {
        const params=new URLSearchParams(filter).toString()
       return  { url: `payment/allData?${params}` }
      },
      providesTags: ['Payment'],

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
      },
      invalidatesTags: ['Payment'], // This ensures the cache is invalidated

    }),
    UpdatePayment: build.mutation({
      query: ({ id, body }) => ({ url: `/payment/updateByAdminPayment/${id}`, method: 'PUT', body: body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message

        }
      },
      invalidatesTags: ['Payment'], // This ensures the cache is invalidated

    }),
    DeletePayment: build.mutation({
      query: (id) => ({ url: `/payment/paymentDelete/${id} `, method: 'DELETE' }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message:response.message
        }
      },
      invalidatesTags: ['Payment'], // This ensures the cache is invalidated

    }),


  }),
});

export const { 
 useGetAllPaymentQuery,
 useCreatePaymentMutation,
 useDeletePaymentMutation,
 useUpdatePaymentMutation
} = paymentApi;

