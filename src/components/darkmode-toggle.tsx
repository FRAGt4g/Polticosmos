import { Computer, Moon, Sun } from "lucide-react";
import {
  isDarkMode,
  usePreferences,
} from "~/components/providers/preferences-provider";

const DarkModeToggle = (props: {
  showAllOptions?: boolean;
  ornamental?: boolean;
}) => {
  const { theme, setTheme, toggleDarkMode } = usePreferences();

  return props.showAllOptions ? (
    <div className="flex items-center gap-2 p-2">
      <button
        type="button"
        title="themeToggle"
        onClick={() => {
          if (!props.ornamental) {
            setTheme("dark");
          }
        }}
        className="flex items-center gap-2 p-2"
      >
        <Moon
          className={`h-5 w-5 ${theme === "dark" ? "text-black dark:text-white" : "text-muted-foreground"}`}
        />
      </button>

      <button
        type="button"
        title="themeToggle"
        onClick={() => {
          if (!props.ornamental) {
            setTheme("system");
          }
        }}
        className="flex items-center gap-2 p-2"
      >
        <Computer
          className={`h-5 w-5 ${theme === "system" ? "text-black dark:text-white" : "text-muted-foreground"}`}
        />
      </button>

      <button
        type="button"
        title="themeToggle"
        onClick={() => {
          if (!props.ornamental) {
            setTheme("light");
          }
        }}
        className="flex items-center gap-2 p-2"
      >
        <Sun
          className={`h-5 w-5 ${theme === "light" ? "text-black dark:text-white" : "text-muted-foreground"}`}
        />
      </button>
    </div>
  ) : (
    <div className="relative h-5 w-5">
      <Moon
        className={`absolute h-5 w-5 transition-opacity duration-500 ${
          isDarkMode() ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          if (!props.ornamental) {
            toggleDarkMode();
          }
        }}
      />
      <Sun
        className={`absolute h-5 w-5 transition-opacity duration-500 ${
          isDarkMode() ? "opacity-0" : "opacity-100"
        }`}
        onClick={() => {
          if (!props.ornamental) {
            toggleDarkMode();
          }
        }}
      />
    </div>
  );
};

export default DarkModeToggle;
