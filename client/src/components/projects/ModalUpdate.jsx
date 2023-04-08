import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Edit, Cancel } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUpdateProjectMutation, useGetScheduleQuery } from "state/api";

const ModalUpdate = ({
  id,
  data,
  open,
  onUpdate,
  handleClose,
  setSnackbarOpen,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  // const { refetch: refetchSchedule } = useGetScheduleQuery();
  const theme = useTheme();

  // Datepicker
  const [startDate, setStartDate] = useState(
    data.projectStart ? new Date(data.projectStart) : null
  );
  const [endDate, setEndDate] = useState(
    data.projectEnd ? new Date(data.projectEnd) : null
  );

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("projectStart", date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("projectEnd", date);
  };

  const projectStatusOption = [
    "철거설비",
    "목공전기",
    "바닥필름",
    "도배조명",
    "가구준공",
    "추가A/S",
  ];

  const handleUpdateProject = async (updatedData) => {
    try {
      await updateProject({
        id: id,
        data: updatedData,
      }).unwrap();

      setSnackbarOpen(true);
      onUpdate();
      // refetchSchedule();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleUpdateProject)}>
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
              프로젝트 정보 수정
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color={theme.palette.secondary[300]}
            >
              프로젝트 및 고객정보를 수정합니다.
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
                  defaultValue={data.projectTitle}
                  {...register("projectTitle", {
                    required: "This field is required",
                  })}
                  error={!!errors.projectTitle}
                  helperText={errors.projectTitle?.message}
                  variant="outlined"
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공간종류"
                  defaultValue={data.spaceType}
                  {...register("spaceType", {
                    required: "This field is required",
                  })}
                  error={!!errors.spaceType}
                  helperText={errors.spaceType?.message}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={12}>
                <TextField
                  label="프로젝트설명"
                  defaultValue={data.projectDescription}
                  {...register("projectDescription", {
                    required: "This field is required",
                  })}
                  error={!!errors.projectDescription}
                  helperText={errors.projectDescription?.message}
                  margin="dense"
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="고객명"
                  defaultValue={data.clientName}
                  {...register("clientName", {
                    required: "This field is required",
                  })}
                  error={!!errors.clientName}
                  helperText={errors.clientName?.message}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="고객전화"
                  defaultValue={data.clientPhone}
                  {...register("clientPhone", {
                    required: "This field is required",
                  })}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.clientPhone}
                  helperText={errors.clientPhone?.message}
                  margin="dense"
                  fullWidth
                  type="tel"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사지"
                  defaultValue={data.spaceLocation}
                  {...register("spaceLocation", {
                    required: "This field is required",
                  })}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.spaceLocation}
                  helperText={errors.spaceLocation?.message}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사면적"
                  defaultValue={data.spaceSize}
                  {...register("spaceSize")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">평</InputAdornment>
                    ),
                  }}
                  error={!!errors.spaceSize}
                  helperText={errors.spaceSize?.message}
                  margin="dense"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사금액"
                  defaultValue={data.projectPrice}
                  {...register("projectPrice")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">만원</InputAdornment>
                    ),
                  }}
                  error={!!errors.projectPrice}
                  helperText={errors.projectPrice?.message}
                  margin="dense"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="담당자"
                  defaultValue={data.projectManager}
                  {...register("projectManager")}
                  error={!!errors.projectManager}
                  helperText={errors.projectManager?.message}
                  margin="dense"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  customInput={
                    <TextField
                      label="착공일"
                      {...register("projectStart", { value: startDate })}
                      margin="dense"
                      fullWidth
                    />
                  }
                  dateFormat="yyyy-MM-dd"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  customInput={
                    <TextField
                      label="준공일"
                      {...register("projectEnd", { value: endDate })}
                      margin="dense"
                      fullWidth
                    />
                  }
                  dateFormat="yyyy-MM-dd"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  error={!!errors.projectStatus}
                >
                  <InputLabel id="project-status-label">진행도</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        labelId="project-status-label"
                        id="project-status"
                        {...field}
                        label="진행도"
                      >
                        {projectStatusOption.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name="projectStatus"
                    control={control}
                    defaultValue={data.projectStatus}
                    rules={{ required: "This field is required" }}
                  />
                  {errors.projectStatus && (
                    <FormHelperText>
                      {errors.projectStatus.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Grid item sm={12} md={12}>
              <TextField
                label="공지사항"
                defaultValue={data.projectNotice}
                {...register("projectNotice")}
                margin="dense"
                fullWidth
                multiline
                rows={4}
              />
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
              onClick={handleClose}
              startIcon={<Cancel />}
              color="secondary"
            >
              취소
            </Button>
            <Button
              variant="contained"
              startIcon={<Edit />}
              color="secondary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "수정하기"}
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalUpdate;
