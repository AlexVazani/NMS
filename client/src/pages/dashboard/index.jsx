import React from "react";
import { Box, Button, Typography } from "@mui/material";

import Header from "components/layout/Header";

const Dashboard = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="NMS에 오신것을 환영합니다." />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography>안녕하세요. 인테리어 디자인 입니다.</Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
