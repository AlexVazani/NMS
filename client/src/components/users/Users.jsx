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

import DrawerAdd from "components/users/DrawerAdd";
import DrawerUpdate from "components/users/DrawerUpdate";
import { useGetUsersQuery, useDeleteUserMutation } from "services/api/authApi";

const Users = () => {
  const theme = useTheme();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isUpdateDrawerOpen, setIsUpdateDrawerOpen] = useState(false);
  const [selectedUserData, setSelectedUser] = useState(null);

  const { data: userData, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  // handle Drawer
  const toggleAddDrawer = () => {
    setIsAddDrawerOpen(!isAddDrawerOpen);
  };
  const toggleUpdateDrawer = () => {
    setIsUpdateDrawerOpen(!isUpdateDrawerOpen);
  };

  // handle each user Data
  const handleSelectedData = (rowData) => {
    setSelectedUser(rowData);
    toggleUpdateDrawer();
  };

  // Refresh
  const onUpdate = async () => {
    await refetch();
  };

  // Delete handle funtion
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("직원정보를 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await deleteUser(id).unwrap();
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
      headerName: "등록일",
      flex: 1.5,
      minWidth: 80,
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
      field: "userId",
      headerName: "ID",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "userName",
      headerName: "이름",
      flex: 1,
      minWidth: 70,
    },
    {
      field: "userPosition",
      headerName: "직책",
      flex: 1,
      minWidth: 50,
    },
    {
      field: "userPhone",
      headerName: "전화번호",
      flex: 2,
      minWidth: 110,
    },
    {
      field: "userEmail",
      headerName: "이메일",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "userAddress",
      headerName: "주소",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "userRole",
      headerName: "권한",
      flex: 1,
      minWidth: 80,
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
            <IconButton onClick={() => handleDeleteUser(params.row._id)}>
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
          <Typography variant="h5">직원정보</Typography>
          <Button
            variant="outlined"
            onClick={toggleAddDrawer}
            startIcon={<Add />}
            color="secondary"
          >
            등록하기
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
              selectedUserData={selectedUserData}
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
                  <TaskAlt sx={{ mr: 1, verticalAlign: "middle" }} />새 직원이
                  등록되었습니다!
                </span>
              }
            />
          </Snackbar>
        </Stack>
      </Box>
      <Box width="100%" height="67vh">
        {userData && !isLoading ? (
          <DataGrid
            loading={isLoading || !userData}
            getRowId={(row) => row._id}
            rows={userData || []}
            columns={columns}
            localeText={koKR.components.MuiDataGrid}
            sortModel={[{ field: "createdAt", sort: "desc" }]}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50, 100]}
            disableSelectionOnClick
          />
        ) : (
          "Loading"
        )}
      </Box>
    </Box>
  );
};

export default Users;
