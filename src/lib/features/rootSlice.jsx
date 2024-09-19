// redux/slices/index.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import { userApi } from '../services/userApi';
import { articleApi } from '../services/articleApi';
import { communityApi } from '../services/communityApi';
import { paymentApi } from '../services/paymentApi';
import { contactApi } from '../services/contactApi';
import { reviewApi } from '../services/reviewApi';
import authReducer from './authSlice';



const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  [userApi.reducerPath]:userApi.reducer,
  [articleApi.reducerPath]:articleApi.reducer,
  [communityApi.reducerPath]:communityApi.reducer,
  [paymentApi.reducerPath]:paymentApi.reducer,
  [contactApi.reducerPath]:contactApi.reducer,
  [reviewApi.reducerPath]:reviewApi.reducer

});

export default rootReducer;
