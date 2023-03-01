import { Box, Container, CssBaseline, useTheme } from "@mui/material";

import "./App.css";
import CardView from "./components/CardView/CardView";
import ContainerView from "./components/ContainerView/ContainerView";
import CreateEditProfile from "./components/CreateEditProfile/CreateEditProfile";
import DataGridView from "./components/DataGridView/DataGridView";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar";

function App() {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.primary.dark} height="100vh">
    <CssBaseline/>
      <Navbar  />
      <Container maxWidth='lg'>
        <ContainerView/>
        <CardView/>
        {/* <DataGridView/> */}
        <DeleteModal/>
        <CreateEditProfile/>
      </Container>
    </Box>
  );
}

export default App;
