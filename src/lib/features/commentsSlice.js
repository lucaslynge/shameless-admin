// redux/slices/commentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: [],

  reducers: {
    setComments: (state, action) => {
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

export const { setComments, updateComment, deleteComment } =
  commentsSlice.actions;

export const selectComments = (rootState) => rootState.comments;

export default commentsSlice.reducer;
