import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { Create, Cancel } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAddScheduleMutation } from "services/api/api";

const DrawerAddSchedule = ({ onUpdate, toggleAddScheduleDrawer }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const theme = useTheme();
  const [AddSchedule, { isLoading }] = useAddScheduleMutation();

  // Datepicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("scheduleStart", date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("scheduleEnd", date);
  };

  // Handle AddSchedule
  const handleAddSchedule = async (data) => {
    try {
      await AddSchedule(data).unwrap();

      onUpdate();
      toggleAddScheduleDrawer();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: { sm: "300px", md: "400px" },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary[100]}>
          스케쥴 작성
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          새 일정을 등록합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleAddSchedule)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="스케쥴명"
            {...register("scheduleTitle", {
              required: "This field is required",
            })}
            error={!!errors.scheduleTitle}
            helperText={errors.scheduleTitle?.message}
            margin="normal"
            fullWidth
          />
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            customInput={
              <TextField
                label="시작일"
                {...register("scheduleStart", { value: startDate })}
                margin="normal"
                fullWidth
              />
            }
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            customInput={
              <TextField
                label="종료일"
                {...register("scheduleEnd", { value: endDate })}
                margin="normal"
                fullWidth
              />
            }
            dateFormat="yyyy-MM-dd"
          />
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<Create />}
              sx={{ mt: 2 }}
            >
              스케쥴등록
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerAddSchedule;
