import { useThemeColor } from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

type Props = {
  width?: number;
  direction?: "horizontal" | "vertical";
};

export const Divider = ({
  width = StyleSheet.hairlineWidth,
  direction = "horizontal",
}: Props) => {
  const backgroundColor = useThemeColor({}, "divider");

  return (
    <View
      style={{
        width: direction === "horizontal" ? "100%" : width,
        height: direction === "vertical" ? "100%" : width,
        backgroundColor,
      }}
    />
  );
};
