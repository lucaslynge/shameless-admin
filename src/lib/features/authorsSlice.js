// redux/slices/authorsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authorsSlice = createSlice({
  name: "authors",
  initialState: [],

  reducers: {
    setAuthors: (state, action) => {
      return action.payload;
    },
    updateComment: (state, action) => {
      const updatedComment = action.payload;
      return state.map((comments) => ({
        ...comments,
        comments: comments.comments.map((comment) =>
          comment._id === action.payload._id ? updatedComment : comment
        ),
      }));
    },
    deleteComment: (state, action) => {
      return state.map((comments) => ({
        ...comments,
        comments: comments.comments.filter(
          (comment) => comment._id !== action.payload._id
        ),
      }));
    },
  },
});

export const { setAuthors, updateComment, deleteComment } =
  authorsSlice.actions;

export const selectAuthors = (rootState) => rootState.authors;

export default authorsSlice.reducer;
