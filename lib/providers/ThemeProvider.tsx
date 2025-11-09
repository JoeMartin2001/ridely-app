import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeContextValue = {
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: Exclude<ColorSchemeName, null>) => void;
  toggleColorScheme: () => void;
  isHydrated: boolean;
};

const STORAGE_KEY = "user-theme";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemColorScheme = () => Appearance.getColorScheme() ?? "light";

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [colorScheme, setColorSchemeState] = useState<ColorSchemeName>(
    getSystemColorScheme()
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [hasUserPreference, setHasUserPreference] = useState(false);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedScheme) => {
        if (!isMounted) return;

        if (storedScheme === "light" || storedScheme === "dark") {
          setColorSchemeState(storedScheme);
          setHasUserPreference(true);
        } else {
          setColorSchemeState(getSystemColorScheme());
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsHydrated(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (hasUserPreference) return;

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorSchemeState(colorScheme ?? "light");
    });

    return () => {
      subscription.remove?.();
    };
  }, [hasUserPreference]);

  const persistPreference = useCallback(async (scheme: "light" | "dark") => {
    setHasUserPreference(true);
    setColorSchemeState(scheme);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, scheme);
    } catch (error) {
      console.warn("Failed to persist theme preference", error);
    }
  }, []);

  const handleSetColorScheme = useCallback(
    (scheme: Exclude<ColorSchemeName, null>) => {
      persistPreference(scheme === "dark" ? "dark" : "light");
    },
    [persistPreference]
  );

  const toggleColorScheme = useCallback(() => {
    persistPreference(colorScheme === "dark" ? "light" : "dark");
  }, [colorScheme, persistPreference]);

  const value = useMemo(
    () => ({
      colorScheme,
      setColorScheme: handleSetColorScheme,
      toggleColorScheme,
      isHydrated,
    }),
    [colorScheme, handleSetColorScheme, toggleColorScheme, isHydrated]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }

  return context;
};
