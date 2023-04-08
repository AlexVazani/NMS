import React from "react";
import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ p: 1 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <GridToolbarColumnsButton />
          <GridToolbarExport
            csvOptions={{
              fileName: "협력업체리스트",
              utf8WithBom: true,
            }}
          />
        </Box>
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
