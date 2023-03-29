import React from "react";
import { Box } from "@mui/material";

import Header from "components/layout/Header";
import Partners from "components/partners/Partners";

const GetPartners = () => {
  return (
    <Box direction="column" style={{ height: "80vh" }}>
      <Header title="PARTNERS" subtitle="협력업체들 현황입니다." />
      <br />
      <Partners />
    </Box>
  );
};

export default GetPartners;
