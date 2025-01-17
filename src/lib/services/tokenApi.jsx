import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/helper";
import { BASE_URL } from "../utils/contant";

export const tokenApi = createApi({
  reducerPath: "tokenApi",
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
    ValidateAdmin: build.mutation({
      query: () => ({
        url: `/token/validate/admin`,
        method: "POST",
        body: {},
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useValidateAdminMutation } = tokenApi;
