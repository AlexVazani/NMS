import { useState } from "react";
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
import { Create, PhotoCameraOutlined } from "@mui/icons-material";

import {
  useRegisterUserMutation,
  useUploadImageMutation,
} from "services/api/userApi";

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
  const [uploadImage] = useUploadImageMutation();

  const userRoleOption = ["Administrator", "Manager", "User"];

  // handle upload image
  const [userPhoto, setUserPhoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUserPhoto({ file, base64: reader.result });
      };
    }
  };

  const handleRegisterUser = async (data) => {
    try {
      let newData = data;

      if (userPhoto) {
        const imageData = new FormData();
        imageData.append("userPhoto", userPhoto.file);

        const uploadedImage = await uploadImage(imageData).unwrap();
        newData = { ...data, userPhoto: uploadedImage.filePath };
      }
      const userData = await registerUser(newData).unwrap();

      onUpdate();
      toggleAddDrawer();
      reset();
      setUserPhoto(null);
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

          <Stack direction="row">
            <Typography sx={{ m: 1.5 }}>프로필 사진</Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                color="secondary"
                startIcon={<PhotoCameraOutlined />}
                sx={{ m: 1 }}
              >
                Upload
              </Button>
            </label>
          </Stack>
          <Box sx={{ ml: 1.5 }}>
            {userPhoto && userPhoto.file && (
              <Typography variant="caption">
                파일명: {userPhoto.file.name}
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<Create />}
              sx={{ mt: 3 }}
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
