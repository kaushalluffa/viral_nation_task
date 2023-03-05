import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState } from "react";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import CardComponent from "../CardComponent/CardComponent";

const CardView = ({ fetchedData, loading, error }) => {
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
          {loading}
        </Box>
      )}
      {error && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="filled" severity="error">
            There has been error fetching profiles please refresh and try again
          </Alert>
        </Box>
      )}
      <Grid container spacing={3} align="center">
        {profiles.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <CardComponent
                data={data}
                handleDeleteModalOpen={handleDeleteModalOpen}
                handleDeleteModalClose={handleDeleteModalClose}
                handleOpenEditProfileModal={handleOpenEditProfileModal}
                openDeleteModal={openDeleteModal}
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
