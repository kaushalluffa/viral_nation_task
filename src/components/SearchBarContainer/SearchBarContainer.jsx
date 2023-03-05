import { Box, Button, ButtonGroup, Stack, TextField, useTheme } from '@mui/material';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewListIcon from "@mui/icons-material/ViewList";

const SearchBarContainer = ({
  handleInputChange,
  rows,
  handleProfileModalOpen,
  toggleSelectedView,
  inputValue,
  selectedView,
  isSmallScreen,
}) => {
  const theme = useTheme();
  
  return (
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
          value={inputValue}
          onChange={(e) => handleInputChange(e, rows)}
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
                color:
                  theme.palette.mode === "light" && selectedView === "column"
                    ? theme.palette.primary.light
                    : theme.palette.grey[400],
                bgcolor:
                  theme.palette.mode === "dark" && theme.palette.grey[900],
              }}
            >
              <ViewWeekIcon />
            </Button>
            <Button
              variant="outlined"
              onClick={() => toggleSelectedView("grid")}
              sx={{
                color:
                  theme.palette.mode === "light" && selectedView === "grid"
                    ? theme.palette.primary.light
                    : theme.palette.grey[400],
                bgcolor:
                  theme.palette.mode === "dark" && theme.palette.grey[900],
              }}
            >
              <ViewListIcon />
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Stack>
  );
};

export default SearchBarContainer