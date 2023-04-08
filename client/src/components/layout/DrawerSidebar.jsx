import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  PhoneAndroidOutlined,
  HomeOutlined,
  VillaOutlined,
  CommentOutlined,
  AssignmentOutlined,
  Payment,
  Groups2Outlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";

const DrawerSidebar = ({ handleSideDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItem01 = [
    {
      icon: <PhoneAndroidOutlined />,
      text: "Inquiries",
    },
  ];
  const menuItem02 = [
    {
      icon: <VillaOutlined />,
      text: "Projects",
    },
    {
      icon: <AssignmentOutlined />,
      text: "Reports",
    },
    {
      icon: <CalendarMonthOutlined />,
      text: "Schedule",
    },
  ];
  const menuItem03 = [
    {
      icon: <Payment />,
      text: "Invoices",
    },
    {
      icon: <Groups2Outlined />,
      text: "Partners",
    },
  ];

  const renderMenuItems = (menuItems) => {
    return menuItems.map(({ icon, text }) => {
      const navUrl = text.toLowerCase();
      const isSelected = pathname === `/${navUrl}`;
      return (
        <ListItem key={text} disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/${navUrl}`, { state: { refetchData: true } });
              handleSideDrawerToggle();
            }}
            sx={{
              backgroundColor: isSelected
                ? theme.palette.secondary[500]
                : "inherit",
              color: isSelected ? theme.palette.grey[300] : "inherit",
              "&:hover": {
                backgroundColor: isSelected
                  ? theme.palette.secondary[500]
                  : "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                ml: 1,
                minWidth: "35px",
                color: isSelected
                  ? theme.palette.secondary[300]
                  : theme.palette.secondary[600],
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70px"
      >
        <Link to="/">
          <img src="/finesse.svg" alt="Finesse" width="130px" />
        </Link>
      </Box>
      <List>
        <ListItem key="label-dashboard" disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
              handleSideDrawerToggle();
            }}
          >
            <ListItemIcon
              sx={{
                ml: 1,
                minWidth: "35px",
                color: theme.palette.secondary[600],
              }}
            >
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color={theme.palette.secondary[500]}>
          Marketing
        </Typography>
      </Divider>
      <List>{renderMenuItems(menuItem01)}</List>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color={theme.palette.secondary[500]}>
          Projects
        </Typography>
      </Divider>
      <List>{renderMenuItems(menuItem02)}</List>
      <Divider textAlign="left">
        <Typography variant="subtitle2" color={theme.palette.secondary[500]}>
          Management
        </Typography>
      </Divider>
      <List>{renderMenuItems(menuItem03)}</List>
    </Box>
  );
};

export default DrawerSidebar;
