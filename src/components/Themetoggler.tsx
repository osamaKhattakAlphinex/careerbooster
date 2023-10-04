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
    <button
      onClick={handleToggleTheme}
      className="dark:bg-gray-800 bg-gray-100"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggler;
