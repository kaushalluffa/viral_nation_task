import React, { useEffect, useState } from "react";
import {
  Box,
  ButtonGroup,
  Stack,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";
import { SEARCH_PROFILE } from "../../utils/queries/searchProfile";
import { debounce } from "../../utils/handlers/debounce";
import { handleScroll } from "../../utils/handlers/handleScroll";

const ContainerView = () => {
  const theme = useTheme();
  const [selectedView, setSelectedView] = useState("column");
  const isSmallScreen = useMediaQuery("(min-width:1100px");
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(16);
  const [fetchedData, setFetchedData] = useState({ size: 0, profiles: [] });
  const [pageNumber, setPageNumber] = useState(0);

  //fetch all profiles query
  const {
    data: getAllProfilesData,
    loading: getAllProfilesLoading,
    error: getAllProfilesError,
    fetchMore,
  } = useQuery(GET_ALL_PROFILES, {
    variables: {
      rows: rows,
      page: pageNumber,
    },
    onCompleted: (data) => {
      console.log("query", data);
      const { size, profiles } = data.getAllProfiles;
      setFetchedData({ size: size, profiles: profiles });
    },
  });
  //search for profile query
  const [
    searchProfile,
    { data: searchedData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_PROFILE);

  //delaying the api request for search results 500ms
  const searchForProfile = debounce((input, rows) => {
    searchProfile(
      {
        variables: {
          searchString: input,
          rows: rows,
        },
      },
      500
    );
  });

  //modal open/close handlers
  function handleProfileModalOpen(data) {
    setOpenCreateProfileModal(true);
  }
  function handleProfileModalClose() {
    setOpenCreateProfileModal(false);
  }

  function toggleSelectedView(view) {
    setSelectedView(view);
  }

  function handleInputChange(e, rows) {
    setInputValue(e.target.value);
    searchForProfile(e.target.value, rows);
  }

  //setting the state with all profiles data
  useEffect(() => {
    if (getAllProfilesData) {
      setFetchedData(getAllProfilesData?.getAllProfiles);
    }
    if (!searchedData) return;
    if (searchedData) {
      setFetchedData(searchedData?.getAllProfiles);
    }
  }, [getAllProfilesData?.getAllProfiles?.profiles, searchedData]);

  //setting the state on scroll
  useEffect(() => {
    if (fetchedData.profiles.length === fetchedData.size) {
      return;
    } else {
      window.addEventListener("scroll", () => {
        if (!(fetchedData?.profiles?.length === fetchedData?.size))
          handleScroll(fetchMore, setFetchedData);
      });
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    fetchedData?.profiles?.length,
    fetchedData?.size,
    fetchMore,
    fetchedData,
  ]);
  return (
    <div>
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
            value={inputValue}
            onChange={(e) => handleInputChange(e, rows)}
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
                  color:
                    theme.palette.mode === "light" && selectedView === "column"
                      ? theme.palette.primary.light
                      : theme.palette.grey[400],
                  bgcolor:
                    theme.palette.mode === "dark" && theme.palette.grey[900],
                }}
              >
                <ViewWeekIcon />
              </Button>
              <Button
                variant="outlined"
                onClick={() => toggleSelectedView("grid")}
                sx={{
                  color:
                    theme.palette.mode === "light" && selectedView === "grid"
                      ? theme.palette.primary.light
                      : theme.palette.grey[400],
                  bgcolor:
                    theme.palette.mode === "dark" && theme.palette.grey[900],
                }}
              >
                <ViewListIcon />
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Stack>
      {selectedView === "column" && (
        <CardView
          fetchedData={fetchedData}
          loading={
            (getAllProfilesLoading || searchLoading) && "Loading the Profiles"
          }
          error={
            (getAllProfilesError || searchError) &&
            "Error Loading the Profiles Please Refresh and Try Again"
          }
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          // handleFetchMore={handleFetchMore}
        />
      )}
      {isSmallScreen && selectedView === "grid" && (
        <DataGridView
          fetchedData={fetchedData}
          loading={getAllProfilesLoading || searchLoading}
          error={
            (getAllProfilesError || searchError) &&
            "Error Loading the Profiles Please Refresh and Try Again"
          }
        />
      )}

      {openCreateProfileModal && (
        <CreateEditProfile
          openModal={openCreateProfileModal}
          handleOpenModal={openCreateProfileModal}
          handleCloseModal={handleProfileModalClose}
          type="Create"
        />
      )}
    </div>
  );
};

export default ContainerView;
