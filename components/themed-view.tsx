import { type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";
import { useMemo } from "react";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  applyTopInsets?: boolean;
  applyBottomInsets?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  applyTopInsets,
  applyBottomInsets,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const edges = useMemo(() => {
    const edges: Edge[] = [];

    if (applyTopInsets) edges.push("top");
    if (applyBottomInsets) edges.push("bottom");

    return edges;
  }, [applyTopInsets, applyBottomInsets]);

  return (
    <SafeAreaView
      edges={edges}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
