import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState } from "react";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import CardComponent from "../CardComponent/CardComponent";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const CardView = ({ fetchedData, loading, error,scrollRef,setIsVisible }) => {
  const { profiles } = fetchedData;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  //state and modal open/close handlers
  function handleDeleteModalOpen(dataToDelete) {
    setCurrentData(dataToDelete);
    setOpenDeleteModal(true);
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

  return (
    <>
      {loading && (
        <Loading message="Profiles are loading please wait"/>
      )}
      {error && (
        <Error message="There has been error fetching profiles please refresh and try again"/>
      )}
      <Grid container spacing={3} align="center">
        {profiles.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
              <CardComponent
                data={data}
                handleDeleteModalOpen={handleDeleteModalOpen}
                handleDeleteModalClose={handleDeleteModalClose}
                handleOpenEditProfileModal={handleOpenEditProfileModal}
                openDeleteModal={openDeleteModal}
                scrollRef={scrollRef}
                setIsVisible={setIsVisible}
              />
            </Grid>
          );
        })}
      </Grid>

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

export default CardView;
