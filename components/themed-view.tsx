import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  applyTopInsets?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  applyTopInsets,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const insets = useSafeAreaInsets();

  const themedStyle = applyTopInsets ? { paddingTop: insets.top } : {};

  return (
    <View style={[{ backgroundColor }, style, themedStyle]} {...otherProps} />
  );
}
