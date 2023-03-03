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
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE } from "../../utils/queries/deleteProfile";
const CardView = ({ fetchedData }) => {
  const theme = useTheme();
  // const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [deleteUser, { data:deleteResponseData, loading:deleteLoading, error:deleteError }] = useMutation(DELETE_PROFILE);
  function handleDeleteModalOpen(dataToDelete) {
    console.log(dataToDelete);
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
      <Grid container spacing={3} align="center">
        {fetchedData.map((data) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={data.id}>
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
                    {data.is_verified && (
                      <VerifiedRoundedIcon color="primary" fontSize="small" />
                    )}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" noWrap>
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
