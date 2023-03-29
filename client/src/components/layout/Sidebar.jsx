import React from "react";
import {
  Box,
  Divider,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material";

import DrawerSidebar from "components/common/DrawerSidebar";

const Sidebar = (props) => {
  const { drawerWidth, mobileOpen, handleSideDrawerToggle } = props;

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary" // Temporary on Mobile
          open={mobileOpen}
          onClose={handleSideDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          <DrawerSidebar />
        </Drawer>
        <Drawer
          variant="permanent" // Permanent on Desktop
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          <DrawerSidebar />
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
