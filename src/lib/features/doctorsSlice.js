import { createSlice } from "@reduxjs/toolkit";

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState: [],

  reducers: {
    setDoctors: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDoctors } = doctorsSlice.actions;

export const selectDoctors = (rootState) => rootState.doctors;

export default doctorsSlice.reducer;
