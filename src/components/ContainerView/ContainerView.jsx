import { Box, ButtonGroup, Stack, TextField, useTheme } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardView from "../CardView/CardView";
import DataGridView from "../DataGridView/DataGridView";
import { useThemeUpdate } from "../../context/themeContext";
const mock = [
  {
    is_verified:true,
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
    is_verified:true,
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
    is_verified:true,
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
    is_verified:true,
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
    is_verified:true,
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
    is_verified:true,
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
    is_verified:false,
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
    is_verified:true,
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
  const [selectedView, setSelectedView] = useState("column");
  function toggleSelectedView(view) {
    setSelectedView(view);
  }
  const { handleClickOpen } = useThemeUpdate();
  const theme = useTheme();
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        marginBottom={5}
        justifyContent="space-between"
      >
        <Box width="75%">
          <TextField
            sx={{ flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            fullWidth
            size="small"
          />
        </Box>
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
          onClick={handleClickOpen}
        >
          Create Field
        </Button>
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
                selectedView === "grid" ? "grey" : theme.palette.primary.light,
              bgcolor: selectedView === "column" && theme.palette.grey[300],
            }}
          >
            <ViewWeekIcon />
          </Button>
          <Button
            variant="outlined"
            onClick={() => toggleSelectedView("grid")}
            sx={{
              color:
                selectedView === "column"
                  ? "grey"
                  : theme.palette.primary.light,
              bgcolor: selectedView === "grid" && theme.palette.grey[300],
            }}
          >
            <ViewListIcon />
          </Button>
        </ButtonGroup>
      </Stack>
      {selectedView === "column" ? (
        <CardView fetchedData={mock} />
      ) : (
        <DataGridView fetchedData={mock} />
      )}
    </>
  );
};

export default ContainerView;
