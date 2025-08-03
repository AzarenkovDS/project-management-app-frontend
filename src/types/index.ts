export type themeOptions = "light" | "dark";

export interface ThemeContextType {
  theme: themeOptions;
  toggleTheme: () => void;
}
