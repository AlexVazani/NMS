import React from "react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { SaveAlt } from "@mui/icons-material";

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  apiRef,
}) => {
  const handleExport = () => {
    const columns = apiRef.current.getVisibleColumns();
    const rowIds = apiRef.current.getAllRowIds();
    const rows = rowIds.map((id) => apiRef.current.getRow(id));
    const csvContent = [
      columns.map((column) => column.field).join(","),
      ...rows.map((row) =>
        columns
          .map((column) => {
            const cellValue = row[column.field];
            if (typeof cellValue === "string") {
              return '"' + cellValue.replace(/"/g, '""') + '"';
            }
            return cellValue;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.style.display = "none";
    link.download = "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GridToolbarContainer sx={{ p: 1 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex" }}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <Button color="inherit" size="small" onClick={handleExport}>
            <SaveAlt sx={{ mr: 1 }} />
            <Typography>엑셀다운로드</Typography>
          </Button>
        </Box>
        <TextField
          label="품의서 검색"
          sx={{ width: "15rem" }}
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
