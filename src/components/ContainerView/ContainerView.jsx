import {
  Box,
  ButtonGroup,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";
const ContainerView = () => {
  const theme = useTheme();
  return (
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
      <ButtonGroup>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            
            marginRight: "8px",
          }}
        >
          Create Field
        </Button>
        <Button
          
        >
          <ViewWeekIcon />
        </Button>
        <Button
         
        >
          <ViewListIcon />
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ContainerView;
