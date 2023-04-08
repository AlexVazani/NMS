import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "services/api/api";
import { authApi } from "services/api/authApi";
import authReducer from "services/features/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware, authApi.middleware),
});
setupListeners(store.dispatch);
