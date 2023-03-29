import React from "react";
import { Box } from "@mui/material";

import Header from "components/layout/Header";
import Invoices from "components/invoices/Invoices";

const GetInvoices = () => {
  return (
    <Box direction="column" style={{ height: "80vh" }}>
      <Header title="INVOICES" subtitle="프로젝트 품의서를 관리합니다." />
      <br />
      <Invoices />
    </Box>
  );
};

export default GetInvoices;
