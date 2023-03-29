import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  Snackbar,
  SnackbarContent,
  Pagination,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Add, Search, TaskAlt } from "@mui/icons-material";

import ProjectCard from "components/common/Card";
import Header from "components/layout/Header";
import { useGetProjectsQuery } from "state/api";
import ModalCreate from "components/common/ModalCreate";

const GetProjects = () => {
  const location = useLocation();

  const { data, isLoading, refetch } = useGetProjectsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const sortedData = (data?.data.slice() ?? []).sort(
    (a, b) => b.projectId - a.projectId
  );

  // Filtering function
  const [filterValue, setFilterValue] = useState("");
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };
  const filteredData = sortedData.filter((project) => {
    return project.projectTitle
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  // Modal functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Snackbar function
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Pagination function
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Refetch after Delete and update
  useEffect(() => {
    if (location.state && location.state.gotoRefetch) {
      refetch();
    }
  }, [location, refetch]);

  return (
    <Box>
      <Header title="PROJECTS" subtitle="현재 진행중인 프로젝트입니다." />
      <Box sx={{ mt: 2 }} display="flex" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleOpen}
            startIcon={<Add />}
            size="large"
            color="secondary"
          >
            프로젝트 등록
          </Button>
          <ModalCreate
            open={open}
            handleClose={handleClose}
            setSnackbarOpen={setSnackbarOpen}
          />
          {/* 등록 Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={1500}
            onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <SnackbarContent
              sx={{ backgroundColor: "#4caf50" }}
              message={
                <span>
                  <TaskAlt sx={{ mr: 1, verticalAlign: "middle" }} />
                  프로젝트가 등록되었습니다!
                </span>
              }
            />
          </Snackbar>
          <Typography sx={{ display: isMobile ? "none" : "block" }}>
            {data && `${data.totalCount}개의 프로젝트가 있습니다.`}
          </Typography>
        </Stack>
        {/* Fillering */}
        <TextField
          label="프로젝트 검색"
          variant="filled"
          sx={{ width: "24%", minWidth: 200 }}
          value={filterValue}
          InputProps={{
            endAdornment: <Search />,
          }}
          onChange={handleFilterChange}
        />
      </Box>
      {sortedData && !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {filteredData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(
              ({
                _id,
                projectId,
                projectTitle,
                spaceType,
                spaceSize,
                spaceLocation,
                clientName,
                clientPhone,
                projectManager,
                projectPrice,
                projectStatus,
                projectDescription,
              }) => (
                <ProjectCard
                  key={_id}
                  _id={_id}
                  projectId={projectId}
                  projectTitle={projectTitle}
                  spaceType={spaceType}
                  spaceSize={spaceSize}
                  spaceLocation={spaceLocation}
                  clientName={clientName}
                  clientPhone={clientPhone}
                  projectManager={projectManager}
                  projectPrice={projectPrice}
                  projectStatus={projectStatus}
                  projectDescription={projectDescription}
                />
              )
            )}{" "}
        </Box>
      ) : (
        <Box mt="20px" width="100%" display="flex" justifyContent="center">
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
        <Pagination
          count={Math.ceil(sortedData.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default GetProjects;
