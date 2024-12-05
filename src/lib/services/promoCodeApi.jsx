import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helper";
import { BASE_URL } from "../utils/contant";
import { setPromoCodes } from "../features/promoCodesSlice";
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

  endpoints: (build) => ({
    GetAllPromoCode: build.query({
      query: (filter) => {
        const params = new URLSearchParams(filter).toString();
        return { url: `/promoCode/allPromoCode?limit=10&${params}` };
      },
      transformResponse: (response) => response.data,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const activePromocodes = data.data.filter(
            (promoCode) => promoCode.active
          );
          dispatch(setPromoCodes(activePromocodes));
        } catch (error) {
          console.error("Failed to fetch promo codes:", error);
        }
      },
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
  useLazyGetAllPromoCodeQuery,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
} = promoCodeApi;
