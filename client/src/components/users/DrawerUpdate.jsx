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

import { useUpdateUserMutation } from "services/api/authApi";

const DrawerUpdate = ({
  selectedUserData: userData,
  onUpdate,
  toggleUpdateDrawer,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const theme = useTheme();

  const userRoleOption = ["Administrator", "Manager", "User"];

  // Handle updateUser
  const handleUpdateUser = async (data) => {
    try {
      await updateUser({
        id: userData._id,
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
          직원정보 수정
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          직원정보를 수정합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="ID"
            defaultValue={userData.userId}
            {...register("userId", {
              required: "This field is required",
            })}
            error={!!errors.userId}
            helperText={errors.userId?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이름"
            defaultValue={userData.userName}
            {...register("userName")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="직책"
            defaultValue={userData.userPosition}
            {...register("userPosition")}
            error={!!errors.userPosition}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="전화번호"
            defaultValue={userData.userPhone}
            {...register("userPhone")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이메일"
            defaultValue={userData.userEmail}
            {...register("userEmail")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="주소"
            defaultValue={userData.userAddress}
            {...register("userAddress")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <FormControl
            variant="outlined"
            margin="dense"
            fullWidth
            error={!!errors.userRole}
          >
            <InputLabel id="user-role-label">권한</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  labelId="user-role-label"
                  id="user-role"
                  {...field}
                  label="권한"
                >
                  {userRoleOption.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="userRole"
              control={control}
              rules={{ required: "This field is required" }}
              defaultValue={userData.userRole}
            />
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
              직원 등록
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerUpdate;
