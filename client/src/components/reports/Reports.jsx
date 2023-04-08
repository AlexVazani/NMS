import React, { useState } from "react";

import {
  Box,
  Stack,
  Button,
  Avatar,
  Divider,
  Drawer,
  Typography,
  Pagination,
} from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import DrawerCreateReport from "components/reports/DrawerCreate";
import profileImage from "assets/profile.jpg";
import { useGetReportsQuery, useDeleteReportMutation } from "services/api/api";

const Reports = ({ inquiryId, salesStatus, projectId, projectStatus }) => {
  const selectedId = inquiryId ?? projectId;
  const selectedType = inquiryId ? "inquiry" : "project";

  // handle Drawer
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const toggleCreateDrawer = () => {
    setIsCreateDrawerOpen(!isCreateDrawerOpen);
  };

  // RTK Query Get
  const {
    data: reportData,
    isLoading,
    refetch,
  } = useGetReportsQuery({ id: selectedId, reportType: selectedType });

  const [deleteReport] = useDeleteReportMutation();

  const sortedData = (reportData?.slice() ?? []).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Refresh
  const onUpdate = async () => {
    await refetch();
  };

  // Pagination function
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Delete handle funtion
  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport({ id: selectedId, reportId }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        minWidth: "310px",
        borderRadius: "0.55rem",
        padding: { xs: 1, md: 2 },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="3px 0 10px 8px"
      >
        <Typography variant="h5">Project Reports</Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleCreateDrawer}
        >
          보고서 작성
        </Button>
        <Drawer
          anchor="right"
          open={isCreateDrawerOpen}
          onClose={toggleCreateDrawer}
        >
          <DrawerCreateReport
            inquiryId={inquiryId}
            salesStatus={salesStatus}
            projectId={projectId}
            projectStatus={projectStatus}
            onUpdate={onUpdate}
            toggleCreateDrawer={toggleCreateDrawer}
          />
        </Drawer>
      </Box>
      <Divider />
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {sortedData &&
          sortedData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((report) => (
              <TimelineItem key={report._id}>
                <TimelineSeparator>
                  <TimelineDot color="secondary" variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Stack direction="row">
                      {/* {!report.inquiryId && (
                        <Typography
                          variant="subtitle1"
                          sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
                        >
                          {report.projectId.projectTitle}
                        </Typography>
                      )} */}
                      <Typography
                        variant="subtitle1"
                        sx={{ mr: 2, fontWeight: 600, color: "text.primary" }}
                      >
                        {report.reportStatus}
                      </Typography>
                    </Stack>
                    <Typography variant="subtitle2">
                      {new Date(report.createdAt).toLocaleString("ko-KR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.primary", whiteSpace: "pre-wrap" }}
                  >
                    {report.reportContent}
                  </Typography>
                  <Divider sx={{ mt: 2, mb: 1 }} />
                  <Box sx={{ display: "flex", mb: 2 }}>
                    <Avatar
                      src={profileImage}
                      sx={{ width: "2rem", height: "2rem", mr: 2 }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600, mr: 1 }}
                      >
                        하성희
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        onClick={() => handleDeleteReport(report._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
      </Timeline>
      <Box display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(sortedData?.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default Reports;
