import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import type { ReactNode } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { StoreProvider } from "./StoreProvider";
import { AppThemeProvider } from "./ThemeProvider";

const NavigationThemeWrapper = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {children}
    </NavigationThemeProvider>
  );
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      <AppThemeProvider>
        <NavigationThemeWrapper>{children}</NavigationThemeWrapper>
      </AppThemeProvider>
    </StoreProvider>
  );
};
