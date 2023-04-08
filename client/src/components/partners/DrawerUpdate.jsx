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
import { Create } from "@mui/icons-material";

import { useUpdatePartnerMutation } from "services/api/api";

const DrawerUpdate = ({
  selectedPartnerData: PartnerData,
  onUpdate,
  toggleUpdateDrawer,
}) => {
  if (!PartnerData) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [updatePartner, { isLoading }] = useUpdatePartnerMutation();

  const theme = useTheme();

  // Handle updatePartner
  const handleUpdatePartner = async (data) => {
    try {
      await updatePartner({
        id: PartnerData._id,
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
      <Stack direction="column" spacing={0.5} alignItems="center">
        <Typography variant="h4" color={theme.palette.secondary[100]}>
          협력업체 수정
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          협력업체 정보를 수정합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleUpdatePartner)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="업체명"
            defaultValue={PartnerData.partnerName}
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
            defaultValue={PartnerData.partnerBusiness}
            {...register("partnerBusiness")}
            margin="dense"
            fullWidth
          />
          <TextField
            label="대표자"
            defaultValue={PartnerData.partnerRepresentative}
            {...register("partnerRepresentative")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="사업자번호"
            defaultValue={PartnerData.partnerLicenseNum}
            {...register("partnerLicenseNum")}
            error={!!errors.partnerLicenseNum}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="담당자"
            defaultValue={PartnerData.partnerContactPerson}
            {...register("partnerContactPerson")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="전화번호"
            defaultValue={PartnerData.partnerPhone}
            {...register("partnerPhone")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이메일"
            defaultValue={PartnerData.partnerEmail}
            {...register("partnerEmail")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="주소"
            defaultValue={PartnerData.partnerAddress}
            {...register("partnerAddress")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="계좌번호"
            defaultValue={PartnerData.partnerBankacct}
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
              협력업체 수정
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerUpdate;
