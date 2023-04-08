import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

    // if (result?.error?.originalStatus === 403) {
    //   console.log("sending refresh token");
    //   // send refresh token to get new access token
    //   const refreshResult = await baseQuery("/refresh", api, extraOptions);
    //   console.log(refreshResult);
    //   if (refreshResult?.data) {
    //     const user = api.getState().auth.user;
    //     // store the new token
    //     api.dispatch(setCredentials({ ...refreshResult.data, user }));
    //     // retry the original query with new access token
    //     result = await baseQuery(args, api, extraOptions);
    //   } else {
    //     api.dispatch(logOut());
    //   }
    // }
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
    getUsers: builder.query({
      query: () => "auth",
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "auth",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `auth/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `auth/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
