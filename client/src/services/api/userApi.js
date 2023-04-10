import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "userApi",
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    showUser: builder.query({
      query: (id) => `users/${id}`,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (imageData) => ({
        url: "/upload",
        method: "POST",
        body: imageData,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useShowUserQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadImageMutation,
} = userApi;
