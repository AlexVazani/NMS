import React from "react";
import { Box } from "@mui/material";

import Header from "components/layout/Header";
import Users from "components/users/Users";

const GetUsers = () => {
  return (
    <Box direction="column" style={{ height: "80vh" }}>
      <Header title="USERS" subtitle="회사 직원정보를 관리합니다." />
      <br />
      <Users />
    </Box>
  );
};

export default GetUsers;
