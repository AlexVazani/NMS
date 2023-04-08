import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormHelperText,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { Create } from "@mui/icons-material";

import { useRegisterUserMutation } from "services/api/authApi";

const DrawerAdd = ({ onUpdate, toggleAddDrawer }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const theme = useTheme();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const userRoleOption = ["Administrator", "Manager", "User"];

  const handleRegisterUser = async (data) => {
    try {
      console.log(data);
      const userData = await registerUser(data).unwrap();

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
          새직원 등록
        </Typography>
        <Typography variant="subtitle2" color={theme.palette.secondary[300]}>
          직원 정보를 작성합니다.
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(handleRegisterUser)}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="ID"
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
            label="Password"
            type="password"
            {...register("userPassword", {
              required: "This field is required",
            })}
            error={!!errors.userPassword}
            helperText={errors.userPassword?.message}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이름"
            {...register("userName")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="직책"
            {...register("userPosition")}
            error={!!errors.userPosition}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="전화번호"
            {...register("userPhone")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="이메일"
            {...register("userEmail")}
            variant="outlined"
            margin="dense"
            fullWidth
          />
          <TextField
            label="주소"
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
              defaultValue={""}
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

export default DrawerAdd;
