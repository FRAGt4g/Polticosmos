"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  type PREFERENCE_SidebarChoice,
  type PREFERENCE_Theme,
} from "~/lib/types";

type ExpandOut<T> = T extends infer R ? { [K in keyof R]: R[K] } : never;

export type PreferncesValues<T> = {
  value: T;
  key: string;
};

export type PreferncesConfig = {
  theme: PreferncesValues<PREFERENCE_Theme> & {
    toggleDarkMode: () => void;
    isDarkMode: () => boolean;
  };
  sidebarLocation: PreferncesValues<PREFERENCE_SidebarChoice>;
  shouldShowTitle: PreferncesValues<boolean>;
};

// Get the current page path to create page-specific storage keys
const getPagePrefix = () => {
  if (typeof window !== "undefined") {
    return `politicosmos-${window.location.pathname.replace(/\//g, "-")}`;
  }
  return "politicosmos-default";
};

// Create a function to get page-specific keys
const getPageSpecificKey = (baseKey: string) => {
  return `${getPagePrefix()}-${baseKey}`;
};

export const DEFAULT_PREFERENCES: PreferncesConfig = {
  theme: {
    value: "system",
    key: "ui-theme", // This will be made page-specific when used
    toggleDarkMode: () => null,
    isDarkMode: () => false,
  },
  sidebarLocation: {
    value: "left",
    key: "sidebar-location", // This will be made page-specific when used
  },
  shouldShowTitle: {
    value: true,
    key: "title-visibility", // This will be made page-specific when used
  },
};

type ValuesPart = {
  [K in keyof PreferncesConfig]: PreferncesConfig[K]["value"];
};

type SettersPart = {
  [K in keyof PreferncesConfig as `set${Capitalize<K & string>}`]: (
    value: PreferncesConfig[K]["value"],
  ) => void;
};

type ExtrasPart = {
  [K in keyof PreferncesConfig as `${K & string}`]: {
    [k in keyof Omit<
      PreferncesConfig[K],
      "key" | "value"
    >]: PreferncesConfig[K][k];
  };
};

type FlattenedExtrasPart = {
  [K in keyof ExtrasPart as `${keyof ExtrasPart[K] & string}`]: ExtrasPart[K][keyof ExtrasPart[K]];
};

type PreferencesContext = ExpandOut<
  ValuesPart & SettersPart & FlattenedExtrasPart
>;

const PreferencesProviderContext = createContext<PreferencesContext>({
  theme: DEFAULT_PREFERENCES.theme.value,
  setTheme: () => null,
  toggleDarkMode: () => null,
  isDarkMode: () => false,
  sidebarLocation: DEFAULT_PREFERENCES.sidebarLocation.value,
  setSidebarLocation: () => null,
  shouldShowTitle: true,
  setShouldShowTitle: () => null,
});

export function PreferencesProvider(props: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldShowTitle, setShouldShowTitle] = useState(true);
  const [theme, setTheme] = useState<PREFERENCE_Theme>(
    DEFAULT_PREFERENCES.theme.value,
  );
  const [sidebarLocation, setSidebarLocation] =
    useState<PREFERENCE_SidebarChoice>(
      DEFAULT_PREFERENCES.sidebarLocation.value,
    );

  useEffect(() => {
    const storedTheme = localStorage?.getItem(
      getPageSpecificKey(DEFAULT_PREFERENCES.theme.key),
    ) as PREFERENCE_Theme | null;
    if (storedTheme) {
      handleThemeChange(storedTheme);
    }

    const storedSidebarLocation = localStorage?.getItem(
      getPageSpecificKey(DEFAULT_PREFERENCES.sidebarLocation.key),
    ) as PREFERENCE_SidebarChoice | null;
    if (storedSidebarLocation) {
      setSidebarLocation(storedSidebarLocation);
    }

    const storedShouldShowTitle = (localStorage?.getItem(
      getPageSpecificKey(DEFAULT_PREFERENCES.shouldShowTitle.key),
    ) === 'true');
    if (storedShouldShowTitle !== null) {
      setShouldShowTitle(storedShouldShowTitle);
    }

    setIsMounted(true);
  }, []);

  function handleThemeChange(theme: PREFERENCE_Theme) {
    localStorage.setItem(
      getPageSpecificKey(DEFAULT_PREFERENCES.theme.key),
      theme,
    );
    if (theme === "system") {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );

      // Add listener for system theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          document.documentElement.classList.toggle("dark", e.matches);
        });
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }

    setTheme(theme);
  }

  const value: PreferencesContext = {
    theme,
    setTheme: handleThemeChange,
    toggleDarkMode: () => {
      handleThemeChange(isDarkMode() ? "light" : "dark");
    },
    isDarkMode: () => isDarkMode(),
    sidebarLocation,
    setSidebarLocation: (sidebarLocation: PREFERENCE_SidebarChoice) => {
      localStorage.setItem(
        getPageSpecificKey(DEFAULT_PREFERENCES.sidebarLocation.key),
        sidebarLocation,
      );
      setSidebarLocation(sidebarLocation);
    },
    shouldShowTitle,
    setShouldShowTitle: (shouldShowTitle: boolean) => {
      localStorage.setItem(
        getPageSpecificKey(DEFAULT_PREFERENCES.shouldShowTitle.key),
        shouldShowTitle.toString(),
      );
      setShouldShowTitle(shouldShowTitle);
    },
  };

  if (!isMounted) {
    return null;
  }

  return (
    <PreferencesProviderContext.Provider {...props} value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          let isDark = false;
          const storedTheme = localStorage.getItem("${getPageSpecificKey(DEFAULT_PREFERENCES.theme.key)}");
          if (storedTheme === "dark") {
            isDark = true;
          } else if (storedTheme === "system" && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            isDark = true;
          }
          if (isDark) {
            document.documentElement.classList.add('dark');
          }
        `,
        }}
      />
      {props.children}
    </PreferencesProviderContext.Provider>
  );
}

export const usePreferences = () => {
  const context = useContext(PreferencesProviderContext);

  if (context === undefined)
    throw new Error("usePreferences must be used within a PreferencesProvider");

  return context;
};

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}
