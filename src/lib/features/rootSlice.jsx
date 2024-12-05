// redux/slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { userApi } from "../services/userApi";
import { articleApi } from "../services/articleApi";
import { communityApi } from "../services/communityApi";
import { paymentApi } from "../services/paymentApi";
import { contactApi } from "../services/contactApi";
import { reviewApi } from "../services/reviewApi";
import { categoryApi } from "../services/categoryApi";
import { promoCodeApi } from "../services/promoCodeApi";
import { tokenApi } from "../services/tokenApi";
import authReducer from "./authSlice";
import pageReducer from "./pagesSlice";
import promoCodesReducer from "./promoCodesSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  page: pageReducer,
  promoCodes: promoCodesReducer,
  [userApi.reducerPath]: userApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [promoCodeApi.reducerPath]: promoCodeApi.reducer,
  [tokenApi.reducerPath]: tokenApi.reducer,
});

export default rootReducer;
