import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Projects", "Reports", "Invoices"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    // Projects
    getProjects: builder.query({
      query: () => "client/projects",
      providesTags: ["Projects"],
      transformResponse: (response, meta) => {
        // Access the x-total-count header
        const totalCount = meta.response.headers.get("x-total-count");
        // Attach the totalCount to the result data
        return { data: response.data, totalCount };
      },
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "client/projects/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    showProject: builder.query({
      query: (id) => `client/projects/${id}`,
      providesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `client/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `client/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),

    // Reports
    getReports: builder.query({
      query: (projectId) => {
        const queryParam = projectId ? `?projectId=${projectId}` : "";
        return `client/reports${queryParam}`;
      },
      providesTags: ["Reports"],
    }),
    createReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `client/projects/${id}/reports`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteReport: builder.mutation({
      query: ({ id, reportId }) => ({
        url: `client/projects/${id}/reports/${reportId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
    }),

    // Invoices

    getInvoices: builder.query({
      query: () => `client/invoices`,
      providesTags: ["Invoices"],
    }),
    addInvoice: builder.mutation({
      query: (data) => ({
        url: `client/invoices`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `client/invoices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `client/invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useShowProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetReportsQuery,
  useCreateReportMutation,
  useDeleteReportMutation,
  useGetInvoicesQuery,
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
} = api;
