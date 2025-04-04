import { createSlice } from "@reduxjs/toolkit";

export const doctorsSlice = createSlice({
  name: "doctors",
  initialState: [],

  reducers: {
    setDoctors: (state, action) => {
      return action.payload;
    },
    addDoctor: (state, action) => {
      return state.concat(action.payload);
    },
    updateDoctor: (state, action) => {
      return state.map((doctor) =>
        doctor._id === action.payload._id
          ? {
              ...doctor,
              ...action.payload,
            }
          : doctor
      );
    },
    removeDoctor: (state, action) => {
      return state.filter((doctor) => doctor._id !== action.payload._id);
    },
  },
});

export const { setDoctors, addDoctor, updateDoctor, removeDoctor } =
  doctorsSlice.actions;

export const selectDoctors = (rootState) => rootState.doctors;

export default doctorsSlice.reducer;
