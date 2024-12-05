// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/rootSlice"; // Import your root reducer
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import { articleApi } from "../services/articleApi";
import { paymentApi } from "../services/paymentApi";
import { communityApi } from "../services/communityApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactApi } from "../services/contactApi";
import { reviewApi } from "../services/reviewApi";
import { categoryApi } from "../services/categoryApi";
import { promoCodeApi } from "../services/promoCodeApi";
import { tokenApi } from "../services/tokenApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(articleApi.middleware)
        .concat(paymentApi.middleware)
        .concat(communityApi.middleware)
        .concat(contactApi.middleware)
        .concat(reviewApi.middleware)
        .concat(categoryApi.middleware)
        .concat(promoCodeApi.middleware)
        .concat(tokenApi.middleware),
  });

const store = makeStore();
setupListeners(store.dispatch);
const persist = persistStore(store);
export { store, persist };
