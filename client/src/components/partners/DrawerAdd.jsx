import React from "react";
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

import { useAddPartnerMutation } from "state/api";

const DrawerAdd = ({ onUpdate, toggleAddDrawer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [addPartner, { isLoading }] = useAddPartnerMutation();

  const theme = useTheme();

  // Handle AddPartner
  const handleAddPartner = async (data) => {
    try {
      await addPartner(data).unwrap();

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
      <Stack direction="column" spacing={0.5} alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary[100]}>
          협력업체 등록
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          협력업체 정보를 작성합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleAddPartner)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="업체명"
            {...register("partnerName", {
              required: "This field is required",
            })}
            error={!!errors.partnerName}
            helperText={errors.partnerName?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="전문공정"
            {...register("partnerBusiness")}
            margin="dense"
            fullWidth
          />
          <TextField
            label="대표자"
            {...register("partnerRepresentative")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="사업자번호"
            {...register("partnerLicenseNum")}
            error={!!errors.partnerLicenseNum}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="담당자"
            {...register("partnerContactPerson")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="전화번호"
            {...register("partnerPhone")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이메일"
            {...register("partnerEmail")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="주소"
            {...register("partnerAddress")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="계좌번호"
            {...register("partnerBankacct")}
            variant="outlined"
            margin="dense"
            fullWidth
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
              협력업체 등록
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerAdd;
