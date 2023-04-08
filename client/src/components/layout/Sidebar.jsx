import React from "react";
import { Box, Drawer } from "@mui/material";

import DrawerSidebar from "components/layout/DrawerSidebar";

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
          <DrawerSidebar handleSideDrawerToggle={handleSideDrawerToggle} />
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
          <DrawerSidebar handleSideDrawerToggle={() => {}} />
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
