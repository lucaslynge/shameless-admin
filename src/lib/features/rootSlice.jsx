// redux/slices/index.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import { userApi } from "../services/userApi";
import { articleApi } from "../services/articleApi";
import { communityApi } from "../services/communityApi";
import { paymentApi } from "../services/paymentApi";
import { contactApi } from "../services/contactApi";
import { reviewApi } from "../services/reviewApi";
import { promoCodeApi } from "../services/promoCodeApi";
import { tokenApi } from "../services/tokenApi";
import { commentsApi } from "../services/commentsApi";
import { authorsApi } from "../services/authorsApi";
import { doctorsApi } from "../services/doctorsApi";
import authReducer from "./authSlice";
import pageReducer from "./pagesSlice";
import promoCodesReducer from "./promoCodesSlice";
import commentsReducer from "./commentsSlice";
import authorsReducer from "./authorsSlice";
import doctorsReducer from "./doctorsSlice";
import articlesReducer from "./articlesSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  page: pageReducer,
  promoCodes: promoCodesReducer,
  comments: commentsReducer,
  authors: authorsReducer,
  doctors: doctorsReducer,
  articles: articlesReducer,
  [userApi.reducerPath]: userApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
  [paymentApi.reducerPath]: paymentApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [promoCodeApi.reducerPath]: promoCodeApi.reducer,
  [tokenApi.reducerPath]: tokenApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [commentsApi.reducerPath]: commentsApi.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [doctorsApi.reducerPath]: doctorsApi.reducer,
});

export default rootReducer;
