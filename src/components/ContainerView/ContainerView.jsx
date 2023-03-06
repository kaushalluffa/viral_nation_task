import React, { useCallback, useEffect, useState } from "react";

import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";
import { SEARCH_PROFILE } from "../../utils/queries/searchProfile";
import { debounce } from "../../utils/handlers/debounce";
import { handleScroll } from "../../utils/handlers/handleScroll";
import SearchBarContainer from "../SearchBarContainer/SearchBarContainer";

const ContainerView = () => {
  const [selectedView, setSelectedView] = useState("column");
  const isSmallScreen = useMediaQuery("(min-width:1100px");
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [rows] = useState(16);
  const [fetchedData, setFetchedData] = useState({ size: 0, profiles: [] });
  const [pageNumber, setPageNumber] = useState(0);

  //fetch all profiles query
  const [
    getAllProfilesFn,
    {
      data: getAllProfilesData,
      loading: getAllProfilesLoading,
      error: getAllProfilesError,
      fetchMore,
    },
  ] = useLazyQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: {
        key: "is_verified",
        sort: "desc",
      },
      rows: rows,
      page: pageNumber,
    },
  });
  //search for profile query
  const [
    searchProfile,
    { data: searchedData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_PROFILE);

  //delaying the api request for search results 500ms
  const searchForProfile = useCallback(debounce((input) => {
    searchProfile(
      {
        variables: {
          searchString: input,
          rows: rows,
        },
      },
      500
    );
  }),[]);

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

  useEffect(() => {
    if (getAllProfilesData) {
      setFetchedData(getAllProfilesData.getAllProfiles);
    }

    getAllProfilesFn();
  }, [getAllProfilesData, getAllProfilesFn]);
  //setting the state with all profiles data
  useEffect(() => {
    if (!searchedData) return;
    if (searchedData) {
      setFetchedData(searchedData?.getAllProfiles);
    }
  }, [searchedData]);

  //setting the state on scroll
  useEffect(() => {
    if (fetchedData?.profiles.length > 0) {
      window.addEventListener("scroll", () => {
        handleScroll({
          fetchMore,
          fetchedData,

          setFetchedData,
        });
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMore, fetchedData]);

  return (
    <>
      <SearchBarContainer
        handleInputChange={handleInputChange}
        rows={rows}
        handleProfileModalOpen={handleProfileModalOpen}
        toggleSelectedView={toggleSelectedView}
        inputValue={inputValue}
        isSmallScreen={isSmallScreen}
        selectedView={selectedView}
      />
      {selectedView === "column" && (
        <CardView
          fetchedData={fetchedData}
          loading={
            (getAllProfilesLoading || searchLoading) && "Loading the Profiles"
          }
          error={getAllProfilesError || searchError}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
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
    </>
  );
};

export default ContainerView;
