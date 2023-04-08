import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  IconButton,
  Typography,
  Drawer,
  useTheme,
} from "@mui/material";
import { Add, Edit, Delete, TaskAlt } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

import DataGridCustomToolbar from "components/partners/DataGridCustomToolbar";
import DrawerAdd from "components/partners/DrawerAdd";
import DrawerUpdate from "components/partners/DrawerUpdate";
import { useGetPartnersQuery, useDeletePartnerMutation } from "state/api";

const Partners = () => {
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [selectedPartnerData, setSelectedPartner] = useState(null);

  // handle dataGrid
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});

  const {
    data: partnerData,
    isLoading,
    refetch,
  } = useGetPartnersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
  });

  const [deletePartner] = useDeletePartnerMutation();

  // handle Drawer
  const toggleAddDrawer = () => {
    setIsAddDrawerOpen(!isAddDrawerOpen);
  };
  const toggleUpdateDrawer = () => {
    setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
  };

  // handle each partner Data
  const handleSelectedData = (rowData) => {
    setSelectedPartner(rowData);
    toggleUpdateDrawer();
  };

  // Refresh
  const onUpdate = async () => {
    await refetch();
  };

  // Delete handle funtion
  const handleDeletePartner = async (partnerId) => {
    try {
      await deletePartner(partnerId).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // DataGrid columns setting
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      hide: true,
      flex: 1,
      minWidth: 100,
    },
    {
      field: "partnerName",
      headerName: "업체명",
      flex: 2,
      minWidth: 120,
    },
    {
      field: "partnerBusiness",
      headerName: "공정",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "partnerRepresentative",
      headerName: "대표자",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "partnerLicenseNum",
      headerName: "사업자번호",
      flex: 2,
      minWidth: 100,
    },
    {
      field: "partnerContactPerson",
      headerName: "담당자",
      flex: 1,
      minWidth: 80,
    },
    {
      field: "partnerPhone",
      headerName: "전화번호",
      flex: 1,
      minWidth: 110,
    },
    {
      field: "partnerEmail",
      headerName: "이메일",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "partnerAddress",
      headerName: "주소",
      flex: 2,
      minWidth: 200,
    },
    {
      field: "partnerBankacct",
      headerName: "계좌번호",
      flex: 4,
      minWidth: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 2,
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
            <IconButton onClick={() => handleDeletePartner(params.row._id)}>
              <Delete />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[500],
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
          <Typography variant="h5">협력업체 리스트</Typography>
          <Button
            variant="outlined"
            onClick={toggleAddDrawer}
            startIcon={<Add />}
            color="secondary"
          >
            협력업체 등록
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
              selectedPartnerData={selectedPartnerData}
              onUpdate={onUpdate}
              toggleUpdateDrawer={toggleUpdateDrawer}
            />
          </Drawer>
        </Stack>
      </Box>
      <Box sx={{ width: "100%", overflowX: "auto", height: "67vh" }}>
        {partnerData && !isLoading ? (
          <DataGrid
            loading={isLoading || !partnerData}
            getRowId={(row) => row._id}
            rows={partnerData.partners || []}
            columns={columns}
            //server-side pagination
            rowCount={(partnerData && partnerData.total) || 0}
            rowsPerPageOptions={[20, 50, 100]}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            onSortModelChange={(newSortModel) => setSort(...newSortModel)}
            className="data-grid"
            checkboxSelection
            // sortModel={[{ field: "_id", sort: "desc" }]}
            components={{ Toolbar: DataGridCustomToolbar }}
          />
        ) : (
          "Loading"
        )}
      </Box>
    </Box>
  );
};

export default Partners;
