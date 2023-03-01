import { Box, Container, CssBaseline } from "@mui/material";

import "./App.css";
import CardView from "./components/CardView/CardView";
import ContainerView from "./components/ContainerView/ContainerView";
import CreateEditProfile from "./components/CreateEditProfile/CreateEditProfile";
import DataGridView from "./components/DataGridView/DataGridView";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Box height="100vh">
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
