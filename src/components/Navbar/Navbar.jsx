import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useThemeUpdate } from "../../context/themeContext";
const Navbar = () => {
  const theme = useTheme();
  const updateTheme = useThemeUpdate();
  // console.log(theme);
  return (
    <Box sx={{ flexGrow: 1 }} mb={6}>
      <AppBar position="relative" elevation={0} color="common">
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <Typography variant="h4">
              V
            </Typography>
            <Typography
              variant="body2"
              
            >
              iral Nation
            </Typography>
          </IconButton>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            <LightModeRoundedIcon />
            <IconButton onClick={updateTheme}>
              <Switch />
            </IconButton>
            <DarkModeRoundedIcon />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;