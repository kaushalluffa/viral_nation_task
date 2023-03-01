import { Box, Container, CssBaseline, useTheme } from "@mui/material";

import "./App.css";
import ContainerView from "./components/ContainerView/ContainerView";
import CreateEditProfile from "./components/CreateEditProfile/CreateEditProfile";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const theme = useTheme()
  return (
    <Box height="100vh" bgcolor={theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.common.black}>
    <CssBaseline/>
      <Navbar  />
      <Container maxWidth='lg'>
        <ContainerView/>
        <DeleteModal/>
        <CreateEditProfile/>
      </Container>
    </Box>
  );
}

export default App;
