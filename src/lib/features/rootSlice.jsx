// redux/slices/index.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { userApi } from '../services/userApi';
import authReducer from './authSlice';



const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [userApi.reducerPath]:userApi.reducer

});

export default rootReducer;
