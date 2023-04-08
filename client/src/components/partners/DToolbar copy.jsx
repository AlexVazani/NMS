import React from "react";
import { Search } from "@mui/icons-material";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
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
        <TextField
          label="검색"
          sx={{ width: "12rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
