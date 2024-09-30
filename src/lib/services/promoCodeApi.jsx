import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helper";
import { BASE_URL } from "../utils/contant";
export const promoCodeApi = createApi({
  reducerPath: "promoCodeApi",
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
  refetchOnFocus:true,
  endpoints: (build) => ({
    GetAllPromoCode: build.query({
      query: (filter) => {
        const params = new URLSearchParams(filter).toString();
        return { url: `/promoCode/allPromoCode?limit=10` };
      },
      transformResponse: (response) => response.data,
    }),
    CreatePromoCode: build.mutation({
      query: (credentials) => ({
        url: `/promoCode/createPromoCode`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => response,
    }),
    UpdatePromoCode: build.mutation({
      query: ({ id, body }) => ({
        url: `/promoCode/promoCodeUpdate/${id}`,
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
    }),
    DeletePromoCode: build.mutation({
      query: (id) => ({
        url: `/promoCode/promoCodeDelete/${id} `,
        method: "DELETE",
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
  useCreatePromoCodeMutation,
  useGetAllPromoCodeQuery,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
} = promoCodeApi;
