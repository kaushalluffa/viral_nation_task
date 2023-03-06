import React, { useCallback, useEffect, useRef, useState } from "react";

import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PROFILES } from "../../utils/queries/getAllProfiles";
import { SEARCH_PROFILE } from "../../utils/queries/searchProfile";
import { debounce } from "../../utils/handlers/debounce";
import SearchBarContainer from "../SearchBarContainer/SearchBarContainer";

const ContainerView = () => {
  const [selectedView, setSelectedView] = useState("column");
  const isSmallScreen = useMediaQuery("(min-width:1100px");
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const [isVisible, setIsVisible] = useState(false);
  const scrollRef = useRef(null);

  const pageNumberRef = useRef(0);

  //fetch all profiles query
  const [fetchedData, setFetchedData] = useState({
    profiles: [],
    size: 0,
    page: 0,
    pageSize: 16,
  });
  const [
    getAllProfiles,
    {
      data: getAllProfilesData,
      loading: getAllProfilesLoading,
      error: getAllProfilesError,
      fetchMore,
    },
  ] = useLazyQuery(GET_ALL_PROFILES);


  //search for profile query
  const [
    searchProfile,
    { data: searchedData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_PROFILE);

  //delaying the api request for search results 500ms
  const searchForProfile = useCallback(
    debounce((input) => {
      searchProfile(
        {
          variables: {
            searchString: input,
            rows: fetchedData?.pageSize,
          },
        },
        500
      );
    }),
    []
  );

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

  //using the function returned by useLazyQuery to get the data from api
  useEffect(() => {
    getAllProfiles({
      variables: {
        page: fetchedData?.page,
        rows: fetchedData?.pageSize,
            orderBy: {
              key: "is_verified",
              sort: "desc",
            },
      },
    });
  }, [getAllProfiles, fetchedData?.page, fetchedData?.pageSize]);

  

  //setting the state with new data
  useEffect(() => {
    if (getAllProfilesData?.getAllProfiles) {
      setFetchedData((old) => ({
        ...old,
        profiles: getAllProfilesData?.getAllProfiles?.profiles,
        size: getAllProfilesData?.getAllProfiles?.size,
      }));
    }
  }, [getAllProfilesData?.getAllProfiles]);

  //setting the state with all profiles data
  useEffect(() => {
    if (!searchedData) return;
    if (searchedData) {
      setFetchedData(searchedData?.getAllProfiles);
    }
  }, [searchedData]);

  useEffect(() => {
    if (isVisible && fetchedData?.profiles.length !== fetchedData?.size) {
      
      pageNumberRef.current = pageNumberRef.current + 1;

    
      fetchMore({
        variables: {
          rows: fetchedData?.pageSize,
          page: pageNumberRef.current,
        },
      }).then(({ data }) => {
        setFetchedData((prevData) => {
          return {
            ...prevData,
            profiles: [
              ...new Set([
                ...prevData.profiles,
                ...data.getAllProfiles.profiles,
              ]),
            ],
          };
        });
      });
      setIsVisible(false);
    }
  }, [isVisible, fetchMore, fetchedData?.pageSize]);



  return (
    <>
      <SearchBarContainer
        handleInputChange={handleInputChange}
        rows={fetchedData?.pageSize}
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
          
          scrollRef={scrollRef}
          setIsVisible={setIsVisible}
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
          setFetchedData={setFetchedData}
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
