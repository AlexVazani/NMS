import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { Create } from "@mui/icons-material";

import Header from "components/layout/Header";
import { loginSuccess } from "services/features/authSlice";
import { useRegisterUserMutation } from "services/api/authApi";

const RegisterUser = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const navigate = useNavigate();
  const theme = useTheme();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const userRoleOption = ["Administrator", "Manager", "User"];

  const handleRegisterUser = async (data) => {
    try {
      console.log(data);
      const userData = await registerUser(data).unwrap();
      reset();
      // navigate("/dashboard", { state: { gotoRefetch: true } });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegisterUser)}>
      <Box>
        <Header title="REGISTER USER" subtitle="새 직원을 등록합니다." />
        <Box sx={{ mt: 1 }}></Box>
      </Box>
    </form>
  );
};

export default RegisterUser;
