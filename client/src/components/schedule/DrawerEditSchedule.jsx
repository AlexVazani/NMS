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
import { Create, Delete } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
} from "state/api";

const DrawerEditSchedule = ({
  onUpdate,
  selectedEvent,
  toggleEditScheduleDrawer,
}) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const theme = useTheme();
  const [updateSchedule] = useUpdateScheduleMutation();
  const [deleteSchedule] = useDeleteScheduleMutation();

  // Datepicker
  const [startDate, setStartDate] = useState(selectedEvent.start);
  const [endDate, setEndDate] = useState(selectedEvent.end);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("scheduleStart", date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("scheduleEnd", date);
  };

  // Handle EditSchedule
  const handleEditSchedule = async (data) => {
    try {
      const updatedEvent = {
        id: selectedEvent.id,
        data: {
          title: data.scheduleTitle,
          start: data.scheduleStart.toISOString().slice(0, 10),
          end: data.scheduleEnd.toISOString().slice(0, 10),
        },
      };
      console.log(updatedEvent);
      await updateSchedule(updatedEvent).unwrap();

      onUpdate();
      toggleEditScheduleDrawer();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete handle funtion
  const handleDeleteSchedule = async () => {
    const confirmDelete = window.confirm("일정을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteSchedule(selectedEvent.id).unwrap();
        onUpdate();
        toggleEditScheduleDrawer();
      } catch (error) {
        console.error(error);
      }
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
          스케쥴 수정
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          일정을 변경합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleEditSchedule)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="스케쥴명"
            defaultValue={selectedEvent.title}
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
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleDeleteSchedule}
              color="secondary"
              size="large"
              startIcon={<Delete />}
              sx={{ mr: 2 }}
            >
              삭제
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<Create />}
            >
              스케쥴수정
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerEditSchedule;
