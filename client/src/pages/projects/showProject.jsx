import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Button,
  Grid,
  Typography,
  LinearProgress,
  Snackbar,
  SnackbarContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import { Edit, Delete, TaskAlt, List } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

import { useShowProjectQuery, useDeleteProjectMutation } from "state/api";
import ModalUpdate from "components/common/ModalUpdate";
import Reports from "components/reports/Reports";
import Invoices from "components/invoices/Invoices";

const ShowProject = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useShowProjectQuery(id);
  const [deleteProject] = useDeleteProjectMutation();
  const navigate = useNavigate();
  const theme = useTheme();

  // Modal functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Snackbar function
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Dialog function
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleOpenDialog = () => setDeleteDialogOpen(true);
  const handleCloseDialog = () => setDeleteDialogOpen(false);

  // LinearProgress value control
  const getProgressValue = (projectStatus) => {
    switch (projectStatus) {
      case "문의상담":
        return 10;
      case "미팅실측":
        return 20;
      case "도면3D":
        return 30;
      case "견적계약":
        return 40;
      case "철거설비":
        return 50;
      case "목공전기":
        return 60;
      case "바닥필름":
        return 70;
      case "도배조명":
        return 80;
      case "가구준공":
        return 90;
      case "추가A/S":
        return 100;
      default:
        return 0;
    }
  };

  // After update
  const handleUpdatedProject = () => {
    refetch();
  };

  // Goto List
  const handleGotoList = () => {
    navigate("/projects", {
      state: { gotoRefetch: true },
    });
  };

  // Delete handle funtion
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id).unwrap();
      handleCloseDialog();
      navigate("/projects", { state: { gotoRefetch: true } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      {data && !isLoading ? (
        <Box>
          <Box>
            <Typography variant="h2" sx={{ mb: "5px" }}>
              {data.projectTitle}
            </Typography>
            <Typography color={theme.palette.secondary[400]}>
              {data.spaceType}
            </Typography>
            <Typography alignItems="center">
              {data.projectDescription}
            </Typography>
          </Box>
          <Box mt="30px">
            <Grid container spacing={3}>
              <Grid item sm={12} md={5}>
                <Box
                  sx={{
                    // minWidth: "200px",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                    padding: 3,
                  }}
                >
                  <Typography variant="h5">Details</Typography>
                  <Divider sx={{ mt: 1.5, mb: 1.5 }}></Divider>
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Typography>고객명</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.clientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>고객전화</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.clientPhone}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>공사지</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.spaceLocation}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>공사면적</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {new Intl.NumberFormat("ko-KR").format(data.spaceSize)}{" "}
                        평
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>공사금액</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {new Intl.NumberFormat("ko-KR").format(
                          data.projectPrice
                        )}{" "}
                        만원
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>담당자</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.projectManager}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>진행도</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.projectStatus}
                      </Typography>
                    </Grid>
                  </Grid>
                  <LinearProgress
                    variant="determinate"
                    value={getProgressValue(data.projectStatus)}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 4,
                    }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="center"
                    spacing={1}
                    sx={{ mt: 5 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleGotoList}
                      startIcon={<List />}
                      color="secondary"
                    >
                      리스트
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleOpen}
                      startIcon={<Edit />}
                      color="secondary"
                    >
                      수정
                    </Button>
                    <ModalUpdate
                      id={id}
                      data={data}
                      open={open}
                      onUpdate={handleUpdatedProject}
                      handleClose={handleClose}
                      setSnackbarOpen={setSnackbarOpen}
                    />
                    {/* 수정 Snackbar */}
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
                            프로젝트가 수정되었습니다!
                          </span>
                        }
                      />
                    </Snackbar>
                    <Button
                      variant="outlined"
                      onClick={handleOpenDialog}
                      startIcon={<Delete />}
                      color="secondary"
                    >
                      삭제
                    </Button>
                    {/* 삭제 Dialog */}
                    <Dialog
                      open={deleteDialogOpen}
                      onClose={handleCloseDialog}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        color={theme.palette.secondary[400]}
                      >
                        프로젝트 삭제
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          이 프로젝트를 삭제하시겠습니까? 삭제한 프로젝트는
                          되돌릴 수 없습니다.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={handleCloseDialog}
                        >
                          취소
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDeleteProject(id)}
                          autoFocus
                        >
                          삭제
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Stack>
                </Box>
              </Grid>
              <Grid item sm={12} md={7}>
                <Box borderRadius="0.55rem" backgroundColor="#312D4A">
                  <Reports projectId={id} />
                </Box>
                <Box borderRadius="0.55rem" marginTop={3}>
                  <Invoices />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        "Loading 중입니다."
      )}
    </Box>
  );
};

export default ShowProject;
