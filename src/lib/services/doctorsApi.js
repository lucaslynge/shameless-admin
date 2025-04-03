import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/contant";
import { getToken } from "../utils/helper";
import { setComments } from "../features/commentsSlice";
import { setAuthors } from "../features/authorsSlice";

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
      query: () => ({ url: `/doctors/all` }),
      transformResponse: (response) => response,
      async onQueryStarted(filter, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(setAuthors(data)); // Dispatch to update the slice with fetched doctors
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      },
    }),
    // mutations
    deleteDoctor: build.mutation({
      query: (id) => ({ url: `/doctors/delete/${id} `, method: "DELETE" }),
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
        url: `/doctors/update/${id} `,
        method: "POST",
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
  // usedeleteAuthorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;
