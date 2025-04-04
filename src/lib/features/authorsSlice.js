import { createSlice } from "@reduxjs/toolkit";

export const authorsSlice = createSlice({
  name: "authors",
  initialState: [],

  reducers: {
    setAuthors: (state, action) => {
      return action.payload;
    },
    addAuthor: (state, action) => {
      return state.concat(action.payload);
    },
    updateAuthor: (state, action) => {
      return state.map((author) =>
        author._id === action.payload._id
          ? {
              ...author,
              ...action.payload,
            }
          : author
      );
    },
    removeAuthor: (state, action) => {
      return state.filter((author) => author._id !== action.payload._id);
    },
  },
});

export const { setAuthors, addAuthor, updateAuthor, removeAuthor } =
  authorsSlice.actions;

export const selectAuthors = (rootState) => rootState.authors;

export default authorsSlice.reducer;
