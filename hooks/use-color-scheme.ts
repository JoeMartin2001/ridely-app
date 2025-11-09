import { useAppTheme } from "@/lib/providers/ThemeProvider";

export function useColorScheme() {
  const { colorScheme } = useAppTheme();
  return colorScheme ?? "light";
}
