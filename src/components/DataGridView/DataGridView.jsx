//components imports
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import DeleteModal from "../DeleteModal/DeleteModal";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import DropdownMenu from "../DropDownMenu/DropDownMenu";

//hooks imports
import { useState } from "react";

const DataGridView = ({
  fetchedData,
  loading,
  error,
 
}) => {
  const theme = useTheme();
  const [pageSize, setPageSize] = useState(5);

  //modal state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  //state and modal open/close handlers
  function handleDeleteModalOpen(passedData) {
    setOpenDeleteModal(true);
    setCurrentData(passedData);
  }
  function handleDeleteModalClose() {
    setOpenDeleteModal(false);
  }
  function handleOpenEditProfileModal(dataToEdit) {
    setCurrentData(dataToEdit);
    setOpenEditProfileModal(true);
  }
  function handleCloseEditProfileModal() {
    setOpenEditProfileModal(false);
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      maxWidth: 280,
      hideSortIcons: true,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              position: "absolute",
              right: 0,
              paddingLeft: 3,
              bgcolor:
                theme.palette.mode === "light" && theme.palette.common.white,
            }}
          >
            {params.colDef.headerName}
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              bgcolor:
                theme.palette.mode === "light" && theme.palette.common.white,
              width: "100%",
              height: "100%",
              paddingLeft: 2,
            }}
          >
            <Avatar
              src="https://source.unsplash.com/random"
              aria-label="avatar"
            ></Avatar>

            <Typography maxWidth={100} variant="caption" noWrap>
              {params?.row?.first_name} {params?.row?.last_name}
            </Typography>
            {params?.row?.is_verified && (
              <VerifiedRoundedIcon color="primary" fontSize="small" />
            )}
          </Stack>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 120,
      flex: 1,
      disableColumnMenu: true,
      headerAlign: "center",
      hideSortIcons: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="body2" m={"0 auto"} noWrap>
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      headerAlign: "left",
      
      renderCell: (params) => {
        return <Typography variant="body2">{params.value}</Typography>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "left",
      flex: 1,
      editable: true,
      disableColumnMenu: true,
      filterable: false,
      hideSortIcons: true,
      renderCell: (params) => {
        return (
          <Box paddingBottom={0.5}>
            <Typography variant="caption" fontSize={12}>
              {params.value}
            </Typography>
            ;
          </Box>
        );
      },
      multiline: true,
    },
    {
      field: "actions",
      headerName: "actions",
      headerAlign: "center",
      sortable: false,
      width: 52,
      disableColumnMenu: true,
      hideSortIcons: true,
      getActions: (params) => [
        <GridActionsCellItem
          key={0}
          icon={<MoreVertIcon titleAccess={"edit"} />}
          label={"edit"}
          onClick={() => console.log(params)}
        />,
      ],
      renderHeader: (params) => (
        <Box
          sx={{
            bgcolor: theme.palette.mode === "light" && theme.palette.grey[50],
            width: 52,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 72,
          }}
        >
          <SettingsIcon />
        </Box>
      ),
      renderCell: (params) => {
        return (
          <Box
            sx={{
              bgcolor: theme.palette.mode === "light" && theme.palette.grey[50],
              width: 52,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              right: 0,
            }}
          >
            <DropdownMenu
              onDelete={() => {
                handleDeleteModalOpen(params.row);
              }}
              onEdit={() => handleOpenEditProfileModal(params.row)}
              onClose={() => handleDeleteModalClose(params.row)}
              openDeleteModal={openDeleteModal}
            />
          </Box>
        );
      },
    },
  ];
  return (
    <>
      <Stack
        minHeight="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            paddingRight: 4,
            "& .MuiDataGrid-cell": {
              borderBottom: theme.palette.mode === "light" && "none",
              paddingLeft: 0,
              paddingRight: 0,
            },
            "& .MuiDataGrid-columnHeader": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
          "& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator ": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: theme.palette.mode === "light" && "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "transparent",
          },
        }}
      >
        <DataGrid
          rows={fetchedData?.profiles}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[ 5, 10]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          autoHeight
          getRowHeight={() => "auto"}
          onPageSizeChange={(number) => setPageSize(number)}
          loading={loading}
          
        />
      </Stack>
      {openEditProfileModal && (
        <CreateEditProfile
          openModal={openEditProfileModal}
          handleOpenModal={handleOpenEditProfileModal}
          handleCloseModal={handleCloseEditProfileModal}
          type="Edit"
          currentData={currentData}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          openModal={openDeleteModal}
          handleModalClose={handleDeleteModalClose}
          id={currentData.id}
        />
      )}
    </>
  );
};

export default DataGridView;
