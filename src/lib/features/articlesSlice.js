import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    picks: [],
  },

  reducers: {
    setPicksArticles: (state, action) => {
      return {
        ...state,
        picks: action.payload,
      };
    },
  },
});

export const { setPicksArticles } = articlesSlice.actions;

export const selectArticles = (rootState) => rootState.articles;

export default articlesSlice.reducer;
