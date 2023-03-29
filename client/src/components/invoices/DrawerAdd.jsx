import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { Create, Cancel } from "@mui/icons-material";

import { useAddInvoiceMutation } from "state/api";

const DrawerAdd = ({ onUpdate, toggleAddDrawer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addInvoice, { isLoading }] = useAddInvoiceMutation();

  const theme = useTheme();
  // Handle AddInvoice
  const handleAddInvoice = async (data) => {
    try {
      await addInvoice(data).unwrap();

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
        width: { sm: "300px", md: "400px" },
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
          <TextField
            label="프로젝트"
            {...register("projectTitle")}
            margin="dense"
            fullWidth
          />
          <TextField
            label="공정"
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
            {...register("paymentBankacct", {
              required: "This field is required",
            })}
            error={!!errors.paymentBankacct}
            helperText={errors.paymentBankacct?.message}
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
