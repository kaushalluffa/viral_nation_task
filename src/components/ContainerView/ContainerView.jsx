import React, { useEffect, useState } from "react";

import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLazyQuery, useQuery } from "@apollo/client";
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
  const {
    loading: getAllProfilesLoading,
    error: getAllProfilesError,
    fetchMore,
  } = useQuery(GET_ALL_PROFILES, {
    variables: {
      orderBy: {
        key: "is_verified",
        sort: "desc",
      },
      rows: rows,
      page: pageNumber,
    },
    onCompleted: (data) => {
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
    if (!searchedData) return;
    if (searchedData) {
      setFetchedData(searchedData?.getAllProfiles);
    }
  }, [searchedData]);

  //setting the state on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      handleScroll({
        fetchMore,
        fetchedData,
        pageNumber,
        setPageNumber,
        setFetchedData,
      });
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchedData?.profiles?.length, fetchedData?.size]);

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
