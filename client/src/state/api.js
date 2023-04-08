import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "inquiries",
    "Projects",
    "Reports",
    "Invoices",
    "Schedule",
    "Partners",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    // Inquiries
    getInquiries: builder.query({
      query: () => "inquiries",
      providesTags: ["inquiries"],
      transformResponse: (response, meta) => {
        // Access the x-total-count header
        const totalCount = meta.response.headers.get("x-total-count");
        // Attach the totalCount to the result data
        return { data: response.data, totalCount };
      },
    }),
    createInquiry: builder.mutation({
      query: (data) => ({
        url: "inquiries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Inquiries", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    showInquiry: builder.query({
      query: (id) => `inquiries/${id}`,
      providesTags: ["Inquiries"],
    }),
    updateInquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `inquiries/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Inquiries", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Inquiries", id: "LIST" }],
    }),

    // Projects
    getProjects: builder.query({
      query: () => "projects",
      providesTags: ["Projects"],
      transformResponse: (response, meta) => {
        // Access the x-total-count header
        const totalCount = meta.response.headers.get("x-total-count");
        // Attach the totalCount to the result data
        return { data: response.data, totalCount };
      },
    }),
    addProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: "projects/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    showProject: builder.query({
      query: (id) => `projects/${id}`,
      providesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),

    // Reports
    getReports: builder.query({
      query: ({ id, reportType }) => {
        let queryParam = "";
        if (id) {
          if (reportType === "inquiry") {
            queryParam = `?inquiryId=${id}`;
          } else if (reportType === "project") {
            queryParam = `?projectId=${id}`;
          }
        }
        return `reports${queryParam}`;
      },
      providesTags: ["Reports"],
    }),
    createReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}/reports`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteReport: builder.mutation({
      query: ({ id, reportId }) => ({
        url: `${id}/reports/${reportId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Reports", id: "LIST" }],
    }),

    // Invoices

    getInvoices: builder.query({
      query: (projectId) => {
        const url = projectId ? `invoices?projectId=${projectId}` : "invoices";
        return url;
      },
      providesTags: ["Invoices"],
    }),
    addInvoice: builder.mutation({
      query: (data) => ({
        url: `invoices`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    updateInvoice: builder.mutation({
      query: ({ id, data }) => ({
        url: `invoices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteInvoice: builder.mutation({
      query: (id) => ({
        url: `invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Invoices", id: "LIST" }],
    }),

    // Schedule
    getSchedule: builder.query({
      query: () => `schedule`,
      providesTags: ["Schedule"],
    }),
    addSchedule: builder.mutation({
      query: (data) => ({
        url: `schedule`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Schedule", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    updateSchedule: builder.mutation({
      query: ({ id, data }) => ({
        url: `schedule/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Schedule", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Schedule", id: "LIST" }],
    }),

    // Partners
    getPartners: builder.query({
      query: ({ page, pageSize, sort }) => ({
        url: "partners",
        method: "GET",
        params: { page, pageSize, sort },
      }),
      providesTags: ["Partners"],
    }),
    addPartner: builder.mutation({
      query: (data) => ({
        url: `partners`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Partner", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    updatePartner: builder.mutation({
      query: ({ id, data }) => ({
        url: `partners/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "Partner", id: "LIST" }],
      transformResponse: (response) => response.data,
    }),
    deletePartner: builder.mutation({
      query: (id) => ({
        url: `partners/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Partner", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetInquiriesQuery,
  useCreateInquiryMutation,
  useShowInquiryQuery,
  useUpdateInquiryMutation,
  useDeleteInquiryMutation,
  useGetProjectsQuery,
  useAddProjectMutation,
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
  useGetScheduleQuery,
  useAddScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
  useGetPartnersQuery,
  useAddPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = api;
