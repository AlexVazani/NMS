import React from "react";
import { Box } from "@mui/material";

import Header from "components/layout/Header";
import Reports from "components/reports/Reports";

const GetReports = () => {
  return (
    <Box direction="column" style={{ height: "80vh" }}>
      <Header title="REPORTS" subtitle="프로젝트 보고서를 확인합니다." />
      <br />
      <Reports projectId={null} />
    </Box>
  );
};

export default GetReports;
