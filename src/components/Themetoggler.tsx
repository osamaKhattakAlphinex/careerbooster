import { moonIcon, sunIcon } from "@/helpers/iconsProvider";
import useTheme from "@/lib/useTheme";

const ThemeToggler = () => {
  const [theme, toggleTheme] = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    // xs:fixed xs:top-6 xs:right-11 lg:top-12 lg:right-8
    <button
      onClick={handleToggleTheme}
      className="btn btn-icon btn-sm btn-ghost-secondary"
      title={theme === "dark" ? "Change to light mode" : "Change to dark mode"}
    >
      {theme === "dark" ? sunIcon : moonIcon}
    </button>
  );
};

export default ThemeToggler;
