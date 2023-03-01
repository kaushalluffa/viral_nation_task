import { createContext, useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//creating theme styles
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FCFCFD",
      dark: "#F5F5F5",
      light: "rgba(255, 255, 255, 0.05)",
      contrastText: "#121212",
    },
  },
});
 const darkTheme = createTheme({
   palette: {
     mode: "dark",
     primary: {
       main: "#181818",
       dark: "#121212",
       light: "rgba(255, 255, 255, 0.05)",
       contrastText: "#F5F5F5",
     },
   },
 });
//creating context for theme and updating theme
export const ThemeContext = createContext();
export const ThemeUpdateContext = createContext();

//custom hooks created to simplify use of context 
export function useThemeContext() {
  return useContext(ThemeContext);
}
export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

//global wrapper for the app to use the theme context throughout the application
export function ThemeContextProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function toggleTheme() {
    setIsDarkTheme((prevTheme) => !prevTheme);
  }
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={isDarkTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
