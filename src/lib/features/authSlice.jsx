// redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null,
    token:null 
  },
  
  reducers: {
    authuser: (state,action) => {
      state.user = action.payload;
    },
    addtoken: (state,action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

    },
  },
});

export const {  authuser,addtoken,logout } = authSlice.actions;
export default authSlice.reducer;
