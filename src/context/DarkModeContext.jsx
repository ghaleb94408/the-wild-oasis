import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, "isDarkMode");
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );
  return (
    <darkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </darkModeContext.Provider>
  );
}
function useDarkMode() {
  const context = useContext(darkModeContext);
  if (context === undefined)
    throw new Error("darkMode context was used outside of darkMode Provider ");
  return context;
}
export { DarkModeProvider, useDarkMode };
