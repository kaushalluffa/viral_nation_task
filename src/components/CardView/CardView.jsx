import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import DeleteModal from "../DeleteModal/DeleteModal";
import DropdownMenu from "../DropDownMenu/DropDownMenu";
import { useState } from "react";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";

const CardView = ({ fetchedData }) => {
  const theme = useTheme();
  // const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  function handleDeleteModalOpen(passedData) {
    console.log(passedData);
    setOpenDeleteModal(true);
  }
  function handleDeleteModalClose() {
    setOpenDeleteModal(false);
  }
  function handleOpenEditProfileModal(dataToEdit) {
    console.log("data to edit", dataToEdit);
    setCurrentData(dataToEdit);
    setOpenEditProfileModal(true);
  }
  function handleCloseEditProfileModal() {
    setOpenEditProfileModal(false);
  }
  return (
    <>
      <Grid container spacing={3} align="center">
        {fetchedData.map((data, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3}  key={i}>
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
                    onClose={handleDeleteModalClose}
                    openDeleteModal={openDeleteModal}
                  />
                }
                title={
                  <Typography
                    variant="body2"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {data.name}
                    {data.is_verified && (
                      <VerifiedRoundedIcon color="primary" fontSize="small" />
                    )}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="caption"
                  
                  >
                    {data.email}
                  </Typography>
                }
              />

              <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
                <Typography variant="body2" textAlign="left">
                  {data.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      {openEditProfileModal && (
        <CreateEditProfile
          openModal={openEditProfileModal}
          handleOpenModal={handleOpenEditProfileModal}
          handleCloseModal={handleCloseEditProfileModal}
          type="Edit Profile"
          currentData={currentData}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          openModal={openDeleteModal}
          handleModalClose={handleDeleteModalClose}
        />
      )}
    </>
  );
};

export default CardView;
