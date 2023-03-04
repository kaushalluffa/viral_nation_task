import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import DeleteModal from "../DeleteModal/DeleteModal";
import DropdownMenu from "../DropDownMenu/DropDownMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import { Stack } from "@mui/system";
const CardView = ({
  fetchedData,
  loading,
  error,
  pageNumber,
  setPageNumber,
  // handleFetchMore,
}) => {
  const theme = useTheme();
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
      <Grid container spacing={3} align="center">
        {profiles.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card
                elevation={0}
                sx={{
                  maxWidth: "342px",
                  backgroundColor:
                    theme.palette.mode === "light" && theme.palette.grey.A200,
                }}
                variant="contained"
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src="https://source.unsplash.com/random"
                      aria-label="avatar"
                    >
                      R
                    </Avatar>
                  }
                  action={
                    <DropdownMenu
                      onDelete={() => {
                        handleDeleteModalOpen(data);
                      }}
                      onEdit={() => handleOpenEditProfileModal(data)}
                      onClose={() => handleDeleteModalClose(data)}
                      openDeleteModal={openDeleteModal}
                      data={data}
                    />
                  }
                  title={
                    <Typography
                      variant="body2"
                      display="flex"
                      alignItems="center"
                      gap={1}
                      noWrap
                    >
                      {data.first_name} {data.last_name}
                      {data?.is_verified && (
                        <VerifiedRoundedIcon color="primary" fontSize="small" />
                      )}
                    </Typography>
                  }
                  subheader={
                    <Box>
                      <Typography variant="body2" noWrap>
                        {data.email}
                      </Typography>
                    </Box>
                  }
                />

                {/* <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
                  <Typography variant="body2" textAlign="left">
                    {data.description}
                  </Typography>
                </Box>
                 */}
                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="left"
                  >
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
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
