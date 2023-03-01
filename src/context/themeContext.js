import { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//creating context for theme and updating theme
export const ThemeUpdateContext = createContext();

//custom hooks created to simplify use of context

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

//global wrapper for the app to use the theme context throughout the application
export function ThemeContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");

  const [open, setOpen] = useState(false);
  const [openDeleteModal,setOpenDeleteModal] = useState(false)
  const [editData, setEditData] = useState(null);
  const selectedTheme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });
  
  function toggleTheme() {
    setCurrentTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "light";
    });
  }
  const handleClickOpen = (data) => {
    setOpen(true);
    setEditData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };
  const handleDeleteModalOpen = (data) =>{
    console.log(data)
    setOpenDeleteModal(true)
  }
const handleDeleteModalClose = () =>{
  setOpenDeleteModal(false);
}
  const value = {
    open,
    handleClickOpen,
    handleClose,
    toggleTheme,
    editData,
    openDeleteModal,
    handleDeleteModalOpen,
    handleDeleteModalClose,
  };
  return (
    <ThemeProvider theme={selectedTheme}>
      <ThemeUpdateContext.Provider value={value}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeProvider>
  );
}
