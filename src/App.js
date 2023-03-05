import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "@mui/material/styles/useTheme";
import ContainerView from "./components/ContainerView/ContainerView";
import Navbar from "./components/Navbar/Navbar";



function App() {
  const theme = useTheme();

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
      <Container maxWidth="xl">
        <ContainerView />
      </Container>
    </Box>
  );
}

export default App;
