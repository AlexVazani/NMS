import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Button,
  Typography,
  TextField,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { Create, Cancel } from "@mui/icons-material";

import { useAddInvoiceMutation, useGetProjectsQuery } from "state/api";

const DrawerAdd = ({ projectId, onUpdate, toggleAddDrawer }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      invoiceTaxCheck: true,
    },
  });

  const [addInvoice, { isLoading }] = useAddInvoiceMutation();
  const { data: projectsData } = useGetProjectsQuery();

  const theme = useTheme();

  // Handle AddInvoice
  const handleAddInvoice = async (data) => {
    try {
      let invoiceData;
      if (projectId) {
        invoiceData = { ...data, projectId };
      } else {
        invoiceData = data;
      }

      await addInvoice(invoiceData).unwrap();

      onUpdate();
      toggleAddDrawer();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        width: { xs: "300px", md: "400px" },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary[100]}>
          품의서 작성
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          새 품의서를 작성합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleAddInvoice)}>
        <Box sx={{ mt: 1 }}>
          {!projectId && projectsData && (
            <FormControl fullWidth>
              <InputLabel id="project-select-label">Project</InputLabel>
              <Select
                labelId="project-select-label"
                defaultValue=""
                {...register("projectId", { required: true })}
                label="Project"
                onChange={(e) => setValue("projectId", e.target.value)}
              >
                {projectsData.data &&
                  [...projectsData.data]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((project) => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.projectTitle}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          )}
          <TextField
            label="공정"
            {...register("projectProcess")}
            variant="outlined"
            margin="dense"
            fullWidth
            autoComplete="off"
          />
          <TextField
            label="내역"
            {...register("invoiceDescription")}
            error={!!errors.invoiceDescription}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="받는사람"
            {...register("invoiceTo", {
              required: "This field is required",
            })}
            error={!!errors.invoiceTo}
            helperText={errors.invoiceTo?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="지급금액"
            {...register("invoicePrice", {
              required: "This field is required",
            })}
            type="number"
            error={!!errors.invoicePrice}
            helperText={errors.invoicePrice?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ pl: "12px", height: "50px" }}
          >
            <Typography variant="body1">세금계산서</Typography>
            <Controller
              name="invoiceTaxCheck"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="secondary"
                    />
                  }
                  label={field.value ? "발행" : "미발행"}
                />
              )}
            />
          </Stack>
          <Autocomplete
            id="project-title"
            options={["계좌이체", "현금결제", "카드결제", "핸드폰결제", "기타"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="지급방식"
                {...register("paymentType", {
                  required: "This field is required",
                })}
                error={!!errors.paymentType}
                helperText={errors.paymentType?.message}
                variant="outlined"
                margin="dense"
                fullWidth
                autoComplete="off"
              />
            )}
          />
          <TextField
            label="지급계좌"
            {...register("paymentBankacct")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <Autocomplete
            id="project-title"
            options={["긴급", "보통", "여유"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="우선도"
                {...register("invoicePriority")}
                error={!!errors.invoicePriority}
                variant="outlined"
                margin="dense"
                fullWidth
                autoComplete="off"
              />
            )}
          />
          <Autocomplete
            id="invoice-status"
            options={["대기", "완료", "부분", "보류", "거절"]}
            renderInput={(params) => (
              <TextField
                {...params}
                label="처리"
                {...register("invoiceStatus", {
                  required: "This field is required",
                })}
                error={!!errors.invoiceStatus}
                helperText={errors.invoiceStatus?.message}
                variant="outlined"
                margin="dense"
                fullWidth
              />
            )}
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
              품의서등록
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerAdd;
