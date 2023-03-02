import { Box, ButtonGroup, Stack, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import CreateEditProfile from "../CreateEditProfile/CreateEditProfile";
import useMediaQuery from "@mui/material/useMediaQuery";
const mock = [
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 1,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 2,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 3,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 4,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 5,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 6,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: false,
    id: 7,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
  {
    lastName: "Richards",
    imageLink: "https://source.unsplash.com/random",
    is_verified: true,
    id: 8,
    name: "Ronald Richards",
    email: "ronaldrichards@gmail.com",
    description: `Lorem ipsum dolor sit amet consectetur. Tortor ut cras mauris at
              faucibus pharetra pellentesque diam pulvinar. Mauris penatibus ut
              luctus posuere posuere odio nisi mauris aliquet. Sapien aliquet
              porta tincidunt massa id quam pharetra. Massa vitae feugiat
              vulputate et praesent nisl neque nunc tortor.`,
  },
];
const ContainerView = () => {
  const [selectedView, setSelectedView] = useState("grid");
  const isSmallScreen = useMediaQuery("(min-width:1100px");
  const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false);

  const handleProfileModalOpen = (data) => {
    setOpenCreateProfileModal(true);
  };
  const handleProfileModalClose = (data) => {
    console.log(data);
    setOpenCreateProfileModal(false);
  };

  function toggleSelectedView(view) {
    setSelectedView(view);
  }

  const theme = useTheme();

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
                  color: themtheme.palette.grey[400],
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
      {selectedView === "column" && <CardView fetchedData={mock} />}
      {isSmallScreen && selectedView === "grid" && (
        <DataGridView fetchedData={mock} />
      )}
      {/* <Example/> */}

      {openCreateProfileModal && (
        <CreateEditProfile
          openModal={openCreateProfileModal}
          handleOpenModal={openCreateProfileModal}
          handleCloseModal={handleProfileModalClose}
          type="Create Profile"
        />
      )}
    </>
  );
};

export default ContainerView;
