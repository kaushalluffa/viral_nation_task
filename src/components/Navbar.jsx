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
import { useThemeUpdate } from "../context/themeContext";
const Navbar = () => {
  const theme = useTheme();
  const updateTheme = useThemeUpdate()
  console.log(theme);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar
          sx={{
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <Typography variant="h4" color={theme.palette.primary.contrastText}>
              V
            </Typography>
            <Typography
              variant="body2"
              color={theme.palette.primary.contrastText}
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
            <Switch onClick={updateTheme} />
            <DarkModeRoundedIcon />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
