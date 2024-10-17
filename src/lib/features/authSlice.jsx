// redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null,
    token:null,
    articles_current_page:1

    
  },
  
  reducers: {
    authuser: (state,action) => {
      state.user = action.payload;
    },
    addtoken: (state,action) => {
      state.token = action.payload;
    },
    authlogout: (state) => {
      state.user = null;
      state.token = null;

    },
    setCurrentArticlePage: (state,action) => {
      state.articles_current_page=action.payload
    },
 
  },
});

export const {  authuser,addtoken,authlogout,setCurrentArticlePage } = authSlice.actions;
export default authSlice.reducer;
