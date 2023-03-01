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
  const [currentTheme, setCurrentTheme] = useState('light');
 const selectedTheme = createTheme({
   palette: {
     mode: currentTheme,
   },
 });
  function toggleTheme() {
    setCurrentTheme((prevTheme) => {
      if(prevTheme === 'light') return 'dark'
      if(prevTheme === 'dark') return 'light'
    });
  }
  return (
    <ThemeProvider theme={selectedTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
    </ThemeProvider>
  );
}
