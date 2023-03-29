import React from "react";
import { Box } from "@mui/material";

import Header from "components/layout/Header";
// import Schedule from "components/invoices/Invoices";

const GetSchedule = () => {
  return (
    <Box direction="column" style={{ height: "80vh" }}>
      <Header title="SCHEDULE" subtitle="프로젝트 일정을 관리합니다." />
      <br />
      <div className="App"></div>
    </Box>
  );
};

export default GetSchedule;
