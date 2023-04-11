import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "components/layout/Topbar";
import Sidebar from "components/layout/Sidebar";

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSideDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box display="flex" width="100%" height="100%">
      <Sidebar
        drawerWidth="250px"
        mobileOpen={mobileOpen}
        handleSideDrawerToggle={handleSideDrawerToggle}
      />
      <Box flexGrow={1}>
        <Topbar handleSideDrawerToggle={handleSideDrawerToggle} />
        <Box
          pt={{ xs: 1, md: 2 }}
          pr={{ xs: 2, md: 5 }}
          pb={{ xs: 3, md: 5 }}
          pl={{ xs: 2, md: 5 }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
