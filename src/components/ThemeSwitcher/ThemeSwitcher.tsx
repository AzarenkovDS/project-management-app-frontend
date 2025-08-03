import { useTheme } from "../../context/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="px-2 py-2 rounded border">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeSwitcher;
