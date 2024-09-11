"use client";

import { Provider } from "react-redux";
import { persist, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>{children}</PersistGate>
    </Provider>
  );
}
