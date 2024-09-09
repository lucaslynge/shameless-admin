// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../features/rootSlice'; // Import your root reducer
import { setupListeners } from '@reduxjs/toolkit/query';
import { userApi } from '../services/userApi';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware)
  });


  export const store = makeStore();
  setupListeners(store.dispatch);
