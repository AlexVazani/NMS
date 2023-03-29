import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Modal,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Create, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useCreateProjectMutation } from "state/api";

const ModalCreate = ({ open, handleClose, setSnackbarOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const navigate = useNavigate();
  const theme = useTheme();

  // Modal function
  const handleCloseAndReset = () => {
    handleClose();
    reset();
  };

  const projectStatusOption = [
    "문의상담",
    "미팅실측",
    "도면3D",
    "견적계약",
    "철거설비",
    "목공전기",
    "바닥필름",
    "도배조명",
    "가구준공",
    "추가A/S",
  ];

  const handleCreateProject = async (data) => {
    try {
      await createProject(data).unwrap();

      setSnackbarOpen(true);
      navigate("/projects", { state: { gotoRefetch: true } });
      handleClose();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseAndReset}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit(handleCreateProject)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 600,
            minWidth: 300,
            bgcolor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            justifyContent: "center",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography
              variant="h3"
              align="center"
              color={theme.palette.secondary[100]}
            >
              프로젝트 등록
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color={theme.palette.secondary[300]}
            >
              새 프로젝트를 등록합니다.
            </Typography>
          </Stack>
          <Box
            sx={{
              mt: 2,
              maxHeight: "calc(60vh - 64px)",
              overflow: "auto",
              pr: 1,
            }}
          >
            <Grid container columnSpacing={{ sm: 2, md: 3 }}>
              <Grid item sm={12} md={6}>
                <TextField
                  label="프로젝트명"
                  {...register("projectTitle", {
                    required: "This field is required",
                  })}
                  error={!!errors.projectTitle}
                  helperText={errors.projectTitle?.message}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공간종류"
                  {...register("spaceType", {
                    required: "This field is required",
                  })}
                  error={!!errors.spaceType}
                  helperText={errors.spaceType?.message}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="고객명"
                  {...register("clientName", {
                    required: "This field is required",
                  })}
                  error={!!errors.clientName}
                  helperText={errors.clientName?.message}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="고객전화"
                  {...register("clientPhone", {
                    required: "This field is required",
                  })}
                  error={!!errors.clientPhone}
                  helperText={errors.clientPhone?.message}
                  margin="normal"
                  fullWidth
                  type="tel"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사지"
                  {...register("spaceLocation", {
                    required: "This field is required",
                  })}
                  error={!!errors.spaceLocation}
                  helperText={errors.spaceLocation?.message}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사면적"
                  {...register("spaceSize", {
                    required: "This field is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">평</InputAdornment>
                    ),
                  }}
                  error={!!errors.spaceSize}
                  helperText={errors.spaceSize?.message}
                  margin="normal"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사금액"
                  {...register("projectPrice", {
                    required: "This field is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">만원</InputAdornment>
                    ),
                  }}
                  error={!!errors.projectPrice}
                  helperText={errors.projectPrice?.message}
                  margin="normal"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="담당자"
                  {...register("projectManager", {
                    required: "This field is required",
                  })}
                  error={!!errors.projectManager}
                  helperText={errors.projectManager?.message}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <Autocomplete
                  id="project-status"
                  options={projectStatusOption}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="진행도"
                      error={!!errors.projectStatus}
                      helperText={errors.projectStatus?.message}
                      margin="normal"
                      fullWidth
                      {...register("projectStatus", {
                        required: "This field is required",
                      })}
                      autoComplete="off"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="프로젝트설명"
                  {...register("projectDescription", {
                    required: "This field is required",
                  })}
                  error={!!errors.projectDescription}
                  helperText={errors.projectDescription?.message}
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Box>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ mt: 5 }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseAndReset}
              startIcon={<Cancel />}
              color="secondary"
            >
              취소
            </Button>
            <Button
              variant="contained"
              startIcon={<Create />}
              color="secondary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "등록하기"}
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalCreate;
