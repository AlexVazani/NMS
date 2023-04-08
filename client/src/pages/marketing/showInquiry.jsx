import React, { useState } from "react";
import {
  Box,
  Divider,
  Stack,
  Button,
  Grid,
  Typography,
  Snackbar,
  SnackbarContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import {
  Edit,
  Delete,
  TaskAlt,
  List,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

import {
  useShowInquiryQuery,
  useDeleteInquiryMutation,
  useAddProjectMutation,
  useGetInquiriesQuery,
} from "services/api/api";
import ModalUpdate from "components/marketing/ModalUpdate";
import Reports from "components/reports/Reports";
import Invoices from "components/invoices/Invoices";

const ShowInquiry = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useShowInquiryQuery(id);
  const [deleteInquiry] = useDeleteInquiryMutation();
  const [addProject] = useAddProjectMutation();
  const { refetch: refetchInquiries } = useGetInquiriesQuery();
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

  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const handleOpenAddProjectDialog = () => setAddProjectDialogOpen(true);
  const handleCloseAddProjectDialog = () => setAddProjectDialogOpen(false);

  // After update
  const handleUpdatedInquiry = () => {
    refetch();
  };

  // Goto List
  const handleGotoList = () => {
    navigate("/inquiries", {
      state: { gotoRefetch: true },
    });
  };

  // Delete handle funtion
  const handleDeleteInquiry = async (id) => {
    try {
      await deleteInquiry(id).unwrap();
      handleCloseDialog();
      navigate("/inquiries", { state: { gotoRefetch: true } });
    } catch (error) {
      console.error(error);
    }
  };

  // Turn to Project
  const handleAddProject = async () => {
    await addProject(id);
    handleCloseAddProjectDialog();
    refetchInquiries();
    navigate("/projects", { state: { gotoRefetch: true } });
  };

  return (
    <Box>
      {data && !isLoading ? (
        <Box>
          <Box>
            <Typography variant="h2" sx={{ mb: "5px" }}>
              {data.inquiryTitle}
            </Typography>
            <Typography color={theme.palette.secondary[400]}>
              {data.spaceType}
            </Typography>
            <Typography alignItems="center">{data.salesDescription}</Typography>
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
                        {new Intl.NumberFormat("ko-KR").format(data.salesPrice)}{" "}
                        만원
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>영업담당</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.salesManager}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>진행도</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography color={"#B6A7D0"}>
                        {data.salesStatus}
                      </Typography>
                    </Grid>
                  </Grid>
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
                      onUpdate={handleUpdatedInquiry}
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
                            영업문의가 수정되었습니다!
                          </span>
                        }
                      />
                    </Snackbar>
                  </Stack>
                </Box>
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 2, ml: 3 }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleOpenAddProjectDialog}
                    startIcon={<ThumbUpAltOutlined />}
                    color="secondary"
                  >
                    계약완료
                  </Button>
                  {/* 계약완료 Dialog */}
                  <Dialog
                    open={addProjectDialogOpen}
                    onClose={handleCloseAddProjectDialog}
                  >
                    <DialogTitle color={theme.palette.secondary[400]}>
                      계약완료
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        이 영업문의를 계약 프로젝트로 등록하시겠습니까?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleCloseAddProjectDialog}
                      >
                        취소
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddProject}
                        autoFocus
                      >
                        등록
                      </Button>
                    </DialogActions>
                  </Dialog>
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
                      문의삭제
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        이 영업문의를 삭제하시겠습니까? 삭제한 문의는 되돌릴 수
                        없습니다.
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
                        onClick={() => handleDeleteInquiry(id)}
                        autoFocus
                      >
                        삭제
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Stack>
              </Grid>
              <Grid item sm={12} md={7}>
                <Box borderRadius="0.55rem" backgroundColor="#312D4A">
                  <Reports inquiryId={id} salesStatus={data.salesStatus} />
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

export default ShowInquiry;
