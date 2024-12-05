// redux/slices/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    articles_current_page: 1,
  },

  reducers: {
    setCurrentArticlePage: (state, action) => {
      state.articles_current_page = action.payload;
    },
  },
});

export const { setCurrentArticlePage } = pagesSlice.actions;
export default pagesSlice.reducer;
