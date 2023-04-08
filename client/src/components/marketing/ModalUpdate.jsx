import React from "react";
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

import { useUpdateInquiryMutation } from "state/api";

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

  const [updateInquiry, { isLoading }] = useUpdateInquiryMutation();
  const theme = useTheme();

  const salesStatusOption = ["문의상담", "미팅실측", "도면3D", "견적계약"];

  const handleUpdateInquiry = async (updatedData) => {
    try {
      await updateInquiry({
        id: id,
        data: updatedData,
      }).unwrap();

      setSnackbarOpen(true);
      onUpdate();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleUpdateInquiry)}>
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
              영업문의 정보 수정
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color={theme.palette.secondary[300]}
            >
              영업문의 및 고객정보를 수정합니다.
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
                  label="문의명"
                  defaultValue={data.inquiryTitle}
                  {...register("inquiryTitle", {
                    required: "This field is required",
                  })}
                  error={!!errors.inquiryTitle}
                  helperText={errors.inquiryTitle?.message}
                  variant="outlined"
                  margin="normal"
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
                  margin="normal"
                  fullWidth
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
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
                  margin="normal"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="공사금액"
                  defaultValue={data.salesPrice}
                  {...register("salesPrice")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">만원</InputAdornment>
                    ),
                  }}
                  error={!!errors.salesPrice}
                  helperText={errors.salesPrice?.message}
                  margin="normal"
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="영업담당자"
                  defaultValue={data.salesManager}
                  {...register("salesManager")}
                  error={!!errors.salesManager}
                  helperText={errors.salesManager?.message}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <FormControl
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors.salesStatus}
                >
                  <InputLabel id="sales-status-label">처리</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select
                        labelId="sales-status-label"
                        id="sales-status"
                        {...field}
                        label="진행도"
                      >
                        {salesStatusOption.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name="salesStatus"
                    control={control}
                    defaultValue={data.salesStatus}
                    rules={{ required: "This field is required" }}
                  />
                  {errors.salesStatus && (
                    <FormHelperText>
                      {errors.salesStatus.message}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  label="영업문의 설명"
                  defaultValue={data.salesDescription}
                  {...register("salesDescription", {
                    required: "This field is required",
                  })}
                  error={!!errors.salesDescription}
                  helperText={errors.salesDescription?.message}
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
