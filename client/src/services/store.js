import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { api } from "services/api/api";
import { authApi } from "services/api/authApi";
import { userApi } from "services/api/userApi";
import authReducer from "services/features/authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(api.middleware, authApi.middleware, userApi.middleware),
});
setupListeners(store.dispatch);
