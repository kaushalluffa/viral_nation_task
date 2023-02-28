import { Box, Container, CssBaseline, useTheme } from "@mui/material";

import "./App.css";
import CardView from "./components/CardView/CardView";
import Navbar from "./components/Navbar";

function App() {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.primary.dark}>
    <CssBaseline/>
      <Navbar  />
      <Container maxWidth='lg'>
        <CardView/>
      </Container>
    </Box>
  );
}

export default App;
