// redux/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  
  reducers: {
    authuser: (state,action) => {
      state.user = action.payload;
    },
 
  },
});

export const {  authuser } = authSlice.actions;
export default authSlice.reducer;
