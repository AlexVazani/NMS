import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  Drawer,
  Snackbar,
  SnackbarContent,
  useTheme,
} from "@mui/material";
import { koKR } from "@mui/material/locale";
import { Add, Edit, Delete, TaskAlt } from "@mui/icons-material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

import DataGridCustomToolbar from "components/common/DataGridCustomToolbar";
import DrawerAdd from "components/invoices/DrawerAdd";
import DrawerUpdate from "components/invoices/DrawerUpdate";
import { useGetInvoicesQuery, useDeleteInvoiceMutation } from "state/api";

const Invoices = () => {
  const apiRef = useGridApiRef();
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [selectedInvoiceData, setSelectedInvoice] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const [search, setSearch] = useState("");

  const { data: invoiceData, isLoading, refetch } = useGetInvoicesQuery();
  const [deleteInvoice] = useDeleteInvoiceMutation();

  // handle Drawer
  const toggleAddDrawer = () => {
    setIsAddDrawerOpen(!isAddDrawerOpen);
  };
  const toggleUpdateDrawer = () => {
    setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
  };

  // handle each invoice Data
  const handleSelectedData = (rowData) => {
    setSelectedInvoice(rowData);
    toggleUpdateDrawer();
  };

  // Refresh
  const onUpdate = async () => {
    await refetch();
  };

  // Delete handle funtion
  const handleDeleteInvoice = async (invoiceId) => {
    try {
      await deleteInvoice(invoiceId).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // DataGrid columns setting
  const columns = [
    {
      field: "createdAt",
      headerName: "작성일",
      flex: 1.5,
      minWidth: 90,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const options = {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        };
        const formattedDate = date.toLocaleDateString("ko-KR", options);
        return `${formattedDate}`;
      },
    },
    {
      field: "projectTitle",
      headerName: "프로젝트",
      flex: 2,
      minWidth: 100,
    },
    {
      field: "projectProcess",
      headerName: "공정",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "invoiceDescription",
      headerName: "내역",
      flex: 2,
      minWidth: 120,
    },
    {
      field: "invoiceTo",
      headerName: "받는사람",
      flex: 1.2,
      minWidth: 80,
    },
    {
      field: "invoicePrice",
      headerName: "지급금액",
      type: "number",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "paymentType",
      headerName: "지급방식",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "paymentBankacct",
      headerName: "지급계좌",
      flex: 4,
      minWidth: 180,
    },
    {
      field: "invoicePriority",
      headerName: "우선",
      flex: 1,
    },
    {
      field: "invoiceStatus",
      headerName: "처리",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 1.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton onClick={() => handleSelectedData(params.row)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteInvoice(params.row._id)}>
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      style={{
        backgroundColor: theme.palette.primary[500],
        mt: 2,
        borderRadius: "0.55rem",
      }}
    >
      <Box sx={{ p: 2, width: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h5">Project Invoices</Typography>
          <Button
            variant="outlined"
            onClick={toggleAddDrawer}
            startIcon={<Add />}
            color="secondary"
          >
            품의서 작성
          </Button>
          <Drawer
            anchor="right"
            open={isAddDrawerOpen}
            onClose={toggleAddDrawer}
          >
            <DrawerAdd onUpdate={onUpdate} toggleAddDrawer={toggleAddDrawer} />
          </Drawer>
          <Drawer
            anchor="right"
            open={isUpdateDrawerOpen}
            onClose={toggleUpdateDrawer}
          >
            <DrawerUpdate
              selectedInvoiceData={selectedInvoiceData}
              onUpdate={onUpdate}
              toggleUpdateDrawer={toggleUpdateDrawer}
            />
          </Drawer>
          {/* 등록 Snackbar */}
          <Snackbar
            // open={snackbarOpen}
            autoHideDuration={1500}
            // onClose={handleCloseSnackbar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <SnackbarContent
              sx={{ backgroundColor: "#4caf50" }}
              message={
                <span>
                  <TaskAlt sx={{ mr: 1, verticalAlign: "middle" }} />
                  품의서가 등록되었습니다!
                </span>
              }
            />
          </Snackbar>
        </Stack>
      </Box>
      <Box width="100%">
        {invoiceData && !isLoading ? (
          <DataGrid
            loading={isLoading || !invoiceData}
            rows={
              search
                ? invoiceData.filter((row) =>
                    Object.values(row).some((value) =>
                      String(value).toLowerCase().includes(search.toLowerCase())
                    )
                  )
                : invoiceData
            }
            getRowId={(row) => row._id}
            // rowCount={(invoiceData && invoiceData._id) || 0}
            columns={columns}
            autoHeight
            localeText={koKR.components.MuiDataGrid}
            sortModel={[{ field: "createdAt", sort: "desc" }]}
            pageSize={5}
            rowsPerPageOptions={[5]}
            // checkboxSelection
            components={{
              Toolbar: (props) => (
                <DataGridCustomToolbar
                  apiRef={apiRef}
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  setSearch={setSearch}
                />
              ),
            }}
            disableSelectionOnClick
            apiRef={apiRef}
          />
        ) : (
          "Loading"
        )}
      </Box>
    </Box>
  );
};

export default Invoices;
