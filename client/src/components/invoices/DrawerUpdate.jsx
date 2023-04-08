import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Switch,
  Button,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { Create } from "@mui/icons-material";

import { useUpdateInvoiceMutation } from "state/api";

const DrawerUpdate = ({
  selectedInvoiceData: invoiceData,
  onUpdate,
  toggleUpdateDrawer,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      invoiceTaxCheck: invoiceData.invoiceTaxCheck,
    },
  });

  const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();

  const theme = useTheme();

  // Handle updateInvoice
  const handleUpdateInvoice = async (data) => {
    try {
      await updateInvoice({
        id: invoiceData._id,
        data,
      }).unwrap();

      await onUpdate();
      toggleUpdateDrawer();
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
          품의서 수정
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          품의서 내용을 수정합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleUpdateInvoice)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="공정"
            defaultValue={invoiceData.projectProcess}
            {...register("projectProcess", {
              required: "This field is required",
            })}
            error={!!errors.projectProcess}
            helperText={errors.projectProcess?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="내역"
            defaultValue={invoiceData.invoiceDescription}
            {...register("invoiceDescription")}
            error={!!errors.invoiceDescription}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="받는사람"
            defaultValue={invoiceData.invoiceTo}
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
            defaultValue={invoiceData.invoicePrice}
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
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="secondary"
                    />
                  }
                  label={field.value ? "발행" : "미발행"}
                />
              )}
            />
          </Stack>
          <FormControl
            variant="outlined"
            margin="dense"
            fullWidth
            error={!!errors.paymentType}
          >
            <InputLabel id="payment-type-label">처리</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  labelId="payment-type-label"
                  id="payment-type"
                  {...field}
                  label="지급방식"
                >
                  {[
                    "계좌이체",
                    "현금결제",
                    "카드결제",
                    "핸드폰결제",
                    "기타",
                  ].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="paymentType"
              control={control}
              defaultValue={invoiceData.paymentType}
              rules={{ required: "This field is required" }}
            />
            {errors.paymentType && (
              <FormHelperText>{errors.paymentType.message}</FormHelperText>
            )}
          </FormControl>
          <TextField
            label="지급계좌"
            defaultValue={invoiceData.paymentBankacct}
            {...register("paymentBankacct")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <FormControl
            variant="outlined"
            margin="dense"
            fullWidth
            error={!!errors.invoicePriority}
          >
            <InputLabel id="project-title-label">처리</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  labelId="project-title-label"
                  id="project-title"
                  {...field}
                  label="우선도"
                >
                  {["긴급", "보통", "여유"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="invoicePriority"
              control={control}
              defaultValue={invoiceData.invoicePriority}
              rules={{ required: "This field is required" }}
            />
            {errors.invoicePriority && (
              <FormHelperText>{errors.invoicePriority.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            variant="outlined"
            margin="dense"
            fullWidth
            error={!!errors.invoiceStatus}
          >
            <InputLabel id="invoice-status-label">처리</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  labelId="invoice-status-label"
                  id="invoice-status"
                  {...field}
                  label="처리"
                >
                  {["대기", "완료", "부분", "보류", "거절"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="invoiceStatus"
              control={control}
              defaultValue={invoiceData.invoiceStatus}
              rules={{ required: "This field is required" }}
            />
            {errors.invoiceStatus && (
              <FormHelperText>{errors.invoiceStatus.message}</FormHelperText>
            )}
          </FormControl>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<Create />}
              sx={{ mt: 2 }}
            >
              품의서수정
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerUpdate;
