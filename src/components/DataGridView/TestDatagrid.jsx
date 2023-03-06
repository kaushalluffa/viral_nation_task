import React, { useEffect, useState } from "react";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import DropdownMenu from "../DropDownMenu/DropDownMenu";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";

const TestDatagrid = () => {
  const theme = useTheme();
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
            // onDelete={() => {
            //   handleDeleteModalOpen(params.row);
            // }}
            // onEdit={() => handleOpenEditProfileModal(params.row)}
            // onClose={() => handleDeleteModalClose(params.row)}
            // openDeleteModal={openDeleteModal}
            />
          </Box>
        );
      },
    },
  ];
  const [fetchedData, setFetchedData] = useState({
    profiles: [],
    size: 0,
    page: 0,
    pageSize: 10,
  });
  const [
    getAllProfiles,
    { data: getAllProfilesData, loading, error, fetchMore },
  ] = useLazyQuery(GET_ALL_PROFILES);
  useEffect(() => {
    getAllProfiles({
      variables: {
        page: fetchedData?.page,
        rows: fetchedData?.pageSize,
      },
    });
  }, [getAllProfiles, fetchedData?.page, fetchedData?.pageSize]);
  useEffect(() => {
    if (getAllProfilesData?.getAllProfiles) {
      setFetchedData((old) => ({
        ...old,
        profiles: getAllProfilesData?.getAllProfiles?.profiles,
        size: getAllProfilesData?.getAllProfiles?.size,
      }));
    }
  }, [getAllProfilesData?.getAllProfiles]);
 
  return (
    <DataGrid
      autoHeight
      rows={fetchedData?.profiles}
      rowCount={fetchedData.size}
      loading={loading}
      rowsPerPageOptions={[5, 10, 30, 50, 70, 100]}
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
    />
  );
};

export default TestDatagrid;
