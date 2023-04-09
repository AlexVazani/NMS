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
import { DataGrid } from "@mui/x-data-grid";

import DataGridCustomToolbar from "components/invoices/DataGridCustomToolbar";
import DrawerAdd from "components/invoices/DrawerAdd";
import DrawerUpdate from "components/invoices/DrawerUpdate";
import {
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
} from "services/api/api";

const Invoices = ({ projectId }) => {
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [selectedInvoiceData, setSelectedInvoice] = useState(null);
  // const [searchInput, setSearchInput] = useState("");

  // const [search, setSearch] = useState("");

  const {
    data: invoiceData,
    isLoading,
    refetch,
  } = useGetInvoicesQuery(projectId);
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
    const confirmDelete = window.confirm("품의서를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteInvoice(invoiceId).unwrap();
        refetch();
      } catch (error) {
        console.error(error);
      }
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
      valueGetter: (params) => {
        return params.row.projectId ? params.row.projectId.projectTitle : "";
      },
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
      field: "invoiceTaxCheck",
      headerName: "계산서",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => {
        return params.value ? "발행" : "미발행";
      },
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
      minWidth: 100,
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
          <Typography variant="h5">프로젝트 품의서</Typography>
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
            <DrawerAdd
              projectId={projectId}
              onUpdate={onUpdate}
              toggleAddDrawer={toggleAddDrawer}
            />
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
      <Box width="100%" height="67vh">
        {invoiceData && !isLoading ? (
          <DataGrid
            loading={isLoading || !invoiceData}
            getRowId={(row) => row._id}
            rows={invoiceData || []}
            columns={columns}
            localeText={koKR.components.MuiDataGrid}
            sortModel={[{ field: "createdAt", sort: "desc" }]}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
            checkboxSelection
            components={{
              Toolbar: DataGridCustomToolbar,
            }}
            disableSelectionOnClick
          />
        ) : (
          "Loading"
        )}
      </Box>
    </Box>
  );
};

export default Invoices;
