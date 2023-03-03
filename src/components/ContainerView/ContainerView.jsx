import { Box, ButtonGroup, Stack, TextField, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";

const ContainerView = () => {
  const theme = useTheme();
  const [selectedView, setSelectedView] = useState("column");
  const isSmallScreen = useMediaQuery("(min-width:1100px");
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [
    getAllProfiles,
    { data: getAllProfilesData, loading: getAllProfilesLoading },
  ] = useLazyQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: { key: "is_verified", sort: "desc" },
      rows: 10,
      page: 0,
      // searchString: "",
    },
  });

  useEffect(() => {
    getAllProfiles();
    if (getAllProfilesData && !getAllProfilesLoading) {
      setFetchedData(getAllProfilesData?.getAllProfiles?.profiles);
    }
  }, [getAllProfilesData]);
  if (getAllProfilesLoading) {
    return <h1>Loading</h1>;
  }
  const handleProfileModalOpen = (data) => {
    setOpenCreateProfileModal(true);
  };
  const handleProfileModalClose = () => {
    // console.log(data);
    setOpenCreateProfileModal(false);
  };

  function toggleSelectedView(view) {
    setSelectedView(view);
  }
  
  // console.log(fetchedData);
  return (
    <>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        alignItems="center"
        marginBottom={5}
        justifyContent="space-between"
        spacing={{ xs: 2, lg: 0 }}
      >
        <Box width={{ xs: "100%", lg: "75%" }}>
          <TextField
            sx={{ flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            fullWidth
            size="small"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={0.5}
        >
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color:
                theme.palette.mode === "light"
                  ? theme.palette.primary.light
                  : theme.palette.common.white,
              bgcolor: theme.palette.mode === "dark" && theme.palette.grey[900],
              border: theme.palette.mode === "dark" && "none",
            }}
            onClick={handleProfileModalOpen}
          >
            Create Profile
          </Button>
          {isSmallScreen && (
            <ButtonGroup
              disableRipple
              sx={{
                "& .MuiButtonGroup-groupedOutlined": {
                  borderColor: theme.palette.grey[400],
                },
                "& .MuiButtonGroup-groupedText": {
                  color: theme.palette.grey[200],
                },
              }}
            >
              <Button
                variant="outlined"
                onClick={() => toggleSelectedView("column")}
                sx={{
                  color: theme.palette.grey[400],
                  bgcolor:
                    selectedView === "column" && theme.palette.primary.light,
                }}
              >
                <ViewWeekIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={() => toggleSelectedView("grid")}
                sx={{
                  color: theme.palette.grey[400],
                  bgcolor:
                    selectedView === "grid" && theme.palette.primary.light,
                }}
              >
                <ViewListIcon />
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Stack>
      {selectedView === "column" && <CardView fetchedData={fetchedData} />}
      {isSmallScreen && selectedView === "grid" && (
        <DataGridView fetchedData={fetchedData} />
      )}

      {openCreateProfileModal && (
        <CreateEditProfile
          openModal={openCreateProfileModal}
          handleOpenModal={openCreateProfileModal}
          handleCloseModal={handleProfileModalClose}
          type="Create"
        />
      )}
    </>
  );
};

export default ContainerView;
