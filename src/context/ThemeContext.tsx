import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { ThemeContextType, themeOptions } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => console.warn("no theme provider"),
});

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<themeOptions>("theme", "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log("toggle theme");

    const newThemeValue = theme === "light" ? "dark" : "light";

    setTheme(newThemeValue);
  };

  const themeValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  return context;
};

export default ThemeProvider;
