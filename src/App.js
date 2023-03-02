import { Box, Container, CssBaseline, useTheme } from "@mui/material";

import "./App.css";
import ContainerView from "./components/ContainerView/ContainerView";
import CreateEditProfile from "./components/CreateEditProfile/CreateEditProfile";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar/Navbar";
import { useThemeUpdate } from "./context/themeContext";

function App() {
  const theme = useTheme()
  const {editData} = useThemeUpdate()
  return (
    <Box
    paddingBottom={10}
      bgcolor={
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.common.black
      }
    >
      <CssBaseline />
      <Navbar />
      <Container maxWidth='xl'>
        <ContainerView />
        <DeleteModal />
        <CreateEditProfile editData={editData || null} />
      </Container>
    </Box>
  );
}

export default App;
