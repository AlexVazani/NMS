import { useState } from "react";
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
import { Create, PhotoCameraOutlined } from "@mui/icons-material";

import {
  useUpdateUserMutation,
  useUploadImageMutation,
} from "services/api/userApi";

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
  const [uploadImage] = useUploadImageMutation();

  const theme = useTheme();

  const userRoleOption = ["Administrator", "Manager", "User"];

  // handle upload image
  const userPhotoName = userData.userPhoto
    ? userData.userPhoto.split("/").pop().replace("uploads\\", "")
    : "";

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

  // Handle updateUser
  const handleUpdateUser = async (data) => {
    try {
      let newData = data;

      if (userPhoto && userPhoto !== userData.userPhoto) {
        const imageData = new FormData();
        imageData.append("userPhoto", userPhoto.file);

        const uploadedImage = await uploadImage(imageData).unwrap();
        newData = { ...data, userPhoto: uploadedImage.filePath };
      }
      await updateUser({
        id: userData._id,
        data: newData,
      }).unwrap();

      await onUpdate();
      toggleUpdateDrawer();
      reset();
      setUserPhoto({});
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
          <Stack direction="row">
            <Typography sx={{ m: 1.5 }}>프로필 사진</Typography>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            {userData.userPhoto && (
              <img
                src={`${
                  import.meta.env.VITE_BASE_URL
                }/uploads/${userPhotoName}`}
                alt="User Thumbnail"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "20px",
                  marginTop: "5px",
                }}
              />
            )}
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
              <Typography variant="caption" sx={{ mr: 1.5 }}>
                파일명: {userPhoto.file.name}
              </Typography>
            )}
            {userPhotoName && (
              <Typography variant="caption">파일명: {userPhotoName}</Typography>
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
              직원정보 수정
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default DrawerUpdate;
