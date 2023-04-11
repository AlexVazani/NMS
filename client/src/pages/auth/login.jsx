import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { LockOpen, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccess } from "services/features/authSlice";
import { useLoginMutation } from "services/api/authApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = useCallback(
    async (data) => {
      try {
        const response = await login(data).unwrap();
        dispatch(
          loginSuccess({ token: response.token, userId: response.userId })
        );
        reset();
        navigate("/dashboard", { state: { gotoRefetch: true } });
      } catch (error) {
        console.error(error);
      }
    },
    [login, dispatch, reset]
  );

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 300,
          bgcolor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          justifyContent: "center",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack spacing={1} sx={{ mb: 1 }}>
          <Typography
            variant="h3"
            align="center"
            color={theme.palette.secondary[100]}
          >
            NMS LOGIN
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color={theme.palette.secondary[300]}
          >
            아이디, 패스워드를 입력하세요.
          </Typography>
        </Stack>
        <Box>
          <Stack direction="column" spacing={1}>
            <TextField
              label="ID"
              {...register("userId", {
                required: "ID를 넣어주세요.",
              })}
              error={!!errors.userId}
              helperText={errors.userId?.message}
              variant="outlined"
              margin="normal"
              fullWidth
            />
            <TextField
              label="Password"
              {...register("userPassword", {
                required: "Password를 넣어주세요.",
              })}
              error={!!errors.userPassword}
              helperText={errors.userPassword?.message}
              type="password"
              margin="normal"
              fullWidth
            />
          </Stack>
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mt: 4, mb: 2 }}
        >
          <Button
            variant="contained"
            startIcon={<LockOpen />}
            color="secondary"
            type="submit"
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default Login;
