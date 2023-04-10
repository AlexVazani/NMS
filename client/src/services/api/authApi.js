import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginSuccess, logout } from "services/features/authSlice";

export const authApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      credentials: "include",
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
        return headers;
      },
    })(args, api, extraOptions);

    // If access token is expired, ask refreshToken
    if (result?.error?.originalStatus === 401) {
      const refreshResult = await fetch(
        `${import.meta.env.VITE_BASE_URL}/refresh-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (refreshResult.ok) {
        const { token } = await refreshResult.json();
        api.dispatch(
          loginSuccess({ token, userId: api.getState().auth.userId })
        );
        // retry the original query with new access token
        result = await fetchBaseQuery({
          baseUrl: import.meta.env.VITE_BASE_URL,
          credentials: "include",
          prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
          },
        })(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        console.log("Refresh token expired or invalid");
      }
    }
    return result;
  },
  reducerPath: "authApi",
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
