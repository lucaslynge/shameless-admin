import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
import { setDoctors } from "../features/doctorsSlice";

export const doctorsApi = createApi({
  reducerPath: "doctorsApi",
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
  tagTypes: ["Doctors"],
  endpoints: (build) => ({
    // queries
    getAllDoctors: build.query({
      query: () => ({ url: `/doctors` }),
      transformResponse: (response) => ({
        response: response.data,
        status: response.success,
        message: response.message,
      }),
      async onQueryStarted(filter, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setDoctors(data.response));
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      },
    }),
    // mutations
    createDoctor: build.mutation({
      query: (body) => ({ url: `/doctors`, method: "POST", body }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    deleteDoctor: build.mutation({
      query: (id) => ({ url: `/doctors/${id} `, method: "DELETE" }),
      transformResponse: (response) => {
        return {
          response: response.data,
          status: response.success,
          message: response.message,
        };
      },
    }),
    updateDoctor: build.mutation({
      query: ({ id, body }) => ({
        url: `/doctors/${id} `,
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
  useGetAllDoctorsQuery,
  useCreateDoctorMutation,
  // usedeleteAuthorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;
