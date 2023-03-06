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
import Error from "../Error/Error";

const DataGridView = ({ fetchedData, loading, error, setFetchedData }) => {
  const theme = useTheme();

  //modal state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [sortModel, setSortModel] = useState([]);

  const [rowsSorted, setRowsSorted] = useState([]);
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

  const handleSortModelChange = (model) => {
    setSortModel(model);
    const comparator = (a, b) => {
      // Compare rows based on the column and sort direction specified in the sort model
      for (const sort of model) {
        const column = sort.field;
        const direction = sort.sort;

        if (column === "is_verified") {
          const aVerified = a.is_verified ? 1 : 0;
          const bVerified = b.is_verified ? 1 : 0;
          const compare = aVerified - bVerified;
          if (compare !== 0) return direction === "asc" ? compare : -compare;
        } else {
          const compare = (a[column] || "").localeCompare(b[column] || "");
          if (compare !== 0) return direction === "asc" ? compare : -compare;
        }
      }
      return 0;
    };
   
    setRowsSorted([...fetchedData?.profiles].sort(comparator));
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      maxWidth: 280,
      hideSortIcons: true,
      disableColumnMenu: true,
      sortable: true,
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
              src={
                params?.row?.image_url || "https://source.unsplash.com/random"
              }
              aria-label="avatar"
              sx={{
                width: 48,
                height: 48,
              }}
            >
              {params?.row?.first_name.split("")[0]}
              {params?.row?.last_name.split("")[0]}
            </Avatar>

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
      sortable: true,
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
      sortable: true,

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
      sortable: true,
      renderCell: (params) => {
        return (
          <Box paddingBottom={0.4} paddingTop={.4}>
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

      width: 52,
      disableColumnMenu: true,
      hideSortIcons: true,
      sortable: true,
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
      {error && (
        <Error message="There has been error fetching profiles please refresh and try again" />
      )}
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
          experimentalFeatures={{ newEditingApi: true }}
          disableSelectionOnClick
          autoHeight
          rows={rowsSorted.length > 0 ? rowsSorted : fetchedData?.profiles}
          rowCount={fetchedData.size}
          loading={loading}
          rowsPerPageOptions={[5, 10, 16, 30, 50, 70, 100]}
          pagination
          page={fetchedData.page}
          pageSize={fetchedData.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setFetchedData((old) => ({ ...old, page: newPage }));
          }}
          onPageSizeChange={(newPageSize) =>
            setFetchedData((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          getRowHeight={() => "auto"}
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
