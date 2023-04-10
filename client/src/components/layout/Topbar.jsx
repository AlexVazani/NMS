import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, selectUserId } from "services/features/authSlice";
import { useLogoutMutation } from "services/api/authApi";
import { useShowUserQuery } from "services/api/userApi";

const Topbar = ({ handleSideDrawerToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(selectUserId);

  const [triggerLogout] = useLogoutMutation();
  const { data: userData } = useShowUserQuery(userId);
  const [user] = userData || [];

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    try {
      await triggerLogout();
      dispatch(logout());
      navigate("/login");
      handlePopoverClose();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.primary[600],
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          height: "70px",
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton
            onClick={handleSideDrawerToggle}
            sx={{ mr: 1, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor={theme.palette.primary[500]}
            borderRadius="7px"
            padding="3px 5px 3px 10px"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            onClick={handlePopoverOpen}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <Box
              component="img"
              alt="profile"
              src={`${import.meta.env.VITE_BASE_URL}/${user?.userPhoto}`}
              height="40px"
              width="40px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Typography>{userId ? userId : "No name"}</Typography>
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handlePopoverClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem>{user?.userName} 님</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
